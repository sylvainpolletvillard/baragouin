import { rand } from "./utils.js"
import { voices } from "./voices.js"

//create the context for the web audio
export let ctx = new AudioContext();

export function note(freq = (440 + rand(-40, 40)), options = {}, duration = 0.5) {
    let {
        voice = "sawtooth",
        pitch = 30,
        resonance = 25,
        volume = 10
    } = options;

    let now = ctx.currentTime;

    let o = ctx.createOscillator();
    o.frequency.value = freq + (pitch - 55) * 8;

    if (["sine", "square", "triangle", "sawtooth"].includes(voice)) {
        o.type = voice;
    } else if (voice in voices) {
        o.setPeriodicWave(voices[voice])
    } else {
        throw new Error(`Unknown voice "${voice}". Did you load it first ?`)
    }

    let g = ctx.createGain()
    g.connect(ctx.destination);

    let attackTime = 0.01
    let releaseTime = 0.1

    g.gain.cancelScheduledValues(now);
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(volume / 100, now + attackTime);
    g.gain.linearRampToValueAtTime(0, now + attackTime + releaseTime);

    o.connect(g);

    if (resonance > 0) {
        let rg = ctx.createGain()
        rg.connect(ctx.destination);

        let resonanceDelay = 0.05 + 0.01 * (resonance / 100)
        let resonanceAttackTime = 0.02
        let resonanceReleaseTime = 0.2 + 0.25 * (resonance / 100)
        let resonanceVolume = (volume / 100) * (resonance / 200)

        rg.gain.cancelScheduledValues(now);
        rg.gain.setValueAtTime(0, now);
        rg.gain.setValueAtTime(0, resonanceDelay + now);
        rg.gain.linearRampToValueAtTime(resonanceVolume, now + resonanceDelay + resonanceAttackTime);
        rg.gain.linearRampToValueAtTime(0.00001, now + resonanceDelay + resonanceAttackTime + resonanceReleaseTime)

        o.connect(rg)
    }

    o.start(0);
    o.stop(ctx.currentTime + duration);
}
