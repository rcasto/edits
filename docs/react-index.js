function AnimateSubset({
    animation,
    animationOptions,
    animationFilter,
    children,
    onAnimationFinished,
}) {
    const containerRef = React.useRef(null)

    React.useEffect(() => {
        if (!containerRef || !containerRef.current) {
            return;
        }
        if (!animation) {
            return;
        }
        if (!Array.isArray(children)) {
            return;
        }

        const handleOnAnimationFinish = () => {
            onAnimationFinished && onAnimationFinished(containerRef.current)
        }

        const containerElems = Array.prototype.slice.call(containerRef.current.children)
        const sharedTimeline = new DocumentTimeline()

        const filteredContainerElems = containerElems.filter((containerElem, containerElemIndex) => {
            return (animationFilter || function() { true })(containerElem, containerElemIndex);
        })

        const filteredContainerElemAnimations = filteredContainerElems
            .map(filteredContainerElem => {
                const filteredContainerElemAnimationEffect = new KeyframeEffect(filteredContainerElem, animation, animationOptions || {});
                const filteredContainerElemAnimation = new Animation(filteredContainerElemAnimationEffect, sharedTimeline);
                return filteredContainerElemAnimation;
            });

        if (filteredContainerElemAnimations.length) {
            filteredContainerElemAnimations[0].addEventListener('finish', handleOnAnimationFinish);

            filteredContainerElemAnimations.forEach(filteredContainerElemAnimation => filteredContainerElemAnimation.play())
        }

        return () => {
            if (filteredContainerElemAnimations.length) {
                filteredContainerElemAnimations[0].removeEventListener('finish', handleOnAnimationFinish);
            }
        }
    }, [children, animation, animationOptions, animationFilter, onAnimationFinished])

    return (
        <div ref={containerRef}>
            {children}
        </div>
    )
}

function EditText({
    startText,
    endText,
}) {
    const [currentText, setCurrentText] = React.useState(startText);
    const [currentAnimation, setCurrentAnimation] = React.useState(null);
    const [animationQueue, setAnimationQueue] = React.useState([]);
    const editRecords = React.useMemo(() => Edits.editDistance(startText, endText, {
        returnEditRecords: true,
    }), [startText, endText])

    const handleAnimationFinished = React.useCallback((containerElem) => {        
        const nextAnimation = animationQueue
            .filter(animation => animation !== currentAnimation)[0] || null

        if (currentAnimation.postFunc) {
            // null/clear out animation so it doesn't trigger again
            // on post func action
            setCurrentAnimation(null);

            currentAnimation.postFunc(containerElem, setCurrentText);
        }

        setCurrentAnimation(nextAnimation)
        setAnimationQueue(currentAnimationQueue => currentAnimationQueue.filter(animation =>
            animation !== currentAnimation &&
            animation !== nextAnimation
        ))
    }, [animationQueue, currentAnimation]);

    // Make sure currentText state is synced up
    // with latest input startText
    // React.useEffect(() => {
    //     setCurrentText(null);
    //     setCurrentText(startText)
    // }, [startText])

    React.useEffect(() => {
        const animationRecords = (editRecords.records || [])
            .reduce((currAnimationRecords, editRecord) => {
                return currAnimationRecords.concat(generateEditRecordAnimations(editRecord));
            }, []);

        console.log(editRecords, animationRecords, currentText, startText, endText);

        setAnimationQueue(animationRecords);
        setCurrentAnimation(animationRecords[0]);
    }, [editRecords]);

    return (
        <div>
            <AnimateSubset
                animation={currentAnimation && currentAnimation.animation}
                animationOptions={currentAnimation && currentAnimation.animationOptions}
                animationFilter={currentAnimation && currentAnimation.filterFunc}
                onAnimationFinished={handleAnimationFinished}>
                {(currentText || '').split('').map(createCharacterElem)}
            </AnimateSubset>
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

    const handleChangeStartWord = React.useCallback((text) => {
        setStartWord(text)
    }, [])

    const handleChangeEndWord = React.useCallback((text) => {
        setEndWord(text)
    }, [])

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
                    onChange={handleChangeStartWord} />
                <InputWithLabel
                    label="End with"
                    placeholder="World"
                    value={endWord}
                    onChange={handleChangeEndWord} />
                <EditText
                    startText={'Hey there!'}
                    endText={'Hey! You!'} />
            </main>
        </React.Fragment>
    );
}

function init() {
    const editsDemoContainer = document.getElementById('edits-demo');
    ReactDOM.render(<App />, editsDemoContainer);
}

init();