
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



reducer = Redux.combineReducers(
	{
		messages: getAddReducer(ADD_MESSAGE),
	})
