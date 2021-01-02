<template>
  <div>
    <button v-show="current.value !== 'one'" v-on:click="send('PREV')">
      Prev
    </button>
    <button v-show="current.value !== 'four'" v-on:click="send('NEXT')">
      Next
    </button>

    <div class="page-container">
      <component v-bind:is="currentComponent"></component>
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
        console.log(this.context.n);
      })
      .start();
  },
  data() {
    return {
      text: "test-text",
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
      this.sequentialService.send(event);
    }
  },
  computed: {
    currentComponent: function() {
      return `c${this.context.n}`;
    }
  }
};
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  margin: 50px;
  background-color: orangered;
}
</style>
