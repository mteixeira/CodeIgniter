<?php
require_once('Abstract_Model.php');
class Task_Work_model extends Abstract_Model {
	public $id;
	public $nome;
	public $detalhes;
	public $color;
	public $esforco_estimado;	
	
	protected function getDatabase()
	{
		return "mteixeira_task_work";
	}
	protected function setFields($data)
	{
		$this->id    	= $data['id']; // please read the below note
		$this->nome  	= $data['nome'];
		$this->detalhes = $data['detalhes'];
		$this->color  	= $data['color'];
		$this->esforco_estimado  = $data['esforco_estimado'];
	}
}
?>
