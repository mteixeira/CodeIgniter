const LoadersInitialState = objectMap(ActionTypes, (actionTypes)=>fetchInitialState)

const initialState = {
    APPPATH: '/CodeIgniter',
    paginaCorrente: "Projeto",//"Tarefa",//"Projeto",
    project_id: 4, 

    ActivePage: {type:"NONE", value:""},
    
    tarefas_: [],
    projetos: [],
	
	tarefasLoader: fetchInitialState, 
	tagsLoader: fetchInitialState, 
	taskWorksLoader: fetchInitialState, 
	tiposTarefasLoader: fetchInitialState, 

	...LoadersInitialState,
   	
   	activeWork: null,
    currentEdit:null,
    now:null,
	editModal: modalInitialState, 
	createModal: modalInitialState, 
}
const store = Redux.createStore(reducer, initialState);
