const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

class Sprite {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.lastKey;
    }

    draw() {
        context.fillStyle = "red";
        context.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update() {
        this.draw();

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height>= canvas.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
        
    }
}

const player = new Sprite({
    position: {
        x: 300,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    }
});

const enemy = new Sprite({
    position: {
        x: 700,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 0,
    }
});

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },  
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }, 
}

function animate() {
    window.requestAnimationFrame(animate);
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);    
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;
    
    // Player Movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5;
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
    }
    
    // Enemy Movement
    if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = -5;
    } else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = 5;
    }
}

animate();

window.addEventListener('keydown', (event) => {
    console.log(event.key);
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'w':
            player.velocity.y = -20;
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp':
            enemy.velocity.y = -20;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    // Player keys
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }
    
    // Enemy keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
});