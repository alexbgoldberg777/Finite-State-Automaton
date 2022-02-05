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
