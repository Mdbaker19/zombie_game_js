function Player(x, y, money) {

    this.x = x;
    this.y = y;
    this.size = 15;
    this.speed = 5;
    this.bullets = [];
    this.money = money;

    this.show = () => {
        fill(this.x, this.y, this.size, this.size, "#ffffff");
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
                if(this.y < heightBound - this.size) {
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
    this.show = () => {
        fill(this.x, this.y, 5, 5, "#fff");
    }
    this.update = () => {
        if(this.x < 0 || this.x > widthBound - 5 || this.y > heightBound - 5 || this.y < 0) {
            console.log("bullet off screen.. remove it");
            deleteSelf(this.id);
            return true;
        }
        this.x += path.xRise;
        this.y += path.yRise;
    }

}