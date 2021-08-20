(() => {

    const player = new Player(widthBound / 2, heightBound / 2, 50);
    let level = 1;
    let zombiesArr = [];
    let dir;

    setInterval(load, 20);
    setInterval(updateZombieBrains, 75);
    setInterval(turretOperations, 500);
    setUp();

    window.addEventListener("keydown", (e) => {
        dir = e.key.replace("Arrow", "");
        if(e.key === "b") {
            player.build();
        }
    });

    c.addEventListener("click", (e) => {
        let bulletPathObj = rayCastLine(player.x, player.y, e.x, e.y);
        console.log(bulletPathObj);
        player.shoot(bulletPathObj);
    });

    function initializeZombies(currLvl) {
        let count = 5 * currLvl;
        for (let i = 0; i < count; i++) {
            const {xSpawn, ySpawn} = getRandomZombieSpawnLocationOOB();
            zombiesArr.push(new Zombie(xSpawn, ySpawn, level * 3));
        }
    }

    function shooting(){
        player.bullets.forEach(bullet => {
            bullet.show();
            bullet.update();
        });
    }

    function updateZombiePos() {
        zombiesArr.forEach(zombie => {
            zombie.show();
            zombie.update();
        });
    }

    // diff function as it is called at a different frame rate
    function updateZombieBrains() {
        zombiesArr.forEach(zombie => {
            learn(zombie, player)
        });
    }

    function evalContact(player){
        zombiesArr.forEach(zombie => {
            if(contact(player.x, player.y, player.size * 2.25, player.size, zombie.x, zombie.y - zombie.size - 2, zombie.size * 2, zombie.size)){
                player.health--;
            }
        });
    }

    function showTurrets() {
        player.helpers.forEach(helper => {
            helper.show();
        });
    }

    // diff func as it is called different rate
    function turretOperations() {
        player.helpers.forEach(helper => {
            helper.operate();
        });
    }

    // let testZ = new Zombie(50, 50);
    // zombiesArr.push(testZ);
    function load(){
        draw();
        // testZ.show();
    }
    function draw(){
        fill(0, 0, widthBound, heightBound, "#000");
        gameFunctions();
    }

    function gameFunctions(){
        player.show();
        player.move(dir);
        shooting();
        updateZombiePos();
        evalContact(player);
        showTurrets();
        textUpdates();
    }

    function textUpdates(){
        yourHealthText.innerText = player.health.toString();
    }

    function setUp(){
        levelText.forEach(ele => ele.innerText = level.toString());
        initializeZombies(level);
    }

    function nextLvl(){
        // all zombies killed => update level
        // if zombiesArr.length === 0 level++
        // re init zombies arr
    }

})();