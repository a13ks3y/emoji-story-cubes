const additionalErrorMessageAppendixMessages = [
    "The dedicated developer is working tirelessly, like a shooting star, to bring back the magic of storytelling. You can show support with a kind review or even contribute to the story treasury!",
    "Witness the developer's unwavering efforts, shining like a constellation of stars, to restore the enchanting tales. Consider leaving a review or even making a small contribution to fuel the story engine!",
    "Behold the developer's relentless determination, flickering brighter than a sky full of stars, to revive the captivating narratives. A glowing review or a contribution can help sustain the magical storytelling journey!",
    "Marvel at the developer's unyielding commitment, sparkling like a starry night, to reignite the wonder of stories. Express your support through a review or consider a contribution to keep the storytelling sparks flying!",
    "Experience the developer's unwavering resolve, radiant as the gleam of stars, to reignite the story flames. Your review or contribution can help kindle the magic and ensure the tales continue to mesmerize!",
];
async function requestStory(emojisStr) {
    const url = 'https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '8bc16a1390mshd21ad0dd0e6dfd4p14d1d5jsna481e63480cc',
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
        if (result && result["choices"]) {
            return result["choices"][0].message.content;
        } else {
            const message = '⚠️ Uh-oh! The story engine is experiencing a hiccup.\n The imagination wires are tangled, but fear not!\n The storytelling magic will resume soon! 📚✨';
            return message + '\n\n<br/><br/>' + additionalErrorMessageAppendixMessages[~~(Math.random()*additionalErrorMessageAppendixMessages.length)];
        }
    } catch (error) {
        console.error(error);
        // should notify caller somehow. maybe it's better to re-throw exception here?
        const message = 'Oops! The story world is sleepy.\n The magic network is snoozing, and the tales are waiting to wake up!\n Stay tuned for exciting stories! 📚✨';
        throw new Error(message + '\n\n<br/><br/>' + additionalErrorMessageAppendixMessages[~~(Math.random()*additionalErrorMessageAppendixMessages.length)]);
    }
}
