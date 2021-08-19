const c = document.getElementById("game");
const cc = c.getContext("2d");
const widthBound = c.width;
const heightBound = c.height;

function fill(x, y, w, h, c) {
    cc.fillStyle = c;
    cc.fillRect(x, y, w, h);
}

const rayCastLine = (playerX, playerY, clickX, clickY) => {
    let xDiff = clickX - playerX;
    let yDiff = clickY - playerY;
    let slope = yDiff / xDiff;
    // console.log(slope);
    return {
        xRise: trimNumber(xDiff),
        yRise: trimNumber(yDiff)
    }
}
// not enough to slow the bullet down properly based off rayCast line fn call
function trimNumber(number) {
    let str = number.toString();
    let len = str.length;
    if(len > 2) return parseFloat(str.substring(0, len - 1));
    return number;
}

function evalDis(zX, zY, pX, pY){
    let a = Math.abs(zY - pY);
    let b = Math.abs(zX - pX);
    return parseFloat((Math.sqrt((a**2) + (b**2))).toFixed(2));
}

function getRandomZombieSpawnLocationOOB(){
    let xPosRight = ~~(Math.random() * 50) + widthBound;
    let yPosBottom = ~~(Math.random() * 50) + heightBound;

    let xPosLeft = ~~(Math.random() * 50) * - 1;
    let yPosTop = ~~(Math.random() * 50) * - 1;

    let random = Math.random();

    if(random < .25) {
        return {
            xSpawn: xPosLeft,
            ySpawn: yPosTop
        }
    } else if(random < .5) {
        return {
            xSpawn: xPosRight,
            ySpawn: yPosBottom
        }
    } else if (random < .75) {
        return {
            xSpawn: xPosRight,
            ySpawn: yPosTop
        }
    }
    return {
        xSpawn: xPosLeft,
        ySpawn: yPosBottom
    }
}

function removeBullet(bulletArr, bulletID) {
    for(let i = bulletArr.length - 1; i >= 0; i--) {
        if(bulletArr[i].id === bulletID) bulletArr.splice(i, 1);
    }
    return bulletArr;
}

// probably not necessary but the bullet thing was really annoying
function genRanId() {
    let output = "";
    const options = "abcdefghijklmnopqrstuvwxyz".split("");
    for(let i = 0; i < 10; i++) {
        let ran = Math.random() * 10;
        let ranIdx = ~~(Math.random() * options.length);
        output += options[ranIdx] + ran.toFixed(3);
    }
    return output;
}
