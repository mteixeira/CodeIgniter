<?php
require_once('Abstract_Model.php');
class Tarefas_Model extends Abstract_Model {
	public $id;
	//public $uuid;
	public $titulo;
	public $detalhes;
	public $parent_task;
	public $cli_id;
	public $status;
	
	protected function getDatabase()
	{
		return "mteixeira_task_tarefa";
	}
	
	
	protected function preInsert($data)
	{
		$data = parent::preInsert($data);
		//$this->db->set('uuid', 'UUID()', FALSE);

		return $data;
	}

	protected function setFields($data)
	{
        if(isset($data['id'])) $this->id    	= $data['id']; // please read the below note
        //$this->uuid  	= $data['uuid'];
        //$this->data  	= $data['data'];
        $this->titulo  	= $data['titulo'];
        $this->detalhes = $data['detalhes'];
        $this->parent_task = $data['parent_task'];

        $this->cli_id  	= $data['cli_id'];
        $this->status  	= $data['status'];
	}
}
?>