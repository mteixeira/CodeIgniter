const UPDATE_TAREFAS = 'UPDATE_TAREFAS'
const UPDATE_ATIVA  = 'UPDATE_ATIVA'
const UPDATE_PROJETOS  = 'UPDATE_PROJETOS'
const CLICK_EDIT  = 'CLICK_EDIT'
const PATCH_TASK  = 'PATCH_TASK'

const SELECT_PAGE  = 'SELECT_PAGE'

const EDIT_TASK_OPEN  = 'EDIT.OPEN'
const EDIT_TASK_CLOSE  = 'EDIT.CLOSE'

const create_modal_types = (tp)=>({
	OPEN: tp+".OPEN",
	CLOSE: tp+".CLOSE",
})
const EDIT_MOD_TYPES = create_modal_types("EDIT")
const CREATE_MOD_TYPES = create_modal_types("CREATE")

function updateTarefas(value) {
  return {
    type: UPDATE_TAREFAS,
    value
  }
}

function updateAtiva(value) {
  return {
    type: UPDATE_ATIVA,
    value
  }
}

function updateProjetos(value) {
  return {
    type: UPDATE_PROJETOS,
    value
  }
}
function selectPage(value) {
  return {
    type: SELECT_PAGE,
    value
  }
}
function clickEdit(id, element){
	return {
		type: CLICK_EDIT,
		value:{
			id, 
			element
		}
	}
}




const create_modal_actions = (modTypes)=>({
	open :(content)=>({
		  type: modTypes.OPEN,
		  payload: {
		  	item: content,
		  	opened: true,
		  }
		}),
	close :(content)=>({
		  type: modTypes.OPEN,
		  payload: {
		  	item: content,
		  	opened: false,
		  }
		}),
	
})

const ModalActions = {
	edit: create_modal_actions(EDIT_MOD_TYPES),
	create: create_modal_actions(CREATE_MOD_TYPES),
}


function patchTask(id, element, value){
	var object = {}
	object[element] = value
	return {
		type: PATCH_TASK,
		value:{
			id, 
			element,
			value,
			object
		}
	}
}


