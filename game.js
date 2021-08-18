(() => {
    setInterval(load, 30);
    let dir;
    let zombiesArr = [];
    window.addEventListener("keydown", (e) => {
        dir = e.key.replace("Arrow", "");
    });

    c.addEventListener("click", (e) => {
        let bulletPathObj = rayCastLine(p.x, p.y, e.x, e.y);
        console.log(bulletPathObj);
        p.shoot(fill, bulletPathObj);
    });

    const p = new Player(widthBound / 2, heightBound / 2, 5);
    let level = 1;
    const levelText = document.getElementById("currLvl");
    setUp();

    function initializeZombies () {
        for (let i = 0; i < 10; i++) {
            const {xSpawn, ySpawn} = getRandomZombieSpawnLocationOOB();
            zombiesArr.push(new Zombie(xSpawn, ySpawn));
        }
    }

    function shooting(){
        p.bullets.forEach(bullet => {
            bullet.show();
            bullet.update();
        });
    }

    function updateZombiePos() {
        zombiesArr.forEach(zombie => {
            zombie.show(fill);
            zombie.update();
        })
    }

    // let z = new Zombie(50, 50);
    function load(){
        draw();
        // z.show(fill);
    }
    function draw(){
        fill(0, 0, widthBound, heightBound, "#000");
        p.show(fill);
        p.move(dir);
        shooting();
        updateZombiePos();
    }
    function fill(x, y, w, h, c) {
        cc.fillStyle = c;
        cc.fillRect(x, y, w, h);
    }
    function setUp(){
        levelText.innerText = level.toString();
        initializeZombies();
    }

})();