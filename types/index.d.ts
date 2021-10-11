// TypeScript definition file for baragouin

export = baragouin

declare function baragouin(text: string, config: baragouin.BaragouinConfig): void;

declare namespace baragouin {
    export const voices: { [voiceName: string]: PeriodicWave }
    export function loadVoice(voice: string): PeriodicWave
    export function loadVoicesList(): Promise<string[]>

    export interface BaragouinConfig {
        voice?: string;
        volume?: number;
        speed?: number;
        emotion?: number;
        pitch?: number
        resonance?: number;

        onNote?: (text: string, time: number) => any;
        onEnd?: (text: string, time: number) => any;
    }
}