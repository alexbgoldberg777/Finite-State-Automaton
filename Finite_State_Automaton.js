/*
* This Finite_state_automaton class stands for finite state automata, a fluid design version of the state
* design pattern. It allows for multiple states of some process to be created along with
* transitions to other states. Each state has transitions that allow the machine to be able
* to move to other states on specific events. The fluid design part allows for multiple 
* operations to be done within a single command; since most methods return this, operations 
* can be chained to make multiple edits at once. States are represented as objects with two
* members: a string with its name, and an array of transitions to other states. Transitions
* are represented by objects with a single member: the name of the key represents
* the event on which the transition occurs, and the value of the member is a string denoting
* what state is moved to on this event.
*/

class Finite_state_automaton {
  constructor(){
    this.curState = undefined; //Denotes the state which the automaton is currently pointing to.
    let states = []; //Denotes a list of all current states in the automaton.

    /* This State class is used to create the individual states within the automaton.
    * It is declared within the Finite_state_automaton constructor for the sake of information hiding; states
    * can only be declared within the automata, and since the list of states is not a class
    * member, the State class is also within the construtor so it can access all states without
    * the states being accessible outside of the automaton. States are represented by an object
    * with two members: a string s denoting its name, and an array of transitions to other
    * states (defined below).
    */
    class State {
      constructor(name){
        this.getName = () => name;
        this.setName = function(s) {name = s;}
        /*
        * This transitions array contains all of the possible following states that this
        * state can reach, represented as an object with the transition name as the key
        * and the name of the next state as the value associated with the key.
        */
        this.transitions = [];
      }
      
      addTransition(event, state){ //Adds a single transition to state s on event e to this state.
        let obj = {};
        this.transitions.push(obj);
        obj[e] = s;
        return this;
      }
      
      nextState(e){ //Returns the state that is reached from this state on event e.
        let arr = this.transitions.filter(x => x.hasOwnProperty(e)); //First, the transitions that have event e present are separated into array arr.
        if (arr.length === 0){
          return undefined;
        }
        let next = Object.values(arr[Math.floor(Math.random() * arr.length)])[0]; //If there are multiple transitions on event e, one is chosen at random.
        for (let i = 0; i < states.length; ++i){ //Finds the
          if (states[i].getName() === next){ //The state that matches the name listed in transitions is found and returned.
            return states[i];
          }
        }
        return undefined;
      }
      
      nextStates(e){ //Returns an array containing all states reachable from this state on event e.
        let arr = this.transitions.filter(x => x.hasOwnProperty(e)); //Like above, the transitions on event e are first found.
        let outArr = [];
        for (let i = 0; i < states.length; ++i){
          for (let j = 0; j < arr.length; ++j){
            if (states[i].getName() === Object.values(arr[j])[0]){ //All states that match the state name in transitions are pushed into the output array.
              outArr.push(states[i]);
            }
          }
        }
        return outArr;
      }

    } //End of State class.
    
    
    /*
    * Following are the methods of the Finite_state_automaton class itself, used to add and traverse states
    * into the machine. Each is represented as a class member, still within the Finite_state_automaton constructor
    * to access the states array without allowing the states to be accessible outside
    * of the automaton.
    */
    
    this.nextState = function(e) { //Moves the machine to the state reachable by the current state on event e.
      if (this.curState === undefined){
        return this;
      }
      this.curState = this.curState.nextState(e);
      return this;
    }

    this.createState = function (s, transitions) { //Creates a new state with name s and transitions array transitions to add to the machine.
      let stt = new State(s);
      let stateNames = [s];
      for (let i = 0; i < states.length; ++i){ //Creates an array of strings denoting the names of all states, including this new one.
        stateNames.push(states[i].getName());
      }
      for (let i = 0; i < transitions.length; ++i){ //Adds this new state's transitions to other states.
        let temp = Object.keys(transitions[i])[0];
        stt.addTransition(temp, transitions[i][temp]);
      }
      if (this.curState === undefined){ //If this is the first state being created, set the current state to this state.
        this.curState = stt;
      }
      /*
      * Here, new states are created for every state in the transitions parameter that does
      * not already exist in the automaton. This allows for multiple states to be created at
      * once and lets the transitions to always be created with the state, so they do not
      * have to be added afterwards.
      */
      for (let i = 0; i < transitions.length; ++i){
        if (!stateNames.includes(Object.values(transitions[i])[0])){
          this.createState(Object.values(transitions[i])[0], []);
        }
      }
      /*
      * If a state with name s already exists within the automaton, it is overwritten here
      * with the transitions passed into the parameter.
      */
      for (let i = 0; i < states.length; ++i){
        if (states[i].getName() === s){
          let temp = states[i];
          states[i] = stt;
          if(this.curState.getName() === temp.getName()){
            this.curState = stt;
          }
          return this;
        }
      }
      states.push(stt); //If the state did not already exist, here it is added to the states array.
      return this;
    }

    this.addTransition = function(s, t){ //Adds a transition t to state s.
      let stateNames = [];
      for (let i = 0; i < states.length; ++i){  //Creates an array of strings denoting the names of all states.
        stateNames.push(states[i].getName());
      }
      /*
      * Here, if state s does not exist yet in the automaton, it is created and 
      * initialized with an empty transitions array.
      */
      if (!stateNames.includes(s)){
        this.createState(s, []);
      }
      /*
      * Here, if the state to which transition t moves to doess not exist yet in the
      * automaton, here is is created with the given name and initialized with an
      * empty transitions array.
      */
      if (!stateNames.includes(Object.values(t)[0])){
        this.createState(Object.values(t)[0], []);
      }
      for (let i = 0; i < states.length; ++i){ //The addTransition method of the state itself is used on state s once it is found in the states array.
        if (states[i].getName() === s){
          states[i].addTransition(Object.keys(t)[0], Object.values(t)[0]);
        }
      }
      return this;
    }

    this.showState = function(){ //Returns the name of the automaton's current state.
      if (this.curState === undefined){
        return undefined;
      }
      return this.curState.getName();
    }

  } //End of Finite_state_automaton constructor.
} //End of Finite_state_automaton class.


/*
* Following are unit tests for the Finite_state_automaton class.
*/

function assert(condition) { //Standard assert method to throw exceptions if an answer is incorrect.
    if (!condition) {
        throw "Assertion failed";
    }
}

function test_createState_and_nextState(){ //Tests general creating states and moving between them.
  let fsa = new Finite_state_automaton();
  fsa.createState("s1", [{e2: "s2"}, {e3: "s3"}]).createState("s2", [{e1: "s1"}, {e3: "s3"}]);
  assert(fsa.showState() === "s1");
  fsa.nextState("e2");
  assert(fsa.showState() === "s2");
  fsa.nextState("e3");
  assert(fsa.showState() === "s3");
  assert(fsa.curState.transitions.length === 0);
}

/*
* Tests that states with multiple transitions on the same event will randomly
* choose one state to move to (call multiple times to see results).
*/
function test_nextState_and_nextStates_with_repeated_events(){
  let fsa = new Finite_state_automaton();
  fsa.createState("s1", [{e2: "s2"}, {e2: "s3"}]).createState("s2", [{e1: "s1"}, {e3: "s3"}]).createState("s3", [{e1: "s1"}, {e2: "s2"}]);
  assert(fsa.curState.nextStates("e2").length === 2);
  assert(fsa.curState.nextStates("e2")[0].getName() === "s2");
  assert(fsa.curState.nextStates("e2")[1].getName() === "s3");
  let next = fsa.curState.nextState("e2").getName();
  assert(next === "s2" || next === "s3");
}

function test_chaining_nextState(){ //Tests that fluid chaining works and results in the correct state being made current.
  let fsa = new Finite_state_automaton();
  fsa.createState("s1", [{e2: "s2"}, {e3: "s3"}]).createState("s2", [{e1: "s1"}, {e3: "s3"}]).createState("s3", [{e1: "s1"}, {e2: "s2"}])
    .nextState("e2").nextState("e3").nextState("e1");
  assert(fsa.showState() === "s1");
}

function test_createState_replacing(){ //Tests that making a new state with the same name as one that exists replaces it.
  let fsa = new Finite_state_automaton();
  fsa.createState("s1", [{e2: "s2"}, {e3: "s3"}]);
  fsa.createState("s2", [{e1: "s1"}, {e3: "s3"}]);
  fsa.createState("s3", [{e1: "s1"}, {e2: "s2"}]);
  fsa.createState("s1", [{e2: "s3"}]);
  assert(fsa.curState.transitions.length === 1);
  fsa.nextState("e2");
  assert(fsa.showState() === "s3");
  fsa.createState("s3", [{e1: "s2"}]);
  fsa.nextState("e1");
  assert(fsa.showState() === "s2");
}

function test_fsa_addTransition(){ //Tests general addTransition method.
  let fsa = new Finite_state_automaton();
  fsa.createState("s1", [])
    .addTransition("s1", {e2: "s2"});
  assert(fsa.curState.transitions.length === 1);
  fsa.nextState("e2");
  assert(fsa.showState() === "s2");
  assert(fsa.curState.transitions.length === 0);
}

/*
* Tests that adding a transition that does not already exist when creating a new state
* correctly creates a new one.
*/
function test_creating_new_transitions_in_createState(){
  let fsa = new Finite_state_automaton();
  fsa.createState("s1", [{e2: "s2"}]);
  fsa.nextState("e2");
  assert(fsa.showState() === "s2");
  assert(fsa.curState.transitions.length === 0);
  fsa.addTransition("s2", {e3: "s3"});
  fsa.nextState("e3");
  assert(fsa.showState() === "s3");
  assert(fsa.curState.transitions.length === 0);
}
