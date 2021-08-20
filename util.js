const c = document.getElementById("game");
const cc = c.getContext("2d");
const widthBound = c.width;
const heightBound = c.height;

const levelText = Array.from(document.getElementsByClassName("currLvl"));
const yourHealthText = document.getElementById("yourHealth");
const yourWallet = document.getElementById("currWallet");
const upgradeHP = document.getElementById("upgradeHealth");
const upgradeDmg = document.getElementById("upgradeDamage");
const healthUpgradeCost = document.getElementById("healthCost");
const damageUpgradeCost = document.getElementById("damageCost");


function fill(x, y, w, h, c) {
    cc.fillStyle = c;
    cc.fillRect(x, y, w, h);
}

const rayCastLine = (playerX, playerY, clickX, clickY) => {
    let xDiff = clickX - playerX;
    let yDiff = clickY - playerY;
    let slope1 = yDiff / xDiff;
    let slope2 = xDiff / yDiff;
    // console.log(slope);
    return {
        xRise: trimNumber(xDiff),
        // xRise: slope2,
        // yRise: slope1
        yRise: trimNumber(yDiff)
    }
}
// not enough to slow the bullet down properly based off rayCast line fn call
// the line is off and speed is crazy variant right now too...
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

function removeObj(objArr, bulletID) {
    for(let i = objArr.length - 1; i >= 0; i--) {
        if(objArr[i].id === bulletID) objArr.splice(i, 1);
    }
    return objArr;
}

// probably not necessary but the bullet thing was really annoying
function genRanId() {
    let output = "";
    const options = "a_-+=)(*098bcdASDefg!@#123hijREWkl$%^456mnoQAZ7&pqr,.<>sCVBtu;:vw[xy]{}z|".split("");
    for(let i = 0; i < 10; i++) {
        let ran = Math.random();
        let ranIdx = ~~(Math.random() * options.length);
        output += options[ranIdx] + ran.toFixed(3);
    }
    return output;
}

// this....
function keepValue(objOne, objTwo) {
    if(objOne.value === 0 || objTwo.value === 0) return 3;
    let x, y;
    // if(objOne.data === "x") {
        x = objOne.value;
        y = objTwo.value;
    // } else {
    //     y = objOne.value;
    //     x = objTwo.value;
    // }
    if(x > 0 && y < 0) return (x / y) * -1;
    if(x < 0 && y > 0) return (x / y) * -1;
    return x / y;
}

// zombie y pos is the body not the head..
function contact(hitX, hitY, hitBoxHeight, hitBoxWidth, objX, objY, objHeight, objWidth) {
    // player will be hitX / Y
    let isBelow = objY < hitY + hitBoxHeight;
    let isAbove = hitY < objY + objHeight;
    let isToLeft = hitX + hitBoxWidth < objX;
    let isToRight = hitX > objX + objWidth;
    let inMiddleOf = !isToLeft && !isToRight;
    return isBelow && isAbove && inMiddleOf;
}
