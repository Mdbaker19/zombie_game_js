const c = document.getElementById("game");
const cc = c.getContext("2d");
const widthBound = c.width;
const heightBound = c.height;

const rayCastLine = (playerX, playerY, clickX, clickY) => {
    let xDiff = clickX - playerX;
    let yDiff = clickY - playerY;
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