<?php
require_once 'CRUD_Controller.php';

class Tarefas extends CRUD_Controller {
	
	protected function getModel()	
	{
		return 'Tarefas_model';
	}
	protected function getName()
	{
		return 'Tarefas';
	}
	
	protected function getEditForm($data)
	{
		log_message('debug', __METHOD__);
		log_message('debug', $data);
		return $this->form("", $data["entry"])
		->input("id"			, "id"			, "task-id"			, "text"			, "ID"		)
		->input("codigo"		, "codigo"		, "task-code"		, "text"			, "Código"		)
		->input("titulo"		, "titulo"		, "task-title"		, "text"			, "Título"		)
		->input("rank"			, "rank"		, "task-rank"		, "text"			, "Rank"		)
		->select("parent_task"	, "parent_task"	, "task-parent"		, $data['task_ids']			, "Pai"			)
		->select("tipo_tarefa_id", "tipo_tarefa_id"	, "task-tipo"	, $data['tipos_options']			, "Tipo"		)
		->select("project_id", "project_id"	, "task-projeto"	, $data['projetos_options']			, "Projeto"		)
		->select("cli_id"		, "cli_id"		, "task-cli"		, $data['users']			, "Alocados"		)
		->input("data"			, "data"		, "task-date"		, "date"			, "Data"		)
		->select("status"		, "status"		, "task-status"		, $data['status_entries']	, "Status"		)
		->textarea("detalhes"	, "detalhes"	, "task-detalhes"	, ""				, "Detalhes"	)
		->submit("btn-submit", "Salvar")
		->build();
	}

	public function getCustom($type, $entry)
	{
		return $this->edit($entry["id"], "Version3");
	}
	protected function getEditVersion($version)
	{
		if($version == "Version2")
		{
			return 'twig/tarefas/show_entry.html.twig';

		}
		else
		{
			return parent::getEditVersion($version);
		}
	}

	protected function editResult($data, $model, $datatype)
	{
		if($model == "Version3")
		{
			$file = $this->getEditVersion("Version2");
			log_message('info', "Carregando Pagina $file");
			log_message('debug', $data);
			$res = $this->twig->render($file, $data);
			return $this->json(["html"=>"$res", "data"=>$data["entry"]]);
		}
		else
		{
			return parent::editResult($data, $model);
		}
	}



	protected function getCreateForm($data, $entry = [])
	{
		$entry = $entry ?: $data["entry"];
		return $this->form("tarefas/create", $entry)
			->input("codigo"		, "codigo"		, "task-code"		, "text"			, "Código"		, ["hidden"=>""])
			->input("titulo"		, "titulo"		, "task-title"		, "text"			, "Título"		)
			->input("rank"			, "rank"		, "task-rank"		, "text"			, "Rank"		, ["hidden"=>""])
			->select("parent_task"	, "parent_task"	, "task-parent"		, $data['task_ids']			, "Pai"			)
			->select("tipo_tarefa_id", "tipo_tarefa_id"	, "task-tipo"	, $data['tipos_options']			, "Tipo"		)
			->select("project_id", "project_id"	, "task-project"	, $data['projetos_options']			, "Tipo"		)
			->select("cli_id"		, "cli_id"		, "task-cli"		, $data['users']			, "Alocados"		)
			->input("data"			, "data"		, "task-date"		, "date-local"		, "Data"		, ["hidden"=>""])
			->select("status"		, "status"		, "task-status"		,  $data['status_entries']	, "Status"		, ["hidden"=>""])
			->textarea("detalhes"	, "detalhes"	, "task-detalhes"	, ""				, "Detalhes"	)
			->submit("btn-submit", "Salvar")
			->build();
	}
	protected function createDefaultEntry()
	{
		return [
			"codigo" 		=> '',		
			"titulo"  		=> '',
			"rank"			=>  '99', 
			"parent_task" 	=>  '1',
			"tipo_tarefa_id"=>  '1',
			"project_id"	=>  '1',
			"cli_id"	 	=>  '2',
			"data"		 	=>  '2019-01-01T10:10:10',
			"status"	 	=> 'Inicializada'		,
			"detalhes"	 	=>  	'',
		];
	}
	
	protected function getDefaultEntries() {

		log_message('debug', __METHOD__);
		if($this->input->get('tag'))
		{
			log_message('debug', "Tag");
			$this->load->model('Tags_Model');
			if($this->input->get('tag') == "-")
			{
				$tagsEntries =  $this->Tags_Model->get_entries_array();

				$tagsRes = array_map(function($v) {
				    return $v["task_id"];
				},$tagsEntries);
				return $this->model->get_entries_array_not_in(["id"=>$tagsRes], ["rank"=>"ASC"]);	
			} else	{
				$tagsEntries =  $this->Tags_Model->get_entries_array(["tag"=>$this->input->get('tag')]);

				$tagsRes = array_map(function($v) {
				    return $v["task_id"];
				},$tagsEntries);//,  ARRAY_FILTER_USE_BOTH
				//echo json_encode($tagsRes);
				//return;
				if(!$tagsRes) return [];
				$cond = ["id"=>$tagsRes];
				if($this->input->get('status')){
					$list = $this->model->getStatusList();
					$status = $this->input->get('status');
					$status = isset($list[$status])? $status: "opened";
					$c = $list[$status];

					$cond = array_merge($cond, ["status"=> $c]);
				}

				return $this->model->get_entries_array_in($cond, ["rank"=>"ASC"]);	
			}
		} 
		log_message('debug', "Tag False");
		if($this->input->get('status')) return $this->model->get_entries_by_status($this->input->get('status'));
		else return $this->model->get_entries_by_status("opened");

	}
	
	
	public function getAll2() {
		return parent::getAll();
	}
	
	public function status($status="opened") {

		
		//echo $this->isPost();
		//return ;
		$this->loadModel();
		
		$notes = $this->model->get_entries_by_status($status);
		$data['entries'] = $notes;
		
		$data = $this->prepareGet($data);

		$data['openedCount'] = $this->model->count_opened();
		
		$file = $this->getTwigDefDir().'/index.html.twig';
		$this->twig->display($file, $data);
	}
	
	public function cards($status="opened") {
		$this->loadModel();
		$notes = $this->model->get_entries_by_status($status);
		$data['entries'] = $notes;
		$data['openedCount'] = $this->model->count_opened();
		
		$file = $this->getTwigDefDir().'/cards.html.twig';
		$this->twig->display($file, $data);
	}

	public function start_work()
	{
		log_message('debug', __METHOD__);
		$data = $this->getPostData($this);
		log_message('debug', $data);
		//echo json_encode($data);
		//return;	
		$this->loadModel();
		//echo $data['task_id'];
		$this->model->start_work($data["usuario_id"], $data['task_id']);
		$times = $this->model->get_times($data["usuario_id"]);
		echo json_encode($times);
		return;
	}

	public function stop_work()
	{
		log_message('debug', __METHOD__);
		$data = $this->getPostData($this);
		log_message('debug', $data);
		//echo json_encode($data);
		//return;	
		$this->loadModel();
		//echo $data['task_id'];
		$this->model->stop_work($data["usuario_id"], $data['task_id']);
		$times = $this->model->get_times($data["usuario_id"]);
		echo json_encode($times);
		return;
	}

	public function get_times($user_id="")
	{
		log_message('debug', __METHOD__);
		$data = $this->getPostData($this);
		$this->loadModel();
		$times = $this->model->get_times($user_id);
		echo json_encode($times);
		return;
	}
	
	
	public function update_rank()
	{
		log_message('debug', __METHOD__);
		$data = $this->getPostData($this);
		$task_id = $data["task_id"];
		$rank = $data["rank"];
		$this->loadModel();
		$res = $this->model->update_entry_by_id($task_id, ["rank" => $rank], true);
		//echo json_encode($res);
		if($res)
		{
			$result = ["result"=>"Sucesso", "rank"=> $rank];
		}
		else
		{
			$result = ["result"=>"Erro"];
		}

		echo json_encode($result);
		return;
	}

	public function set_tags($id)
	{
		log_message('debug', __METHOD__);
		$data = $this->getPostData($this);
		$task_id = $data["id"];
		$tags = $data["tags"];
		log_message('debug', $tags);

		$this->load->model('Tags_Model');
		$tags2 =  $this->Tags_Model->updateTags($task_id, $tags);

		echo json_encode(["input"=>$tags, "inputStr" => json_encode($tags), "res"=> $tags2]);
		return;
		$res = $this->model->update_entry_by_id($task_id, ["rank" => $rank], true);
		//echo json_encode($res);
		if($res)
		{
			$result = ["result"=>"Sucesso", "rank"=> $rank];
		}
		else
		{
			$result = ["result"=>"Erro"];
		}

		echo json_encode($result);
		return;
	}

	public function update_fields($id)
	{
		log_message('debug', __METHOD__);
		$data = $this->getPostData($this);
		$this->loadModel();
		$res = $this->model->update_entry_by_id($id, $data, true);
		//echo json_encode($res);
		if($res)
		{
			$result = ["status"=>"Sucesso", "data"=> $data, "res" => $data];
		}
		else
		{
			$result = ["status"=>"Erro"];
		}

		echo json_encode($result);
		return;
	}
	
	protected function prepareGet($obj)
	{
		log_message('info', 'Preparando Consulta');
		$obj = parent::prepareGet($obj);
        //$this->load->model('Status_Model');
		//$status_entries = $this->Status_Model->get_entries();
        
		//$data['status_entries'] = ["Iniciada", "Em Andamento", "Concluida"];
		$status_entries = ["Iniciada", "Em Andamento", "Concluida"];
		$obj['status_entries'] = $status_entries;
		
		$obj['status'] = $this->input->get('status')?:"opened";

		$userID = 2;
		$taskID = '';
		if(isset($obj["entry"]["id"])) $taskID = $obj["entry"]["id"];
		
		// Parent Tasks
		if(isset($obj["entry"]["parent_task"])) $obj['parent'] = $this->model->get_by_id($obj["entry"]["parent_task"]);

		
		/******************************************************** 
		 * 			TASKS
		**********************************************************/
		log_message('info', 'Carregando Tarefas');
		
		$task_ids = [["id"=>"","value"=>"Raiz"]];
		//$task_ids = [["id"=>"","value"=>"Raiz"]];
		$tasks =  $this->model->get_entries();
		foreach ($tasks as $row)
		{
			$task_ids[] = ["id" => $row->id, "value" => $row->titulo];
		}
		$obj['task_ids'] = $task_ids;
		
		/******************************************************** 
		 * 			CHIDS
		**********************************************************/
		log_message('info', 'Carregando Tarefa Filhas');
		
		// Child tasks
		if($taskID) $obj['childs_tasks'] = $this->model->get_all_by("parent_task", $taskID, ["rank"=> "ASC"]);
		else $obj['childs_tasks'] = [];

		/******************************************************** 
		 * 			TIMEs
		**********************************************************/
		log_message('info', 'Carregando Tempos');
		// Times
		$times_ = $this->model->get_times();

		$times = [];
		foreach ($times_ as $row)
		{
			$times[$row["task_id"]]  = [$row["total"],$row["total_sec"]];
		}
		$obj['times'] = $times;
		
		
		/******************************************************** 
		 * 			ACTIVE TASK
		**********************************************************/
		log_message('info', 'Carregando Tarefa Ativa');
		
		$obj['active_task_id'] =  $this->model->get_ActiveTaskID($userID);		
		
		
		/******************************************************** 
		 * 			WORK TIMES
		**********************************************************/
		log_message('info', 'Carregando Tempos Trabalhados');
		if($taskID) $obj['task_times'] =  $this->model->get_WorkTimes($taskID, $userID);	
		
		
		
		$splitKeys = function($list, $id, $devault_val = []) {
			foreach ($list as $row)
			{
				$devault_val[$row->$id]= $row;
			}
			return $devault_val;
		};

		$options = function($list, $id, $value, $devault_val = []) {
			foreach ($list as $row)
			{
				$devault_val[] = ["id" => $row->$id, "value" => $row->$value];
			}
			return $devault_val;
		};

		/******************************************************** 
		 * 			USERS
		**********************************************************/
		log_message('info', 'Carregando Usuarios');
		$users =  $this->model->get_potential_users();
		//echo json_encode($users);
		
		$obj['users'] = $options($users, 'id', 'nome', [["id"=>"","value"=>" "]]);
		/*
		foreach ($users as $row)
		{
			$res[] = ["id" => $row->id, "value" => $row->nome];
		}
		$obj['users'] = $res;
		
		*/


		
		/******************************************************** 
		 * 			Tipos
		**********************************************************/
		log_message('info', 'Carregando Tags');
		$this->load->model('Tags_Model');
		$tags =  $this->Tags_Model->get_entries();
		$obj['Tags'] = $tags;
		/******************************************************** 
		 * 			Tipos
		**********************************************************/
		log_message('info', 'Carregando Tipos');
		$this->load->model('Tipo_Tarefa_Model');
		$tipos =  $this->Tipo_Tarefa_Model->get_entries();
		$obj['TiposTarefas'] = $tipos;
		$obj['TiposTarefas_ids'] = $splitKeys($tipos, "id");
		

		
		$tipos_options = $options($tipos,  'id', 'nome');
		$obj['tipos_options'] = $tipos_options;
		/******************************************************** 
		 * 			Projetos
		**********************************************************/
		log_message('info', 'Carregando Projetos');
		$this->load->model('Projetos_model');
		$projetos =  $this->Projetos_model->get_entries();
		$obj['Projetos'] = $projetos;
		$obj['Projetos_ids'] = $splitKeys($projetos, "id");
		

		
		$projetos_options = $options($projetos,  'id', 'title');
		$obj['projetos_options'] = $projetos_options;
		
		$createForm = $this->getCreateForm($obj, $this->createDefaultEntry());
		$obj['createForm'] = $createForm; 
		return $obj;
	}
	
}

?>
