
function getAddReducer(tag) {
	return function (state = [], action)
	{
    	switch (action.type) {
			case tag:
            	return [...state, action.value];
	        default:
	            return state;
	    }
	}
}

function updateTarefasReducer(state = [], action)
{
	switch (action.type) {
		case UPDATE_TAREFAS:
        	return action.value;
        case PATCH_TASK:
			  return state.map((task, index) => {
				      if (task.id === action.value.id) {
				        return Object.assign({}, task, action.value.object)
				      }
				      return task
				    })

        	/*Object.assign({}, state, {
	        todos: [
	          ...state.todos,
	          {
	            text: action.text,
	            completed: false
	          }
	        ]
	      })
	      */

        default:
            return state;
    }
}

function updateAtivaReducer(state = null, action)
{
	switch (action.type) {
		case UPDATE_ATIVA:
        	return action.value?action.value:state;
        default:
            return state;
    }
}

const updateReducerGen = (type, defaultValue = [])=>(state = defaultValue, action)=>{

			console.log("updateReducerGen ", type)
	switch (action.type) {
		case type:
			console.log("Type Accepted ", type)
        	return action.value;
        default:
            return state;
    }
}



function clickEditReduc(state = null, action)
{
	switch (action.type) {
		case CLICK_EDIT:
        	return action.value;
        default:
            return state;
    }
}


const modalInitialState = {
	payload:{
		opened:false,
		item:null,
	}
}

function editModalReduc(state = modalInitialState, action)
{
	switch (action.type) {
		case EDIT_MOD_TYPES.OPEN:
        	return action;
		case EDIT_MOD_TYPES.CLOSE:
        	return action;
        default:
            return state;
    }
}

function createModalReduc(state = modalInitialState, action)
{
	switch (action.type) {
		case CREATE_MOD_TYPES.OPEN:
        	return action;
		case CREATE_MOD_TYPES.CLOSE:
        	return action;
        default:
            return state;
    }
}


const dumbReducer = (state = "", action)=>state



reducer = Redux.combineReducers(
	{
		tarefas_	: updateTarefasReducer,
		activeWork	: updateAtivaReducer,
		projetos: updateReducerGen(UPDATE_PROJETOS),
		currentEdit: updateReducerGen(CLICK_EDIT),

/*
		tarefasLoader: tarefaReducer, 
		tagsLoader: tagReducer, 
		taskWorksLoader: taskWorkReducer, 
		tiposTarefasLoader: tiposTarefasReducer, 
		tiposTarefasLoader: tiposTarefasReducer, 
*/		
		editModal: editModalReduc, 
		createModal: createModalReduc, 
		paginaCorrente: dumbReducer,
		project_id: dumbReducer,

		...ReducerBlocks,
		paginaCorrente: updateReducerGen(SELECT_PAGE, "Nenhuma"),

		//tarefas: tarefaReducer
	})
