'use strict';

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

class Rank extends TaskObj {
	constructor(props){
		super(props);
		this.state = {  ...this.state, modelPsrop: "Rank" };

	}

	renderb(){
		return (
	      	<span 
	      		className="d-nsoneee Rank d-inline-block badge badge-pill gradient-1 float-left h-25 mt-2 ">
	        	{this.renderInside()}
	        </span>
        );
    }
  renderc() {
  		return super.render();
	    if (this.state.clicked) {
	    	return super.render()
	    }
	    
	    return (
	    	<span 
			    onClick={() => this.setState({ clicked: true })} 
			    className="d-nsoneee Rank d-inline-block badge badge-pill gradient-1 float-left h-25 mt-2 "
			>
		    	<a className="edits collapse show multi-collapse" aria-expanded="true" >{this.props.value}</a>
		    </span>
		);
	    
  }
}


class Titulo extends TaskObj {
	constructor(props){
		super(props);
		this.state = {  ...this.state, modelPsrop: "Titulo" };

	}

    renderAnchorText()
    {
    	return this.props.taskID + " - " + this.props.value;
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

class Info extends TaskObj {
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

function BotaoAction(props)
{
	return (
		<button 
        	className={props.btnClassName}>
        	<i className={props.iconClassName}
        		id={props.iconID}></i>
        	<span className={props.spanClassname}>{props.texto}</span>
        </button>
	)
}
function BotaoEntregar(props)
{
	return (
		<BotaoAction 
			btnClassName="Entregar 	btn btn-primary px-lg-5 p-2 mx-2 "
			iconClassName={"fas fa-stop work_icon " + (props.active ? "pr-lg-4":"")}
			iconID={"icon_stop_act_" + props.taskID}
			spanClassname={"d-none " + (props.active ? 'd-lg-inline':'')}
			texto="Entregar"
		/>

	)
}
function BotaoExecutar(props)
{
	return (
		<BotaoAction 
			btnClassName="Trabalhar btn-circle start_work 	btn btn-primary px-lg-4 p-2 mx-2 " 
			iconClassName={"fas " + (props.active ? 'fa-pause':'fa-play') + " work_icon " + (props.active ? "pr-lg-4":"") }
			iconID={"icon_work_act_" + props.taskID}
			spanClassname={"d-none " + (props.active ? 'd-lg-inline':'')}
			texto={(props.active ? 'Pausar':'Trabalhar')}
		/>

	)
}

function Progresso(props)
{
	return (
	<div className="Progresso w-50 m-2 small align-self-center progress no-gutters" style={{height: 10+"px"}}>
		<div className="progress-bar gradient-1" style={{width: props.value+"%"}} role="progressbar">	
			<span className="sr-only">{props.value}% Complete</span>
		</div>
	</div> 
	);
}

class DataDesejada extends TaskObj {
	constructor(props){
		super(props);
		this.state = {  ...this.state, modelPsrop: "Projeto" };

	}
	renderAnchorText(){
		return new Date(this.props.value + " GMT-02:00").toLocaleDateString();
	}
	renderInput(){
		return (
			<input 
	        			type="date" 
	        			value={this.props.value}
	        			data-keypress="__dataKey"/>
	        );
	}
	renderInside(){

		return (
			<React.Fragment>
				<span className="mr-1" >Data Desejada: </span>
				{super.renderInside()}
	        </React.Fragment>
		);
	}
	/*
	*/
}


class EsforcoEstimado extends TaskObj {
	constructor(props){
		super(props);
		this.state = {  ...this.state, modelPsrop: "Projeto" };

	}
	renderAnchorText(){
		//return new Date(this.props.value + " GMT-02:00").toLocaleTimeString();
		return this.props.value;
	}
	renderInput(){
		return (
			<input 
	        			type="time" 
	        			max="72:00"
	        			value={this.props.value}
	        			data-keypress="__dataKey"/>
	        );
	}
	renderInside(){

		return (
			<React.Fragment>
				<span className="mr-1" >Esforço Estimado: </span>
				{super.renderInside()}
	        </React.Fragment>
		);
	}
}

class Tags extends TaskObj {
	constructor(props){
		console.log(props)
		super(props);
		this.state = {  ...this.state, modelPsrop: "Projeto" };

	}
	renderAnchorText(){
		//return new Date(this.props.value + " GMT-02:00").toLocaleTimeString();
		//console.log(this.props.tags)
		return this.props.value? this.props.value.map((tag)=>tag.tag).join():"Sem Tags";
	}
	renderInput(){
		return (
			<input 
						className="Tag_input"
	        			value={this.props.value.map(v=>v.tag).join()}
	        			onChange={this.handleChange}
		            />
	        );
	}
	renderInside(){
		var title = (<React.Fragment/>);
		if (this.state.active)
			title = (<span className="mr-1" >Esforço Estimado: </span>);

		return (
			<React.Fragment>
				{title}
				{super.renderInside()}
	        </React.Fragment>
		);
	}
}

/*
<span class="Tags my-2 col-1">{{ entry.__is_active ? 'Tags: '}}
                	<a id="Tags_a_{{entry.id}}" 

                	role="button"  
                	class="edit colapse {#show collapsed #} multi-collapse " data-toggle="collapse" data-click="T_Tags.toggle"  aria-expanded="true" aria-controls="Tag_input_{{entry.id}} Tags_a_{{entry.id}}" data-target=".multi-collapse_{{entry.id}}" >
                	{% set tagsVal = [] %}
		            {% for tag in Tags if tag.task_id == entry.id %}
                    	<span class="badge badge-pill gradient-1 " aria-hidden="true">{{ tag.tag }}</span>
                    	{% set tagsVal = tagsVal|merge([tag.tag|e]) %}
                    {#	<span class="badge badge-pill gradient-1 "aria-hidden="true">T2</span>,
                    	<span class="badge badge-pill gradient-1 "aria-hidden="true">T3</span>
                    #}
                	{% else %}
                		Sem Tags
		            {% endfor %}

		            {% set entry = entry|merge({tags: tagsVal}) %}

                    </a>
		            <span class="input_span collapse multi-collapse " aria-expanded="false" >
		            	<input id="Tag_input_{{entry.id}}" class="Tag_input" value="{{tagsVal|join(',')}}" data-keypress="T_Tags.key"/>
		            	<i data-input_id="#Tag_input_{{entry.id}}" class="cancel fas fa-times-circle text-warning" data-click="T_Tags.toggle"  ></i>
		            	<i data-input_id="#Tag_input_{{entry.id}}" data-click="T_Tags.save" class="save fas fa-check text-success"></i>
		            </span>
               	</span>
*/
function EntregaEstimada(props){
	return (
		<span className="Entrega m-2"><span className="mr-1" >Est. Entrega:  </span><a href="">10/03/2019</a></span>
	);
}

function ButtonContainer(props){
	return (
		<div className="ButtonContainer align-self-center d-inline-block bordedrRed">
			<BotaoEntregar active={props.active} taskID={props.taskID} />
			<BotaoExecutar active={props.active} taskID={props.taskID} />
         </div>
		)
		/*

	            <button 
	            	class="Trabalhar btn-circle start_work 	btn btn-primary px-lg-4 p-2 mx-2 " 
	            	data-task_id="{{entry.id}}" 
	            	data-card_id="card_{{entry.id}}">
	            	<i class="fas {{entry.__icon}} work_icon {{entry.__is_active ? 'pr-lg-4'}}" 
	            		id="icon_work_act_{{entry.id}}"></i> 
	            	<span class="d-none {{entry.__is_active ? 'd-lg-inline'}}">Pausar</span>
	            </button>
		*/
}

class Tarefa extends React.Component {
	constructor(props) {
		super(props);
		this.state = {  
			data: this.props.data,
			taskID: this.props.taskID,
			percentual: this.props.percentual,
			active: this.props.active ==1,
		};
	}

	update(info)
	{
		//this.setState({data: {...this.state.data, info} });
		this.setState({data: Object.assign({}, this.props.data, info) });
			//Object.assign({}, colormap, {right: 'blue'});
	}
	render(){

		const infoClass = "row  justify-content-around_ " + (this.state.active ? 'd-inline-block' : 'd-flex' );
		var activeElements = (<React.Fragment/>);
		if(this.state.active)
		{
			activeElements = (
				<React.Fragment>
					<Progresso value={this.state.percentual} />
					<DataDesejada 
					    	taskID={this.state.taskID} 
					    	value={this.props.data.data} 
			    			onSave={(Data) => this.update({data: data})}
			    			spanClassNames="Data m-2"
			    	/>
			    	<EsforcoEstimado 
					    	taskID={this.state.taskID} 
					    	value={this.props.data.__tempo_estimado_final} 
			    			onSave={(tempo_estimado) => this.update({tempo_estimado: tempo_estimado})}
			    			spanClassNames="Estimado my-2"
			    	/>
			    	<EntregaEstimada />
				</React.Fragment>
			    
			);
		}
		var tags = this.props.data.tags
		console.log(this.props.data, typeof this.props.data.tags)
	  return (
	  	<div id={"card_"+ this.taskID } 
	  		className={"card Tarefa bb_t"+this.props.data.tipo_tarefa_id +"  "+ 
	  			(this.state.active ? 'task_running' : '' )} data-id={this.state.taskID} data-user_id='2' draggable="true">
		  	<div className="border-left-primary card-header justify-content-between px-4 row mx-0 align-items-start">
			    <Rank 
			    	taskID={this.state.taskID} 
			    	value={this.props.data.rank} 
			    	onSave={(rank) => this.update({rank: rank})
					    } 
			    	spanClassNames="Rank d-nsoneee d-inline-block badge badge-pill gradient-1 float-left h-25 mt-2 "
			    	/>
		        <div className="col m-1">
		        	<div className={infoClass}>
		        		<Titulo
					    	taskID={this.state.taskID} 
					    	value={this.props.data.titulo} 
			    			onSave={(titulo) => this.update({titulo: titulo})}
			    			spanClassNames="Titulo mx-n2 my-2 col-6 font-weight-bold"
					    />
					    <Info
					    	taskID={this.state.taskID} 
					    	value={this.props.data.project_id} 
			    			onSave={(project_id) => this.update({project_id: project_id})}
			    			spanClassNames="Info Link d-block my-2"
					    />
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
		        	</div>
		        </div>
		        <ButtonContainer active={this.state.active} taskID={this.state.taskID} />
	        </div>
	    </div>
	  );
	}
}

function ListaTarefa(props)
{
	const tarefas = data.map((task, i) =>{
		return (
			<Tarefa 
					key={task.id}
					taskID={task.id}
					rank={task.rank} 
					titulo={task.titulo} 
					project_id={task.project_id} 
					percentual={task.__perc} 
					tipo_tarefa_id={task.tipo_tarefa_id} 
					active={task.__is_active}
					data={task}
			/> 
			);
		});

	return (
		<div id="accordion-two" className="accordion">
			{tarefas}
		</div>
		);
}




var x = document.getElementsByClassName('Task reactq');
//var x = $("span.Rank.react");
var i;
for (i = 0; i < x.length; i++) {
	ReactDOM.render(
				<Tarefa 
					taskID={x[i].getAttribute('taskID')}
					rank={x[i].getAttribute('rank')} 
					titulo={x[i].getAttribute('titulo')} 
					project_id={x[i].getAttribute('project_id')} 
					active={x[i].getAttribute('active')} 
				/>
			,x[i])
}
const domContainer = document.querySelector('#task_list_container');

ReactDOM.render(
				<ListaTarefa />
			,domContainer)




