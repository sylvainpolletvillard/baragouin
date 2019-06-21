import baragouin from "../../src/baragouin.js"

export default Vue.component("message-balloon", {
    template: `
<div :class="['message','-'+position, 'nes-pointer', speech && 'talking']" @click="talk">
<div class="sprite" :style="spriteStyle">
    <img :src="'docs/sprites/'+sprite" />
</div>
<div :class="['nes-balloon', 'from-'+position]">
    <p>{{content}}</p>
</div>
</div>
  `,
    props: {
        position: { type: String, default: "left" },
        sprite: { type: String, default: "girl.png" },
        background: { type: String, required: false },
        text: String,
        initialText: { type: String, required: false },
        pitch: Number,
        volume: Number,
        speed: Number,
        resonance: Number,
        emotion: Number,
        voice: String
    },
    data() {
        return {
            content: this.initialText || this.text,
            speech: null
        }
    },
    computed: {
        spriteStyle() {
            if (this.background) {
                return {
                    backgroundImage: `url(docs/sprites/${this.background})`
                }
            }
        }
    },
    methods: {
        talk() {
            if (this.speech) this.speech.stop()
            if (!this.speech) {
                this.speech = baragouin(this.text, Object.assign({
                    onNote: (text, t) => {
                        this.content = text
                    },
                    onEnd: (text, t) => {
                        this.content = text
                        this.speech = null;
                    }
                }, this.$props))
            }
        },
        stop() {
            if (this.speech) this.speech.stop()
        }
    }
})