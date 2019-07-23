<?php
require_once 'CRUD_Controller.php';

class Projetos extends CRUD_Controller {
	
	protected function getModel()	
	{
		return 'Projetos_Model';
	}
	protected function getName()
	{
		return 'Projetos';
	}

	protected function createDefaultEntry()
	{
		return [
			"title" 			=> '',		
			"description"  		=> '',
			
		];
	}

	protected function getCreateForm($data, $entry = [])
	{
		$entry = $entry ?: $data["entry"];
		return $this->form("", $entry)
		->input("title"		, "title"		, "project-title"		, "text"			, "Titulo"		)
		->textarea("description"		, "description"		, "project-description"		, ""			, "Detalhes"		)
		->submit("btn-submit", "Salvar")
		->build();
	}
	protected function getEditForm($data)
	{
		return $this->form("", $data["entry"])
		->input("id"			, "id"			, "project-id"			, "text"			, "ID"		)
		->input("title"		, "title"		, "project-title"		, "text"			, "Titulo"		)
		->textarea("description"		, "description"		, "project-description"		, ""			, "Detalhes"		)
		->submit("btn-submit", "Salvar")
		->build();
	}

	
	
}

?>
