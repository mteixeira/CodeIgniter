<?php
abstract class Abstract_model extends CI_Model {
	
	abstract protected function getDatabase();
	abstract protected function setFields($data);
	protected function preInsert($data)
	{
		return $data;
	}
	
	public function __construct() {
		$this->load->database();
	}
	
	public function get_by_id($id) {
		log_message('debug', __METHOD__);
		log_message('debug', $id);
		return $this->get_by("id", $id);
	}
	
	public function get_by_uuid($uuid) {
		return $this->get_by("uuid", $uuid);
	}
	
	public function get_by($field, $value) {
		if($value != FALSE) {
			$query = $this->db->get_where($this->getDatabase(), array($field => $value));
			log_message('debug', json_encode($query));
			return $query->row_array();
		}
		else {
			return FALSE;
		}
	}


	
	public function get_all_by($field, $value, $_o = ["rank"=> "ASC"]) {
		
		log_message('debug', __METHOD__);
		log_message('debug', $field);
		log_message('debug', $value);
		if($value != FALSE) {
			
			foreach($_o as $a => $b)
			{
				$this->db->order_by($a, $b);
			}
			/*
			*/
			//$this->db->_o("rank");
			$query = $this->db->get_where($this->getDatabase(), array($field => $value));
			$res = $query->result();
			log_message('debug', $res);
			return $res;
		}
		else {
			return FALSE;
		}
	}
	
	public function count_all_by($field, $value) {
		
		if($value != FALSE) {
			$query = $this->db->get_where($this->getDatabase(), array($field => $value));
			
			return $this->db->count_all_results();
		}
		else {
			return FALSE;
		}
	}
	
	public function get_entries($condition = [], $order_by = []) {
		//"parent_task" => null
		log_message('debug', __METHOD__);
		log_message('debug', $condition);
		log_message('debug', $order_by);
		$query = $this->db->get_where($this->getDatabase(), $condition);
		$res = $query->result();
		log_message('debug', $res);
		return $res;
	}
	public function get_entries_array($condition = [], $order_by = []) {
		//"parent_task" => null
		log_message('debug', __METHOD__);
		log_message('debug', $condition);
		log_message('debug', $order_by);
		$query = $this->db->get_where($this->getDatabase(), $condition);
		$res = $query->result_array();
		log_message('debug', $res);
		return $res;
	}
	public function get_all_ids() {
		$this->db->select('id');
		$query = $this->db->get($this->getDatabase());
		$res = [""];
		foreach ($query->result() as $row)
		{
			$res[] = $row->id;

		}
		return $res;
	}

	
	
	public function insert_entry($data)	{
		
		log_message('debug', __METHOD__);
		log_message('debug', $data);
		$this->setFields($data); // please read the below note
		$data = $this->preInsert($data); // please read the below note
		

        return $this->db->insert($this->getDatabase(), $data);
	}
		
	public function update_entry($uuid, $data)	{
		
		log_message('debug', __METHOD__);
        $this->setFields($data); // please read the below note
        $this->db->update($this->getDatabase(), $this, array('uuid' => $uuid));
	}

	public function update_entry_by_id($id, $data, $useData=false)	{
		$updateData = $this;
		if($useData)$updateData = $data;
		log_message('debug', __METHOD__);
		log_message('debug', $id);
		log_message('debug', $data);
        if(!$useData) $this->setFields($data); // please read the below note
		$res = $this->db->update($this->getDatabase(), $updateData, array('id' => $id));
		log_message('debug', $res);
		return $res;
		
	}
}
?>