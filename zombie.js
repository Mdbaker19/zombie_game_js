function Zombie(x, y) {
    this.x = x;
    this.y = y;

    this.show = (fill) => {
        fill(this.x, this.y, 10, 10, "#57c90e");
        fill(this.x - 5, this.y - 3, 20, 2, "#57c90e");
        fill(this.x + 1, this.y - 12, 8, 8, "#57c90e");
        fill(this.x + 2, this.y - 10, 2, 2, "#e0082c");
        fill(this.x + 7, this.y - 10, 2, 2, "#e0082c");
    }

    this.update = () => {
        this.x += ~~(Math.random() * 20) - 10;
        this.y += ~~(Math.random() * 20) - 10;
    }
}