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
