(() => {
    setInterval(load, 30);
    setInterval(updateZombieBrains, 75);
    let dir;
    let zombiesArr = [];
    window.addEventListener("keydown", (e) => {
        dir = e.key.replace("Arrow", "");
    });

    c.addEventListener("click", (e) => {
        let bulletPathObj = rayCastLine(player.x, player.y, e.x, e.y);
        console.log(bulletPathObj);
        player.shoot(bulletPathObj);
    });

    const player = new Player(widthBound / 2, heightBound / 2, 5);
    let level = 1;
    const levelText = document.getElementById("currLvl");
    setUp();

    function initializeZombies () {
        for (let i = 0; i < 5; i++) {
            const {xSpawn, ySpawn} = getRandomZombieSpawnLocationOOB();
            zombiesArr.push(new Zombie(xSpawn, ySpawn));
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
        })
    }

    function updateZombieBrains() {
        zombiesArr.forEach(zombie => {
            learn(zombie, player)
        })
    }

    // let z = new Zombie(50, 50);
    function load(){
        draw();
        // z.show(fill);
    }
    function draw(){
        fill(0, 0, widthBound, heightBound, "#000");
        player.show();
        player.move(dir);
        shooting();
        updateZombiePos();
    }

    function setUp(){
        levelText.innerText = level.toString();
        initializeZombies();
    }

})();