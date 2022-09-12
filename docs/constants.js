const scaleUp = [
    // { transform: 'scale(0)' },
    { transform: 'scale(1)' },
];
const scaleDown = [
    // { transform: 'scale(1)' },
    { transform: 'scale(0)' },
];
const slideRight = [
    // { transform: 'translateX(0)' },
    { transform: 'translateX(100%)' },
];
const slideLeft = [
    // { transform: 'translateX(0)' },
    { transform: 'translateX(-100%)' },
];
const spin = [
    // { transform: 'rotate(0)' },
    { transform: 'rotate(360deg)' },
];
const normal = [
    { transform: 'translateX(0)' },
]

const characterStyle = {
    display: 'inline-block',
};

const ANIMATION_DURATION = 100;
const DELAY_BETWEEN_PHRASES_IN_MILLISECONDS = 5000;

const quotes = [
    'I have no special talent. I am only passionately curious. Albert Einstein',

    'Wisely, and slow. They stumble that run fast. William Shakespeare',

    'If you judge people, you have no time to love them. Mother Teresa',
]