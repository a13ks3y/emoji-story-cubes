const fs = require("fs");
fs.copyFile(
    "./platforms/android/app/build/outputs/apk/debug/app-debug.apk",
    "./emoji-story-cubes_debug.apk",
    err => err ? console.error(err) : console.log('copied')
);
