<?php
require_once('Abstract_Model.php');
class Message_Model extends Abstract_Model {
	public $id;
	public $usuario_enviado;
	public $usuario_recebedor;
	public $message_text;
	public $ts_enviada;
	public $ts_recebida;
	public $ts_lida;
	
	protected function getDatabase()
	{
		return "mteixeira_msg_message";
	}
	
	
	protected function preInsert($data)
	{
		$data = parent::preInsert($data);
		//$this->db->set('uuid', 'UUID()', FALSE);
        if(empty($data['parent_task'])) $data['parent_task'] = null;

		return $data;
	}
	

	protected function getStatusList()
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
		$parent_id = $res["parent_task"];
		$res["parent"] = $this->get_by_id($parent_id);
		return $res;
	}

	protected function setFields($data)
	{
        if(isset($data['id'])) $this->id    	= $data['id']; // please read the below note
        //$this->uuid  	= $data['uuid'];
        //$this->data  	= $data['data'];
        $this->codigo  	= $data['codigo'];
        $this->titulo  	= $data['titulo'];
        $this->detalhes = $data['detalhes'];
        $this->parent_task = !empty($data['parent_task']) ? $data['parent_task'] : null;

        $this->cli_id  	= $data['cli_id'];
        $this->status  	= $data['status'];
	}

	//SELECT `c1`.`usuario_id` as `u1`, 
	//  `c2`.`usuario_id` as `u2`, 
	//  `c1`.`chat_id` as `c2`\n/
	// FROM `mteixeira_msg_chatMembers` `c1`\n
	//  JOIN `mteixeira_msg_chatMembers` `c2` 
	//    ON `c1`.`chat_id` = `c2`.`chat_id` and /
	//    c1`.`usuario_id` <> `c2`.`usuario_id`\n
	//   JOIN `pneuscar_vis_usuario` `u2` ON `u2`.`id` = `c1`.`usuario_id`\nWHERE `c1`.`usuario_id` = 2"

	
	public function get_chat_id($user1, $user2) 
	{
		$this->db->select('c1.chat_id');
		$this->db->from('mteixeira_msg_chatMembers c1');
		$this->db->where("c1.usuario_id",$user1);
		$this->db->join('mteixeira_msg_chatMembers c2', 'c1.chat_id = c2.chat_id  and c1.usuario_id <> c2.usuario_id');
		$this->db->where("c2.usuario_id",$user2);
		$query = $this->db->get();
		$row = $query->row_array();
		return $row['chat_id'];
	}
	public function get_all_chats($user1) 
	{
		
		$this->db->select('*, c1.usuario_id as user1, c2.usuario_id as user2');
		$this->db->from('mteixeira_msg_chatMembers c1');
		$this->db->where("c1.usuario_id",$user1);
		$this->db->join('mteixeira_msg_chatMembers c2', 'c1.chat_id = c2.chat_id  and c1.usuario_id <> c2.usuario_id');
		$this->db->join('pneuscar_vis_usuario usuario', 'usuario.id = c2.usuario_id');
		
		//return $this->db->get_compiled_select();
		$query = $this->db->get();
		return $query->result_array();
		if(false)
		{
			//$this->db->from('mteixeira_msg_chatMembers');
			$this->db->select('chat_id');
			$query = $this->db->get_where("mteixeira_msg_chatMembers", array("usuario_id" => $user1));
			$ids = [];
			//$ids = array_keys($res);
			foreach($query->result_array() as $row)
			{
				$ids[] = $row["chat_id"];
			}
			//echo json_encode($ids);
			//return ;
			$this->db->reset_query();

			$this->db->select('*');
			$this->db->from('mteixeira_msg_chatMembers');
			$this->db->where_in('chat_id', $ids);
			$this->db->where_not_in('usuario_id', [$user1]);
			
			$this->db->join('pneuscar_vis_usuario', 'pneuscar_vis_usuario.id = mteixeira_msg_chatMembers.usuario_id');
			$query = $this->db->get();
			return $query->result_array();
			
			//$this->db->where_in('status', $opened);
		}
	}
	
	public function get_messages($user1, $user2, $lastID = 0) 
	{
		
		$this->db->select('*, c1.usuario_id as user1, c2.usuario_id as user2');
		$this->db->from('mteixeira_msg_chatMembers c1');
		$this->db->where("c1.usuario_id",$user1);
		$this->db->join('mteixeira_msg_chatMembers c2', 'c1.chat_id = c2.chat_id  and c1.usuario_id <> c2.usuario_id');
		$this->db->where("c2.usuario_id",$user2);
		$this->db->join('pneuscar_vis_usuario usuario', 'usuario.id = c2.usuario_id');
		$this->db->join('mteixeira_msg_message message', "message.chat_id = c1.chat_id and message.id > $lastID");
		
		
		//return $this->db->get_compiled_select();
		$query = $this->db->get();
		return $query->result_array();
	}
	
	public function insert_entry($data) 
	{
        $this->db->insert("mteixeira_msg_message", $data);
	}
	
	public function get_messages2($user1, $user2) {
		//if(!$user1 or !$user2) return []];
		
		$this->db->select_sum('age');
		$this->db->group_by(array("usuario_enviado", "date"));  // Produces: GROUP BY title, date
		$this->db->select('*')->from($this->getDatabase())
        ->group_start()
                ->where('a', 'a')
                ->or_group_start()
                        ->where('b', 'b')
                        ->where('c', 'c')
                ->group_end()
        ->group_end()
        ->where('d', 'd')
->get();
		$res = parent::get_by_id($id);
		$parent_id = $res["parent_task"];
		$res["parent"] = $this->get_by_id($parent_id);
		return $res;
	}

	
}
?>