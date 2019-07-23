
const FETCH_TAREFAS_BEGIN   = 'FETCH_TAREFAS_BEGIN';
const FETCH_TAREFAS_SUCCESS = 'FETCH_TAREFAS_SUCCESS';
const FETCH_TAREFAS_FAILURE = 'FETCH_TAREFAS_FAILURE';

const FETCH_TAGS_BEGIN   = 'FETCH_TAGS_BEGIN';
const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
const FETCH_TAGS_FAILURE = 'FETCH_TAGS_FAILURE';


const _op_ActionTypeCreator = (ACTION_TYPE_BASE, OPERATION)=>({
	BEGIN_TYPE: ACTION_TYPE_BASE+"."+OPERATION+"_BEGIN",
	SUCCESS_TYPE: ACTION_TYPE_BASE+"."+OPERATION+"_SUCCESS",
	FAILURE_TYPE: ACTION_TYPE_BASE+"."+OPERATION+"_FAILURE",

})

const _WS_ActionTypeCreator = (ACTION_TYPE_BASE)=>({
			fetch	:	_op_ActionTypeCreator(ACTION_TYPE_BASE, "FETCH"),
			add		: _op_ActionTypeCreator(ACTION_TYPE_BASE, "ADD"),
			patch: _op_ActionTypeCreator(ACTION_TYPE_BASE, "PATCH"),
})

const TASK_WORKS_ACTION_TYPES = _WS_ActionTypeCreator("TASK_WORKS")
const TIPOS_TAREFAS_ACTION_TYPES = _WS_ActionTypeCreator("TIPOS_TAREFAS")
const ADD_TAREFA_ACTION_TYPES = _WS_ActionTypeCreator("ADD_TAREFA")

const ActionTypes = {
	tarefas				: _WS_ActionTypeCreator("TAREFAS"),
	tags					: _WS_ActionTypeCreator("TAGS"),
	task_works		: _WS_ActionTypeCreator("TASK_WORKS"),
	tipos_tarefas	: _WS_ActionTypeCreator("TIPOS_TAREFAS"),
	add_tarefa		: _WS_ActionTypeCreator("ADD_TAREFA"),

}
const _op_ActionCreator = (BEGIN_ACTION_TYPE, SUCCESS_ACTION_TYPE, FAIILURE_ACTION_TYPE )=>({
	begin:()=>({
		type: BEGIN_ACTION_TYPE
	}),
	success: items=>({
		type: SUCCESS_ACTION_TYPE,
		payload:{items},
	}),
	failure : error=>({
	  type: FAIILURE_ACTION_TYPE,
	  payload: { error }
	})

})
const _op_ActionCreatorSimpl = (op)=> _op_ActionCreator(op.BEGIN_TYPE, op.SUCCESS_TYPE, op.FAILURE_TYPE )
const _ws_ActionCreatorSimpl = (ActionType)=>objectMap(ActionType, (actionOperation)=>_op_ActionCreatorSimpl(actionOperation))

const fetchActionCreator = (BEGIN_ACTION_TYPE, SUCCESS_ACTION_TYPE, FAIILURE_ACTION_TYPE )=>({
	begin:()=>({
		type: BEGIN_ACTION_TYPE
	}),
	success: items=>({
		type: SUCCESS_ACTION_TYPE,
		payload:{items},
	}),
	failure : error=>({
	  type: FAIILURE_ACTION_TYPE,
	  payload: { error }
	})

})

const fetchActionCreatorSimpl = (actionTypes)=> fetchActionCreator(actionTypes.BEGIN_TYPE, actionTypes.SUCCESS_TYPE, actionTypes.FAILURE_TYPE )

function objectMap(object, mapFn) {
  return Object.keys(object).reduce(function(result, key) {
    result[key] = mapFn(object[key], key)
    return result
  }, {})
}

/*
const mt2_fetch = {
	tarefas				: fetchActionCreator(FETCH_TAREFAS_BEGIN, FETCH_TAREFAS_SUCCESS, FETCH_TAREFAS_FAILURE),
	tags					:	fetchActionCreator(FETCH_TAGS_BEGIN, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAILURE),
	task_works		:	fetchActionCreatorSimpl(TASK_WORKS_ACTION_TYPES),
	tipos_tarefas	:	fetchActionCreatorSimpl(TIPOS_TAREFAS_ACTION_TYPES),
	add_tarefa		:	fetchActionCreatorSimpl(ADD_TAREFA_ACTION_TYPES),
}
*/

const mt_fetch = objectMap(ActionTypes, (actionType)=>_ws_ActionCreatorSimpl(actionType))


/*

const fetchTarefasBegin = () => ({
  type: FETCH_TAREFAS_BEGIN
});

const fetchTarefasSuccess = tarefas => ({
  type: FETCH_TAREFAS_SUCCESS,
  payload: { tarefas }
});

const fetchTarefasFailure = error => ({
  type: FETCH_TAREFAS_FAILURE,
  payload: { error }
});


function fetchTarefas2(query = {}) {
	let queryStr = query?"?"+Object.entries(query).map((a,b)=>a[0]+"="+a[1]).join("&"):""
  return dispatch => {
    dispatch(fetchTarefasBegin());
    return fetch("/CodeIgniter/index.php/api/v1/tarefas"+queryStr)
      .then(handleErrors)
      .then(res => res.json())
      .then(tarefas => {
      	console.log("Sucesso")
        dispatch(fetchTarefasSuccess(tarefas));
        return tarefas;
      })
      .catch(error => dispatch(fetchTarefasFailure(error)));
  };
}
*/

function WebServiceActionCreator(path, fetchObj, funcGetResult = (result)=>result){
	return (query = {}, params={})=> {
		let queryStr = query?"?"+Object.entries(query).map((a,b)=>a[0]+"="+a[1]).join("&"):""
	  return dispatch => {
	    dispatch(fetchObj.begin());
	    promise = fetch(path+queryStr, params)
	      .then(handleErrors)
	      .then(res => res.json())
	      .then(result => {
	      	items = funcGetResult(result)
	      	console.log("Fetch Sucesso", items)
	        dispatch(fetchObj.success(items));
	        return items;
	      });
	      promise.catch(error => dispatch(fetchObj.failure(error)));

	    return promise;
	  };
	}
}

const WSPath = {
	tarefas				: "/CodeIgniter/index.php/api/v1/tarefas",
	tags					:	"/CodeIgniter/index.php/api/v1/tags",
	task_works		:	"/CodeIgniter/index.php/api/v1/task_works",
	tipos_tarefas	:	"/CodeIgniter/index.php/api/v1/tipos_tarefas",
	add_tarefa		:	"/CodeIgniter/index.php/api/v1/tarefas",
}
const WSAction = objectMap(ActionTypes, (ActionType, key)=> 
		({
				fetch	: WebServiceActionCreator(WSPath[key], mt_fetch[key].fetch),
				add		: WebServiceActionCreator(WSPath[key], mt_fetch[key].add, (response)=>response.result),
				patch	: WebServiceActionCreator(WSPath[key], mt_fetch[key].patch, (response)=>response.data),
		})
	)
/*
const WSTarefas = WebServiceActionCreator("/CodeIgniter/index.php/api/v1/tarefas", mt_fetch.tarefas.fetch)
const WSTags = WebServiceActionCreator("/CodeIgniter/index.php/api/v1/tags", mt_fetch.tags.fetch)
const WSTaskWorks = WebServiceActionCreator("/CodeIgniter/index.php/api/v1/task_works", mt_fetch.task_works.fetch)
const WSTiposTarefas = WebServiceActionCreator("/CodeIgniter/index.php/api/v1/tipos_tarefas", mt_fetch.tipos_tarefas.fetch)
*/
const _callTarefas = WebServiceActionCreator("/CodeIgniter/index.php/api/v1/tarefas", mt_fetch.add_tarefa.add)


const WSPut = {
	tarefas: (parms)=>
	({
			method:"PUT",
	    body: JSON.stringify({
					titulo: "Tarefa Sem Nome",
					codigo: "",
					tipo_tarefa_id: 1,
					project_id: 0,
					detalhes: "",
					cli_id: 2,
					rank: 99,
					parent_task: "",
					data: new Date(),
					status: "Iniciada",
					...parms,
				}), // Coordinate the body type with 'Content-Type'
	    headers: new Headers({
		      'Content-Type': 'application/json'
		    }),

		}),
	task_works: (parms)=>
	({
			method:"PUT",
	    body: JSON.stringify({
					ts_inicio: new Date(new Date()+"GMT-00:00").toJSON().substr(0,19).replace("T", " "),
					...parms,
				}), // Coordinate the body type with 'Content-Type'
	    headers: new Headers({
		      'Content-Type': 'application/json'
		    }),

		}),
}

const WSPatch = {
	default: (parms)=>
	({
			method:"PATCH",
	    body: JSON.stringify({
					...parms,
				}), // Coordinate the body type with 'Content-Type'
	    headers: new Headers({
		      'Content-Type': 'application/json'
		    }),

		}),
	tarefas: (parms)=>
	({
			method:"PATCH",
	    body: JSON.stringify({
					...parms,
				}), // Coordinate the body type with 'Content-Type'
	    headers: new Headers({
		      'Content-Type': 'application/json'
		    }),

		}),

}

WSPatch.task_works = WSPatch.default

const addTaskFast = (nomeTarefa, project_id)=>{
return dispatch => {
	_callTarefas(
		{method:"PUT",
	    body: JSON.stringify({
					titulo: nomeTarefa,
					codigo: "",
					tipo_tarefa_id: 1,
					project_id: project_id,
					detalhes: "",
					cli_id: 2,
					rank: 99,
					parent_task: "",
					data: new Date(),
					status: "Iniciada",
				}), // Coordinate the body type with 'Content-Type'
	    headers: new Headers({
		      'Content-Type': 'application/json'
		    }),

		})(dispatch)
}}


function patchTarefa(id, prop, value, tarefa) {
	console.log("patchTarefa", id, prop, value)
	var o = {id}
	o[prop] = value
  return dispatch => {
    //dispatch(fetchTarefasBegin());
    //return patchRequest("/CodeIgniter/index.php/api/v1/tarefas/"+id, o)
    return patchRequest(tarefa._link.self[0].href, o)
      .then(resultado=>{
  		  	 dispatch(patchTask( resultado.data.id, prop, resultado.data[prop]))
	      	dispatch(clickEdit( resultado.data.id, "" ))
  		  	console.log("Sucesso ao Atualizar")
  		  })
      .catch(error => alert("Erro "+error.message));
  };
}


function putRequest(url, data) {
  return fetch(url, {
    credentials: 'same-origin', // 'include', default: 'omit'
    method: 'PUT', // 'GET', 'PUT', 'DELETE', etc.
    body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  })
  .then(handleErrors)
  .then(response => response.json())
}


function patchRequest(url, data) {
  return fetch(url, {
    credentials: 'same-origin', // 'include', default: 'omit'
    method: 'PATCH', // 'GET', 'PUT', 'DELETE', etc.
    body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  })
  .then(handleErrors)
  .then(response => response.json())
}


// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
