//import Header from './components/Header';
//import {VisiblePage} from './components/VisiblePage.js';
//import store from '../Message/components/VisiblePage.js';
//import Container from 'react-bootstrap';


const Nav = ReactBootstrap.Nav;
const ListGroup = ReactBootstrap.ListGroup;
const NavDropdown = ReactBootstrap.NavDropdown;
const Container  = ReactBootstrap.Container;
const ProgressBar  = ReactBootstrap.ProgressBar;
const Modal  = ReactBootstrap.Modal;
const Fragment  = React.Fragment;
const useState  = React.useState;
//const useDrag  = ReactDnD.useDrag;

const connect  = ReactRedux.connect;

//const APPPATH = store.getState().APPPATH;
const APPPATH = "/CodeIgniter";

console.log(APPPATH)
const verbose = false;


/*
	class TaskObj extends React.Component {
		constructor(props) {
			super(props);
		    //console.log(this.props);
		    this.state = {
		    	clicked: false,
		    	text: this.props.value
		    };
		    this.handleChange = this.handleChange.bind(this);
		    //console.log(this.state);
		}

		editClick()
		{
			if (!this.state.clicked)
				this.setState({ clicked: true, text: this.props.value })

		}

		cancel()
		{
			console.log("Cancel");
			this.setState({ clicked: false, text: this.props.value })
		}
	  	save()
	  	{
	  		console.log("Save");
	  		this.setState({ clicked: false})

	  		if(this.state.modelProp)this.saveAjax(this.state.modelProp, this.state.text)

	  		this.props.onSave(this.state.text)
	  	}


	  	saveAjax(prop, val)
	  	{
	  		//alert(this.props.taskID)
	  		//return;
	  		controllers[this.props.taskID]._model[prop] = val
	  	}

	  	render(){

	  		return (
	      	<span
	      		className={this.props.spanClassNames}>
	        	{this.renderInside()}
	        </span>
	        );
	    }


	    renderInside()
	    {

		    if (this.state.clicked) {
		      return this.renderInputSpan();
		    } else {
		      return this.renderAnchor();
		    }
	    }

	    renderAnchorText()
	    {
	    	return this.props.value;
	    }
	    renderAnchor()
	    {
	    	return (
	    		<a
	    			onClick={()=>this.editClick()}
	    			className="mx-0 edits collapse show multi-collapse"
	    			aria-expanded="true" >{this.renderAnchorText()}</a>
	    		);
	    }
	    renderInput(){
	    	return (
	            	<input type="text"
	            		className="text-dark"
			            onChange={this.handleChange}
			            defaultValue={this.state.text}
			             />
	    		);
	    }
	    renderInputSpan()
	    {
	    	return (
	    		<span
		        		className="" aria-expanded="true"
		        		>
		            	{this.renderInput()}
		            	<i onClick={() => this.cancel()}  className="cancel fas fa-times-circle text-warning"></i>
		               	<i onClick={() => this.save()}   className="save fas fa-check text-success"  ></i>
		            </span>
	    		)
	    }



	    handleChange(e) {
	      this.setState({ text: e.target.value });
	    }
	}
	class Rank2 extends TaskObj {
		constructor(props){
			super(props);
			this.state = {  ...this.state, modelPsrop: "Rank" };

		}
	}
	class Titulo2 extends TaskObj {
		constructor(props){
			super(props);
			this.state = {  ...this.state, modelPsrop: "Titulo" };

		}
		renderAnchorText()
	    {
	    	return this.props.tarefa.id + " - " + this.props.value;
	    }

		renderAnchor()
		{
			//<!--{{entry.id}} - {{ entry.titulo }}-->
			return (
				<React.Fragment>
					<a href="#editTarefaModal"
						data-toggle="modal"
						className="multi-collapse">{this.renderAnchorText()}</a>
					<i
						onClick={()=>this.editClick()}
						className="edits fas fa-pencil-alt text-success p-2"
					></i>
				</React.Fragment>
			);
		}
	}

	class ClienteProjeto1 extends TaskObj {
		constructor(props){
			super(props);
			this.state = {  ...this.state, modelPsrop: "Projeto" };

		}

	    renderAnchorText()
	    {
	    	return "Cliente > " + projetos[this.props.value].title;
	    }

	    renderOption(value, text, selected)
	    {
	    	return <option key={value} value={value}>{ text }</option>;
	    	return selected ?
	    		(<option key={value} value={value} selected>{ text }</option>) :
	    		(<option key={value} value={value}>{ text }</option>) 	;
	    }

	    renderInput(){

	    	const entries = Object.values(projetos)

	    	const options = entries.map((projeto, k) => {
		       const id = projeto.id;
		       const title = projeto.title;
		       console.log(id);
		      return this.renderOption(id, title, id == this.props.value);
		    });

	    	return (
	        	<select
			        onChange={this.handleChange}
	        		defaultValue={this.props.value}>
	        		{options}
	        	</select>
	    	);
	    }

	}

*/

const _c = (f1, f2)=>(state, ownProps)=>{
	return {
		...(f1(state, ownProps)),
		...(f2(state, ownProps)),
	}
}

//Object.prototype.tarefa_ativa = ()=>(this.ts_final=="0000-00-00 00:00:00")
const diffTime = (tw)=>{return (new Date(tw.ts_final)- new Date(tw.ts_inicio))/1000}

let ConnectDefault={
	mapClickStateToProps : (state, ownProps) => {
	  return {

	    clicked: state.currentEdit?
	    	state.currentEdit.id+state.currentEdit.element ==
	    	ownProps.tarefa.id+"."+ownProps.campo:
	    	false,
	  }
	},
	mapTipoTarefaStateToProps:(state, ownProps) => {
		let tipoTarefa = state.tipos_tarefas.loading  || !ownProps.tarefa ? 
			null :
			state.tipos_tarefas.items.find(item=>item.id==ownProps.tarefa.tipo_tarefa_id)
		let tempoEstimado = !tipoTarefa ? 
					0:
					ownProps.tarefa.tempo_estimado !=="00:00:00"? 
						ownProps.tarefa.tempo_estimado:
						tipoTarefa.esforco_estimado
		return {
		tipoTarefa: tipoTarefa,
		tiposTarefasLoader: state.tipos_tarefas,
		tempoEstimado:tempoEstimado,
		}
	},
	mapTagStateToProps:(state, ownProps) => ({
		tags: !ownProps.tarefa ? [] : state.tags.items.filter(item=>item.task_id==ownProps.tarefa.id),
		tagsLoader: state.tags,
	}),
	mapTaskWorkStateToProps:(state, ownProps) => ({
		taskWorksLoader: state.task_works,
		taskWorks: !state.task_works.loading && !state.task_works.error ? state.task_works.items.filter(item=>item.task_id==ownProps.tarefa.id): [],
		totalWork: !state.task_works.loading && !state.task_works.error?
			state.task_works.items
				.filter(item=> item.ts_final!=="0000-00-00 00:00:00" && item.task_id==ownProps.tarefa.id)
				.map(tw=>diffTime(tw))
					.reduce((a = 0,n = 0)=>(a+n), 0):
					0,
	}),
	mapProjetoStateToProps:(state, ownProps) => ({
	    projetos: state.projetos,
	    projeto: !ownProps.tarefa ? null : state.projetos.find(projeto=>projeto.id == ownProps.tarefa.project_id)
	}),
	mergePropsPercentual :(propsFromState, propsFromDispatch, ownProps) => ({
		...ownProps,
		...propsFromState, 
		...propsFromDispatch,
	    percentual: (!verbose || 
	    			console.log("mapPercentualStateToProps",propsFromState, propsFromState.totalWork,propsFromState.tempoEstimado)==undefined) && 
	    	propsFromState && propsFromState.totalWork  && propsFromState.tempoEstimado ? 
	    	propsFromState.totalWork/propsFromState.tempoEstimado.toSeconds():
	    	0,
	}),
	mapAtivaStateToProps:(state, ownProps) => ({
	    activeWork: state.activeWork && (state.activeWork.task_id == ownProps.tarefa.id)? state.activeWork:{},
	    now: state.activeWork && (state.activeWork.task_id == ownProps.tarefa.id)?Date.now():null,
	    ativa: (!verbose || console.log("mapAtivaStateToProps",state, state.activeWork,ownProps.tarefa.id)==undefined) && 
	    		state.activeWork && (state.activeWork.task_id == ownProps.tarefa.id),
	    
	}),
	mapProjetoClickStateToProps:(state, ownProps)=>{
		return {
			...(ConnectDefault.mapClickStateToProps(state, ownProps)),
			...(ConnectDefault.mapProjetoStateToProps(state, ownProps)),
		};
	},
	mapTagClickStateToProps:(state, ownProps)=>{
		return _c(ConnectDefault.mapClickStateToProps, ConnectDefault.mapTagStateToProps)(state, ownProps)
	},
	//mapTagClickStateToProps : _c(ConnectDefault.mapClickStateToProps, ConnectDefault.mapTagStateToProps),

	mapTagClickStateToPropss:(state, ownProps)=>{
		return {
			...(ConnectDefault.mapClickStateToProps(state, ownProps)),
			...(ConnectDefault.mapTagStateToProps(state, ownProps)),
		};
	},

	mapAtivaClickStateToProps:(state, ownProps)=>{
		return {
			...(ConnectDefault.mapClickStateToProps(state, ownProps)),
			...(ConnectDefault.mapAtivaStateToProps(state, ownProps)),
		};
	},


	mapTarefasDispatchToProps: (dispatch, ownProps) => {
		if(verbose) console.log(ownProps)
	  return {
	   	editClick: () => {
			if(verbose) console.log("Edit Click" +ownProps.campo )
	     	dispatch(clickEdit( ownProps.tarefa.id, "."+ownProps.campo ))
	    },
	   	cancelClick: () => {
			if(verbose) console.log("Cancel Click" +ownProps.campo )
	      dispatch(clickEdit( ownProps.tarefa.id, "" ))
	    },
	   	saveClick: (value) => {
			if(verbose) console.log("Save Click" +ownProps.campo )
  		  patchTarefa(ownProps.tarefa.id, ownProps.campo, value, ownProps.tarefa)(dispatch)

	   		/*
  		  patchRequest("/CodeIgniter/index.php/api/v1/tarefas/"+ownProps.tarefa.id,
  		  		{
  		  				id:ownProps.tarefa.id,
  		  				project_id:value,
  		  		}
  		  	)
  		  .catch(resultado=>console.log("Erro", resultado))
  		  .then(resultado=>{
  		  	 dispatch(patchTask( resultado.data.id, "project_id", resultado.data.project_id))
	      	dispatch(clickEdit( resultado.data.id, "" ))
  		  	console.log("Sucesso ao Atualizar")
  		  })
  		  */

	    }
	  }
	},

	mapMainStateToProps: (state, ownProps) => {
		return {
	    	//active: ownProps.filter === state.ActivePage.type
	    	tarefas: state.tarefas.items,
	    	tarefasLoader: state.tarefas,
	    	loading: state.tarefas.loading,
	    	error: state.tarefas.error,
	    	activeWork: state.activeWork,
	  	}
	},

	mapMainDispatchToProps: (dispatch, ownProps) => {
		return {
		    onClick: () => {
			    dispatch(clickPost(
			      	{	
			      		type: ownProps.type, 
			      		value:ownProps.filter
			      	}
			    ))
		    },
		    create:()=>dispatch(ModalActions.create.open(null)),
		}
	},
}

const connectTarefaDefault = connect( 
	_c(ConnectDefault.mapClickStateToProps, ConnectDefault.mapAtivaStateToProps) , 
	ConnectDefault.mapTarefasDispatchToProps );


const RankComponent = ({rank, onCLick})=>{
	return (
		<a
	    			{...onCLick}
	    			className="mx-0"
	    			aria-expanded="true" >

	    			{ rank}
	    		</a>
	    )
}

let Rank = (props) => {
	let {tarefa, spanClassNames, clicked, editClick, cancelClick, saveClick, campo} = props
	//console.log(tarefa)
	//var selectedValue = tarefa.project_id
	const [selectedValue, setValue] = useState(tarefa[campo])
	return (
			<Switch spanClassNames={spanClassNames} clicked={clicked}>
				<RankComponent rank={tarefa[campo]} onClick={editClick} />
	    		<Fragment>
	    			<input type="text"
	            		className="text-dark"
			            onChange={(e)=>{console.log(e.currentTarget.value);return setValue(e.currentTarget.value)}}
			            defaultValue={tarefa[campo]}
		             />
	    			<Icon onClick={()=>{cancelClick();setValue(tarefa[campo])}}
	    				icon="times-circle"
	    				className="save text-warning" />
	    			<Icon onClick={()=>saveClick(selectedValue)}
	    				icon="check"
	    				className="save text-success" />
	    		</Fragment>
	    	</Switch>
		)
}

Rank = connectTarefaDefault(Rank)


let Titulo = (props) => {
	let {tarefa, spanClassNames, clicked, editTarefa, editClick, cancelClick, saveClick, campo} = props
	//console.log(tarefa)
	//var selectedValue = tarefa.project_id
	const [selectedValue, setValue] = useState(tarefa[campo])
	return (
		<Switch spanClassNames={spanClassNames} clicked={clicked}>
			<React.Fragment>
				<a href="#'editTarefaModal'"
					onClick={()=>editTarefa(tarefa)}
					data-toggle="modal"
					className="multi-collapse">{tarefa.id} - {tarefa[campo]}</a>
				<Icon
					onClick={editClick}
    				icon="pencil-alt"
					className="edit text-success p-2"
				/>
			</React.Fragment>

    		<Fragment>
    			<input type="text"
            		className="text-dark"
		            onChange={(e)=>{console.log(e.currentTarget.value);return setValue(e.currentTarget.value)}}
		            defaultValue={tarefa[campo]}
	             />
    			<Icon onClick={()=>{cancelClick();setValue(tarefa[campo])}}
    				icon="times-circle"
    				className="edit text-warning" />
    			<Icon onClick={()=>saveClick(selectedValue)}
    				icon="check"
    				className="save text-success" />
    		</Fragment>
    	</Switch>
		)
}

Titulo = connect( 
	_c(ConnectDefault.mapClickStateToProps, ConnectDefault.mapAtivaStateToProps) , 
	{editTarefa:ModalActions.edit.open, closeEdit:ModalActions.edit.close} 
	)(Titulo)


const Info = (props)=>{
	//<div className="col m-1">

	return (
		        <Col className="m-1 p-0">
		        	<Row className={props.className}>
		        		{props.children}
		        	</Row>
		        </Col>
		)

}

function Option(value, text, selected) {
	return <option key={value} value={value}>{ text }</option>;
}


let ProjetoOption = ({projeto})=> 
(
	<option key={projeto.id} value={projeto.id}>{ projeto.title }</option>
)

let TipoOption = ({tipo})=>(
	<option key={tipo.id} value={tipo.id}>{ tipo.nome }</option>
)

const Switch = ({spanClassNames, children, clicked})=>{
	return (
      	<span
      		className={spanClassNames}>
	        {React.Children.map(children, (child, i) => {
	          // Ignora o primeiro elemento filho
	          if ((!clicked) && (i < 1)) return child
	          if (clicked && (i == 1)) return child
	          return
	        })}
	      </span>
    )
}

let GenSelect = ({items, selecionado, handleChange, optionMap})=>{
	const options = items.map(optionMap);
	return (
        	<select
		        onChange={(e)=>handleChange(e.target.value)}
        		defaultValue={selecionado}>
        		{options}
        	</select>

	)
}


let ProjetosSelect = ({projetos, selecionado, handleChange})=>{
	return <GenSelect items={projetos} selecionado={selecionado} handleChange={handleChange}
		optionMap={(projeto, k) => (<ProjetoOption projeto={projeto}/>)} />
}
let TiposSelect = ({tipos, selecionado, handleChange})=>{
	return <GenSelect items={tipos} selecionado={selecionado} handleChange={handleChange}
		optionMap={(tipo, k) => (<TipoOption tipo={tipo}/>)} />
}

const Icon = (props)=>{
	let {onClick, icon, className} = props
	return (
		<i
			{...props}
			className={"fas fa-"+icon+" "+ (className?className:"")}>
		</i>
		)
}


let FormObj = (props) =>{
	let {controlID, label, type, placeholder, as} = props
	return (
		<Form.Group controlId={controlID}>
	    	<Form.Label>{label}</Form.Label>
	    	<Form.Control type={type} placeholder={placeholder} as={as}>
		        {props.children}
	    	</Form.Control>
	  	</Form.Group>
	)
}


let OptionIterator = ({iterable, optKey, optValue, optChildren})=>{
	let options = iterable.map((item)=><option key={item[optKey]} value={item[optValue]}>{item[optChildren]}</option>)
	return (
		<Fragment>
			{options}
		</Fragment>
	)
}


let ClienteProjeto = (props) => {
	let {tarefa, projetos, spanClassNames, clicked, editClick, cancelClick, saveClick, campo} = props
	//console.log(projetos, tarefa)
	//var selectedValue = tarefa.project_id
	const [selectedValue, setValue] = useState(tarefa[campo])
	return (
		<Switch spanClassNames={spanClassNames} clicked={clicked}>
			<a
    			onClick={editClick}
    			className="mx-0"
    			aria-expanded="true" >

    			Cliente > { projetos.length > 0 ?
    										projetos.find (projeto=>projeto.id == tarefa[campo]).title :
    										"Projeto..."
    									}
    		</a>
    		<Fragment>
    			<ProjetosSelect
    					projetos={projetos}
    					selecionado={tarefa[campo]}
    					handleChange={(valor)=>setValue(valor)}/>
    			<Icon onClick={()=>{cancelClick();setValue(tarefa[campo])}}
    				icon="times-circle"
    				className="save text-warning" />
    			<Icon onClick={()=>saveClick(selectedValue)}
    				icon="check"
    				className="save text-success" />
    		</Fragment>
    	</Switch>

		)
}


ClienteProjeto = connect( ConnectDefault.mapProjetoClickStateToProps, ConnectDefault.mapTarefasDispatchToProps )(ClienteProjeto)

let Tag = ({tag})=>{
	return (
		<span className="badge badge-pill gradient-1 " aria-hidden="true">{tag.tag}</span>
		)
}

let Tags = (props) => {

	console.group("Tags");
	console.log(tags)
	let {tarefa, tags, tagsLoader, spanClassNames, clicked, editClick, cancelClick, saveClick} = props

	const value = tags.map(tag=>tag.tag).join();
	console.log("tags", value)
	//console.log(projetos, tarefa)
	//var selectedValue = tarefa.project_id
	const campo = "id"
	const [inputText, setInputText] = useState(value)

	console.log("inputText", inputText)
	//{tags.map(tag=>tag.tag).join()}
	console.groupEnd("Tags");
	
	return tagsLoader.loading	?
			<p className={spanClassNames} >Tags...</p>
			:
			(
				<Switch spanClassNames={spanClassNames} clicked={clicked}>
					<a
		    			onClick={editClick}
		    			className="mx-0"
		    			aria-expanded="true" >
		    			{

		    				tags.length ? tags.map(tag=>(<Tag key={tag.id} tag={tag}/>))
		    				: "Sem Tags"
		    			}
		    		</a>
		    		<Fragment>
						<input
							className="Tag_input"
		        			onChange={(e)=>{return setInputText(e.currentTarget.value)}}
		        			defaultValue={value}
			            />
		    			<Icon onClick={()=>{cancelClick();setInputText(value)}}
		    				icon="times-circle"
		    				className="save text-warning" />
		    			<Icon onClick={()=>_saveClick(inputText)}
		    				icon="check"
		    				className="save text-success" />
		    		</Fragment>
		    	</Switch>

			)
}

Tags = connect(
	ConnectDefault.mapTagClickStateToProps, ConnectDefault.mapTarefasDispatchToProps
	)(Tags)

String.prototype.toSeconds = function () {
	var p = this.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
}
String.prototype.toLocaleDateString = function () {
	return new Date(this + " GMT-02:00").toLocaleDateString()
}

Number.prototype.toDDHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var days   = Math.floor(sec_num / (3600*24));
    var hours   = Math.floor((sec_num - (days*3600*24))  / 3600);
    var minutes = Math.floor((sec_num - (days*3600*24) - (hours * 3600)) / 60);
    var seconds = sec_num - (days*3600*24) - (hours * 3600) - (minutes * 60);

    //if (days   < 10) {days   = "0"+days;}
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return (days>0? days+":":"0:") + hours+':'+minutes+':'+seconds;
}

let Progresso = ({tarefa, valor, ativa, 
				totalWork, taskWorksLoader, 
				activeWork, now, tempoEstimado, 
				tipoTarefa, tiposTarefasLoader, percentual})=>
{
	let actWork = Object.assign({}, activeWork, {ts_final: now })
	let actTime = ativa?diffTime(actWork):0
	tempoEstimado = tempoEstimado ? tempoEstimado : totalWork?totalWork.toDDHHMMSS():"00:01:00"

	let tempoTotal = !taskWorksLoader || taskWorksLoader.loading ? "Carregando...":(totalWork+actTime).toDDHHMMSS();

	/*

			<div className="Progresso w-50 m-2 small align-self-center progress no-gutters" style={{height: 10+"px"}}>
				<div className="progress-bar gradient-1" style={{width: percentual*100+"%"}} role="progressbar">
					<span className="sr-only">{percentual*100}% Complete ({tempoTotal})</span>
				</div>
			</div>
	*/
	//{tarefa?tarefa.tempo_estimado:"Carregando..."} {tempoTotal} {tempoEstimado} {percentual*100}%
	if(ativa)
		return (
			<ProgressBar now={percentual*100} variant="info"  className="w-50 m-2 small"  style={{height: 10+"px"}} />
		)
	else
		return (<Fragment></Fragment>)
}
Progresso = connect(
	 _c(
	 	_c(ConnectDefault.mapAtivaStateToProps, 
	 		ConnectDefault.mapTipoTarefaStateToProps
		 ), 
	 	ConnectDefault.mapTaskWorkStateToProps
	 ),//_c(ConnectDefault.mapAtivaStateToProps)
	 ConnectDefault.mapTarefasDispatchToProps,
	 ConnectDefault.mergePropsPercentual

)(Progresso)

let DataDesejada = (props) => {
	let {tarefa, spanClassNames, clicked, editClick, cancelClick, saveClick, campo, ativa} = props
	//console.log(projetos, tarefa)
	//var selectedValue = tarefa.project_id
	const [selectedValue, setValue] = useState(tarefa[campo])
	if(ativa)
		return (
				<Switch spanClassNames={spanClassNames} clicked={clicked}>
					<a
		    			onClick={editClick}
		    			className="mx-0"
		    			aria-expanded="true" >

		    			{ tarefa[campo].toLocaleDateString()}
		    		</a>
		    		<Fragment>
		    			<input type="text"
		            		className="text-dark"
				            onChange={(e)=>{console.log(e.currentTarget.value);return setValue(e.currentTarget.value)}}
				            defaultValue={tarefa[campo]}
			             />
		    			<Icon onClick={()=>{cancelClick();setValue(tarefa[campo])}}
		    				icon="times-circle"
		    				className="save text-warning" />
		    			<Icon onClick={()=>saveClick(selectedValue)}
		    				icon="check"
		    				className="save text-success" />
		    		</Fragment>
		    	</Switch>
			)
	else
		return (<Fragment></Fragment>)

}

DataDesejada = connectTarefaDefault(DataDesejada)

let EsforcoEstimado = (props) => {
	let {tarefa, spanClassNames, clicked, editClick, cancelClick, saveClick, campo, ativa} = props
	//console.log(projetos, tarefa)
	//var selectedValue = tarefa.project_id
	const [selectedValue, setValue] = useState(tarefa[campo])
	if(false)
		return (
				<Switch spanClassNames={spanClassNames} clicked={clicked}>
					<a
		    			onClick={editClick}
		    			className="mx-0"
		    			aria-expanded="true" >

		    			{ tarefa[campo]}
		    		</a>
		    		<Fragment>
		    			<input type="text"
		            		className="text-dark"
				            onChange={(e)=>{console.log(e.currentTarget.value);return setValue(e.currentTarget.value)}}
				            defaultValue={tarefa[campo]}
			             />
		    			<Icon onClick={()=>{cancelClick();setValue(tarefa[campo])}}
		    				icon="times-circle"
		    				className="save text-warning" />
		    			<Icon onClick={()=>saveClick(selectedValue)}
		    				icon="check"
		    				className="save text-success" />
		    		</Fragment>
		    	</Switch>
			)
	else
		return (<Fragment></Fragment>)

}

EsforcoEstimado = connectTarefaDefault(EsforcoEstimado)

//Progresso = ClienteProjeto(Progress)

function BotaoAction(props)
{
	return (
		<button 
			onClick= {props.onClick}
        	className={props.btnClassName}>
        	<Icon className={props.iconClassName + "work_icon " + (props.ativa ? "pr-lg-4":"")}
        		icon={props.icon}
        		id={props.iconID}/>
        	<span className={props.spanClassname}>{props.texto}</span>
        </button>
	)
}
function BotaoEntregar(props)
{
	let {tarefa, ativa} = props
	return (
		<BotaoAction 
			{...props}
			btnClassName="Entregar 	btn btn-primary px-lg-5 p-2 mx-2 "
			iconClassName=""
			ativa={ativa}
        	icon="stop"
			iconID={"icon_stop_act_" + tarefa.id}
			spanClassname={"d-none " + (ativa ? 'd-lg-inline':'')}
			texto="Entregar"
		/>

	)
}
function BotaoExecutar(props)
{
	let {tarefa, ativa} = props
	return (
		<BotaoAction 
			{...props}
			btnClassName="Trabalhar btn-circle start_work 	btn btn-primary px-lg-4 p-2 mx-2 " 
			iconClassName=""
        	icon={ativa? "pause" : "play"}
			iconID={"icon_work_act_" + tarefa.id}
			spanClassname={"d-none " + (ativa ? 'd-lg-inline':'')}
			texto={(ativa ? 'Pausar':'Trabalhar')}
		/>

	)
}

function ButtonContainer(props){
	return (
		<Col xs={12} md={3} className="ButtonContainer align-self-center justify-content-around d-inline-block bordedrRed">
			<Row className="justify-content-around align-items-center">
				<Col >
					<BotaoEntregar {...props} 
						onClick={()=> console.log("Entregar tarefa ", props.tarefa)}
					/>
				</Col>
				<Col >
					<BotaoExecutar 
						xs={6} 
						{...props} 
							onClick={()=>{
								console.log("Executar tarefa ", props.tarefa)
								// Fecha todas as tarefas
								WSAction.task_works.patch({ts_final:"0000-00-00%2000:00:00"}, 
									WSPatch.tarefas({
										ts_final:new Date(new Date()+"GMT-00:00").toJSON().substr(0,19).replace("T", " ")
									}))
								(store.dispatch)								
								if(!props.ativa){
									WSAction.task_works.add({}, 
										WSPut.tarefas({
											task_id:tarefa.id,
											usuario_id:"2"
										}))
									(store.dispatch)	
								}
							}
						}
						/>
				</Col>
			</Row>
         </Col>
		)
}

const TarefaCard=({tarefa, ativa})=>{
	//<Card.Header>{tarefa.titulo}</Card.Header>
			  /*
	  			<Card.Header>
	  			</Card.Header>*/
	const infoClass = "m-0 justify-content-around_ " + (ativa ? 'd-inline-block' : 'd-flex' );
	return (
			<Card
			className={"card Tarefa bb_t"+tarefa.tipo_tarefa_id +"  "+
	  			(ativa ? 'task_running' : '' )}
	  			>
				<Row className="border-left-primary card-header justify-content-between px-4 mx-0 align-items-start">
				  	<Rank
				    	tarefa={tarefa}
					    campo="rank"
				    	spanClassNames="Rank d-nsoneee d-inline-block badge badge-pill gradient-1 float-left h-25 mt-2 "
				    	/>
			    	<Info className={infoClass} >
		  				<Titulo
						    	tarefa={tarefa}
					    		campo="titulo"
				    			spanClassNames="Titulo mx-1 my-2 col-6 font-weight-bold"
						    />

					    <ClienteProjeto
						    tarefa={tarefa}
					    	campo="project_id"
			    			spanClassNames="Info Link d-block my-2"
					    />



						<Progresso
						    tarefa={tarefa} valor={0}
			    			/>

						<DataDesejada 
						    	tarefa={tarefa} 
						    	campo="data"
				    			spanClassNames="Data m-2"
				    	/>

						<EsforcoEstimado 
						    	tarefa={tarefa} 
						    	campo="data"
				    			spanClassNames="Estimado my-2"
				    	/>


					    <Tags
						    tarefa={tarefa}
					    	spanClassNames="Tags my-2 col-1"
					    />
					</Info>

		        <ButtonContainer 
		        	ativa={ativa} 
		        	tarefa={tarefa} 
		        	/>
				</Row>
			</Card>
		)
		/*
				     {activeElements}
					    <Tags
					    	taskID={this.state.taskID}
					    	value={this.props.data.tags}
					    	tags={this.props.data}
					    	tags2={tags}
					    	onClick={()=>console.log(this.props.data.tags)}
			    			onSave={(tags) => this.update({tags: tags})}
			    			spanClassNames="Tags my-2 col-1"
			    		/>

			  <Card.Body>
			    <Card.Title>{tarefa.id} - {tarefa.titulo} {ativa? "(ATIVA)":""}</Card.Title>
			    <Card.Text>
			      {tarefa.detalhes}
			    </Card.Text>
			    <Button variant="primary">Go somewhere</Button>

			  </Card.Body>
		*/
}


const Tarefas=({ tarefas, activeWork, tarefasLoader, create })=>{
	console.group("Tarefas");
	console.log(tarefas, activeWork)
	console.log(tarefas?tarefas.map:"")
	/*let tarefaBlocks = tarefas.length>0?
		tarefas.map(
			(tarefa)=>
				(<TarefaCard
					key={tarefa.id}
					activeWork={ativa?(ativa.task_id == tarefa.id):false}
					tarefa={tarefa}/>))
		:(<h1>Sem Tarefas</h1>)
	*/
	let tarefaBlocks = 
			tarefasLoader.loading || tarefasLoader.error ?  
				(<Fragment/>):
				tarefas.filter(tarefa=>!activeWork || activeWork.task_id !== tarefa.id)
					.map(
					(tarefa)=>
						(<TarefaCard
							key={tarefa.id}
							ativa={activeWork?(activeWork.task_id == tarefa.id):false}
							tarefa={tarefa}/>))
	
	let tarefaAtivaBlock = 
			tarefasLoader.loading || tarefasLoader.error ?  
				(<Fragment/>):
				tarefas.filter(tarefa=>activeWork && activeWork.task_id == tarefa.id)
				.map(
				(tarefa)=>
					(<TarefaCard
						key={tarefa.id}
						ativa={activeWork?(activeWork.task_id == tarefa.id):false}
						tarefa={tarefa}/>))	

	if(verbose) console.log(tarefaBlocks);

	console.groupEnd("Tarefas");
	return (
		<Card style={{backgroundColor:"#ccc"}}>
			<Card.Body>
			<Card.Title>
			<Row className="d-sm-flex justify-content-between mb-4">
			    <Col>
			     	<h4 className="h3 mb-4 text-gray-800">Tarefas </h4>
			    </Col>
			    <Col>
			      	<Button variant="primary" onClick={()=>create()}>
						<Icon icon="download" className="fa-sm text-white-50"/>
			          	Criar Tarefa
			        </Button>
			    </Col>
			</Row>
			</Card.Title>
			

			{tarefasLoader.loading? (<h1>Loading...</h1>):
					tarefasLoader.error? (<h1>Error! {error.message}</h1>):<Fragment/>}
			{tarefaAtivaBlock}
			{tarefaBlocks}
			</Card.Body>
		</Card>
		)
}

const ListaTarefas = connect(
  ConnectDefault.mapMainStateToProps,
  ConnectDefault.mapMainDispatchToProps
)(Tarefas)

const ModalComponents = {

	DetalhesRow :({titulo, valor})=>{
		return (
			<Row className="h-25 align-items-center">
				<Col xs={3} className="small text-black-50 font-weight-bold">{titulo}: </Col>
				<Col xs={9}><a className="edit">{valor}</a></Col>
	   		</Row>
		)
	},

	Detalhes2Row :({titulo, valor})=>{
		return (
			<Row className="align-items-center mx-0 my-2 d-block">
				<Col className="small text-black-50 d-block font-weight-bold">{titulo}: </Col>
				<Col className="d-block font-weight-bold">{valor}</Col>
	   		</Row>
		)
	},	

	Progress: ({titulo, valor})=>{
		return (
			<Row className="align-items-center mx-0 my-2 d-block">
				<Col className="small text-black-50 d-block font-weight-bold">Progresso: </Col>
				<ProgressBar now={0.5*100} variant="info"  className="bg-white my-1"  style={{height: 5+"px"}} />

	   		</Row>
		)
	},
	EditModal :({data, tipoTarefa, projeto, tags, dispatch})=>{
		const tarefa = data.item
		const opened = data.opened

		console.group("EditModal");
		/*

		        		<div className="h-25 row align-items-center" hidden>
		        			<span className="col-3 small text-black-50 font-weight-bold">Tags: </span>
		        			<span className="col-9 " id="modal-task-tags"><a className="edit">Nenhuma</a></span>

		        			<div id="myForm" className="hide" hidden>
							    <form action="/echo/html/" id="popForm" method="get">
							        <div>
							            <label htmlFor="name">Name:</label>
							            <input type="text" name="name" id="name" className="form-control input-md"/>
							        </div>
							    </form>
							</div>
		        		</div>
		*/
		if(!opened) {
			console.groupEnd("EditModal");
			return (<Fragment/>)
		}

		console.log(tags, tags.map(tag=>tag.tag))

		console.groupEnd("EditModal");
		return (
			<Modal
			  size="lg"
	          show={opened}
	          onHide={()=>dispatch(ModalActions.edit.close(null))}
	          dialogClassName="modal-90w modal-xl"
	          aria-labelledby="example-modal-sizes-title-lg"
	          centered
	        >
		        <Modal.Header closeButton>
					<div >
			            <Modal.Title id="example-modal-sizes-title-lg">
			              {tarefa.titulo}
			            </Modal.Title>
			            <span className="small">#<span id="modal-task-id">{tarefa.id}</span> - Criado em  <span id="modal-task-createdAt">{tarefa.created_at}</span></span>
			            <div className="Work-actions w-25 mt-5 mx-5 align-self-end d-inline">
							<button type="button" className="btn btn-success mr-2 px-5">00:20</button> 
							<button type="button" className="btn btn-primary px-5">Encerrar</button> 
						</div>
						<RankComponent rank={tarefa.rank} onClick={()=>console.log("Clicou Rank")} />
			        </div>
		        </Modal.Header>
		        <Modal.Body className="p-0">
			          	<Row className="Detalhes-2 Task_bg_gray_e Task_h-10 d-flex  mx-0">
			          		<Col xs={6} className="border-right rounded TODO_CHECAR_REMOVER">
			          			<ModalComponents.DetalhesRow titulo="Tipo" valor={tarefa.status}/>
			          			<ModalComponents.DetalhesRow titulo="Status" valor={tipoTarefa.nome}/>
			          			<ModalComponents.DetalhesRow titulo="Cliente > Projeto" valor={"Cliente > " + projeto.title}/>
			          			<ModalComponents.DetalhesRow titulo="Tags" valor={tags.length?tags.map(tag=>tag.tag).join():"Sem Tags"}/>
				        	</Col>
				        	<Col xs={2} className="border-right rounded ">
				        		<ModalComponents.Detalhes2Row titulo="Esforço Total" valor="08:00"/>
				        		<ModalComponents.Detalhes2Row titulo="Total Trabalhado" valor="08:00"/>
				        		<ModalComponents.Progress />
				        	</Col>
				        	<Col xs={2} className="border-right rounded">

				        		<div className="row align-items-center mx-0 my-2 d-block">
				        			<span className="small text-black-50 d-block">Inicio: </span>
				        			<span className="d-block font-weight-bold">30 JAN</span>
				        		</div>
				        	</Col>
				        	<Col xs={2} className="rounded">

				        		<div className="row align-items-center mx-0 my-2 d-block">
				        			<span className="small text-black-50 d-block">Data de Entrega: </span>
				        			<span className="d-block font-weight-bold">10 FEV</span>
				        		</div>
				        	</Col>

			        	</Row>
		        </Modal.Body>
		        <Modal.Footer>
			        <button type="button" className="option1 " href="#editTarefaDetalhesModal"  data-toggle="modal"  aria-label="Detalhes">
			          <i className="fas fa-info-circle"></i>
			        </button>
			        <a id="editID" type="button" className="btn edit1 " href="">
			          <i className="fas fa-info-circle"></i>
			        </a>
			        <button type="button" className="option1 mr-auto" href="#editTarefaDetalhesModal"  data-toggle="modal"  aria-label="Detalhes">
			          <i className="fas fa-calendar-alt"></i>
			        </button>
			        <Button onClick={()=>dispatch(ModalActions.edit.close(null))}>Fechar</Button>
			        <Button className="btn btn-primary">Enviar</Button>
		        </Modal.Footer>
	        </Modal>
	    )
	},


	FormCreate : ({projetos})=>{
		return (
			<Form>
				<FormObj controlID="createForm.Codigo" label="Codigo" type="text" placeholder="S0001" />
				<FormObj controlID="createForm.Titulo" label="Titulo" type="text" placeholder="Insira um Titulo" />
				<FormObj controlID="createForm.Tipo_tarefa" label="Tipo de Tarefa" as="select" >
					<OptionIterator iterable={projetos} optKey="id" optValue="id" optChildren="title"/>
				</FormObj>
				
			  	<Form.Group controlId="exampleForm.ControlTextarea1">
			    	<Form.Label>Example textarea</Form.Label>
			    	<Form.Control as="textarea" rows="3" />
			  	</Form.Group>
			</Form>
		)
	},


	CreateModal : ({projetos, dispatch, data})=>{
		console.group("CreateModal");
		const opened = data.opened
		if(!opened) {
			console.groupEnd("CreateModal");
			return (<Fragment/>)
		}

		console.log(projetos, projetos.map(projeto=>projeto.title))

		console.groupEnd("CreateModal");
		return (
			<Modal
			  size="lg"
	          show={opened}
	          onHide={()=>dispatch(ModalActions.create.close(null))}
	          dialogClassName="modal-90w modal-xl"
	          aria-labelledby="example-modal-sizes-title-lg"
	          centered
	        >
		        <Modal.Header closeButton>
		            <Modal.Title id="example-modal-sizes-title-lg">
		              Criar uma Tarefa
		            </Modal.Title>
		        </Modal.Header>
		        <Modal.Body >
			        <ModalComponents.FormCreate projetos={projetos}/>
		        </Modal.Body>
		        <Modal.Footer>
			        <Button className="btn btn-secondary" onClick={()=>dispatch(ModalActions.create.close(null))}>Fechar</Button>
			        <Button className="btn btn-secondary">Salvar</Button>
			        <Button className="btn btn-primary">Salvar e Criar Outra</Button>
		        </Modal.Footer>
	        </Modal>
	    )
	},

	connect :()=>{
		ModalComponents.EditModal = connect(
			(state,ownProps)=>({
				teste: console.log("EditModalStateToProps", state.editModal),
				data: state.editModal.payload,
				...(ConnectDefault.mapTipoTarefaStateToProps(state, {...ownProps, tarefa:state.editModal.payload.item})),
				...(ConnectDefault.mapProjetoStateToProps	(state, {...ownProps, tarefa:state.editModal.payload.item})),
				...(ConnectDefault.mapTagStateToProps		(state, {...ownProps, tarefa:state.editModal.payload.item})),
			})
			)(ModalComponents.EditModal)


		ModalComponents.CreateModal = connect(
			(state,ownProps)=>({
				teste: console.log("EditModalStateToProps", state.editModal),
				data: state.createModal.payload,
				...(ConnectDefault.mapTipoTarefaStateToProps(state, ownProps)),
				...(ConnectDefault.mapProjetoStateToProps	(state, ownProps)),
			})
			)(ModalComponents.CreateModal)

	}
}
ModalComponents.connect()

const TaskListComponents = {
	
	TodoList: ({tarefas, loading, projeto, dispatch})=>{
		if(loading) return <h2>Loading...</h2>
		/*

            <li><label><input type="checkbox"/><i></i><span>Get up</span><a href='#' class="ti-trash"></a></label></li>
            <li><label><input type="checkbox" checked/><i></i><span>Stand up</span><a href='#' class="ti-trash"></a></label></li>
            <li><label><input type="checkbox"/><i></i><span>Don't give up the fight.</span><a href='#' class="ti-trash"></a></label></li>
            <li><label><input type="checkbox" checked/><i></i><span>Do something else</span><a href='#' class="ti-trash"></a></label></li>
		*/
		const checked = {checked:true}

		const [dragFunc, setDragFunc] = useState(null)
		let [dragDrop, setDragDrop] = useState({dragged:null, draggedTarget:null,over:null, overTarget:null, placement:""})

		return (
			<div className="_todo-list">
                <div className="_tdl-holder m-0 m-auto">
                    <div className="_tdl-content">
                    	<div className="__slimScrollDiv position-relative w-auto overflow-auto" 
                    		style={{
                    			//overflow: "auto",
                    			//overflow: "hidden",
                    			height: "250px",
                    		}}>
	                        <ListGroup id={"_todo_list_"+projeto.id} 
	                        	className="m-0 p-0 list-group" 
	                        	style={{listStyle: "none",}}
	                        	/*
		                        	onDragOver={(e)=>e.preventDefault()}
		                        	onDrop={(e)=>{
		                        		let id = e.dataTransfer.getData("id");

		                        	}}
		                        	//onMouseUp={()=>{console.log("ContMouseUp");(dragFunc?dragFunc(false):console.log("Sem Controle")); setDragFunc(null)}}
	                        	*/
	                        	>
	                        	{tarefas
	                        		.filter(tarefa=>['Iniciada', 'Em Andamento',].includes(tarefa.status))
	                        		.map((tarefa, idx)=>{
	                        			/*
	                        			const [{ opacity }, dragRef] = useDrag({
										    item: { type: "TASKLI", id:tarefa.id },
										    collect: monitor => ({
										      opacity: monitor.isDragging() ? 0.5 : 1,
										    }),
										  })
									  	*/

										const [isDragging, setDragging] = useState(false)
										
										let draggable = isDragging ?true: null;
									  	let dragRef = null
									  	let opacity = isDragging ? 0.5 : 1
		                        		return (
		                        			<ListGroup.Item key={tarefa.id} 
			                        			className={"m-0 p-0 border-bottom-1 ts"+idx} 
			                        			draggable={draggable}
			                        			onDragStart={(e)=>{
			                        				console.log('dragStart', tarefa.id);
			                        				e.dataTransfer.setData("id", tarefa.id);
			                        				setDragDrop(Object.assign(dragDrop, {dragged:tarefa, draggedTarget: e.currentTarget}))


			                        			}}
			                        			onDragOver={(e)=>{
			                        				console.log('dragOver', tarefa.id);
			                        				//if(dragDrop.over === tarefa) return 
			                        				console.log(tarefa)
			                        				let over = e.target
			                        				setDragDrop(Object.assign(dragDrop, {over:tarefa, overTarget:over}))
			                        				//console.log(d)
			                        				var relY = e.pageY - over.offsetTop;
			                        				var height = over.offsetHeight / 2;
									                var relX = e.pageX - over.offsetLeft;
									                var width = over.offsetWidth / 2;

			                        				console.log(relY, height, relX, width)
			                        				if(relY>=height)
			                        				{
			                        				    setDragDrop(Object.assign(dragDrop, {placement:"after", }))
			                        				} else {
			                        					setDragDrop(Object.assign(dragDrop, {placement:"before", }))
			                        				}
			                        				console.log(dragDrop)

			                        			}}

			                        			onDragEnd={(e)=>{
			                        				console.log('dragEnd', tarefa.id, dragDrop);
			                        				if(!dragDrop.over) return;
			                        				e.dataTransfer.setData("id", tarefa.id);
			                        				setDragDrop(Object.assign({},dragDrop, {dragged:tarefa, draggedTarget: e.currentTarget}))
			                        				console.log(dragDrop.dragged, dragDrop.over, dragDrop.placement)

			                        				let from = dragDrop.dragged.rank
			                        				let to = dragDrop.over.rank

			                        				let minRank = Math.min(from, to)
			                        				let maxRank = Math.max(from, to)
			                        				console.log(minRank, maxRank)
			                        				tarefas.filter(tarefa=>dragDrop.dragged)

			                        			}}
			                        			ref={dragRef} 
			                        			style={{
			                        				listStyle: "none none",
			                        				opacity
			                        			}}>

			                        			<label style={{cursor:"pointer", lineHeight:"52px", color: "#464a53"}} 
			                        				className="d-block pl-3 m-0">
			                        				<Icon icon="bars"
			                        					className="mr-3"
					                        			onMouseDown={()=>{console.log("okd");setDragFunc(setDragging);setDragging(true); }}
					                        			onMouseUp={()=>{console.log("oku");/*setDragging(false)*/}}
					                        			tabIndex="0"
				                        			> 
				                    					<a 
				                    						 
					                        				className="ti-trash"></a>
				                    				</Icon>

			                        				<input type="checkbox" checked={null}  
				                        				className="position-absolute"
				                        				style={{
				                        					cursor:"pointer", 
				                        					opacity: 0,
				                        				}}
				                        				/>
			                        				<i 
				                        				className="position-absolute d-block"
				                        				style={{
				                        						backgroundColor	: "#ddd"	, 
				                        						height			: "20px"	, 
				                        						top				: "15px"	, 
				                        						left			: "32px"	, 
				                        						width			: "20px"	,
				                        						//zIndex			: "1"		,
				                        						...(['Concluida',].includes(tarefa.status)?
				                        							{borderColor:"#464a53"}:
				                        							{}
				                        						)
				                        					}}

				                        					onClick={()=>
				                        						{
					                        						console.log("Encerrar", tarefa);
					                        						WSAction.tarefas.patch({id: tarefa.id }, WSPatch.tarefas({ id : tarefa.id, status:"Concluida"}))
					                        							(store.dispatch)
				                        						}
				                        					}
				                        					//After? Verificar bloco after no css styles.css
				                        			></i>
			                        				<span 
			                        					className="ml-3 font-weight-normal align-middle"
			                        					style={{transition:"all 0.2s linear"}}
			                        					// Verificar bloco ~span no css styles.css

				                        				onClick={(e)=>
				                    							{
					                        						console.log("Bars", tarefa);
					                        						store.dispatch(ModalActions.edit.open(tarefa))
					                        					}
					                        				}
			                        					>{tarefa.titulo}</span>
			                        				<a href='#' className="ti-trash h-100 py-3 px-0 d-inline-block position-absolute" // d-flex"
			                        						style={{
			                        								color			: "#464a53"	, 
			                        								lineHeight		: "normal"	, 
			                        								textAlign		: "center"	, 
			                        								textDecoration	: "none"	,
			                        								width			: "50px"	,
			                        								transition		: "all 0.2s linear"	,
			                        								fontSize		: "18px"	,
			                        								right			: "0"	,
			                        								/*
			                        								*/
			                        							}}
			                        				></a>
			                        			</label>
			                        		</ListGroup.Item>
		                        		)
	                        		}
	                        	)}
	                        </ListGroup>
	                    </div>
                    </div>
                    <div className="px-4">
                        <input 
                        	type="text"  
                        	className="_tdl-new form-control mt-2 border rounded border-dark" 
                        	placeholder="Write new item and hit 'Enter'..."
                        	style={{
                        		backgroudColor: "#fff",
                        		height:"40px",
                        	}}
                        	onKeyPress={
                        		(e)=>{
                        			var code = (e.keyCode ? e.keyCode : e.which);
        							if (code == 13) {
        								//var v = $(this).val();
        								var v = e.currentTarget.value;
        								var s = v.replace(/ +?/g, '');
        								e.currentTarget.value = ""
        								if (s == "") {
        								    return false;
        								} else {
        									//addTaskFast(v, projeto.id)(dispatch)	
        									WSAction.tarefas.add({},WSPut.tarefas({titulo:v, project_id: projeto.id}))(dispatch)
        								}
        							}
                        			
                        		}
                        	}
                        	/>
                    </div>
                </div>
            </div>
		)
	},
	ProjetoCard: ({projeto, tarefas, dispatch})=>
	{
		return (
			<Col lg={3} md={6}>
				<Card>
					<Card.Body className="px-0">
						<Card.Title className="px-4 mb-3">{projeto.title} 
							<Button
								onClick={()=>
									tarefas
	                        		.filter(tarefa=>['Iniciada', 'Em Andamento',].includes(tarefa.status))
	                        		.forEach((tarefa, idx)=>{
	                        			console.log("ReRank", idx, tarefa.rank, tarefa)
	                        			WSAction.tarefas.patch({id: tarefa.id }, WSPatch.tarefas({ id : tarefa.id, rank:(idx+1)}))
			                        		(dispatch)
	                        		})
								}
							>Rank</Button>
						</Card.Title>
						<TaskListComponents.TodoList projeto={projeto} />
					</Card.Body>
				</Card>
			</Col>
			)
	},
	ListaProjetos:({projetos})=>{
		return (
			<Card style={{backgroundColor:"#ccc"}}>
				<Card.Body>
					<Card.Title>
						<h4>Projetos</h4>

					</Card.Title>
					<Row>
						{ 
							projetos.map(projeto=>
								<TaskListComponents.ProjetoCard key={projeto.id} projeto={projeto} />
							) 
						}
					</Row>
				</Card.Body>
			</Card>
			)

	},

	connect:()=>{
		TaskListComponents.TodoList = connect(
		  (state, props)=>({
		  	loading: state.tarefas.loading,
		  	tarefas: state.tarefas.items.filter(tarefa=>tarefa.project_id == props.projeto.id),
		  }),
		  null
		)(TaskListComponents.TodoList)

		TaskListComponents.ProjetoCard = connect(
		  (state, props)=>({
		  	loading: state.tarefas.loading,
		  	tarefas: state.tarefas.items.filter(tarefa=>tarefa.project_id == props.projeto.id),
		  }),
		  null
		)(TaskListComponents.ProjetoCard)

		TaskListComponents.ListaProjetos = connect(
		  ConnectDefault.mapProjetoStateToProps,
		  null
		)(TaskListComponents.ListaProjetos)

	}
}
TaskListComponents.connect()

/*
const EVENTS = new Dayz.EventsCollection([
    { content: 'A short event',
      range: moment.range( date.clone(),
                           date.clone().add(1, 'day') ) },
    { content: 'Two Hours ~ 8-10',
      range: moment.range( date.clone().hour(8),
                           date.clone().hour(10) ) },
    { content: "A Longer Event",
      range: moment.range( date.clone().subtract(2,'days'),
                           date.clone().add(8,'days') ) }
]);
*/

function getSundayFromWeekNum(weekNum, year) {
    var sunday = new Date(year, 0, (1 + (weekNum - 1) * 7));
    while (sunday.getDay() !== 0) {
        sunday.setDate(sunday.getDate() - 1);
    }
    return sunday;
}
Date.prototype.getSunday = function() {
    var sunday = new Date(this);
    while (sunday.getDay() !== 0) {
        sunday.setDate(sunday.getDate() - 1);
    }
    return sunday;
}
Date.prototype.getSaturday = function() {
    var saturday = new Date(this);
    while (saturday.getDay() !== 6) {
        saturday.setDate(saturday.getDate() + 1);
    }
    return saturday;
}
Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}


// Returns the four-digit year corresponding to the ISO week of the date.
Date.prototype.getWeekYear = function() {
  var date = new Date(this.getTime());
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  return date.getFullYear();
}

const FullCalendarReact = {
	Toolbar:()=>{
		return  (
			<div className="fc-toolbar fc-header-toolbar">
			</div>
		)

	},
	/*
			<td>
	                                    <div className="fc-content-col">
	                                       <div class="fc-event-container fc-helper-container"></div>
	                                       <div class="fc-event-container"></div>
	                                       <div class="fc-highlight-container"></div>
	                                       <div class="fc-bgevent-container"></div>
	                                       <div class="fc-business-container"></div>
	                                    </div>
	                                 </td>
	                                 <td>
	                                    <div className="fc-content-col">
	                                       <div class="fc-event-container fc-helper-container"></div>
	                                       <div class="fc-event-container"></div>
	                                       <div class="fc-highlight-container"></div>
	                                       <div class="fc-bgevent-container"></div>
	                                       <div class="fc-business-container"></div>
	                                    </div>
	                                 </td>
	                                 <td>
	                                    <div className="fc-content-col">
	                                       <div className="fc-event-container fc-helper-container"></div>
	                                       <div className="fc-event-container"></div>
	                                       <div className="fc-highlight-container"></div>
	                                       <div className="fc-bgevent-container"></div>
	                                       <div className="fc-business-container"></div>
	                                    </div>
	                                 </td>
	                                 <td>
	                                    <div className="fc-content-col">
	                                       <div className="fc-event-container fc-helper-container"></div>
	                                       <div className="fc-event-container">
	                                          <a className="fc-time-grid-event fc-v-event fc-event fc-start fc-end bg-dark fc-draggable fc-resizable" style="top: 541.911px; bottom: -717.911px; z-index: 1; left: 0%; right: 0%;">
	                                             <div className="fc-content">
	                                                <div className="fc-time" data-start="2:10" data-full="2:10 PM"><span>2:10</span></div>
	                                                <div class="fc-title">Hey!</div>
	                                             </div>
	                                             <div class="fc-bg"></div>
	                                             <div class="fc-resizer fc-end-resizer"></div>
	                                          </a>
	                                       </div>
	                                       <div class="fc-highlight-container">
	                                       </div>
	                                       <div class="fc-bgevent-container"></div>
	                                       <div class="fc-business-container"></div>
	                                    </div>
	                                 </td>
	                                 <td>
	                                    <div class="fc-content-col">
	                                       <div class="fc-event-container fc-helper-container"></div>
	                                       <div class="fc-event-container"></div>
	                                       <div class="fc-highlight-container"></div>
	                                       <div class="fc-bgevent-container"></div>
	                                       <div class="fc-business-container"></div>
	                                    </div>
	                                 </td>
	                                 <td>
	                                    <div class="fc-content-col">
	                                       <div class="fc-event-container fc-helper-container"></div>
	                                       <div class="fc-event-container">
	                                          <a class="fc-time-grid-event fc-v-event fc-event fc-start fc-not-end bg-primary fc-draggable" style="top: 827.911px; bottom: -967px; z-index: 1; left: 0%; right: 0%;">
	                                             <div class="fc-content">
	                                                <div class="fc-time" data-start="5:25" data-full="5:25 PM"><span>5:25</span></div>
	                                                <div class="fc-title">Buy a Theme</div>
	                                             </div>
	                                             <div class="fc-bg"></div>
	                                          </a>
	                                       </div>
	                                       <div class="fc-highlight-container"></div>
	                                       <div class="fc-bgevent-container"></div>
	                                       <div class="fc-business-container"></div>
	                                    </div>
	                                 </td>
	                                 <td>
	                                    <div class="fc-content-col">
	                                       <div class="fc-event-container fc-helper-container"></div>
	                                       <div class="fc-event-container"></div>
	                                       <div class="fc-highlight-container"></div>
	                                       <div class="fc-bgevent-container"></div>
	                                       <div class="fc-business-container"></div>
	                                    </div>
	                                 </td>
	*/
	TimeGridContainer:(daysOfWeek)=>{

   	  	var arrayTime = []
   	  	for(var h=8;h<19;h++)
   	  	{
   	  		for(var m = 0; m<4;m++)
   	  		{
   	  			arrayTime.push((h<10?"0":"")+h+":"+(m==0?"0":"")+15*m+":00");
   	  		}
   	  	}
		return (
			<div className="fc-scroller fc-time-grid-container" style="overflow: hidden scroll; height: 579px;">
	            <div className="fc-time-grid fc-unselectable">
	                <div className="fc-bg">
	                    <table className="">
	                       <tbody>
	                          <tr>
	                             <td className="fc-axis fc-widget-content" style="width:56px"></td>
	                             {
	                             	daysOfWeek.map(day=>{
	                             		return (<td key={day} className={"fc-day fc-widget-content fc-${day.toGMTString().substr(0,3)} "+
	                             					day < d ? "fc-past":
	                             					day==d ? "fc-today":
	                             					"fc-future"
	                             				} data-date={day.toISOString().substr(0,10)}
	                             				></td>)
	                             	})
	                             }
	                          </tr>
	                       </tbody>
	                    </table>
	                </div>
	                <div className="fc-slats">
	                    <table className="">
	                       <tbody>
	                       {
	                       	arrayTime.map((time, idx)=>(
		                       	<tr key={time} data-time={time} className={idx % 2 == 0?"fc-minor":""}>
		                            <td className="fc-axis fc-time fc-widget-content" style={{width:56+"px"}}>{idx % 2 == 0?<span>{time}</span>:<Fragment/>}</td>
		                            <td className="fc-widget-content"></td>
		                        </tr>
	                       	))
	                       	//.toISOString().substr(11,8)
	                       }
	                       </tbody>
	                    </table>
	                </div>
	                <hr className="fc-divider fc-widget-header" style="display:none"/>
	                    <div className="fc-content-skeleton">
	                        <table>
	                           <tbody>
	                              <tr>
	                                 <td className="fc-axis" style="width:56px"></td>
	                                 
	                              </tr>
	                           </tbody>
	                        </table>
	                    </div>
	            </div>
	       </div>
			)
	},
	WeekView:()=>{

		var d = new Date();
		var sunday = d.getSunday();
		var saturday = d.getSaturday();

		var daysOfWeek = [];
		for (var d = sunday; d <= saturday; d.setDate(d.getDate() + 1)) {
		    daysOfWeek.push(new Date(d));
		}

		console.log(daysOfWeek, daysOfWeek.map)
		return (

			<div className="fc-view fc-agendaWeek-view fc-agenda-view">
			   <table className="">
			      <thead className="fc-head">
			         <tr>
			            <td className="fc-head-container fc-widget-header">
			               <div className="fc-row fc-widget-header" style="border-right-width: 1px; margin-right: 16px;">
			                  <table className="">
			                     <thead>
			                        <tr>
			                           <th className="fc-axis fc-widget-header" style="width:56px"></th>
			                           {

			                             	daysOfWeek.map(day=>{
			                             		return (
			                             				<th key={day} className={"fc-day-header fc-widget-header fc-${day.toGMTString().substr(0,3)} "+
			                             					day < d ? "fc-past":
			                             					day==d ? "fc-today":
			                             					"fc-future"
			                             				} data-date={day.toISOString().substr(0,10)}
			                             				>
							                              <span>{day.toGMTString().substr(0,3)} {day.toISOString().substr(0,10)}</span>
							                           </th>
			                             			)
			                             	})
			                           }
			                        </tr>
			                     </thead>
			                  </table>
			               </div>
			            </td>
			         </tr>
			      </thead>
			      <tbody className="fc-body">
			         <tr>
			            <td className="fc-widget-content">
			               <div className="fc-day-grid fc-unselectable">
			                  <div className="fc-row fc-week fc-widget-content" style="border-right-width: 1px; margin-right: 16px;">
			                     <div className="fc-bg">
			                        <table className="">
			                           <tbody>
			                              <tr>
			                                 <td className="fc-axis fc-widget-content" style="width:56px">
			                                    <span>all-day</span>
			                                 </td>
			                                	{

					                             	daysOfWeek.map(day=>{
					                             		return (
					                             			<td key={day} className={"fc-day fc-widget-content fc-${day.toGMTString().substr(0,3)} "+
					                             					day < d ? "fc-past":
					                             					day==d ? "fc-today":
					                             					"fc-future"
					                             				} data-date={day.toISOString().substr(0,10)}></td>
					                             			)
					                             	})
					                           }
			                              </tr>
			                           </tbody>
			                        </table>
			                     </div>
			                     <div className="fc-content-skeleton">
			                        <table>
			                           <tbody>
			                              <tr>
			                                 <td className="fc-axis" style="width:56px"></td>
			                                 {

					                             	daysOfWeek.map(day=>{
					                             		return (<td key={day}></td>)
					                             	})
					                           }
			                              </tr>
			                           </tbody>
			                        </table>
			                     </div>
			                  </div>
			               </div>
			               <hr className="fc-divider fc-widget-header"/>
			               <FullCalendarReact.TimeGridContainer days={daysOfWeek}/>
			            </td>
			         </tr>
			      </tbody>
			   </table>
			</div>
		)
	},
	Container:()=>{
		return  (
			<div className="fc-view-container">
				<FullCalendarReact.WeekView/>
			</div>
		)
	},
}

const CalendarComponents = {
	Calendar:()=>{
		var t = new Date()
		return  (
			<div id='calendar'>
				<FullCalendarReact.Toolbar/>
				<FullCalendarReact.Container/>
			</div>
		)
	},
	Body: ()=>{
		return (
			<Card style={{backgroundColor:"#ccc"}}>
				<Card.Body>
					<Card.Title>
						<h4>Calendario</h4>

					</Card.Title>
					<Row>
						<Col lg={4} mt={5}>
							 <div className="card-box m-b-50">
                            </div>
						{ /*
							projetos.map(projeto=>
								<TaskListComponents.ProjetoCard key={projeto.id} projeto={projeto} />
							) 
							*/
						}
						</Col>
						<Col md={8}>
                           	<CalendarComponents.Calendar/>
						</Col>
					</Row>
				</Card.Body>
			</Card>
			)

	}
}

const API_Component = {

	MessageNotification:(props)=>{
		return (
				<li className="notification-unread">
	                <a href="javascript:void()">
	                    <img className="float-left mr-3 avatar-img" src={props.image} alt=""/>
	                    <div className="notification-content">
	                        <div className="notification-heading">{props.name}</div>
	                        <div className="notification-timestamp">{props.timestamp}</div>
	                        <div className="notification-text">{props.message}</div>
	                    </div>
	                </a>
	            </li>
			)
	},

	HeaderLogo:()=>{
		return (
			<div className="nav-header">
		            <div className="brand-logo">
		                <a href="/">
		                    <b className="logo-abbr"><img src={APPPATH+"/images/logo.png"} alt=""/> </b>
		                    <span className="logo-compact"><img src={APPPATH+"/images/logo-compact.png"} alt=""/></span>
		                    <span className="brand-title">
		                        <img src={APPPATH+"/images/logo Tech2_mini.png"} alt=""/>
		                    </span>
		                </a>
		            </div>
		        </div>

			)
	},

	HeaderT:()=>{
		return (
			<div className="header">
	            <div className="header-content clearfix">

	                <div className="nav-control">
	                    <div className="hamburger">
	                        <span className="toggle-icon"><i className="icon-menu"></i></span>
	                    </div>
	                </div>
	                <div className="header-left">
	                    <div className="input-group icons">
	                        <div className="input-group-prepend">
	                            <span className="input-group-text bg-transparent border-0 pr-2 pr-sm-3" id="basic-addon1"><i className="mdi mdi-magnify"></i></span>
	                        </div>
	                        <input type="search" 
	                        	className="form-control" 
	                        	placeholder="Search Dashboard" 
	                        	aria-label="Search Dashboard"
	                        	onChange={(e)=>console.log("change", e.currentTarget.value)}
	                        	onKeyDown={(e)=>console.log("key", e, e.key, e.currentTarget.value)}
	                        	/>
	                        <div className="drop-down animated flipInX d-md-none">
	                            <form action="#">
	                                <input type="text" className="form-control" placeholder="Search"/>
	                            </form>
	                        </div>
	                    </div>
	                </div>
	                <div className="header-right">
	                    <ul className="clearfix">
	                        <li className="icons dropdown"><a href="javascript:void(0)" data-toggle="dropdown">
	                                <i className="mdi mdi-email-outline"></i>
	                                <span className="badge badge-pill gradient-1">3</span>
	                            </a>
	                            <div className="drop-down animated fadeIn dropdown-menu">
	                                <div className="dropdown-content-heading d-flex justify-content-between">
	                                    <span className="">3 New Messages</span>
	                                    <a href="javascript:void()" className="d-inline-block">
	                                        <span className="badge badge-pill gradient-1">3</span>
	                                    </a>
	                                </div>
	                                <div className="dropdown-content-body">
	                                    <ul>
	                                        <API_Component.MessageNotification
	                                        	image={APPPATH+"/images/avatar/1.jpg"}
	                                        	name="Saiful Islam"
	                                        	timestamp="08 Hours ago"
	                                        	message="Hi Teddy, Just wanted to let you ..."
	                                        />
	                                        <API_Component.MessageNotification
	                                        	image={APPPATH+"/images/avatar/2.jpg"}
	                                        	name="Adam Smith"
	                                        	timestamp="08 Hours ago"
	                                        	message="Can you do me a favour?"
	                                        />
	                                        <API_Component.MessageNotification
	                                        	image={APPPATH+"/images/avatar/3.jpg"}
	                                        	name="Barak Obama"
	                                        	timestamp="08 Hours ago"
	                                        	message="Hi Teddy, Just wanted to let you ..."
	                                        />

	                                        <API_Component.MessageNotification
	                                        	image={APPPATH+"/images/avatar/4.jpg"}
	                                        	name="Hilari Clinton"
	                                        	timestamp="08 Hours ago"
	                                        	message="Hello"
	                                        />
	                                    </ul>

	                                </div>
	                            </div>
	                        </li>
	                        <li className="icons dropdown"><a href="javascript:void(0)" data-toggle="dropdown">
	                                <i className="mdi mdi-bell-outline"></i>
	                                <span className="badge badge-pill gradient-2">3</span>
	                            </a>
	                            <div className="drop-down animated fadeIn dropdown-menu dropdown-notfication">
	                                <div className="dropdown-content-heading d-flex justify-content-between">
	                                    <span className="">2 New Notifications</span>
	                                    <a href="javascript:void()" className="d-inline-block">
	                                        <span className="badge badge-pill gradient-2">5</span>
	                                    </a>
	                                </div>
	                                <div className="dropdown-content-body">
	                                    <ul>
	                                        <li>
	                                            <a href="javascript:void()">
	                                                <span className="mr-3 avatar-icon bg-success-lighten-2"><i className="icon-present"></i></span>
	                                                <div className="notification-content">
	                                                    <h6 className="notification-heading">Events near you</h6>
	                                                    <span className="notification-text">Within next 5 days</span>
	                                                </div>
	                                            </a>
	                                        </li>
	                                        <li>
	                                            <a href="javascript:void()">
	                                                <span className="mr-3 avatar-icon bg-danger-lighten-2"><i className="icon-present"></i></span>
	                                                <div className="notification-content">
	                                                    <h6 className="notification-heading">Event Started</h6>
	                                                    <span className="notification-text">One hour ago</span>
	                                                </div>
	                                            </a>
	                                        </li>
	                                        <li>
	                                            <a href="javascript:void()">
	                                                <span className="mr-3 avatar-icon bg-success-lighten-2"><i className="icon-present"></i></span>
	                                                <div className="notification-content">
	                                                    <h6 className="notification-heading">Event Ended Successfully</h6>
	                                                    <span className="notification-text">One hour ago</span>
	                                                </div>
	                                            </a>
	                                        </li>
	                                        <li>
	                                            <a href="javascript:void()">
	                                                <span className="mr-3 avatar-icon bg-danger-lighten-2"><i className="icon-present"></i></span>
	                                                <div className="notification-content">
	                                                    <h6 className="notification-heading">Events to Join</h6>
	                                                    <span className="notification-text">After two days</span>
	                                                </div>
	                                            </a>
	                                        </li>
	                                    </ul>

	                                </div>
	                            </div>
	                        </li>
	                        <li className="icons dropdown d-none d-md-flex">
	                            <a href="javascript:void(0)" className="log-user"  data-toggle="dropdown">
	                                <span>English</span>  <i className="fa fa-angle-down f-s-14" aria-hidden="true"></i>
	                            </a>
	                            <div className="drop-down dropdown-language animated fadeIn  dropdown-menu">
	                                <div className="dropdown-content-body">
	                                    <ul>
	                                        <li><a href="javascript:void()">English</a></li>
	                                        <li><a href="javascript:void()">Dutch</a></li>
	                                    </ul>
	                                </div>
	                            </div>
	                        </li>
	                        <li className="icons dropdown">
	                            <div className="user-img c-pointer position-relative"   data-toggle="dropdown">
	                                <span className="activity active"></span>
	                                <img src={APPPATH+"/images/user/1.png"} height="40" width="40" alt=""/>
	                            </div>
	                            <div className="drop-down dropdown-profile animated fadeIn dropdown-menu">
	                                <div className="dropdown-content-body">
	                                    <ul>
	                                        <li>
	                                            <a href="app-profile.html"><i className="icon-user"></i> <span>Profile</span></a>
	                                        </li>
	                                        <li>
	                                            <a href="javascript:void()">
	                                                <i className="icon-envelope-open"></i> <span>Inbox</span> <div className="badge gradient-3 badge-pill gradient-1">3</div>
	                                            </a>
	                                        </li>

	                                        <hr className="my-2"/>
	                                        <li>
	                                            <a href="page-lock.html"><i className="icon-lock"></i> <span>Lock Screen</span></a>
	                                        </li>
	                                        <li><a href="page-login.html"><i className="icon-key"></i> <span>Logout</span></a></li>
	                                    </ul>
	                                </div>
	                            </div>
	                        </li>
	                    </ul>
	                </div>
	            </div>
	        </div>
	        )

	},
	HeaderB:(active)=>{
		return (
			<Navbar bg="dark" variant="dark" className="nav-header">
			    <Navbar.Brand href="#home">
			      <img
			        alt=""
			        src="/logo.svg"
			        width="30"
			        height="30"
			        className="d-inline-block align-top"
			      />
			      {' React Bootstrap'}
			    </Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav activeKey={active.type +"_"+ active.value} className="mr-auto">
				    	<Nav.Link href="#" >Homee</Nav.Link>
				    	<NavDropdown title="Dropdown" id="basic-nav-dropdown">
				        	<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
				        	<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
				        	<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
				        	<NavDropdown.Divider />
				        	<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
				      	</NavDropdown>
					</Nav>
				    <Form inline>
				      	<FormControl type="text" placeholder="Search" className="mr-sm-2" />
				      	<Button variant="outline-success">Search</Button>
				    </Form>
				</Navbar.Collapse>
			</Navbar>
			)
	},
	Header:(active) => {

		return (
			<Fragment>
				<API_Component.HeaderLogo/>
				<API_Component.HeaderT active={active}/>
			</Fragment>
		)
	},

	Preloader:(props)=>{
		return (
		<div id="preloader">
	        <div className="loader">
	            <svg className="circular" viewBox="25 25 50 50">
	                <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="3" strokeMiterlimit="10" />
	            </svg>
	        </div>
	    </div>
	    )
	},



	VisiblePage: ({active, paginaCorrente}) => {
		return (
			<div className="content-body">

	            <Row className="page-titles mx-0">
	                <Col className="p-md-0">
	                    <ol className="breadcrumb">
	                        <li className="breadcrumb-item"><a href="javascript:void(0)">Dashboard</a></li>
	                        <li className="breadcrumb-item active"><a href="javascript:void(0)">Home</a></li>
	                    </ol>
	                </Col>
	            </Row>

			    <Container fluid>
			    	<Row>
			    		<Col lg={12}>
					    	{
					    		paginaCorrente == "Tarefa" ? 
					    			<ListaTarefas/>: 
					    			<TaskListComponents.ListaProjetos/>
					    			//<CalendarComponents.Body/>
					    	}
					    	<ModalComponents.EditModal/>
					    	<ModalComponents.CreateModal/>
					    </Col>
				    </Row>
	            </Container>
	        </div>
			)
	},
	Sidebar: (active) => {
		/*
			<div class="nk-sidebar">
		            <div class="nk-nav-scroll">
		                <ul class="metismenu" id="menu">
		                    <li class="nav-label">Dashboard</li>
		                    <li>
		                        <a class="has-arrow" href="javascript:void()" aria-expanded="false">
		                            <i class="icon-speedometer menu-icon"></i><span class="nav-text">Dashboard</span>
		                        </a>
		                        <ul aria-expanded="false">
		                            <li><a href="./index.html">Home 1</a></li>
		                            <!-- <li><a href="./index-2.html">Home 2</a></li> -->
		                        </ul>
		                    </li>
		                    <li>
		                        <a href="{{ path("tarefas") }}" aria-expanded="false">
		                            <i class="icon-task menu-icon"></i><span class="nav-text">Tarefas</span>
		                        </a>
		                    </li>
		                    <li>
		                        <a href="{{ path("Tipos_Tarefa") }}" aria-expanded="false">
		                            <i class="icon-task menu-icon"></i><span class="nav-text">Tipos de Tarefa</span>
		                        </a>
		                    </li>

		                    <li class="mega-menu mega-menu-sm">
		                        <a class="has-arrow" href="javascript:void()" aria-expanded="false">
		                            <i class="icon-globe-alt menu-icon"></i><span class="nav-text">Layouts</span>
		                        </a>
		                        <ul aria-expanded="false">
		                            <li><a href="./layout-blank.html">Blank</a></li>
		                            <li><a href="./layout-one-column.html">One Column</a></li>
		                            <li><a href="./layout-two-column.html">Two column</a></li>
		                            <li><a href="./layout-compact-nav.html">Compact Nav</a></li>
		                            <li><a href="./layout-vertical.html">Vertical</a></li>
		                            <li><a href="./layout-horizontal.html">Horizontal</a></li>
		                            <li><a href="./layout-boxed.html">Boxed</a></li>
		                            <li><a href="./layout-wide.html">Wide</a></li>


		                            <li><a href="./layout-fixed-header.html">Fixed Header</a></li>
		                            <li><a href="layout-fixed-sidebar.html">Fixed Sidebar</a></li>
		                        </ul>
		                    </li>
		                    <li class="nav-label">Apps</li>
		                    <li>
		                        <a class="has-arrow" href="javascript:void()" aria-expanded="false">
		                            <i class="icon-envelope menu-icon"></i> <span class="nav-text">Email</span>
		                        </a>
		                        <ul aria-expanded="false">
		                            <li><a href="./email-inbox.html">Inbox</a></li>
		                            <li><a href="./email-read.html">Read</a></li>
		                            <li><a href="./email-compose.html">Compose</a></li>
		                        </ul>
		                    </li>
		                    <li>
		                        <a class="has-arrow" href="javascript:void()" aria-expanded="false">
		                            <i class="icon-screen-tablet menu-icon"></i><span class="nav-text">Apps</span>
		                        </a>
		                        <ul aria-expanded="false">
		                            <li><a href="./app-profile.html">Profile</a></li>
		                            <li><a href="./app-calender.html">Calender</a></li>
		                        </ul>
		                    </li>
		                    <li>
		                        <a class="has-arrow" href="javascript:void()" aria-expanded="false">
		                            <i class="icon-graph menu-icon"></i> <span class="nav-text">Charts</span>
		                        </a>
		                        <ul aria-expanded="false">
		                            <li><a href="./chart-flot.html">Flot</a></li>
		                            <li><a href="./chart-morris.html">Morris</a></li>
		                            <li><a href="./chart-chartjs.html">Chartjs</a></li>
		                            <li><a href="./chart-chartist.html">Chartist</a></li>
		                            <li><a href="./chart-sparkline.html">Sparkline</a></li>
		                            <li><a href="./chart-peity.html">Peity</a></li>
		                        </ul>
		                    </li>
		                    <li class="nav-label">UI Components</li>
		                    <li>
		                        <a class="has-arrow" href="javascript:void()" aria-expanded="false">
		                            <i class="icon-grid menu-icon"></i><span class="nav-text">UI Components</span>
		                        </a>
		                        <ul aria-expanded="false">
		                            <li><a href="./ui-accordion.html">Accordion</a></li>
		                            <li><a href="./ui-alert.html">Alert</a></li>
		                            <li><a href="./ui-badge.html">Badge</a></li>
		                            <li><a href="./ui-button.html">Button</a></li>
		                            <li><a href="./ui-button-group.html">Button Group</a></li>
		                            <li><a href="./ui-cards.html">Cards</a></li>
		                            <li><a href="./ui-carousel.html">Carousel</a></li>
		                            <li><a href="./ui-dropdown.html">Dropdown</a></li>
		                            <li><a href="./ui-list-group.html">List Group</a></li>
		                            <li><a href="./ui-media-object.html">Media Object</a></li>
		                            <li><a href="./ui-modal.html">Modal</a></li>
		                            <li><a href="./ui-pagination.html">Pagination</a></li>
		                            <li><a href="./ui-popover.html">Popover</a></li>
		                            <li><a href="./ui-progressbar.html">Progressbar</a></li>
		                            <li><a href="./ui-tab.html">Tab</a></li>
		                            <li><a href="./ui-typography.html">Typography</a></li>
		                        <!-- </ul>
		                    </li>
		                    <li>
		                        <a class="has-arrow" href="javascript:void()" aria-expanded="false">
		                            <i class="icon-layers menu-icon"></i><span class="nav-text">Components</span>
		                        </a>
		                        <ul aria-expanded="false"> -->
		                            <li><a href="./uc-nestedable.html">Nestedable</a></li>
		                            <li><a href="./uc-noui-slider.html">Noui Slider</a></li>
		                            <li><a href="./uc-sweetalert.html">Sweet Alert</a></li>
		                            <li><a href="./uc-toastr.html">Toastr</a></li>
		                        </ul>
		                    </li>
		                    <li>
		                        <a href="widgets.html" aria-expanded="false">
		                            <i class="icon-badge menu-icon"></i><span class="nav-text">Widget</span>
		                        </a>
		                    </li>
		                    <li class="nav-label">Forms</li>
		                    <li>
		                        <a class="has-arrow" href="javascript:void()" aria-expanded="false">
		                            <i class="icon-note menu-icon"></i><span class="nav-text">Forms</span>
		                        </a>
		                        <ul aria-expanded="false">
		                            <li><a href="./form-basic.html">Basic Form</a></li>
		                            <li><a href="./form-validation.html">Form Validation</a></li>
		                            <li><a href="./form-step.html">Step Form</a></li>
		                            <li><a href="./form-editor.html">Editor</a></li>
		                            <li><a href="./form-picker.html">Picker</a></li>
		                        </ul>
		                    </li>
		                    <li class="nav-label">Table</li>
		                    <li>
		                        <a class="has-arrow" href="javascript:void()" aria-expanded="false">
		                            <i class="icon-menu menu-icon"></i><span class="nav-text">Table</span>
		                        </a>
		                        <ul aria-expanded="false">
		                            <li><a href="./table-basic.html" aria-expanded="false">Basic Table</a></li>
		                            <li><a href="./table-datatable.html" aria-expanded="false">Data Table</a></li>
		                        </ul>
		                    </li>
		                    <li class="nav-label">Pages</li>
		                    <li>
		                        <a class="has-arrow" href="javascript:void()" aria-expanded="false">
		                            <i class="icon-notebook menu-icon"></i><span class="nav-text">Pages</span>
		                        </a>
		                        <ul aria-expanded="false">
		                            <li><a href="./page-login.html">Login</a></li>
		                            <li><a href="./page-register.html">Register</a></li>
		                            <li><a href="./page-lock.html">Lock Screen</a></li>
		                            <li><a class="has-arrow" href="javascript:void()" aria-expanded="false">Error</a>
		                                <ul aria-expanded="false">
		                                    <li><a href="./page-error-404.html">Error 404</a></li>
		                                    <li><a href="./page-error-403.html">Error 403</a></li>
		                                    <li><a href="./page-error-400.html">Error 400</a></li>
		                                    <li><a href="./page-error-500.html">Error 500</a></li>
		                                    <li><a href="./page-error-503.html">Error 503</a></li>
		                                </ul>
		                            </li>
		                        </ul>
		                    </li>
		                </ul>
		            </div>
		        </div>
		*/
		return (
				<div className="nk-sidebar">
		            <div className="nk-nav-scroll">
		                <ul className="metismenu" id="menu">
		                    <li className="nav-label">Dashboard</li>
		                    <li>
		                        <a className="has-arrow" href="javascript:void()" aria-expanded="false">
		                            <i className="icon-speedometer menu-icon"></i><span className="nav-text">Dashboard</span>
		                        </a>
		                        <ul aria-expanded="false">
		                            <li><a href="./index.html">Home 1</a></li>
		                        </ul>
		                    </li>
		                    <li>
		                        <a aria-expanded="false"
		                        	onClick={()=>{
		                        		console.log("Trocando Pagina", "Tarefas")
			                        		store.dispatch(selectPage("Tarefa")) 
			                        	}
			                        }
		                        >
		                            <i className="icon-task menu-icon"></i><span className="nav-text">Tarefas</span>
		                        </a>
		                    </li>
		                    <li>
		                        <a aria-expanded="false"
		                        	onClick={()=>{
		                        		console.log("Trocando Pagina", "Projeto.List")
			                        		store.dispatch(selectPage("Projeto.List")) 
			                        	}
			                        }
		                        >
		                            <i className="icon-task menu-icon"></i><span className="nav-text">Projetos Lista</span>
		                        </a>
		                    </li>
		                    <li>
		                        <a href={"Tipos_Tarefa TODO" } aria-expanded="false">
		                            <i className="icon-task menu-icon"></i><span className="nav-text">Tipos de Tarefa</span>
		                        </a>
		                    </li>

		                    <li className="mega-menu mega-menu-sm">
		                        <a className="has-arrow" href="javascript:void()" aria-expanded="false">
		                            <i className="icon-globe-alt menu-icon"></i><span className="nav-text">Layouts</span>
		                        </a>
		                        <ul aria-expanded="false">
		                            <li><a href="./layout-blank.html">Blank</a></li>
		                            <li><a href="./layout-one-column.html">One Column</a></li>
		                            <li><a href="./layout-two-column.html">Two column</a></li>
		                            <li><a href="./layout-compact-nav.html">Compact Nav</a></li>
		                            <li><a href="./layout-vertical.html">Vertical</a></li>
		                            <li><a href="./layout-horizontal.html">Horizontal</a></li>
		                            <li><a href="./layout-boxed.html">Boxed</a></li>
		                            <li><a href="./layout-wide.html">Wide</a></li>


		                            <li><a href="./layout-fixed-header.html">Fixed Header</a></li>
		                            <li><a href="layout-fixed-sidebar.html">Fixed Sidebar</a></li>
		                        </ul>
		                    </li>
		                    <li className="nav-label">Apps</li>
		                    <li>
		                        <a className="has-arrow" href="javascript:void()" aria-expanded="false">
		                            <i className="icon-envelope menu-icon"></i> <span className="nav-text">Email</span>
		                        </a>
		                        <ul aria-expanded="false">
		                            <li><a href="./email-inbox.html">Inbox</a></li>
		                            <li><a href="./email-read.html">Read</a></li>
		                            <li><a href="./email-compose.html">Compose</a></li>
		                        </ul>
		                    </li>
		                    <li>
		                        <a className="has-arrow" href="javascript:void()" aria-expanded="false">
		                            <i className="icon-screen-tablet menu-icon"></i><span className="nav-text">Apps</span>
		                        </a>
		                        <ul aria-expanded="false">
		                            <li><a href="./app-profile.html">Profile</a></li>
		                            <li><a href="./app-calender.html">Calender</a></li>
		                        </ul>
		                    </li>
		                    <li>
		                        <a className="has-arrow" href="javascript:void()" aria-expanded="false">
		                            <i className="icon-graph menu-icon"></i> <span className="nav-text">Charts</span>
		                        </a>
		                        <ul aria-expanded="false">
		                            <li><a href="./chart-flot.html">Flot</a></li>
		                            <li><a href="./chart-morris.html">Morris</a></li>
		                            <li><a href="./chart-chartjs.html">Chartjs</a></li>
		                            <li><a href="./chart-chartist.html">Chartist</a></li>
		                            <li><a href="./chart-sparkline.html">Sparkline</a></li>
		                            <li><a href="./chart-peity.html">Peity</a></li>
		                        </ul>
		                    </li>
		                    <li className="nav-label">UI Components</li>
		                    <li>
		                        <a className="has-arrow" href="javascript:void()" aria-expanded="false">
		                            <i className="icon-grid menu-icon"></i><span className="nav-text">UI Components</span>
		                        </a>
		                        <ul aria-expanded="false">
		                            <li><a href="./ui-accordion.html">Accordion</a></li>
		                            <li><a href="./ui-alert.html">Alert</a></li>
		                            <li><a href="./ui-badge.html">Badge</a></li>
		                            <li><a href="./ui-button.html">Button</a></li>
		                            <li><a href="./ui-button-group.html">Button Group</a></li>
		                            <li><a href="./ui-cards.html">Cards</a></li>
		                            <li><a href="./ui-carousel.html">Carousel</a></li>
		                            <li><a href="./ui-dropdown.html">Dropdown</a></li>
		                            <li><a href="./ui-list-group.html">List Group</a></li>
		                            <li><a href="./ui-media-object.html">Media Object</a></li>
		                            <li><a href="./ui-modal.html">Modal</a></li>
		                            <li><a href="./ui-pagination.html">Pagination</a></li>
		                            <li><a href="./ui-popover.html">Popover</a></li>
		                            <li><a href="./ui-progressbar.html">Progressbar</a></li>
		                            <li><a href="./ui-tab.html">Tab</a></li>
		                            <li><a href="./ui-typography.html">Typography</a></li>

		                            <li><a href="./uc-nestedable.html">Nestedable</a></li>
		                            <li><a href="./uc-noui-slider.html">Noui Slider</a></li>
		                            <li><a href="./uc-sweetalert.html">Sweet Alert</a></li>
		                            <li><a href="./uc-toastr.html">Toastr</a></li>
		                        </ul>
		                    </li>
		                    <li>
		                        <a href="widgets.html" aria-expanded="false">
		                            <i className="icon-badge menu-icon"></i><span className="nav-text">Widget</span>
		                        </a>
		                    </li>
		                    <li className="nav-label">Forms</li>
		                    <li>
		                        <a className="has-arrow" href="javascript:void()" aria-expanded="false">
		                            <i className="icon-note menu-icon"></i><span className="nav-text">Forms</span>
		                        </a>
		                        <ul aria-expanded="false">
		                            <li><a href="./form-basic.html">Basic Form</a></li>
		                            <li><a href="./form-validation.html">Form Validation</a></li>
		                            <li><a href="./form-step.html">Step Form</a></li>
		                            <li><a href="./form-editor.html">Editor</a></li>
		                            <li><a href="./form-picker.html">Picker</a></li>
		                        </ul>
		                    </li>
		                    <li className="nav-label">Table</li>
		                    <li>
		                        <a className="has-arrow" href="javascript:void()" aria-expanded="false">
		                            <i className="icon-menu menu-icon"></i><span className="nav-text">Table</span>
		                        </a>
		                        <ul aria-expanded="false">
		                            <li><a href="./table-basic.html" aria-expanded="false">Basic Table</a></li>
		                            <li><a href="./table-datatable.html" aria-expanded="false">Data Table</a></li>
		                        </ul>
		                    </li>
		                    <li className="nav-label">Pages</li>
		                    <li>
		                        <a className="has-arrow" href="javascript:void()" aria-expanded="false">
		                            <i className="icon-notebook menu-icon"></i><span className="nav-text">Pages</span>
		                        </a>
		                        <ul aria-expanded="false">
		                            <li><a href="./page-login.html">Login</a></li>
		                            <li><a href="./page-register.html">Register</a></li>
		                            <li><a href="./page-lock.html">Lock Screen</a></li>
		                            <li><a className="has-arrow" href="javascript:void()" aria-expanded="false">Error</a>
		                                <ul aria-expanded="false">
		                                    <li><a href="./page-error-404.html">Error 404</a></li>
		                                    <li><a href="./page-error-403.html">Error 403</a></li>
		                                    <li><a href="./page-error-400.html">Error 400</a></li>
		                                    <li><a href="./page-error-500.html">Error 500</a></li>
		                                    <li><a href="./page-error-503.html">Error 503</a></li>
		                                </ul>
		                            </li>
		                        </ul>
		                    </li>
		                </ul>
		            </div>
		        </div>
			)
	},

	Page: ({paginaCorrente}) => {
		//		<API_Component.Preloader />
		/**/
		console.log("Page", paginaCorrente)
		return (
			<Fragment>
				<API_Component.Preloader />
				<div id="main-wrapper" >
					<API_Component.Header />
					<API_Component.Sidebar/>
					<API_Component.VisiblePage paginaCorrente2={paginaCorrente}/>
				</div>
			</Fragment>
			)
	},

}
API_Component.VisiblePage = connect(
	(state, props)=>({
		paginaCorrente: state.paginaCorrente,
	})
)(API_Component.VisiblePage)


class App extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      posts: []
	    };
	}
	componentDidMount() {
		var posts = [];
		var medias = [];
		this.onReady();

		$('#preloader').fadeOut(500);
	    $('#main-wrapper').addClass('show');

	    $('body').attr('data-sidebar-style') === "mini" ? $(".hamburger").addClass('is-active') : $(".hamburger").removeClass('is-active')
		/*
	    fetch("http://mteixeira.hospedagemdesites.ws/tutorialWP/wp-json/wp/v2/posts")
	      .then(res => res.json())
	      .then(
	        (result) => {
	          	store.dispatch(updatePosts(result));
	          	store.dispatch(clickPost("Posts"));
				posts
	        },
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
	        (error) => {
	        	this.setState({
	            	isLoaded: true,
	            	error
	        	});
	        }
	      )
	    */

	    //{project_id: store.getState().project_id}
		WSAction.tarefas.fetch({sort:"rank"})(store.dispatch)
		WSAction.tags.fetch()(store.dispatch)
		WSAction.task_works.fetch()(store.dispatch)
		WSAction.tipos_tarefas.fetch()(store.dispatch)
		/*
	    this.fetchData("/CodeIgniter/index.php/api/v1/tarefas", (tarefas)=>{
	    	//console.log(tarefas);
	    	store.dispatch(updateTarefas(tarefas))
	    	console.log("Tarefas Atualizadas")

	    })
	    */

	    this.fetchData("/CodeIgniter/index.php/api/v1/projetos", (projetos)=>{
	    	//console.log(tarefas);
	    	store.dispatch(updateProjetos(projetos))
	    	console.log("Projetos Atualizados")

	    })

	    this.fetchData("/CodeIgniter/index.php/api/v1/task_works?ts_final=0000-00-00%2000:00:00", (trabalho)=>{
	    	console.log(trabalho);
	    	store.dispatch(updateAtiva(trabalho?trabalho[0]:[]))
	    	console.log("Ativo Atualizadas")

	    })
	    this.fetchData("/CodeIgniter/index.php/api/v1/tarefas/4", (trabalho)=>{
	    	console.log(trabalho);

	    })
  	}

  	onReady()
  	{
  		 "use strict";






		    $("#menu").metisMenu();

		    $('.nk-nav-scroll').slimscroll({
		        position: "right",
		        size: "5px",
		        height: "100%",
		        color: "transparent"
		    });



		    $(".nav-control").on('click', function() {

		        $('#main-wrapper').toggleClass("menu-toggle");

		        $(".hamburger").toggleClass("is-active");
		    });


		    $(function() {
		        for (var nk = window.location,
		            o = $("ul#menu a").filter(function() {
		                    return this.href == nk;
		                })
		                .addClass("active")
		                .parent()
		                .addClass("active");;) {
		            if (!o.is("li")) break;
		            o = o.parent()
		                .addClass("in")
		                .parent()
		                .addClass("active");
		        }
		    });

		    $(function() {
		        var win_h = window.outerHeight;
		        if (win_h > 0 ? win_h : screen.height) {
		            $(".content-body").css("min-height", (win_h + 60) + "px");
		        };
		    });


		    $('.selectpicker').selectpicker();



		    $('[data-toggle="popover"]').popover();
		    $('[data-toggle="tooltip"]').tooltip();




		    const headerHight = $('.header').innerHeight();

		    $(window).scroll(function() {
		        if($('body').attr('data-layout') === "horizontal" && $('body').attr('data-header-position') === "static" && $('body').attr('data-sidebar-position') === "fixed")
		            $(this.window).scrollTop() >= headerHight ? $('.metismenu').addClass('fixed') :  $('.metismenu').removeClass('fixed')
		    });

		    $('.sidebar-right-trigger').on('click', function() {
		        $('.sidebar-right').toggleClass('show');
		    });

		/*

	  		(function($) {

			})(jQuery);
		*/
  	}

  	fetchData(link, updateFunc)
  	{
  		fetch(link)
  		.then(res => res.json())
	    .catch(function(error) {
		  console.log('There has been a problem with your fetch operation: ' + error.message);
		  console.log(error);
		})
	    .then(
	        (result) => {
	         	this.setState({
	            	isLoaded: true
	          	});
	          	updateFunc(result);
	          	//store.dispatch(clickPost("Posts"));
	        },
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
	        (error) => {
	        	this.setState({
	            	isLoaded: true,
	            	error
	        	});
	        }
	    )
  	}
	render(){
		//<Header active={store.getState().activePage}/>
		return (
				<API_Component.Page paginaCorrente2={store.getState().paginaCorrente}/>

		)
		//return (<h1>Ola</h1>)
	}
}

ReactDOM.render(
	//<Posts posts={null} onPostClick={onPostClick}/>,
    <ReactRedux.Provider store={store}>
  		<App />

    </ReactRedux.Provider>
    ,
  document.getElementById('app')

);
