#!/usr/bin/env node

const fs = require('fs')
const cmd = require('node-cmd')
const path = require('path')
const OBS = require('esdk-obs-nodejs')

const { id, key } = require('./secrets/huaweiyun.js')
const obs = new OBS({
  access_key_id: id,
  secret_access_key: key,
  server: 'obs.cn-east-3.myhuaweicloud.com'
})

const enableRSS = !!process.env.RSS
const distDir = './dist'
const gzipedDir = ['./dist/assets/js', './dist/assets/css']
const gzipedDirType = ['js', 'css']
const delRSSDir = `del "${path.join(__dirname, './dist/rss.xml')}"`
const websiteOBSTarget = `obs://mgear-blogs`
const Bucket = 'mgear-blogs'
const get = url => Bucket + '/' + url

const uploadWebsite = `obsutil sync ${distDir} ${websiteOBSTarget}`

function sleep(time = 1000) {
  return new Promise(resolve => setTimeout(resolve, time))
}

const task = {
  deleteRSS: () => {
    return new Promise(resolve => {
      console.log('| delete rss-file start : ', uploadWebsite)
      cmd.get(delRSSDir, async error => {
        error ? console.error('| delete rss-file error : ', error) : console.log('| delete rss-file success')
        resolve()
      })
    })
  },
  renameGzipFile: () => {
    console.log('| rename gzip-file start ...')
    gzipedDir.map(dir => {
      fs.readdirSync(dir).map(item => {
        const isGZ = item.endsWith('.gz')
        if (isGZ) {
          const rawFileName = path.join(dir, item.replace(/\.gz$/, ''))
          fs.existsSync(rawFileName) && fs.unlinkSync(rawFileName)
          fs.renameSync(path.join(dir, item), rawFileName.replace('.', '-gziped.'))
        }
      })
    })
    console.log('| rename gzip-file success ...')
  },
  uploadMgear: () => {
    return new Promise(resolve => {
      console.log('| upload website start : ', uploadWebsite)
      function upload() {
        cmd.get(uploadWebsite, async error => {
          error
            ? console.error('| upload website error : ', error)
            : console.log('| upload website success')
          if (error) {
            console.log('| ERROR & RETRY...')
            upload()
          } else {
            resolve()
          }
        })
      }
      upload()
    })
  },
  run: async () => {
    if (!enableRSS) {
      await sleep()
      await task.deleteRSS()
    }

    await sleep()
    await task.renameGzipFile()

    await sleep()
    await task.uploadMgear()

    await sleep()
    task.changeGzipFileHeader()
  },
  changeGzipFileHeader: () => {
    console.log('| change gzip-file header start ...')
    gzipedDir.map(async (dir, idx) => {
      const type = gzipedDirType[idx]
      const typeConfig = {
        js: {
          ContentType: 'application/javascript'
        },
        css: {
          ContentType: 'text/css'
        }
      }[type]
      const files = fs.readdirSync(dir)
      for await (item of files) {
        if (item.includes('-gziped')) {
          const Key = path.join(dir.replace('dist/', ''), item).replace(/\\/g, '/')
          const CopySource = path.join(`mgear-blogs/`, Key).replace(/\\/g, '/')
          console.log('Current: ', Key)
          await changeFileMetaHeader(Key, {
            Bucket,
            Key,
            CopySource,
            MetadataDirective: 'REPLACE',
            ContentType: typeConfig.ContentType,
            ContentEncoding: 'gzip'
          })
        }
      }
    })
    console.log('| change gzip-file header success ...')
  }
}

function changeFileMetaHeader(file, config) {
  return new Promise((resolve, reject) => {
    obs.copyObject({ ...config })
      .then(_ => {
        resolve('File Done: ', file)
      })
      .catch(error => {
        console.error('File Error: ', file, error)
        reject()
      })
  })
}

task.run()
