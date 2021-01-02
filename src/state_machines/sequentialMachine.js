import { Machine } from "xstate";

// This machine is completely decoupled from Vue
export const sequentialMachine = Machine({
  id: "sequential",
  context: {
    /* some data */
    n: 1
  },
  initial: "one",
  states: {
    one: {
      on: { NEXT: "two" }
    },
    two: {
      on: { NEXT: "three", PREV: "one" }
    },
    three: {
      on: { NEXT: "four", PREV: "two" }
    },
    four: {
      on: { PREV: "three" }
    }
  }
});
