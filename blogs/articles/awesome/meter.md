# Meter

## C 盘占用情况

<div class="win10-disks">
    <div class="disk">
        <img class="icon" src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/msedge_l3KrUPxtmf_waifu2x_4x_2n_png.png" />
        <div class="right">
            <p class="title"><span>Windows (C:)</span></p>
            <meter value="98.26" min="0" high="90" max="99.9" title="可用空间：1.64 GB
        总大小：99.9 GB"></meter>
            <p class="space"><span>1.64 GB 可用，共 99.9 GB</span></p>
        </div>
    </div>
    <div class="disk">
        <img class="icon" src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/msedge_l3KrUPxtmf_waifu2x_4x_2n_png.png" />
        <div class="right">
            <p class="title"><span>Datas (D:)</span></p>
            <meter value="31" min="0" high="888" max="931" title="可用空间：900 GB
        总大小：931 GB"></meter>
            <p class="space"><span>900 GB 可用，共 931 GB</span></p>
        </div>
    </div>
    <div class="disk">
        <img class="icon" src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/msedge_l3KrUPxtmf_waifu2x_4x_2n_png.png" />
        <div class="right">
            <p class="title"><span>Datas (E:)</span></p>
            <meter value="31" min="0" high="888" max="931" title="可用空间：900 GB
        总大小：931 GB"></meter>
            <p class="space"><span>900 GB 可用，共 931 GB</span></p>
        </div>
    </div>
    <div class="disk">
        <img class="icon" src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/msedge_l3KrUPxtmf_waifu2x_4x_2n_png.png" />
        <div class="right">
            <p class="title"><span>Datas (F:)</span></p>
            <meter value="31" min="0" high="888" max="931" title="可用空间：900 GB
        总大小：931 GB"></meter>
            <p class="space"><span>900 GB 可用，共 931 GB</span></p>
        </div>
    </div>
    <div class="disk">
        <img class="icon" src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/msedge_l3KrUPxtmf_waifu2x_4x_2n_png.png" />
        <div class="right">
            <p class="title"><span>Datas (G:)</span></p>
            <meter value="31" min="0" high="888" max="931" title="可用空间：900 GB
        总大小：931 GB"></meter>
            <p class="space"><span>900 GB 可用，共 931 GB</span></p>
        </div>
    </div>
</div>

<style>
    .win10-disks {
        display: flex;
        flex-wrap: wrap;
        padding: 0px 10px;
        width: 100%;
    }
    .disk {
        display: flex;
        flex-shrink: 0;
        margin: 10px 8px 0 0;
        box-sizing: border-box;
        width: 250px;
        height: 57px;
        background: white;
        user-select: none;
        border: solid 1px transparent;
        cursor: pointer;
    }
    .disk:hover {
        border: solid 1px #999;
    }
    .disk .icon {
        margin: 0 2px 4px 1px;
        align-self: flex-end;
        width: 52px;
        height: 40px;
        pointer-events: none;
    }
    .disk p.title,
    .disk p.space {
        margin: 0px;
        font-size: 10px;
        line-height: 1.65;
        font-family: san-serif;
    }
    .disk .right {
        display: flex;
        flex-direction: column;
    }
    meter {
        display: flex;
        width: unset;
        height: 15px;
    }
    meter::-webkit-meter-bar {
        width: 190px;
        height: 15px;
        border: solid 1px #bcbcbc;
        border-radius: 0px;
        background: #e6e6e6;
    }
    meter::-webkit-meter-optimum-value {
        background: #26a0da;
    }
    meter::-webkit-meter-suboptimum-value {
        background: #da2626;
    }
</style>