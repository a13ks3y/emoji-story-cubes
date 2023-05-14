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
        return result.choices[0].message.content;
    } catch (error) {
        console.error(error);
    }
}
