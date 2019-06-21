import { ctx } from "./note.js"

export const voices = {}

export async function loadVoicesList() {
    return fetch('../voices/index.json')
        .then(res => res.json())
}

export async function loadVoice(voice) {
    return fetch(`../voices/${voice}.json`)
        .then(res => res.json())
        .then(tables => {
            let c = tables.real.length;
            let real = new Float32Array(c);
            let imag = new Float32Array(c);
            for (let i = 0; i < c; i++) {
                real[i] = tables.real[i];
                imag[i] = tables.imag[i];
            }

            voices[voice] = ctx.createPeriodicWave(real, imag);
            return voices[voice]
        })
}