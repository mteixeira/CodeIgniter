const fetchInitialState = {
  items: [],
  loading: false,
  error: null
};
const tarefasInitialState = fetchInitialState;
const _ws_ReducerCreator = (
			ActionType,
			initialState = fetchInitialState) => 
		(state = initialState, action) =>{
			console.log("Reducer Function", ActionType, state, action)
  switch(action.type) {
    case ActionType.fetch.BEGIN_TYPE:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        adding: false,
        error: null
      };

    case ActionType.fetch.SUCCESS_TYPE:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        adding: false,
        items: action.payload.items
      };

    case ActionType.fetch.FAILURE_TYPE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        adding: false,
        error: action.payload.error,
        items: []
      };


    case ActionType.add.BEGIN_TYPE:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: false,
        adding: true,
        error: null
      };

    case ActionType.add.SUCCESS_TYPE:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        adding: false,
        items: [...state.items, action.payload.items],
      };

    case ActionType.add.FAILURE_TYPE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        adding: false,
        error: action.payload.error,
        items: state.items
      };

    case ActionType.patch.SUCCESS_TYPE:
			console.log("Reducer Patch Success", ActionType, ActionType.patch.SUCCESS_TYPE)
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      newState = {
        ...state,
        loading: false,
        adding: false,
        items: state.items.map((task, index) => {
        		//console.group("Reducer Map")
        		console.log("Reducer Map", task, index, action)
			      if (task.id == action.payload.items.id) {
			      	console.log("Reducer Map", task, action, action.payload.items)
			      	res = Object.assign({}, task, action.payload.items)
			      	console.log("result", res)
			        return res
			      }
			      return task
			    }),
			};
			console.log("New State", newState);
      return newState;

    

    case PATCH_TASK:
		  return {
		  	...state,
		  	loading: false,
        	items: state.items.map((task, index) => {
			      if (task.id === action.value.id) {
			        return Object.assign({}, task, action.value.object)
			      }
			      return task
			    })
		  }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
const fetchReducerCreatorSimpl = (actionTypes)=> _ws_ReducerCreator(actionTypes)

//const _op_ReducerCreatorSimpl = (actionTypeOperation)=> fetchReducerCreator(actionTypeOperation.BEGIN_TYPE, actionTypeOperation.SUCCESS_TYPE, actionTypeOperation.FAILURE_TYPE )

/*

const tagReducer = fetchReducerCreator(FETCH_TAGS_BEGIN, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAILURE)
const taskWorkReducer = fetchReducerCreatorSimpl(TASK_WORKS_ACTION_TYPES)
const tiposTarefasReducer = fetchReducerCreatorSimpl(TIPOS_TAREFAS_ACTION_TYPES)
const addTarefaReducer = fetchReducerCreatorSimpl(ADD_TAREFA_ACTION_TYPES)
*/

const ReducerBlocks = objectMap(ActionTypes, (ActionType)=>_ws_ReducerCreator(ActionType))


function tarefaReducer(state = tarefasInitialState, action) {
  switch(action.type) {
    case FETCH_TAREFAS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_TAREFAS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.tarefas
      };

    case FETCH_TAREFAS_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };


    case PATCH_TASK:
		  return {
		  	...state,
		  	loading: false,
        	items: state.items.map((task, index) => {
			      if (task.id === action.value.id) {
			        return Object.assign({}, task, action.value.object)
			      }
			      return task
			    })
		  }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
