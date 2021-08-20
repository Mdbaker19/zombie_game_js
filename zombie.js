function Zombie(x, y, value = 3) {
    this.x = x;
    this.y = y;
    this.value = 0; // for now, will be some multiple based off curr level
    this.speed = 3;
    this.range1 = 100;
    this.range2 = 100;
    this.range3 = 100;
    this.range4 = 100;
    this.size = 12;
    this.reEval = false;

    this.show = () => {
        fill(this.x, this.y, this.size, this.size, "#57c90e");
        fill(this.x + 1, this.y - this.size - this.size / 5, this.size - 2, this.size - 2, "#57c90e");
        fill(this.x + this.size / 5, this.y - this.size, this.size / 5, this.size / 5, "#e0082c");
        fill(this.x + 7, this.y - this.size, this.size / 5, this.size / 5, "#e0082c");
    }

    this.update = () => {
        // this.x += ~~(Math.random() * 20) - 10;
        // this.y += ~~(Math.random() * 20) - 10;
        let randomNum = Math.floor(Math.random() * 600) + 1;
        // console.log([this.range1, this.range2, this.range3, this.range4]);
        if(randomNum < this.range1){
            this.x += this.speed;
        }
        if(randomNum < this.range2){
            this.x -= this.speed;
        }

        if(randomNum < this.range3){
            this.y -= this.speed;
        }
        if(randomNum < this.range4){
            this.y += this.speed;
        }
    }
}

function learn(zombie, player) {
    let currDist = evalDis(zombie.x, zombie.y, player.x, player.y);
    if(currDist < 33 && !zombie.reEval) adjustZombieRanges(zombie);
    if(currDist > 100 && currDist < 600 && zombie.reEval) zombie.reEval = false;
    if(currDist > 600 && !zombie.reEval) adjustZombieRanges(zombie);
    const [two, one] = updateDistances(zombie.x, player.x, zombie.range2, zombie.range1);
    const [three, four] = updateDistances(zombie.y, player.y, zombie.range3, zombie.range4);
    zombie.range2 = two;
    zombie.range1 = one;
    zombie.range3 = three;
    zombie.range4 = four;
}

// if zombie is too far away for a second time (not initial spawn) re Eval plan
// if zombie closes in, slow down and re Eval to close the distance
function adjustZombieRanges(zombie) {
    let ranges = [zombie.range1, zombie.range2, zombie.range3, zombie.range4];
    // function to make the 2 max values = 100 and the 2 min values = 33;
    // assign them to their respective ranges
    zombie.range1 = 100;
    zombie.range2 = 100;
    zombie.range3 = 100;
    zombie.range4 = 100;
    zombie.reEval = true;
}

function updateDistances(zPos, pPos, range1, range2) {
    if (zPos < pPos) {
        if (range2 < 595) {
            range2 += 5;
        }
        if (range1 > 5) {
            range1 -= 3;
        }
    } else if (zPos > pPos) {
        if (range1 < 595) {
            range1 += 5;
        }
        if (range2 > 5) {
            range2 -= 3;
        }
    }
    return [range1, range2];
}