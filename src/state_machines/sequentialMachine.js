import { Machine, assign } from "xstate";

// This machine is completely decoupled from Vue
export const sequentialMachine = Machine(
  {
    id: "sequential",
    context: {
      /* some data */
      stateValue: 1
    },
    initial: "state_1",
    states: {
      state_1: {
        entry: ["changeStateLog", "updateContextValue"],
        on: {
          NEXT: { target: "state_2", actions: ["logNext"] }
        }
      },
      state_2: {
        entry: ["changeStateLog", "updateContextValue"],
        on: {
          NEXT: {
            target: "state_3",
            actions: ["logNext"]
          },
          PREV: {
            target: "state_1",
            actions: ["logPrev"]
          }
        }
      },
      state_3: {
        entry: ["changeStateLog", "updateContextValue"],
        on: {
          NEXT: {
            target: "state_4",
            actions: ["logNext"]
          },
          PREV: {
            target: "state_2",
            actions: ["logPrev"]
          }
        }
      },
      state_4: {
        entry: ["changeStateLog", "updateContextValue"],
        on: { PREV: { target: "state_3", actions: ["logPrev"] } }
      }
    }
  },
  {
    actions: {
      // just to show how to pass data through events
      updateContextValue: assign((context, event) => ({
        stateValue: event.value
      })),
      changeStateLog() {
        console.log("transition called");
      },
      logNext: () => {
        console.log("next event");
      },
      logPrev: () => {
        console.log("prev event");
      }
    }
  }
);
