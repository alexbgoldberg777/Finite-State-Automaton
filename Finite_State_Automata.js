class FSA {
  constructor(){
    this.curState = undefined;
    let states = [];

    class State {
      constructor(name){
        this.getName = () => name;
        this.setName = function(s) {name = s;}
        this.transitions = [];
      }
      addTransition(e, s){
        let obj = {};
        this.transitions.push(obj);
        obj[e] = s;
        return this;
      }
      nextState(e){
        let arr = this.transitions.filter(x => x.hasOwnProperty(e));
        if (arr.length === 0){
          return undefined;
        }
        let next = Object.values(arr[Math.floor(Math.random() * arr.length)])[0];
        for (let i = 0; i < states.length; ++i){
          if (states[i].getName() === next){
            return states[i];
          }
        }
        return undefined;
      }
      nextStates(e){
        let arr = this.transitions.filter(x => x.hasOwnProperty(e));
        let outArr = [];
        for (let i = 0; i < states.length; ++i){
          for (let j = 0; j < arr.length; ++j){
            if (states[i].getName() === Object.values(arr[j])[0]){
              outArr.push(states[i]);
            }
          }
        }
        return outArr;
      }

    }
    
    this.nextState = function(e) {
      if (this.curState === undefined){
        return this;
      }
      this.curState = this.curState.nextState(e);
      return this;
    }

    this.createState = function (s, transitions) {
      let stt = new State(s);
      let stateNames = [s];
      for (let i = 0; i < states.length; ++i){
        stateNames.push(states[i].getName());
      }
      for (let i = 0; i < transitions.length; ++i){
        let temp = Object.keys(transitions[i])[0];
        stt.addTransition(temp, transitions[i][temp]);
      }
      if (this.curState === undefined){
        this.curState = stt;
      }
      for (let i = 0; i < transitions.length; ++i){
        if (!stateNames.includes(Object.values(transitions[i])[0])){
          this.createState(Object.values(transitions[i])[0], []);
        }
      }
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
      states.push(stt);
      return this;
    }

    this.addTransition = function(s, t){
      let stateNames = [];
      for (let i = 0; i < states.length; ++i){
        stateNames.push(states[i].getName());
      }
      if (!stateNames.includes(s)){
        this.createState(s, []);
      }
      if (!stateNames.includes(Object.values(t)[0])){
        this.createState(Object.values(t)[0], []);
      }
      for (let i = 0; i < states.length; ++i){
        if (states[i].getName() === s){
          states[i].addTransition(Object.keys(t)[0], Object.values(t)[0]);
        }
      }
      return this;
    }

    this.showState = function(){
      if (this.curState === undefined){
        return undefined;
      }
      return this.curState.getName();
    }

  }
}
function assert(bool){
    if (bool){
        console.log("passed");
    }
    else{
        console.log("failed");
    }
}

function test1(){
    let fsa = new FSA();
    fsa.createState("s1", [{e2: "s2"}, {e3: "s3"}]);
    fsa.createState("s2", [{e1: "s1"}, {e3: "s3"}]);
    assert(fsa.showState() === "s1");
    fsa.nextState("e2");
    assert(fsa.showState() === "s2");
    fsa.nextState("e3");
    assert(fsa.showState() === "s3");
    assert(fsa.curState.transitions.length === 0);
}
function test2(){
  let fsa = new FSA();
  fsa.createState("s1", [{e2: "s2"}, {e2: "s3"}]);
  fsa.createState("s2", [{e1: "s1"}, {e3: "s3"}]);
  fsa.createState("s3", [{e1: "s1"}, {e2: "s2"}]);
  assert(fsa.curState.nextStates("e2").length === 2);
  assert(fsa.curState.nextStates("e2")[0].getName() === "s2");
  assert(fsa.curState.nextStates("e2")[1].getName() === "s3");
  let next = fsa.curState.nextState("e2").getName();
  assert(next === "s2" || next === "s3");
}
function test3(){
  let fsa = new FSA();
  fsa.createState("s1", [{e2: "s2"}, {e3: "s3"}]);
  fsa.createState("s2", [{e1: "s1"}, {e3: "s3"}]);
  fsa.createState("s3", [{e1: "s1"}, {e2: "s2"}]);
  fsa.nextState("e2").nextState("e3").nextState("e1");
  assert(fsa.showState() === "s1");
}
function test4(){
  let fsa = new FSA();
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
function test5(){
  let fsa = new FSA();
  fsa.createState("s1", []);
  fsa.addTransition("s1", {e2: "s2"});
  assert(fsa.curState.transitions.length === 1);
  fsa.nextState("e2");
  assert(fsa.showState() === "s2");
  assert(fsa.curState.transitions.length === 0);
}
function test6(){
  let fsa = new FSA();
  fsa.createState("s1", [{e2: "s2"}]);
  fsa.nextState("e2");
  assert(fsa.showState() === "s2");
  assert(fsa.curState.transitions.length === 0);
  fsa.addTransition("s2", {e3: "s3"});
  fsa.nextState("e3");
  assert(fsa.showState() === "s3");
  assert(fsa.curState.transitions.length === 0);
}


test1();
test2();
test3();
test4();
test5();
test6();
