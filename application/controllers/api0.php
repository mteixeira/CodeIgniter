<?php

use Restserver\Libraries\REST_Controller;
use Restserver\Libraries\REST_Controller_Definitions;
defined('BASEPATH') OR exit('No direct script access allowed');

require(APPPATH . '/libraries/REST_Controller.php');
require APPPATH . 'libraries/Format.php';
//use Restserver\Libraries\REST_Controller;
/**
 * Description of RestGet
 *
 * @author https://mteixeira.tecnologia.ws
 */
class api extends CI_Controller
{
   use REST_Controller {
    REST_Controller::__construct as private __resTraitConstruct;
    REST_Controller::patch as private __patch;
  }
 

	function __construct() {
		parent::__construct();
		$this->__resTraitConstruct();
		$this->load->model('Tarefas_model', 'tm');
		$this->load->model('Projetos_model');
		$this->load->model('Pneuscar_model', 'pm');
	}

	function tarefas_get($id="") {
		$id = $id?: $this->get('id');
		if (!$id) {
			$tarefas = $this->tm->get_entries();

			if ($tarefas) {
				$this->response($tarefas, 200);
			} else {
				$this->response(NULL, 404);
			}
		} else {
			$tarefa = $this->tm->get_by_id($id);

			log_message('debug', $tarefa);
			if ($tarefa) {
				log_message('debug',"Encontrou");
				$this->response($tarefa, 200); // 200 being the HTTP response code
			} else {
				$c =[   
					'success' => false, 
					"message"=>"Tarefa Nao Encontrada" ];
				log_message('debug',"Nao Encontrou");
				$this->response($c, 404);
			}
		}
	}

	protected function _patch(){
		return json_decode($this->patch(0)); 

	}

	function tarefas_patch($id=""){
		log_message('debug', __METHOD__);
		log_message('debug',$id);

		$data = $this->patch();
		log_message('debug',$data);
		log_message('debug',$data["id"]);
		log_message('debug',REST_Controller_Definitions::HTTP_OK);

		$id = $id?: $data["id"];
		if (!$id) {

			$this->response(["Res"=>1], REST_Controller_Definitions::HTTP_OK);
			return;
			$tarefas = $this->tm->get_entries();

			if ($tarefas) {
				$this->response($tarefas, REST_Controller_Definitions::HTTP_OK);
			} else {
				$this->response(NULL, 404);
			}
		} else {
			//str:$this->input->input_stream()

			log_message('debug',"else");
			
			$res = $this->tm->update_entry_by_id($id, $data, true);

			log_message('debug', $res);
			if ($res) {
				log_message('debug',"Criou");

				$result = ["success"=>true, "data"=> $data, "res" => $data];
				$this->response($result, REST_Controller_Definitions::HTTP_OK); // 200 being the HTTP response code
			} else {
				$result =[   
					'success' => false, 
					"message"=>"Tarefa Nao Encontrada" ];
				log_message('debug',"Nao Encontrou");
				$this->response($result, 404);
			}
		}
	}

	function tarefa_get() {
		if (!$this->get('id')) {
			$this->response(NULL, 400);
		}

		$tarefa = $this->tm->get_by_id($this->get('id'));

		if ($tarefa) {
			$this->response($tarefa, 200); // 200 being the HTTP response code
		} else {
			$c =[   'returned from delete:' => "abc", ];
			//echo json_encode($c);
			$this->response($c, 200); // 200 
			//$this->response(, 404);
		}
	}



	function projetos_get() {
		$projetos = $this->Projetos_model->get_entries();

		if ($projetos) {
			$this->response($projetos, 200);
		} else {
			$this->response(NULL, 404);
		}
	}

	function pneus_get()
	{
		log_message('debug', __METHOD__);
		$pneus = $this->pm->get_Pneus();
		log_message('debug', $pneus);
		//var_dump($pneus);
		//return;

		if ($pneus) {
			$this->response($pneus, 200);
		} else {
			$this->response(NULL, 404);
		}
	}

	function task_works_get(){
		$task_works = $this->tw->get_entries();

		if ($task_works) {
			$this->response($task_works, 200);
		} else {
			$this->response(NULL, 404);
		}

	}

	function task_work_get(){
		if (!$this->get('id') && !$this->get("ts_final") && !$this->get("status")) {
			$this->response(NULL, 400);
		}

		if ($this->get('id')) $task_work = $this->tw->get_by_id($this->get('id'));
		if ($this->get('ts_final'))  $task_work = $this->tw->get_by('ts_final', $this->get('ts_final'));
		if ($this->get('status'))  $task_work = $this->tm->get_ActiveTaskWork(2);

		if ($task_work) {
			$this->response($task_work, 200); // 200 being the HTTP response code
		} else {
			$this->response(NULL, 404);
		}

	}
}
