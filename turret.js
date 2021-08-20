function Turret(x, y, clipSize, level, selfDestruct) {
    this.x = x;
    this.y = y;
    this.clipSize = clipSize;
    this.level = level;
    this.id = genRanId();

    // adding a rotate would be cool when a zombie is seen / within range
    this.show = () => {
        fill(this.x, this.y, 10, 10, "#134f8a");
    }

    this.operate = () => {
        // shoot while this.clipSize > 0;
        while(this.clipSize > 0) {
            // create bullet
            this.clipSize--;
            // console.log("shoot fired");
        }
        selfDestruct(this.id);
        // console.log("remove self");
    }
}


function Bullet(x, y, path, deleteSelf) {
    this.x = x;
    this.y = y;
    this.id = genRanId();
    // if xRise or yRise starts + keep + and keep - if - ... can not figure this out right now..
    this.xSpeed = keepValue({value: path.xRise, data: "x"}, {value: path.yRise, data: "y"});
    this.ySpeed = keepValue({value: path.yRise, data: "y"}, {value: path.xRise, data: "x"});
    this.show = () => {
        fill(this.x, this.y, 5, 5, "#ebcb87");
    }
    this.update = () => {
        if(this.x < 0 || this.x > widthBound - 5 || this.y > heightBound - 5 || this.y < 0) {
            // console.log("bullet off screen.. remove it");
            deleteSelf(this.id);
        }
        this.x += path.xRise;
        // this.x += this.xSpeed;
        this.y += path.yRise;
        // this.y += this.ySpeed;
    }
}