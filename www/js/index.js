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
        'title': `Here the story: ${emojiStr}\n`,
        'text': emojiText,
        'url': emojiUrl
    }).then(() => {
        console.log('Successful share!');
    }).catch(error => {
        console.error('Error sharing:', error)
    });
}

const storyTextEl = document.getElementById('story-text');
function shareHandler() {
    const emojiHash = randomSet.map(code => Number(code).toString(16)).join('-');
    const emojiStr = randomSet.map(code => String.fromCodePoint(code));
    const emojiUrl = `https://a13ks3y.github.io/emoji-story-cubes/#${emojiHash}`;
    const emojiText = storyTextEl.textContent;
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
let randomSet;
function generateRandomSet() {
    const emojis = generateAllEmojiCodes();
    const result = [];
    for (let i = 1; i <= ROUNDS; i++) {
        result.push(emojis.splice(Math.floor(Math.random() * emojis.length), 1));
    }
    return result;
}

let isShuffling = false; // Every day I'm shuffling, shuffling...
async function shuffle() {
    // Prevent running multiple times
    if (isShuffling) return;
    isShuffling = true;
    const changes = [];
    randomSet = generateRandomSet();

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
    const text = requestStory(randomSet.map(code => String.fromCodePoint(code))).then(result => {
        storyTextEl.textContent = result;
    });
    Promise.all([...changes, text]).then(() => {
        $qubes.forEach(($q, i) => $q.innerHTML = `&#${randomSet[i]};`);
        isShuffling = false;
    }).catch(() => isShuffling = false);
}

const tapArea = document.getElementById('tap-area');
tapArea.addEventListener('click', shuffle);
tapArea.addEventListener('touchend', shuffle);
shuffle();
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

const btnCopy = document.getElementById('btn-copy');
btnCopy.addEventListener('click', () => {
    const textToCopy = storyTextEl ? storyTextEl.textContent : null;
    if (!storyTextEl || !textToCopy) return false;
    if (window['cordova']) {
        cordova.plugins.clipboard.copy(textToCopy);
    } else if (window['navigator'] && window['navigator']['clipboard']) {
        window.navigator.clipboard.writeText(textToCopy);
    }
});
