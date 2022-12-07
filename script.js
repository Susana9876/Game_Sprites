const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width = 600;
const canvasHeight = canvas.height = 600;
const animationDescription = document.getElementById('description');

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;

let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animations = [
    {
        name: 'idle',
        frames: 7,
        key: 'Digit2',
        description: 'Idle'
    },
    {
        name: 'jump',
        frames: 7,
        key: 'Digit3',
        description: 'Jump'
    },
    {
        name: 'fall',
        frames: 7,
        key: 'Digit4',
        description: 'Fall'
    },
    {
        name: 'run',
        frames: 9,
        key: 'Digit1',
        description: 'Run'
    },
    {
        name: 'dizzy',
        frames: 11,
        key: 'Digit5',
        description: 'Dizzy'
    },
    {
        name: 'sit',
        frames: 5,
        key: 'Digit6',
        description: 'Sit'
    },
    {
        name: 'roll',
        frames: 7,
        key: 'Digit7',
        description: 'Roll'
    },
    {
        name: 'bite',
        frames: 7,
        key: 'Digit8',
        description: 'Bite'
    },
    {
        name: 'ko',
        frames: 12,
        key: 'Digit9',
        description: 'KO'
    },
    {
        name: 'getHit',
        frames: 4,
        key: 'Digit0',
        description: 'Getting hit'
    },
];

animations.forEach((state, index) => {
    let frames = {
        loc: [],
    }

    for (let i = 0; i < state.frames; i++){
        let positionX = i * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }

    spriteAnimations[state.name] = frames;
});

function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[selectedAnimation].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[selectedAnimation].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    
    gameFrame++;
    requestAnimationFrame(animate);
}

const defaultAnimation = animations[3].name;
const defaultAnimationDescription = animations[3].description

let selectedAnimation = defaultAnimation;
animationDescription.innerText = defaultAnimationDescription;

document.addEventListener('keypress', (event) => {
    let keyPressed = event.code;

    function checkAnimation () {
        animations.forEach((animation) => {
            if (animation.key === keyPressed) {
                selectedAnimation = animation.name;
                animationDescription.innerText = animation.description
            }
        })
    }

    return checkAnimation();
});


animate();