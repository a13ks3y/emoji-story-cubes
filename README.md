# Emoji-Story-Cubes
The Story Cubes game, but emojis using for dice-faces instead.
Inspired by [story cubes](https://www.storycubes.com/en/games/rorys-story-cubes-classic/)

### AI generation feature
Just an API call to ChatGPT or similar service.
### Share feature
To make share feature working,
there is two possible solutions:
1. Generate an image with emojis,
   and share it like a picture, with a story as
   description, and emojis in the title.
2. Generate a URL, with some-way-encoded-hash,
   which would be used by web-app to render a story.
   (It could be a completely separate html page,
   or it could be current application built for
   the browser platform)
### Todo:
* Use React/ReactNative (?)
* Switch to capacitor (?)
~~* Fix some emojis not visible on Android (!)~~
* Fix share button isn't touchable (!)
* Use cordova-social-share plugin properly
* Share feature. Choose implementation (implement both?)


