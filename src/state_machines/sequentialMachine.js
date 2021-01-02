import { Machine } from "xstate";

// This machine is completely decoupled from Vue
export const sequentialMachine = Machine({
  id: "sequential",
  context: {
    /* some data */
  },
  initial: "one",
  states: {
    one: {
      on: { TOGGLE: "two" }
    },
    two: {
      on: { TOGGLE: "three" }
    },
    three: {
      on: { TOGGLE: "four" }
    },
    four: {
      on: { TOGGLE: "one" }
    }
  }
});
