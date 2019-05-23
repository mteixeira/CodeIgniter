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
		return $this->get_by("id", $id);
	}
	
	public function get_by_uuid($uuid) {
		return $this->get_by("uuid", $uuid);
	}
	
	public function get_by($field, $value) {
		if($value != FALSE) {
			$query = $this->db->get_where($this->getDatabase(), array($field => $value));
			return $query->row_array();
		}
		else {
			return FALSE;
		}
	}
	
	public function get_entries() {
		$query = $this->db->get($this->getDatabase());
		return $query->result();
	}

	
	
	public function insert_entry($data)	{
		
		$this->setFields($data); // please read the below note
		$data = $this->preInsert($data); // please read the below note
		

        $this->db->insert($this->getDatabase(), $data);
	}
		
	public function update_entry($uuid, $data)	{
		
        $this->setFields($data); // please read the below note
        $this->db->update($this->getDatabase(), $this, array('uuid' => $uuid));
	}
}
?>