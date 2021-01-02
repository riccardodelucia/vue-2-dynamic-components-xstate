<template>
  <div>
    <button v-show="current.value !== 'state_1'" v-on:click="send('PREV')">
      Prev
    </button>
    <button v-show="current.value !== 'state_4'" v-on:click="send('NEXT')">
      Next
    </button>

    <div class="page-container">
      <div>
        <h1>
          State:
        </h1>
        <p>{{ current.value }}</p>
        <p>Look how the context value goes wrong: {{ context.stateValue }}</p>
        <p>(No context value before clicking on any button)</p>
      </div>
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import { interpret } from "xstate";
import { sequentialMachine } from "@/state_machines/sequentialMachine.js";
import c1 from "@/components/c1.vue";
import c2 from "@/components/c2.vue";
import c3 from "@/components/c3.vue";
import c4 from "@/components/c4.vue";

export default {
  name: "DynamicComp",
  components: { c1, c2, c3, c4 },
  created() {
    // Start service on component creation
    this.sequentialService
      .onTransition(state => {
        // Update the current state component data property with the next state
        this.current = state;
        // Update the context component data property with the updated context
        this.context = state.context;
      })
      .start();
  },
  data() {
    return {
      // Interpret the machine and store it in data
      sequentialService: interpret(sequentialMachine),

      // Start with the machine's initial state
      current: sequentialMachine.initialState,

      // Start with the machine's initial context
      context: sequentialMachine.context
    };
  },
  methods: {
    // Send events to the service
    send(event) {
      this.sequentialService.send({
        type: event,
        //just to show how to pass data to the state machine
        // and to show how to use context for updating the component is a bad idea :)
        value: extractStateValue(this.current.value)
      });
    }
  },
  computed: {
    currentComponent: function() {
      extractStateValue(this.current.value);
      return `c${extractStateValue(this.current.value)}`;
    }
  }
};

//this method should not be exposed
const extractStateValue = function(str) {
  return str.split("_")[1];
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  margin: 50px;
  background-color: orangered;
}
</style>
