$(window).on('load',function () {
    const canvas = $('#canvas1')[0];
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;
    canvas.height = 500;

    class InputHandler {
        constructor(game) {
            this.game = game;
            $(window).on('keydown',e => {
                if (( (e.key === 'ArrowUp') ||
                    (e.key === 'ArrowDown')
                ) && this.game.keys.indexOf(e.key) === -1){
                    this.game.keys.push(e.key);
                } else if (e.key === ' ') {
                    this.game.player.shootTop();
                } else if (e.key === 'd') {
                    this.game.debug = !this.game.debug;
                }
            });
            $(window).on('keyup', e => {
                if(this.game.keys.indexOf(e.key) > -1) {
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
                }
            });
        }
    }
    
    class ProjectTile {
        constructor(game , x ,y) {
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = 10;
            this.height = 3;
            this.speed = 3;
            this.markForDelay = false;
            this.image = $('#projectile')[0];
        }
        update() {
            this.x += this.speed;
            if(this.x > this.game.width * 0.8) this.markForDelay = true;
        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y);
        }
    }

    class Player {
        constructor(game) {
            this.game = game;
            this.width = 120;
            this.height = 190;
            this.x = 20;
            this.y = 100;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 37;
            this.speedY = 0;
            this.maxSpeed = 3;
            this.projectiles = []
            this.image = $('#player')[0];
            this.powerUp = false;
            this.powerUpTimer = 0;
            this.powerUpLimit = 10000;
        }
        update(deltaTime) {
            if(this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
            else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
            else this.speedY = 0;
            this.y += this.speedY;
            /*** Vertical Boundaries ***/
            if (this.y > this.game.height - this.height * 0.5) this.y = this.game.height - this.height * 0.5;
            else if (this.y < -this.height * 0.5) this.y = -this.height * 0.5;
            /*** handle Projectiles ***/
            this.projectiles.forEach(projectile => {
                projectile.update();
            });
            this.projectiles = this.projectiles.filter(projectile => !projectile.markForDelay);
            /*** Sprite Animation ***/
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
            /*** Power Up ***/
            if (this.powerUp) {
                if (this.powerUpTimer > this.powerUpLimit) {
                    this.powerUpTimer = 0;
                    this.powerUp = false;
                    this.frameY = 0;
                } else {
                    this.powerUpTimer += deltaTime;
                    this.frameY = 1;
                    this.game.ammo += 0.1;
                }
            }
        }
        draw(context) {
            if (this.game.debug) context.strokeRect(this.x,this.y,this.width,this.height);
            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });
            context.drawImage(this.image,this.frameX * this.width,this.frameY * this.height,this.width,this.height,
            this.x,this.y,this.width,this.height);
        }
        shootTop() {
            if(this.game.ammo > 0) {
                this.projectiles.push(new ProjectTile(this.game, this.x + 80, this.y + 30));
                this.game.ammo--;
            }
            if (this.powerUp) this.shootButton();
        }
        enterPowerUp() {
            this.powerUpTimer = 0;
            this.powerUp = true;
            if (this.game.ammo < this.game.maxAmmo) this.game.ammo = this.game.maxAmmo;
        }
        shootButton() {
            if (this.game.ammo > 0) {
                this.projectiles.push(new ProjectTile(this.game, this.x + 80, this.y + 175));
            }
        }
    }
    
    class Enemy {
        constructor(game) {
            this.game = game;
            this.x = this.game.width;
            this.speedX = Math.random() * -1.5 - 0.5;
            this.markedForDelay = false;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 37;
        }
        update() {
            this.x += this.speedX - this.game.speed;
            if(this.x + this.width < 0) this.markedForDelay = true;
            /*** Sprite Animation ***/
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            }else this.frameX = 0;
        }
        draw(context) {
            if (this.game.debug) context.strokeRect(this.x,this.y,this.width,this.height);
            context.drawImage(this.image,this.frameX * this.width,this.frameY * this.height,
            this.width,this.height, this.x ,this.y, this.width, this.height);
            if (this.game.debug) {
                context.fontSize = '20px Helvatica';
                context.fillText(this.lives, this.x, this.y);
            }
        }
    }

    class Angler1 extends Enemy {
        constructor(game) {
            super(game);
            this.width = 228;
            this.height = 160;
            this.y = Math.random() * (this.game.height * 0.95 - this.height);
            this.image = $('#enemy1')[0];
            this.frameY = Math.floor(Math.random() * 3);
            this.lives = 5;
            this.score = this.lives;
        }
    }

    class Angler2 extends Enemy {
        constructor(game) {
            super(game);
            this.width = 213;
            this.height = 165;
            this.y = Math.random() * (this.game.height * 0.95 - this.height);
            this.image = $('#enemy2')[0];
            this.frameY = Math.floor(Math.random() * 2);
            this.lives = 6;
            this.score = this.lives;
        }
    }

    class Angler3 extends Enemy {
        constructor(game) {
            super(game);
            this.width = 99;
            this.height = 95;
            this.y = Math.random() * (this.game.height * 0.95 - this.height);
            this.image = $('#enemy3')[0];
            this.frameY = Math.floor(Math.random() * 2);
            this.lives = 5;
            this.score = 15;
            this.type = 'enemy3'
        }
    }

    class SuperEnemy extends Enemy {
        constructor(game) {
            super(game);
            this.width = 400;
            this.height = 227;
            this.y = Math.random() * (this.game.height * 0.95 - this.height);
            this.image = $('#superEnemy')[0];
            this.frameY = 0;
            this.lives = 20;
            this.score = this.lives;
            this.type = 'superEnemy';
            this.speedX = Math.random() * -1.2 - 0.2;
        }
    }

    class Enemy4 extends Enemy {
        constructor(game, x, y) {
            super(game);
            this.width = 115;
            this.height = 95;
            this.x = x;
            this.y = y;
            this.image = $('#enemy4')[0];
            this.frameY = Math.floor(Math.random() * 2);
            this.lives = 3;
            this.score = this.lives;
            this.type = 'enemy4';
            this.speedX = Math.random() * -4.2 - 0.5 ;
        }
    }
    
    class Layer {
        constructor(game, image, speedModifier) {
            this.game = game;
            this.image = image;
            this.speedModifier = speedModifier;
            this.width = 1768;
            this.height = 500;
            this.x = 0;
            this.y = 0;
        }
        update() {
            if (this.x <= -this.width) this.x = 0;
            this.x -= this.game.speed * this.speedModifier;
        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y);
            context.drawImage(this.image, this.x + this.width, this.y);
        }
    }
    
    class Background {
        constructor(game) {
            this.game = game;
            this.image1 = $('#layer1')[0];
            this.image2 = $('#layer2')[0];
            this.image3 = $('#layer3')[0];
            this.image4 = $('#layer4')[0];
            this.layer1 = new Layer(this.game, this.image1, 0.2);
            this.layer2 = new Layer(this.game, this.image2, 0.4);
            this.layer3 = new Layer(this.game, this.image3, 1);
            this.layer4 = new Layer(this.game, this.image4, 1.5);
            this.layers = [this.layer1, this.layer2, this.layer3];
        }
        update() {
            this.layers.forEach(layer => layer.update());
        }
        draw(context) {
            this.layers.forEach(layer => layer.draw(context));
        }
    }

    class Ui {
        constructor(game) {
            this.game = game;
            this.fontSize = 25;
            this.fontFamily = 'Bangers';
            this.color = 'white';
        }
        draw(context) {
            context.save();
            context.fillStyle = this.color;
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowColor = 'black';
            context.font = this.fontSize + 'px ' + this.fontFamily;
            /*** score ***/
            context.fillText('Score: '  +this.game.score, 20 , 40);
            /*** game timer ***/
            const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
            context.fillText('Timer: ' + formattedTime, 20, 100);
            /*** game over massage ***/
            if(this.game.gameOver) {
                context.textAlign = 'center';
                let massage1;
                let massage2;
                if(this.game.score > this.game.winningScore) {
                    massage1 = 'Brilliant You Win!';
                    massage2 = 'Well done!';
                    $('#btnReset').css("display", "inline-block");
                    $('#btnReset').click( function () {
                        location.reload();
                    });
                } else {
                    massage1 = 'ooh You Lose!';
                    massage2 = 'Try again next time!';
                     $('#btnReset').css("display", "inline-block");
                    $('#btnReset').click( function () {
                       location.reload();
                    });
                }
                context.font = '70px ' + this.fontFamily;
                context.fillText(massage1, this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = '25px ' + this.fontFamily;
                context.fillText(massage2, this.game.width * 0.5, this.game.height * 0.5 + 20);
            }
            /*** ammo ***/
            if (this.game.player.powerUp) context.fillStyle = '#ffffbd';
            for (let i = 0; i < this.game.ammo; i++) {
                context.fillRect(20 + 5 * i, 50, 3 , 20);
            }
            context.restore();
        }
    }

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.ui = new Ui(this);
            this.keys = [];
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyIntervel = 1000;
            this.ammo = 20;
            this.maxAmmo = 50;
            this.ammoTimer = 0;
            this.ammoInerval = 500;
            this.gameOver = false;
            this.score = 0;
            this.winningScore = 80;
            this.gameTime = 0;
            this.timeLimit = 30000;
            this.speed = 1;
            this.debug = false;
        }
        update(deltaTime) {
            if (!this.gameOver) this.gameTime += deltaTime;
            if (this.gameTime > this.timeLimit) this.gameOver = true;
            this.background.update();
            this.background.layer4.update();
            this.player.update(deltaTime);
            if(this.ammoTimer > this.ammoInerval) {
                if(this.ammo < this.maxAmmo) this.ammo++;
                this.ammoTimer = 0;
            } else {
                this.ammoTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update();
                if (this.checkCollision(this.player, enemy)) {
                    enemy.markForDelay = true;
                    if (enemy.type === 'enemy3') this.player.enterPowerUp();
                    else if (!this.gameOver) this.score--;
                }
                this.player.projectiles.forEach(projectTile => {
                    if (this.checkCollision(projectTile, enemy)){
                        enemy.lives--;
                        projectTile.markForDelay = true;
                        if(enemy.lives <= 0) {
                            enemy.markForDelay = true;
                            if (enemy.type === 'superEnemy'){
                                for (let i = 0; i < 5; i++) {
                                    this.enemies.push(new Enemy4(this, enemy.x + Math.random() * enemy.width,
                                    enemy.y + Math.random() * enemy.height * 0.5 ));
                                }
                            }
                            if (!this.gameOver) this.score += enemy.score;
                            if(this.score > this.winningScore) this.gameOver = true;
                        }
                    }
                });
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markForDelay);
            if (this.enemyTimer > this.enemyIntervel && !this.gameOver) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
        }
        draw(context) {
            this.background.draw(context);
            this.ui.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.background.layer4.draw(context);
        }
        addEnemy() {
            const randomize = Math.random();
            if (randomize < 0.5) this.enemies.push(new Angler1(this));
            else if (randomize < 0.6) this.enemies.push(new Angler2(this));
            else if (randomize < 0.7) this.enemies.push(new SuperEnemy(this));
            else this.enemies.push(new Angler3(this));
        }
        checkCollision(rect1, rect2) {
            return (
                rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.height + rect1.y > rect2.y
            )
        }
    }
    const game = new Game(canvas.width,canvas.height);
    let lastTime = 0;
    /** animation loop **/
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});