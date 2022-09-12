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

const ANIMATION_DURATION = 50;
const DELAY_BETWEEN_PHRASES_IN_MILLISECONDS = 5000;

const quotes = [
    'I have no special talent. I am only passionately curious. Albert Einstein',

    'Wisely, and slow. They stumble that run fast. William Shakespeare',

    'If you judge people, you have no time to love them. Mother Teresa',

    'Whenever you find yourself on the side of the majority, it is time to pause and reflect. Mark Twain',

    'All that we are is the result of what we have thought. Buddha',

    'The most courageous act is still to think for yourself. Aloud. Coco Chanel',

    'Stay hungry, stay foolish. Steve Jobs',

    'The greatest wealth is to live content with little. Plato',

    'The future belongs to those who prepare for it today. Malcolm X',

    'The successful warrior is the average man, with laser-like focus. Bruce Lee',

    'A great man is always willing to be little. Ralph Waldo Emerson',
]