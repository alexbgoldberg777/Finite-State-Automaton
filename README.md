# Finite-State-Automata

This class implements a finite state automata class, with a state class within, to create a fluid version of the state design pattern. A state is represented by an object with two members: a string denoting its name, and an arry of transitions. Transitions denote the possible states reachable from the current state, and are represented as objects with a single member: the key of the object is the event on which the automaton moves to the next state, and a string of the name of the state it moves to. This class implements fluid design, where methods that modify the machine return the machine itself to allow for edits to the machine to be chained.

**Dependencies: N/A**
