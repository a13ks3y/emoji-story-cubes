// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
}

const btnShare = document.getElementById('btn-share');

btnShare.addEventListener('click', shareHandler);
btnShare.addEventListener('touchend', shareHandler); // ???
function navigatorShareFallBack(emojiStr, emojiUrl, emojiText) {
    if (!navigator['share']) return;
    navigator.share({
        'title': `Here the story: ${emojiStr}`,
        'text': emojiText,
        'url': emojiUrl
    }).then(() => {
        console.log('Successful share!');
    }).catch(error => {
        console.error('Error sharing:', error)
    });
}

function shareHandler() {
    const emojiStr = $qubes.map($q => $q.textContent).join();
    const emojiUrl = `https://a13ks3y.github.io/estc#${emojiStr}`;
    const emojiText = document.getElementById('story-text').innerHTML;
    if (!window['plugins'] || !window['plugins']['socialsharing']) {
        return navigatorShareFallBack(emojiStr, emojiUrl, emojiText);
    }
    window.plugins.socialsharing.shareWithOptions(
        {
            message: 'Here the story: ' + emojiStr,
            subject: emojiText,
            url: emojiUrl,
            files: []
        },
        () => console.log('Shared!'),
        e => console.error(e)
    );
}

const $qubes = [
    1, 2, 3, 4, 5, 6, 7, 8, 9
].map(n => document.getElementById(`qube-${n}`));

const ROUNDS = 9;
const ALL_EMOJIS = generateAllEmojiCodes();
function generateRandomSet() {
    const emojis = generateAllEmojiCodes();
    const result = [];
    for(let i=1; i <= ROUNDS; i++) {
        result.push(emojis.splice(Math.floor(Math.random() * emojis.length), 1));
    }
    return result;
}


async function shuffle() {
    const changes = [];
    const randomSet = generateRandomSet();

    for (let i = 1; i <= ROUNDS; i++) {
        changes.push(new Promise(resolve => {
            setTimeout(() => {
                $qubes.forEach($qube => {
                    const code = ALL_EMOJIS[Math.floor(Math.random() * ALL_EMOJIS.length)];
                    $qube.innerHTML = `&#${code};`;
                });
                resolve();
            }, i * 666);
        }));
    }
    const text = requestStory(randomSet).then(result => {
        const storyTextEl = document.getElementById('story-text');
        storyTextEl.textContent = result;
    });
    Promise.all([...changes, text]).then(() => {
        $qubes.forEach(($q, i) => $q.innerHTML = `&#${randomSet[i]};`);
    });
}

function generateAllEmojiCodes() {
    const result = [];
    const emojiRange = [
        [0x261D, 0x261D],
        [0x270A, 0x270D],
        [0x1F300, 0x1F320],
        //[0x1F324, 0x1F32b], // weather
        [0x1F32d, 0x1F394],
        [0x1F3A0, 0x1F3BF],
        [0x1F3E1, 0x1F3F1],
        [0x1F400, 0x1F4FF],


        [0x1F506, 0x1F518],
        [0x1F525, 0x1f52F],
        [0x1F595, 0x1F596], // :)

        [0x1f600, 0x1F636],
        [0x1f636, 0x1F650],
        [0x1f680, 0x1F6BF],
        [0x1F910, 0x1F94C],
        [0x1F950, 0x1F9E6],
        // ???
        // [0x1F3D0, 0x1F3E0],

    ];

    for (let i = 0; i < emojiRange.length; i++) {
        const range = emojiRange[i];
        for (let x = range[0]; x < range[1]; x++) {
            result.push(x);
        }
    }
    return result;
}

const tapArea = document.getElementById('tap-area');
tapArea.addEventListener('click', shuffle);
tapArea.addEventListener('touchend', shuffle);
// @todo: check url, and if hash value is set, use it
shuffle();

// @todo: move to separate file?

async function requestStory(emojisStr) {
    const url = 'https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '800afd36a8mshaefcd630686ba6dp1cab7bjsnd0a31eab74be',
            'X-RapidAPI-Host': 'chatgpt-best-price.p.rapidapi.com'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: 'Tell a short story,  based on following emojis:' + emojisStr
                }
            ]
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.choices[0].message.content;
    } catch (error) {
        console.error(error);
    }

}


/*
*  Generate 9 random emojis
*  Make request for a story to chatGPT
*  Show shuffling
*
*
*
* */
