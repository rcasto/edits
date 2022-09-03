function domFromText(str) {
    const domTextContainer = document.createElement('span');
    for (let i = 0; i < str.length; i++) {
        const characterTextElem = document.createTextNode(str[i]);
        const characterContainerElem = document.createElement('span');
        characterContainerElem.appendChild(characterTextElem);
        domTextContainer.appendChild(characterContainerElem);
    }
    return domTextContainer;
}

function timeoutPromise(delayInMs = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, delayInMs);
    });
}

function waitForTransitionEnd(domElem, numTransitions = 1) {
    return new Promise((resolve) => {
        domElem.addEventListener('transitionend', function onTransitionEnd(evt) {
            numTransitions--;
            if (numTransitions <= 0) {
                domElem.removeEventListener('transitionend', onTransitionEnd);
                return resolve();
            }
        });
    });
}

function animateTextTransform(textStart, textEnd) {
    const textDom = domFromText(textStart);
    const textCharacterElems = textDom.getElementsByTagName('span');
    const { records } = Edits.editDistance(textStart, textEnd, {
        returnEditRecords: true,
    });
    const numRecords = records.length;
    let recordIndex = 0;
    let characterOffset = 0;
    let isProcessingRecord = false;

    textDom.style.display = 'flex';
    textDom.style.alignSelf = 'center';

    async function animate() {
        if (recordIndex < numRecords) {
            window.requestAnimationFrame(animate);
        } else {
            return;
        }

        if (isProcessingRecord) {
            return;
        } else {
            isProcessingRecord = true;
        }
        
        const {
            type: recordType,
            str1: str1Details,
            str2: str2Details,
        } = records[recordIndex];

        const str1CharacterElem = textCharacterElems.item(characterOffset + str1Details.index);

        console.log(`Animating ${recordType}`, str1Details, str2Details);

        switch (recordType) {
            case 'add':
                const newTextCharacterElem = document.createElement('span');
                const newTextCharacterTextNode = document.createTextNode(str2Details.value);

                newTextCharacterElem.appendChild(newTextCharacterTextNode);
                newTextCharacterElem.classList.add('not-visible');

                textDom.insertBefore(newTextCharacterElem, str1CharacterElem.nextElementSibling);
                await timeoutPromise()
                    .then(() => {
                        newTextCharacterElem.classList.add('fade-in');
                        return waitForTransitionEnd(newTextCharacterElem);
                    });

                characterOffset++;
                break;
            case 'delete':
                str1CharacterElem.classList.add('fade-out');
                await waitForTransitionEnd(str1CharacterElem);

                str1CharacterElem.remove();

                characterOffset--;
                break;
            case 'match':
                str1CharacterElem.classList.add('match');
                await waitForTransitionEnd(str1CharacterElem);
                break;
            case 'replace':
                str1CharacterElem.classList.add('fade-out');
                await waitForTransitionEnd(str1CharacterElem);

                console.log('replace', str1CharacterElem.textContent, str2Details.value);
                str1CharacterElem.textContent = str2Details.value;
                
                str1CharacterElem.classList.remove('fade-out');
                str1CharacterElem.classList.add('fade-in');

                await waitForTransitionEnd(str1CharacterElem);
                break;
        }

        recordIndex++;
        isProcessingRecord = false;
    }

    return {
        elem: textDom,
        startAnimation: () => window.requestAnimationFrame(animate),
    };
}

const {
    elem: test2,
    startAnimation: test2Func
} = animateTextTransform('hello', 'world');
document.body.appendChild(test2);
test2Func();