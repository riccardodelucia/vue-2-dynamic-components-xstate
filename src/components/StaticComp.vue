<template>
  <div>
    <button v-show="current.value !== 'one'" v-on:click="send('PREV')">
      Prev
    </button>
    <button v-show="current.value !== 'four'" v-on:click="send('NEXT')">
      Next
    </button>

    <div class="page-container">
      <div>
        <h1>
          State:
        </h1>
        <p>{{ current.value }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { interpret } from "xstate";
import { sequentialMachine } from "@/state_machines/sequentialMachine.js";
export default {
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
  }
};
</script>

<style>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  margin: 50px;
  background-color: yellowgreen;
}
</style>
