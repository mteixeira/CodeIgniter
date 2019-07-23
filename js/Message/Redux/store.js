const initialState = {
    counter: 0,
    ActivePage: {type:"NONE", value:""},
    messages: [],
}
const store = Redux.createStore(reducer, initialState);
