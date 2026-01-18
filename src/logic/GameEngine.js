import { MathSystem } from './MathSystem.js';
import { EntityManager } from './EntityManager.js';
import { Collision } from './Collision.js';
import { SoundManager } from './SoundManager.js';

export class GameEngine {
    constructor(canvas, callbacks) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.callbacks = callbacks;

        this.mathSystem = new MathSystem();
        this.entityManager = new EntityManager();

        this.width = canvas.width;
        this.height = canvas.height;

        this.state = 'idle';
        this.lastTime = 0;
        this.spawnTimer = 0;
        this.spawnInterval = 2500;

        this.score = 0;
        this.lives = 3;
        this.level = 1;

        this.loop = this.loop.bind(this);
    }

    init() {
        this.entityManager.reset();
    }

    resize(w, h) {
        this.width = w;
        this.height = h;
        this.canvas.width = w;
        this.canvas.height = h;
        if (this.entityManager.player) {
            this.entityManager.player.x = w / 2;
            this.entityManager.player.y = h - 80;
        }
    }

    start() {
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.spawnInterval = 2500;
        this.entityManager.reset();

        // Set player init pos
        this.entityManager.player.x = this.width / 2;
        this.entityManager.player.y = this.height - 80;

        this.state = 'playing';

        this.callbacks.onScore(this.score);
        this.callbacks.onLives(this.lives);
        this.callbacks.onOptions([]);

        this.lastTime = performance.now();
        requestAnimationFrame(this.loop);
    }

    stop() {
        this.state = 'idle';
    }

    handleAnswer(value) {
        if (this.state !== 'playing') return;

        const closestMonster = this.getClosestMonster();
        if (!closestMonster) return;

        if (closestMonster.answer === value) {
            SoundManager.shoot();
            this.entityManager.addBullet(
                this.entityManager.player.x,
                this.entityManager.player.y,
                closestMonster.x,
                closestMonster.y
            );
        } else {
            SoundManager.wrong();
            this.callbacks.onWrongAnswer && this.callbacks.onWrongAnswer();
        }
    }

    getClosestMonster() {
        let lowest = null;
        let maxY = -Infinity;
        for (let m of this.entityManager.monsters) {
            if (m.y > maxY && m.alive) {
                maxY = m.y;
                lowest = m;
            }
        }
        return lowest;
    }

    loop(timestamp) {
        if (this.state !== 'playing') return;
        const dt = timestamp - this.lastTime;
        const safeDt = Math.min(dt, 50);
        this.lastTime = timestamp;

        this.update(safeDt);
        this.draw();

        requestAnimationFrame(this.loop);
    }

    update(dt) {
        // 1. Level Management
        if (this.score > this.level * 100) {
            this.level++;
            this.spawnInterval = Math.max(1000, 2500 - (this.level * 150));
        }

        // 2. Spawning
        this.spawnTimer += dt;
        if (this.spawnTimer > this.spawnInterval) {
            this.spawnMonster();
            this.spawnTimer = 0;
        }

        // 3. Update Entities 
        const speedFactor = dt / 16.66;

        const result = this.entityManager.update(speedFactor, this.width, this.height);

        if (result === 'monster_escaped') {
            SoundManager.wrong();
            this.lives--;
            this.callbacks.onLives(this.lives);
            this.callbacks.onWrongAnswer();
            if (this.lives <= 0) this.gameOver();

            this.updateOptions();
        }

        // 4. Collision
        this.checkCollisions();

        // 5. Update UI Options
        this.updateOptions();
    }

    spawnMonster() {
        const problem = this.mathSystem.generateProblem();
        const margin = 50;
        const x = Math.random() * (this.width - margin * 2) + margin;

        this.entityManager.addMonster({
            x: x,
            y: -50,
            speed: (1.5 + (this.level * 0.3)), // Adjusted speed
            equation: problem.equation,
            answer: problem.answer,
            color: this.getRandomColor(),
            options: problem.options
        });
    }

    getRandomColor() {
        const colors = ['#FF00FF', '#FF3366', '#FF6600', '#CC00FF'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    updateOptions() {
        const closest = this.getClosestMonster();
        if (closest) {
            this.callbacks.onOptions(closest.options);
        } else {
            this.callbacks.onOptions([]);
        }
    }

    checkCollisions() {
        for (let b of this.entityManager.bullets) {
            for (let m of this.entityManager.monsters) {
                if (b.alive && m.alive && Collision.checkCircle(b, m)) {
                    b.alive = false;
                    m.alive = false;
                    SoundManager.explosion();
                    this.entityManager.createExplosion(m.x, m.y, m.color);
                    this.score += 10;
                    this.callbacks.onScore(this.score);
                }
            }
        }
    }

    gameOver() {
        this.state = 'gameover';
        this.callbacks.onGameOver(this.score);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Draw Player
        const p = this.entityManager.player;
        this.ctx.fillStyle = '#00F3FF';
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = '#00F3FF';

        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y - 40);
        this.ctx.lineTo(p.x - 25, p.y + 20);
        this.ctx.lineTo(p.x + 25, p.y + 20);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.shadowBlur = 0;

        // Draw Monsters
        this.ctx.font = 'bold 24px "Arial Rounded MT Bold", sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        for (let m of this.entityManager.monsters) {
            if (!m.alive) continue;

            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = m.color;

            this.ctx.fillStyle = m.color;
            this.ctx.beginPath();
            this.ctx.arc(m.x, m.y, m.radius * m.scale, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.shadowBlur = 0;

            this.ctx.fillStyle = '#FFFFFF';
            if (m.scale > 0.8) {
                this.ctx.fillText(m.equation, m.x, m.y);
            }
        }

        // Draw Bullets
        this.ctx.fillStyle = '#FFFF00';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#FFFF00';
        for (let b of this.entityManager.bullets) {
            this.ctx.beginPath();
            this.ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.shadowBlur = 0;

        // Draw Particles
        for (let pt of this.entityManager.particles) {
            this.ctx.globalAlpha = pt.life;
            this.ctx.fillStyle = pt.color;
            this.ctx.beginPath();
            this.ctx.arc(pt.x, pt.y, Math.random() * 3 + 1, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.globalAlpha = 1.0;
        }
    }
}
