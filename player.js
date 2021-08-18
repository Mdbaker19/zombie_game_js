function Player(x, y, money) {

    this.x = x;
    this.y = y;
    this.size = 15;
    this.speed = 5;
    this.bullets = [];
    this.money = money;

    this.show = (fill) => {
        fill(this.x, this.y, this.size, this.size, "#ffffff");
    }

    this.shoot = (fill, path) => {
        console.log(this.bullets);
        if(this.bullets.length < 15) {
            this.bullets.push(new Bullet(this.x, this.y, fill, path, this.updateBullets));
        }
    }

    this.updateBullets = () => {
        this.bullets.shift();
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

function Bullet(x, y, showFn, path, deleteSelf) {
    this.x = x;
    this.y = y;
    this.show = () => {
        showFn(this.x, this.y, 5, 5, "#fff");
    }
    this.update = () => {
        if(this.x < 0 || this.x > widthBound - 5 || this.y > heightBound - 5 || this.y < 0) {
            console.log("bullet off screen.. remove it");
            deleteSelf();
        }
        this.x += path.xRise;
        this.y += path.yRise;
    }
}