function generateEditRecordAnimations(editRecord) {
    switch (editRecord.type) {
        case 'delete':
            return generateDeleteEditRecordAnimations(editRecord);
        case 'add':
            return generateAddEditRecordAnimations(editRecord);
        case 'replace':
            return generateReplaceEditRecordAnimations(editRecord);
        case 'match':
            return generateMatchEditRecordAnimations(editRecord);
        default:
            throw new Error(`Unknown edit record type: ${editRecord.type}`);
    }
}

function generateDeleteEditRecordAnimations(editRecord) {
    const characterIndex = editRecord.str1.index;

    return [
        {
            animation: scaleDown,
            animationOptions: {
                duration: ANIMATION_DURATION,
            },
            filterFunc: (_elem, index) => {
                return characterIndex === index;
            },
            postFunc: postDeleteEditRecordAnimation(editRecord),
        },
    ];
}

function generateAddEditRecordAnimations(editRecord) {
    const characterIndex = editRecord.str1.index;

    return [
        {
            animation: slideRight,
            animationOptions: {
                duration: ANIMATION_DURATION,
                fill: 'forwards',
            },
            filterFunc: (_elem, index) => {
                return index > characterIndex;
            },
            postFunc: postAddEditRecordAnimation(editRecord),
        },
    ];
}

function generateReplaceEditRecordAnimations(editRecord) {
    const characterIndex = editRecord.str1.index;

    return [
        {
            animation: scaleDown,
            animationOptions: {
                duration: ANIMATION_DURATION,
                fill: 'forwards',
            },
            filterFunc: (_elem, index) => {
                return index === characterIndex;
            },
            postFunc: postReplaceEditRecordAnimation(editRecord),
        },
    ];
}

function generateMatchEditRecordAnimations(editRecord) {
    const characterIndex = editRecord.str1.index;

    return [
        {
            animation: spin,
            animationOptions: {
                duration: ANIMATION_DURATION,
                fill: 'forwards',
            },
            filterFunc: (_elem, index) => {
                return index === characterIndex;
            },
        },
    ];
}

function postReplaceEditRecordAnimation(editRecord) {
    const characterIndex = editRecord.str1.index;
    const character = editRecord.str2.value;

    return (containerElem, newTextSetter) => {
        newTextSetter(currentText => currentText.slice(0, characterIndex).concat(character).concat(currentText.slice(characterIndex + 1)))
    };
}

function postDeleteEditRecordAnimation(editRecord) {
    const characterIndex = editRecord.str1.index;

    return (containerElem, newTextSetter) => {
        newTextSetter(currentText => currentText.slice(0, characterIndex).concat(currentText.slice(characterIndex + 1)));
    };
}

function postAddEditRecordAnimation(editRecord) {
    const characterIndex = editRecord.str1.index + 1;
    const character = editRecord.str2.value;

    return (containerElem, newTextSetter) => {
        newTextSetter(currentText => currentText.slice(0, characterIndex).concat(character).concat(currentText.slice(characterIndex)))
    };
}