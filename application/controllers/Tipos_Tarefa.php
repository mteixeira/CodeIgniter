<?php
require_once 'CRUD_Controller.php';

class Tipos_Tarefa extends CRUD_Controller {
	
	protected function getModel()	
	{
		return 'Tipo_Tarefa_Model';
	}
	protected function getName()
	{
		return 'Tipos_Tarefa';
	}
	protected function getEditForm($data)
	{
		return $this->form("", $data["entry"])
		->input("id"			, "id"			, "task-id"			, "text"			, "ID"		)
		->input("nome"		, "nome"		, "task-nome"		, "text"			, "Nome"		)
		->input("color"		, "color"		, "task-color"		, "text"			, "Cor"		)
		->input("esforco_estimado"	, "esforco_estimado"		, "task-esforco"		, "time"			, "Esforco Estimado"		)
		
		// ->input("rank"			, "rank"		, "task-rank"		, "text"			, "Rank"		)
		// ->select("parent_task"	, "parent_task"	, "task-parent"		, $data['task_ids']			, "Pai"			)
		// ->select("tipo_tarefa_id", "tipo_tarefa_id"	, "task-tipo"	, $data['tipos_options']			, "Tipo"		)
		// ->select("cli_id"		, "cli_id"		, "task-cli"		, $data['users']			, "Alocados"		)
		// ->input("data"			, "data"		, "task-date"		, "date"			, "Data"		)
		// ->select("status"		, "status"		, "task-status"		, $data['status_entries']	, "Status"		)
		->textarea("detalhes"	, "detalhes"	, "task-detalhes"	, ""				, "Detalhes"	)
		->submit("btn-submit", "Salvar")
		->build();
	}

	/*
	protected function getCreateForm($data)
	{
		return $this->form("tarefas/create", $data["entry"])
			->input("codigo"		, "codigo"		, "task-code"		, "text"			, "Código"		, ["hidden"=>""])
			->input("titulo"		, "titulo"		, "task-title"		, "text"			, "Título"		)
			->input("rank"			, "rank"		, "task-rank"		, "text"			, "Rank"		, ["hidden"=>""])
			->select("parent_task"	, "parent_task"	, "task-parent"		, $data['task_ids']			, "Pai"			)
			->select("tipo_tarefa_id", "tipo_tarefa_id"	, "task-tipo"	, $data['tipos_options']			, "Tipo"		)
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
			"codigo" 		=> 'S0001',		
			"titulo"  		=> 'Tarefa1',
			"rank"			=>  '1', 
			"parent_task" 	=>  '2',
			"cli_id"	 	=>  '2',
			"data"		 	=>  '2019-01-01T10:10:10',
			"status"	 	=> 'Inicializada'		,
			"detalhes"	 	=>  	'detalhes',
		];
	}
	
	protected function getDefaultEntries() {
		return $this->model->get_entries(["parent_task" => null]);
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
	
	protected function prepareGet($obj)
	{
	}
	*/
	
}

?>
