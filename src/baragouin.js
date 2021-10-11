import { voices, loadVoice, loadVoicesList } from "./voices.js"
import { rand } from "./utils.js"
import { note } from "./note.js"

export default function baragouin(text, options = {}) {
    if (!(this instanceof baragouin)) return new baragouin(text, options)

    let { speed = 30, emotion = 10, onNote, onEnd } = options;
    this.options = Object.assign({ speed, emotion, onNote, onEnd }, options);
    this.text = text;
    this.pronouncedText = "";

    let parts = text.split(/\b/)
    let t = 0;
    let tone = 100;
    let coefSpeed = 1 - speed / 150
    let timeouts = [];

    for (let i = 0; i < parts.length; i++) {
        let part = parts[i];
        if (/\w/.test(part)) {
            let nbSyllabs = Math.ceil(part.length / 3);
            for (let s = 0; s < nbSyllabs; s++) {
                t += 100 * coefSpeed;
                if (nbSyllabs === 2) tone -= 30 * Math.min(emotion / 30, 1);
                if (nbSyllabs >= 4) tone += rand(-emotion / 4, emotion / 4);

                let freq = 440 + tone + rand(-emotion, emotion);
                timeouts.push(setTimeout(() => {
                    //console.log("note", t, p, freq);
                    note(freq, this.options, 0.5 * coefSpeed)
                    this.pronouncedText += part.slice(s * 3, s < nbSyllabs ? s * 3 + 3 : 0);
                    onNote && onNote(this.pronouncedText, t)
                }, t));
            }
        } else {
            timeouts.push(setTimeout(() => {
                this.pronouncedText += part;
                onNote && onNote(this.pronouncedText, t)
            }, t + 1))

            switch (part.trim()) {
                case "":
                    t += 50 * coefSpeed;
                    tone = 100 - Math.min(emotion / 30, 1) * 10;
                    break;
                case ",":
                case ";":
                    t += 400 * coefSpeed;
                    tone = 100;
                    break;
                case ".":
                case "?":
                case "!":
                case "\n":
                    t += 800 * coefSpeed;
                    break;
                case "...":
                    t += 1200 * coefSpeed;
                    break;
                default: break;
            }
        }
    }

    timeouts.push(setTimeout(() => onEnd && onEnd(text, t), t));

    this.stop = function () {
        timeouts.forEach(timeout => clearTimeout(timeout))
        onEnd && onEnd(text, t)
    }
}

Object.assign(baragouin, { loadVoice, loadVoicesList, voices })