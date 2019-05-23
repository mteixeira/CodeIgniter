<?php
class Notes_model extends CI_Model {
	public $title;
	public $description;
	public $date;
	
	public function __construct() {
		$this->load->database();
	}
	
	public function get_note($id) {
		return $this->get_by("id", $id);
	}
	
	public function get_note_uuid($uuid) {
		return $this->get_by("uuid", $uuid);
	}
	
	public function get_by($field, $value) {
		if($value != FALSE) {
			$query = $this->db->get_where('teste_note', array($field => $value));
			return $query->row_array();
		}
		else {
			return FALSE;
		}
	}
	
	public function get_notes() {
		$query = $this->db->get('teste_note');
		return $query->result();
	}
	
	public function insert_entry()	{
		
        $this->title    = $_POST['title']; // please read the below note
        $this->description  = $_POST['description'];
        //$this->date     = time();

        $this->db->insert('teste_note', $this);
	}
		
	public function update_entry()	{
		
        $this->title    = $_POST['title']; // please read the below note
        $this->description  = $_POST['description'];
        //$this->date     = time();

        $this->db->update('teste_note', $this, array('uuid' => $_POST['uuid']));
	}
}
?>