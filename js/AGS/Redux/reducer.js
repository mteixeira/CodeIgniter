
function reducer2(state = 0, action) {
    switch (action.type) {
        case 'INC':
            /*return {...state, counter: action.payload
            };
            */
            return action.payload
        case 'DEC':
            /*return {...state, counter: state.counter - 1
            };
            */
            //console.log('DEC', state)
            return state - 1
        default:
            return state;
    }
}

function PostReducer(state = {type:"Posts", value:null}, 
		action) {
    switch (action.type) {
        case "CLICK_POST":
            /*return {...state, ActivePage: action.pageClicked
            };
            */
            //console.log("state", state, action);
            return action.pageClicked;
        default:
            return state;
    }
}

function UpdatePostReducer(state = [], action) {
    switch (action.type) {
        case "UPDATE_POSTS":
            /*return {...state, ActivePage: action.pageClicked
            };
            */
            //console.log("state", state, action);
            return action.posts;
        default:
            return state;
    }
}

function UpdateMediaReducer(state = [], action) {
    switch (action.type) {
        case "UPDATE_MEDIA":
            return action.medias;
        default:
            return state;
    }
}

function UpdateTagsReducer(state = [], action) {
    switch (action.type) {
        case "UPDATE_TAGS":
            return action.tags;
        default:
            return state;
    }
}

function UpdateCarrosReduwcer(state = [], action) {
    switch (action.type) {
        case "UPDATE_CARROS":
            return action.carros;
        default:
            return state;
    }
}


function getUpdateReducer(tag) {
	return function (state = [], action)
	{
    	switch (action.type) {
			case tag:
            	return action.value;
	        default:
	            return state;
	    }
	}
}
const UpdateCarrosReducer = getUpdateReducer("UPDATE_CARROS")

reducer = Redux.combineReducers(
	{
		counter 	: reducer2, 
		ActivePage 	: PostReducer,
		posts 		: UpdatePostReducer,
		medias		: UpdateMediaReducer,
		tags  		: UpdateTagsReducer,
		carros 		: getUpdateReducer("UPDATE_CARROS"),
		categorias 		: getUpdateReducer("UPDATE_CATEGORIAS"),
	})

/*
function reducer(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
*/
