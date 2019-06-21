import baragouin from "../../src/baragouin.js";

export default Vue.component("test-all", {
    template: `
<section>
    <h2 id="play"><a href="#play">#</a>Play with all the options</h2>

    <div class="grid col-3">

    <div>
    <label for="custom_voice_select">Voice</label>
    <div class="nes-select">
    <select required id="custom_voice_select" v-model="voice">
        <option v-for="voice in voices" :value="voice">{{voice}}</option>
    </select>
    </div>
    </div>

    <div>
    <label for="custom_volume_input">Volume: {{volume}}</label>
    <input type="range" id="custom_volume_input" class="nes-range" min="0" max="100" v-model.number="volume">
    </div>

    <div>
    <label for="custom_pitch_input">Pitch: {{pitch}}</label>
    <input type="range" id="custom_pitch_input" class="nes-range" min="0" max="100" v-model.number="pitch">
    </div>

    <div>
    <label for="custom_speed_input">Speed: {{speed}}</label>
    <input type="range" id="custom_speed_input" class="nes-range" min="0" max="100" v-model.number="speed">
    </div>

    <div>
    <label for="custom_emotion_input">Emotion: {{emotion}}</label>
    <input type="range" id="custom_emotion_input" class="nes-range" min="0" max="100" v-model.number="emotion">
    </div>

    <div>
    <label for="custom_resonance_input">Resonance: {{resonance}}</label>
    <input type="range" id="custom_resonance_input" class="nes-range" min="0" max="100" v-model.number="resonance">
    </div>

    </div>

    <div class="relative">
    <label for="custom_message">Text</label>
    <textarea id="custom_message" class="nes-textarea" v-model="text"></textarea>
    <button type="button" v-if="$refs.message && $refs.message.speech" class="nes-btn is-error bottom-right" @click="stop">⬛</button>
    <button type="button" v-else class="nes-btn is-success bottom-right" @click="talk">▶</button>

    </div>

    <div class="message-list">
    <message-balloon ref="message"
        sprite="robot.png"
        :text="text"
        :volume="volume"
        :pitch="pitch"
        :resonance="resonance"
        :emotion="emotion"
        :speed="speed"
        :voice="voice">
    </message-balloon>
    </div>
</section>
  `,
    props: {
        options: Object
    },
    data() {
        return {
            voice: "sawtooth",
            volume: 20,
            pitch: 30,
            resonance: 10,
            speed: 30,
            emotion: 40,
            text: "Oh yes, a lot of sliders to adjust ! I love tweaking the settings until I find the perfect spot..."
        }
    },
    computed: {
        voices() {
            return ["sine", "square", "triangle", "sawtooth"]
                .concat(this.options.customVoices.map(voice => voice.value))
        }
    },
    methods: {
        talk() {
            Vue.nextTick(() => this.$refs.message.talk())
        },
        stop() {
            this.$refs.message.stop()
        }
    }
})