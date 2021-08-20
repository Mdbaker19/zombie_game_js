function Player(x, y, money) {

    this.x = x;
    this.y = y;
    this.size = 15;
    this.health = 50;
    this.speed = 5;
    this.bullets = [];
    this.helpers = [];
    this.storage = {}; // possibly for fences to build, weapons to switch from, maybe combine bullets, helpers into it
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

    this.build = () => {
        if(this.money > 10) {
            this.money -= 10;
            this.helpers.push(new Turret(this.x + this.size / 3, this.y + this.size, 10, 1, this.updateHelpers));
        }
        // console.log(this.helpers);
    }

    this.updateBullets = (id) => {
        removeObj(this.bullets, id);
    }

    this.updateHelpers = (id) => {
        removeObj(this.helpers, id);
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
