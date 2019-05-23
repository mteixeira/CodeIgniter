<?php
require_once 'CRUD_Controller.php';

class Visitas extends CRUD_Controller {
	
	protected function getModel()	
	{
		return 'Visitas_model';
	}
	protected function getName()
	{
		return 'visitas';
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
		$data['openedCount'] = $this->model->count_opened();
		
		$file = $this->getTwigDefDir().'/index.html.twig';
		$this->twig->display($file, $data);
	}
	
	
	protected function prepareGet($obj)
	{
		$obj = parent::prepareGet($obj);
		$this->load->model('Status_Model');
		$status_entries = $this->Status_Model->get_entries();
		$obj['status_entries'] = $status_entries;
		return $obj;
	}
	
}

?>