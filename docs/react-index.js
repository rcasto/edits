const editsDemoContainer = document.getElementById('edits-demo');

/**'
 * Types of edit records:
 * - Add
 * - Delete
 * - Match
 * - Replace
 * 
 * Add = translateX?
 * Delete = translateX, opposite direction of add?
 * Match = scale, then descale, emphasize
 * Replace = Slide up out, slide back down, or opacity out, opacity in, both switching value
 */
const scaleUpDown = [
    {
        transform: 'scale(1)',
    },
    {
        transform: 'scale(2)',
    },
    {
        transform: 'scale(1)',
    },
];

function EditCharacter({
    character,
    animation,
    onAnimationFinished,
}) {
    const characterRef = React.useRef(null);

    React.useEffect(() => {
        if (!characterRef || !animation) {
            return;
        }

        const scaleUpDownAnimation = characterRef.current.animate(animation, {
            duration: 500,
        });

        scaleUpDownAnimation.onfinish = () => {
            onAnimationFinished();
        };

        // return () => {
        //     scaleUpDownAnimation.onfinish = null;
        // };
    }, [characterRef, animation]);
    return (
        <span style={{ display: 'inline-block' }} ref={characterRef}>{character}</span>
    );
}

function EditText({
    startText,
    endText,
}) {
    const [activeAnimationIndex, setActiveAnimationIndex] = React.useState(0);

    if (!startText || !endText) {
        return null;
    }

    console.log(Edits.editDistance(startText, endText, {
        returnEditRecords: true,
    }));

    function onAnimationFinished() {
        setActiveAnimationIndex(activeAnimationIndex + 1);
    }

    return (
        <div>
            {startText.split('').map((character, index) => (
                <EditCharacter
                    key={`${character}${index}`}
                    character={character}
                    animation={activeAnimationIndex === index ? scaleUpDown : null}
                    onAnimationFinished={onAnimationFinished} />
            ))}
        </div>
    );
}

function InputWithLabel({
    label,
    value,
    onChange,
    placeholder,
}) {
    return (
        <label>
            {label}
            <input
                type="text"
                value={value}
                placeholder={placeholder || ''}
                onChange={event => onChange(event.target.value)} />
        </label>
    );
}

function App() {
    const [startWord, setStartWord] = React.useState('');
    const [endWord, setEndWord] = React.useState('');

    return (
        <React.Fragment>
            <header>
                <h1>edits playground</h1>
            </header>
            <main>
                <InputWithLabel
                    label="Start with"
                    placeholder="Hello"
                    value={startWord}
                    onChange={text => setStartWord(text)} />
                <InputWithLabel
                    label="End with"
                    placeholder="World"
                    value={endWord}
                    onChange={text => setEndWord(text)} />
                <EditText
                    startText={startWord}
                    endText={endWord} />
            </main>
        </React.Fragment>
    );
}

ReactDOM.render(<App />, editsDemoContainer);