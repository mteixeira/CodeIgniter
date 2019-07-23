<?php
require_once('Abstract_Model.php');
class Tags_Model extends Abstract_Model {
	public $id;
	public $tag;
	public $task_id;
	
	protected function getDatabase()
	{
		return "mteixeira_task_tag";
	}
	protected function setFields($data)
	{
		$this->id    	= $data['id']; // please read the below note
		$this->tag  	= $data['tag'];
		$this->task_id = $data['task_id'];
	}

	public function updateTags($task_id, $tags)
	{
		log_message('debug', __METHOD__);
		log_message('debug', $task_id);
		log_message('debug', $tags);

		log_message('debug', "Filtrando Explode");
		$tagsArr = array_filter(explode(",", $tags), "strlen");
			// Deletar os que nao estao mais na lista
			// 

		log_message('debug', "Deletando Elementos");
		$this->db->where('task_id', $task_id);
		if($tagsArr) $this->db->where_not_in('tag', $tagsArr);
		$this->db->delete($this->getDatabase());

		$this->db->reset_query();
		log_message('debug', "Inserindo novos");

		// inserir os que nao aparecem
		$entries = $this->get_entries_array(['task_id'=> $task_id]);

		$tagsEntries = [];
		foreach ($entries as $value) {
			# code...
			$tagsEntries[] = $value["tag"];

		}

		log_message('debug', $tagsEntries);
		// Pega os novos
		$newElements = array_diff ($tagsArr, $tagsEntries);

		$data = array();
		foreach ($newElements as $tag) {
			# code...
			$data[] = array(
		        'tag' => $tag,
		        'task_id' => $task_id,
		    );
		}
		log_message('debug', $data);
		if($data) $this->db->insert_batch($this->getDatabase(), $data);

		$this->db->reset_query();

		log_message('debug', "Obtendo resultado Final");
		$entries = $this->get_entries_array(['task_id'=> $task_id], ["tags"=>"ASC"]);
		//echo $tag;
		return $entries;
	}
}
?>
