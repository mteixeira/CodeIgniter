const initialState = {
    counter: 0,
    ActivePage: {type:"NONE", value:""},
    posts: [],
    medias: [],
    tags: [],
    carros: [],
    categorias: [],
    APPPATH: "/CodeIgniter",
}
const store = Redux.createStore(reducer, initialState);
