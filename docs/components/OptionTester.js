Vue.filter("capitalize", str => str[0].toUpperCase() + str.slice(1))

export default Vue.component("option-tester", {
    template: `
<div class="nes-container with-title">
    <label class="title" :for="param">{{param | capitalize}}:</label>

<label v-for="(opt, i) in options">
    <input type="radio" :id="param" :name="param" class="nes-radio" :value="i" v-model="selected">
    <span>{{opt.label || opt.value}}</span>
    <span v-if="opt.label">({{opt.value}})</span>
    </input>
</label>

<div class="message-list">
<message-balloon ref="message"
    v-bind="baragouinParams"
    :sprite="selectedOption.sprite || sprite"
    :text="selectedOption.text || text"
    :background="selectedOption.background">
</message-balloon>
</div>

</div>
  `,
    props: {
        param: String,
        options: Array,
        sprite: { type: String, default: "andros.png" },
        text: { type: String, required: false }
    },
    data() {
        return {
            selected: 0
        }
    },
    computed: {
        selectedOption() {
            return this.options[this.selected] || {}
        },
        baragouinParams() {
            return { [this.param]: this.selectedOption.value }
        }
    },
    watch: {
        selected() {
            Vue.nextTick(() => this.$refs.message.talk())
        }
    },
    methods: {

    }
})