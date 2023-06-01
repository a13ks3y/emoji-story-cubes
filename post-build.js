const fs = require("fs");
fs.copyFile(
    "./platforms/android/app/build/outputs/apk/debug/app-debug.apk",
    "./emoji-story-cubes_debug.apk",
    err => err ? console.error(err) : console.log('.apk copied')
);
fs.copyFile(
    "./platforms/android/app/build/outputs/bundle/release/app-release.aab",
    "app-release.aab",
    err => err ? console.error(err) : console.log('.aab copied')
)
