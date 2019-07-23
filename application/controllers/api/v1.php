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
class v1 extends CI_Controller
{
   use REST_Controller {
    REST_Controller::__construct as private __resTraitConstruct;
    REST_Controller::patch as private __patch;
  }
 

	function __construct() {
		parent::__construct();
		$this->__resTraitConstruct();
		$this->load->model('Tarefas_model', 'tm');
		$this->load->model('Tags_model');
		$this->load->model('Projetos_model');
		$this->load->model('Tipo_Tarefa_Model');
		$this->load->model('Task_Work_model');
		$this->load->model('Pneuscar_model', 'pm');
	}

	private function startsWith($haystack, $needle)
	{
	     $length = strlen($needle);
	     return (substr($haystack, 0, $length) === $needle);
	}

	private function endsWith($haystack, $needle)
	{
	    $length = strlen($needle);
	    if ($length == 0) {
	        return true;
	    }

	    return (substr($haystack, -$length) === $needle);
	}


	private function cutEnd($haystack, $needle)
	{
	    $length = strlen($needle);
	    if ($length == 0) {
	        return true;
	    }

	    return (substr($haystack, 0, length($haystack)-$length));
	}

	private function _filter($field){
		return $this->get($field) ? 
				[$field=>$this->get($field)] 
				: [];
	}

	private function _sort(){
		$sort = $this->get("sort");
		if(!$sort) return [];
		$list = explode(",", $sort);
		$ob = $this;
		$orders = array_map(function($it) use(&$ob){return $ob->_sortItem($it);}, $list);

		$order = [];
		foreach($orders as $o)
		{
			$order=array_merge($order, $o);
		}
		return $order;
		return $this->_sortItem($this->get("sort"));
	}
	private function _search($field){
		$search = $this->get("search");
		if(!$search) return [];
		return [$field=>$search];
	}
	private function _sortItem($sort){
		log_message('debug', __METHOD__);
		$ord = $this->endsWith($sort, "_desc")? "DESC":"ASC";
		$o2 = "_".strtolower($ord);
		$res = preg_replace("/".$o2."\$/", "", $sort);
		//$res = cutEnd($sort, $o2);
		log_message('debug', $res);
		log_message('debug', $ord);
		return [$res=>$ord] ;
	}
	public function tags_get($id="", $route=""){
		log_message('debug', __METHOD__);
		log_message('debug', $id);
		log_message('debug', $route);
		log_message('debug', $this->get("task_id"));
		log_message('debug', $this->get("sort"));

		$filters = array_merge($this->_filter("task_id"), $this->_filter("tag"));
		$sorts = $this->_sort();
		$like = $this->_search("tag");
		return $this->generate_get($this->Tags_model, "api/v1/tags/", "Tag Nao Encontrada", function($route){
			switch($route){
				case "tarefa":
					return function($tag){
						return $this->tarefas_get($tag["task_id"]);
					};
				default:
					return function($tag){
						$c =[   
							'success' => false, 
							"message"=> "Resultado Nao Encontrado" 
						];
						log_message('debug',"Nao Encontrou");
						$this->response($c, 404);
					};

			}
		} )($id, $filters, $sorts, $like, $route);
	}


	public function tarefas_get($id="", $route=""){
		log_message('debug', __METHOD__);
		log_message('debug', $id);
		log_message('debug', $route);

		$filters = array_merge($this->_filter("titulo"), $this->_filter("status"), $this->_filter("project_id"));
		$sorts = $this->_sort();

		$like = $this->_search("titulo");
		return $this->generate_get($this->tm, "api/v1/tarefas/", "Tarefa Nao Encontrada", function($route){
			switch($route){
				case "tarefa":
					return function($tarefa){
						return $this->response($tarefa, 200);
					};
				case "projeto":
					return function($tarefa){
						return $this->projetos_get($tarefa["project_id"]);
					};
				case "tipo_tarefa":
					return function($tarefa){
						return $this->tipos_tarefas_get($tarefa["tipo_tarefa_id"]);
					};
				default:
					return function($tag){
						$c =[   
							'success' => false, 
							"message"=> "Resultado Nao Encontrado" 
						];
						log_message('debug',"Nao Encontrou");
						$this->response($c, 404);
					};

			}
		} )($id, $filters, $sorts, $like, $route);
	}

	public function tarefas_put(){

		//log_message('debug', $this->get("task_id"));

		$entry = $this->tm->insert_entry($this->put(), true);
		$c =[   
			'success' => $entry && count($entry)>0, 
			"message"=> "Tarefa Executada" ,
			"result"=> $entry,
			"args"=> $this->put(),
		];
		log_message('debug',"Encontrou");
		$this->response($c, 200);
	}

	public function projetos_get($id="", $route=""){
		log_message('debug', __METHOD__);
		log_message('debug', $id);
		log_message('debug', $route);

		$filters = array_merge($this->_filter("nome"), $this->_filter("status"));
		$sorts = $this->_sort();

		$like = $this->_search("title");
		return $this->generate_get($this->Projetos_model, "api/v1/projetos/", "Projeto Nao Encontrada", function($route){
			switch($route){
				default:
					return function($tag){
						$c =[   
							'success' => false, 
							"message"=> "Resultado Nao Encontrado" 
						];
						log_message('debug',"Nao Encontrou");
						$this->response($c, 404);
					};

			}
		} )($id, $filters, $sorts, $like, $route);
	}


	public function tipos_tarefas_get($id="", $route=""){
		log_message('debug', __METHOD__);
		log_message('debug', $id);
		log_message('debug', $route);

		$filters = array_merge($this->_filter("a"), $this->_filter("b"));
		$sorts = $this->_sort();
		$like = $this->_search("nome");
		return $this->generate_get($this->Tipo_Tarefa_Model, "api/v1/tipos_tarefas/", "Tipo de Tarefa Nao Encontrada", function($route){
			switch($route){
				default:
					return function($tag){
						$c =[   
							'success' => false, 
							"message"=> "Resultado Nao Encontrado" 
						];
						log_message('debug',"Nao Encontrou");
						$this->response($c, 404);
					};

			}
		} )($id, $filters, $sorts, $like, $route);
	}

	public function task_works_get($id="", $route=""){
		log_message('debug', __METHOD__);
		log_message('debug', $id);
		log_message('debug', $route);
		log_message('debug', $this->get("task_id"));
		log_message('debug', $this->get("sort"));

		$filters = array_merge($this->_filter("task_id"), $this->_filter("ts_final"));
		$like = $this->_search("nome");
		$sorts = $this->_sort();
		return $this->generate_get($this->Task_Work_model, "api/v1/task_works/", "Atividade Nao Encontrada", function($route){
			switch($route){
				case "tarefa":
					return function($tag){
						return $this->tarefas_get($tag["task_id"]);
					};
				default:
					return function($tag){
						$c =[   
							'success' => false, 
							"message"=> "Resultado Nao Encontrado" 
						];
						log_message('debug',"Nao Encontrou");
						$this->response($c, 404);
					};

			}
		} )($id, $filters, $sorts, $like, $route);
	}

	//http://localhost:8000/CodeIgniter/index.php/api/v1/task_works?ts_final=0000-00-00%2000:00:00
	function task_works_patch($id=""){
		log_message('debug', __METHOD__);
		log_message('debug', $id);
		
		$filters = array_merge($this->_filter("task_id"), $this->_filter("ts_final"));
		$like = [];//$this->_search("nome");
		$sorts = $this->_sort();

		$data = $this->patch();
		log_message('debug',$data);
		//log_message('debug',$data["id"]);
		//log_message('debug',REST_Controller_Definitions::HTTP_OK);

		$id = $id?: 
				$this->query("id")?:
				isset($data["id"]) ? 
					$data["id"] : "";



		if (!$id) {

			//$this->response(["get"=>$this->get(), "query"=>$this->query(), "patch"=>$data], REST_Controller_Definitions::HTTP_OK);
			//return;
			//$this->response(["Res"=>1], REST_Controller_Definitions::HTTP_OK);
			//return;
			$tarefas = $this->Task_Work_model->update_entries($filters, $data, true);

			if ($tarefas) {
				$result = ["success"=>true, "data"=> $data, "res" => $data, "query"=>$this->query(), "patch"=>$data];
				$this->response($tarefas, REST_Controller_Definitions::HTTP_OK);
			} else {
				$this->response(NULL, 404);
			}
		} else {
			//str:$this->input->input_stream()

			log_message('debug',"else");
			
			$res = $this->Task_Work_model->update_entry_by_id($id, $data, true);

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


	protected function generate_get($model, $subItem, $notFoundMessage, $router){
		log_message('debug', __METHOD__);
		return function($id="", $filter, $order_by, $like, $route)  use (&$model, &$subItem, &$notFoundMessage, $router){
			log_message('debug', __METHOD__);

			$subPath = $subItem;
			//Update ID
			$id = $id?: $this->get('id');
			$baseurl=base_url();
			log_message('debug',"BaseURL");
			log_message('debug',$baseurl);

			if (!$id) {
				log_message('debug', "Nao tem ID");
				log_message('debug', $filter);
				//$items = $model->get_entries_array();
				$items = $model->get_entries_array($filter, $order_by, $like);

				log_message('debug', $items);
				if ($items) {

					$items = array_map(function($item) use($subItem){
						return array_merge(
							$item, 
							["_links"=>["self"=>
										[[
											"href"=>site_url($subItem . $item["id"]),
										]]
							]]);
					}, $items);
					if(false){
					$items = array_merge(
							$items, 
							["_links"=>
								["self"=>
									[["href"=>site_url($subItem)]]
								]
							]);
					}
					$this->response($items, 200);
				} else {
					$this->response($items, 200);//TODO 404 ou algum outro resultado?
				}
			} else {
				$item = $model->get_by_id($id);

				log_message('debug', $item);
				if ($item) {
					log_message('debug',"Encontrou");
					if(!$route){
						$this->response($item, 200); // 200 being the HTTP response code
					} else {
						$router($route)($item);
					}
				} else {
					$c =[   
						'success' => false, 
						"message"=> $notFoundMessage 
					];
					log_message('debug',"Nao Encontrou");
					$this->response($c, 404);
				}
			}

		};
	}
	
	function tarefas_get2($id="") {
		log_message('debug', __METHOD__);
		log_message('debug', $id);

		//Update ID
		$id = $id?: $this->get('id');
		$baseurl=base_url();
		log_message('debug',"BaseURL");
		log_message('debug',$baseurl);

		if (!$id) {
			$tarefas = $this->tm->get_entries_array();

			if ($tarefas) {

				$tarefas = array_map(function($tarefa){
					return array_merge(
						$tarefa, 
						["_links"=>["self"=>
									[[
										"href"=>site_url("api/v1/tarefas/".$tarefa["id"])
									]]
						]]);
				}, $tarefas);
				if(false){
				$tarefas = array_merge(
						$tarefas, 
						["_links"=>
							["self"=>
								[["href"=>site_url("api/v1/tarefas/")]]
							]
						]);
				}
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


	function projetos_get2() {
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

	function task_works2_get(){
		$task_works = $this->tw->get_entries();

		if ($task_works) {
			$this->response($task_works, 200);
		} else {
			$this->response(NULL, 404);
		}

	}

	function task_work2_get(){
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
