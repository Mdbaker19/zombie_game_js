function Player(x, y, money) {

    this.x = x;
    this.y = y;
    this.size = 15;
    this.speed = 5;
    this.bullets = [];
    this.money = money;

    this.show = () => {
        fill(this.x, this.y, this.size, this.size, "#bea082");
        fill(this.x + this.size / 4, this.y + this.size, this.size / 2, this.size, "#2dd7c6");
        fill(this.x, this.y + this.size * 2, this.size, this.size / 4, "#6e4d4d");
    }

    this.shoot = (path) => {
        console.log(this.bullets);
        if(this.bullets.length < 15) {
            this.bullets.push(new Bullet(this.x, this.y, path, this.updateBullets));
        }
    }

    this.updateBullets = (id) => {
        removeBullet(this.bullets, id);
    }

    this.move = (dir) => {
        switch (dir) {
            case "Up":
                if(this.y > 0) {
                    this.y -= this.speed;
                }
                break;
            case "Down":
                if(this.y < heightBound - this.size * 2.5) {
                    this.y += this.speed;
                }
                break;
            case "Left":
                if(this.x > 0) {
                    this.x -= this.speed;
                }
                break;
            case "Right":
                if(this.x < widthBound - this.size) {
                    this.x += this.speed;
                }
                break;
        }
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
            return true;
        }
        this.x += path.xRise;
        // this.x += this.xSpeed;
        this.y += path.yRise;
        // this.y += this.ySpeed;
    }
}