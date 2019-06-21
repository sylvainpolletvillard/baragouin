# Baragouin

Good old gibberish for your virtual characters

---

Baragouin is a JavaScript library that will give a (unintelligible) voice to your virtual characters.

## Demo, examples and documentation

Check out the website: [https://sylvainpolletvillard.github.io/baragouin/](https://sylvainpolletvillard.github.io/baragouin/)

## Installation
Available as ES module on npm:

```
> npm install baragouin
```

```javascript
import baragouin from "baragouin"
```

or as minified bundle on CDN:

```html
<script src="https://umd.cdn.pika.dev/baragouin/">
<script>baragouin("now available as global")<script>
```

#Usage

```javascript
baragouin(text, options)

let speech = baragouin("Hello World !", {
  voice: "sine",
  volume: 50,
  speed: 30,
  emotion: 40,
  pitch: 25,
  resonance: 10,

  onNote(text, time){
    // this is called at every syllab pronounced,
    // with the text read so far. Perfect time
    // to update the text of a message balloon
  },
  onEnd(text, time){
    // this is called once at the end of the speech
  }
})

setTimeout(() => {
    // stop talking after 5 seconds
    speech.stop()
}, 5000)
```

Note that to be allowed to make sounds, user must interact with the page first (click on something)