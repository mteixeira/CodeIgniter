<?php
require_once('Abstract_Model.php');
class Status_Model extends Abstract_Model {
	public $id;
	public $status;
	
	protected function getDatabase()
	{
		return "pneuscar_vis_status";
	}
	protected function setFields($data)
	{
        $this->id    	= $data['id']; // please read the below note
        $this->status  	= $data['status'];
	}
}
?>