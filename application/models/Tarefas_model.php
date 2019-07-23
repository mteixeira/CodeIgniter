<?php
require_once('Abstract_Model.php');
class Tarefas_Model extends Abstract_Model {
	public $id;
	//public $uuid;
	public $codigo;
	public $data;
	public $rank;
	public $titulo;
	public $detalhes;
	public $project_id;
	public $parent_task;
	public $tipo_tarefa_id;
	public $tempo_estimado;
	public $cli_id;
	public $status;
	
	protected function getDatabase()
	{
		return "mteixeira_task_tarefa";
	}
	
	
	protected function preInsert($data)
	{
		$data = parent::preInsert($data);
		//$this->db->set('uuid', 'UUID()', FALSE);
        if(empty($data['parent_task'])) $data['parent_task'] = null;

		return $data;
	}
	

	public function getStatusList()
	{
		return array(
			'all' => array('Iniciada', 'Em Andamento', 'Concluida', "Cancelada"),
			"opened"=> array('Iniciada', 'Em Andamento'),
			"closed" => array('Concluida'),
			"canceled" => array('Cancelada')
		);
	}
	public function get_by_id($id) {
		if(!$id) return null;
		$res = parent::get_by_id($id);
		if($res)
		{
			log_message('debug', "getByID resultado Positivo");
			
			$parent_id = $res["parent_task"];
			$res["parent"] = $this->get_by_id($parent_id);
		}
		log_message('debug', "Retornando");
		log_message('debug',  $res);
		return $res;
	}

	public function get_potential_users($condition = []) {
		//"parent_task" => null
		$query = $this->db->get_where("pneuscar_vis_usuario", $condition);
		return $query->result();
	}

	public function start_work($user_id, $task_id)
	{
		log_message('debug', __METHOD__);

		$this->stop_works($user_id);
		$this->db->reset_query();
		log_message('debug', __METHOD__);
		log_message('debug', $user_id);
		log_message('debug', $task_id);
		$res = $this->db->insert("mteixeira_task_work", ["usuario_id"=>$user_id, "task_id"=> $task_id]);
		log_message('debug', $res);
		return $res;
	}
	public function stop_work($user_id, $task_id)
	{
		log_message('debug', __METHOD__);
		log_message('debug', __METHOD__);
		log_message('debug', $user_id);
		log_message('debug', $task_id);
		$this->db->set('ts_final', 'NOW()', FALSE);
		$res = $this->db->update("mteixeira_task_work", [], ["usuario_id"=>$user_id, "task_id"=> $task_id, "ts_final" => "0000-00-00"]);
		log_message('debug', $res);
		return $res;
	}

	public function get_times($user_id="")
	{
		//SELECT `mteixeira_task_work`.`task_id`, ts_final - ts_inicio as total FROM `mteixeira_task_work` group by task_id
		//select task_id, sum(IF(ts_final="0000-00-00 00:00:00", CURRENT_TIMESTAMP, ts_final) - ts_inicio) as total FROM `mteixeira_task_work` group by task_id

		$this->db->select('`task_id`, SUM(TIMEDIFF(IF(`ts_final`="0000-00-00 00:00:00", CURRENT_TIMESTAMP, `ts_final`), `ts_inicio`)) as total, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(IF(`ts_final`="0000-00-00 00:00:00", CURRENT_TIMESTAMP, `ts_final`), `ts_inicio`)))) as total_sec', false);
		$this->db->group_by(array("task_id"));  // Produces: GROUP BY title, date
		if($user_id) $this->db->where('usuario_id', $user_id);
		//$this->db->where('ts_final !=', '0000-00-00 00:00:00');
		//$this->db->where('id = 59');
		$this->db->from('mteixeira_task_work');
		$query = $this->db->get();
		return $query->result_array();
	}
	
	public function get_WorkTimes($task_id, $user_id)
	{
		//SELECT `mteixeira_task_work`.`task_id`, ts_final - ts_inicio as total FROM `mteixeira_task_work` group by task_id
		//select task_id, sum(IF(ts_final="0000-00-00 00:00:00", CURRENT_TIMESTAMP, ts_final) - ts_inicio) as total FROM `mteixeira_task_work` group by task_id
		$this->db->select('*, TIMEDIFF(IF(`ts_final`="0000-00-00 00:00:00", CURRENT_TIMESTAMP, `ts_final`), `ts_inicio`) as diff', false);
		$query = $this->db->get_where("mteixeira_task_work", ["usuario_id"=>$user_id, "task_id"=>$task_id]);
		return $query->result();
	}
	
	public function get_ActiveTaskID($user_id)
	{
		//SELECT `mteixeira_task_work`.`task_id`, ts_final - ts_inicio as total FROM `mteixeira_task_work` group by task_id
		//select task_id, sum(IF(ts_final="0000-00-00 00:00:00", CURRENT_TIMESTAMP, ts_final) - ts_inicio) as total FROM `mteixeira_task_work` group by task_id

		$tw = $this->get_ActiveTaskWork($user_id);
		if (isset($tw))
		{
			return $tw->task_id;
		}
		return 0;
	}
	public function get_ActiveTaskWork($user_id)
	{
		//SELECT `mteixeira_task_work`.`task_id`, ts_final - ts_inicio as total FROM `mteixeira_task_work` group by task_id
		//select task_id, sum(IF(ts_final="0000-00-00 00:00:00", CURRENT_TIMESTAMP, ts_final) - ts_inicio) as total FROM `mteixeira_task_work` group by task_id

		$query = $this->db->get_where("mteixeira_task_work", ["usuario_id"=>$user_id,'ts_final'=> "0000-00-00 00:00:00"]);
		
		return $query->row()?:[];
	}

	public function stop_works($user_id)
	{
		log_message('debug', __METHOD__);
		log_message('debug', __METHOD__);
		log_message('debug', $user_id);
		$this->db->set('ts_final', 'NOW()', FALSE);
		$res = $this->db->update("mteixeira_task_work", [], ["usuario_id"=>$user_id, "ts_final" => "0000-00-00"]);
		log_message('debug', $res);
		return $res;
	}

	

	protected function setFields($data)
	{
		log_message('debug', __METHOD__);
        if(isset($data['id'])) $this->id    	= $data['id']; // please read the below note
        //$this->uuid  	= $data['uuid'];
        $this->data  	= $data['data'];
        $this->codigo  	= $data['codigo'];
        $this->titulo  	= $data['titulo'];
        $this->rank  	= $data['rank'];
		$this->detalhes = $data['detalhes'];
		if(isset($data['tempo_estimado'])) $this->tempo_estimado = $data['tempo_estimado'];
		$this->tipo_tarefa_id = $data['tipo_tarefa_id'];		
		$this->project_id = $data['project_id'];		
        $this->parent_task = !empty($data['parent_task']) ? $data['parent_task'] : null;

        $this->cli_id  	= $data['cli_id'];
        $this->status  	= $data['status'];
	}

	
	public function count_opened()
	{
		$opened = $this->getStatusList()["opened"];
		$this->db->where_in('status', $opened);
		return $this->db->count_all_results($this->getDatabase());
	}
	
	public function get_entries_by_status($status, $order = ["rank"=> "ASC"]) {
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
		if($order) {
			foreach($order as $a => $b)
			{
				$this->db->order_by($a, $b);
			}
		}
		$query = $this->db->get($this->getDatabase());
		return $query->result_array();
	}
}
?>
