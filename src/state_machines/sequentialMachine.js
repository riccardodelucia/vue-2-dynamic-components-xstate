import { Machine } from "xstate";

// This machine is completely decoupled from Vue
export const sequentialMachine = Machine(
  {
    id: "sequential",
    context: {
      /* some data */
      n: 1
    },
    initial: "one",
    states: {
      one: {
        on: { NEXT: { target: "two", actions: ["incStateID"] } }
      },
      two: {
        on: {
          NEXT: {
            target: "three",
            // transition actions
            actions: ["incStateID"]
          },
          PREV: {
            target: "one",
            // transition actions
            actions: ["decStateID"]
          }
        }
      },
      three: {
        on: {
          NEXT: {
            target: "four",
            // transition actions
            actions: ["incStateID"]
          },
          PREV: {
            target: "two",
            // transition actions
            actions: ["decStateID"]
          }
        }
      },
      four: {
        on: { PREV: { target: "three", actions: ["decStateID"] } }
      }
    }
  },
  {
    actions: {
      // action implementations
      incStateID: (context, event) => {
        console.log(
          `Performing FSM incStateID on context.n=${context.n} on event=${event}`
        );
        context.n++;
      },
      decStateID: (context, event) => {
        console.log(
          `Performing FSM decStateID on context.n=${context.n} on event=${event}`
        );
        context.n--;
      }
    }
  }
);
