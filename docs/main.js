import baragouin from "../src/baragouin.js"
import MessageBalloon from "./components/MessageBalloon.js"
import OptionTester from "./components/OptionTester.js"
import TestAll from "./components/TestAll.js"

window.baragouin = baragouin

new Vue({
  el: '#app',
  components: { MessageBalloon, OptionTester, TestAll },
  data() {
    return {
      window,
      baragouin,
      animateOctocat: false,
      scrollPos: 0,
      options: {
        customVoices: [],
        basicVoices: [
          { value: "sine" },
          { value: "square" },
          { value: "triangle" },
          { value: "sawtooth", text: "I like this one. Let's make it the default voice !" }
        ],
        pitch: [
          { label: "Low", value: 0, text: "I should probably quit cigarette...", sprite: "boy.png" },
          { label: "Medium", value: 25, text: "I used to be a TV presenter, you know ? ", sprite: "andros.png" },
          { label: "High", value: 50, text: "If I could sing, I would be soprano !", sprite: "girl.png" },
          { label: "Very High", value: 75, text: "I want candies ! Give me candies !", sprite: "kid.png" },
        ],
        resonance: [
          { label: "Low", value: 10, text: "I'm in my room !", background: "room.png" },
          { label: "High", value: 50, text: "I'm in a cave !", background: "cave.png" },
          { label: "Very high", value: 80, text: "I'm in a cathedral !", background: "cathedral.png" },
        ],
        emotion: [
          { label: "Robot", value: 0, text: "Blip Blip. I'm a robot. I have been programmed to not show any emotion in my voice.", sprite: "robot.png" },
          { label: "Quiet", value: 30, text: "This is my peaceful voice with a normal amount of emotion and tone.", sprite: "girl.png" },
          { label: "Afraid", value: 60, text: "What is going on ? There are random variations in my voice tone and it feels like I'm scared !", sprite: "andros.png" },
          { label: "Angry", value: 90, text: "Are you talking to me ? I said, are you talking to me !?!", sprite: "boy.png" }
        ],
        speed: [
          { label: "Slow", value: 0, text: "Everything's gonna be all right! So, woman no cry. No, woman no cry." },
          { label: "Normal", value: 30, text: "Is this the real life ? Is this just fantasy ? Caught in a landslide. No escape from reality." },
          { label: "Fast", value: 50, text: "Cause I'm beginning to feel like a Rap God, Rap God. All my people from the front to the back nod, back nod." },
          {
            label: "Super fast", value: 70, text: "Ski-bi dibby dib yo da dub dub, Yo da dub dub. I'm the Scatman !"
          },
        ]
      }
    }
  },
  created() {
    baragouin.loadVoicesList()
      .then(voicesList => Promise.all(voicesList.map(baragouin.loadVoice)))
      .then(() => {
        this.options.customVoices = Object.keys(baragouin.voices).map(voiceName => ({ value: voiceName }))
      })
  },
  mounted() {
    document.addEventListener('scroll', () => {
      this.scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
    });
  }
});
