<?php
require_once('Abstract_Model.php');
class Visitas_Model extends Abstract_Model {
	public $id;
	public $uuid;
	public $data;
	public $cli_id;
	public $status;
	
	protected function getDatabase()
	{
		return "pneuscar_vis_visita";
	}
	protected function setFields($data)
	{
        if($data['id']) $this->id    	= $data['id']; // please read the below note
        if($data['uuid']) $this->uuid  	= $data['uuid'];
        $this->data  	= $data['data'];
        $this->cli_id  	= $data['cli_id'];
        $this->status  	= $data['status'];
	}
	
	protected function preInsert($data)
	{
		$data = parent::preInsert($data);
		$this->db->set('uuid', 'UUID()', FALSE);
		return $data;
	}

	public function count_opened()
	{
		$opened = $this->getStatusList()["opened"];
		$this->db->where_in('status', $opened);
		return $this->db->count_all_results($this->getDatabase());
	}

	protected function getStatusList()
	{
		return array(
			'all' => array('Solicitada', 'Visualizada', 'Agendada', 'A Caminho', 'Visitada', 'Cancelada', 'Coletada', 'Em Processo', 'Concluida'),
			"opened"=> array('Solicitada', 'Visualizada', 'Agendada', 'A Caminho'),
			"closed" => array('Visitada', 'Cancelada', 'Coletada', 'Em Processo', 'Concluida'),
			"canceled" => array('Cancelada')
		);
	}

	public function get_entries_by_status($status) {
		$list = $this->getStatusList();
		switch ($status) {
			case "all":
				$statuses = $list[$status];
				break;
			case "opened":
				$statuses = $list[$status];
				break;
			case "closed":
				$statuses = $list[$status];
				break;
			case "canceled":
				$statuses = $list[$status];
				break;
			default:
				echo "i is not equal to 0, 1 or 2";
				return;
		}

		if($statuses) $this->db->where_in('status', $statuses);
		$query = $this->db->get($this->getDatabase());
		return $query->result();
	}
}
?>