<?php
require_once('Abstract_Model.php');
class Projetos_model extends Abstract_Model {
	public $id;
	public $title;
	public $description;
	public $created_at;
	public $updated_at;
	
	protected function getDatabase()
	{
		return "mteixeira_task_project";
	}
	protected function setFields($data)
	{
        if(isset($data['id'])) $this->id    		= $data['id']; // please read the below note
        $this->title  		= $data['title'];
        $this->description  = $data['description'];
        //if(isset($data['created_at'])) $this->created_at  	= $data['created_at'];
        //if(isset($data['updated_at'])) $this->updated_at  	= $data['updated_at'];
	}
}
?>
