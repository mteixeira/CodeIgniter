<?php
//require_once '../vendor/autoload.php';
require_once 'base_controller.php';

abstract class CRUD_Controller extends base_controller {
	
	
	abstract protected function getModel();
	//abstract protected function getName();
	
	protected function loadModel()
	{
		$this->load->model($this->getModel(),  'model');
	}

	protected function prepareGet($obj)
	{
		//teste
		return $obj;
	}
	
	    /**
		 * Construtor da classe
		 *
		 * @return void
		 */

	public function __construct()
	{

		parent::__construct();
	}

	protected function getEditForm($data)
	{
		return $this->form("", $data["entry"])
		->input("id"			, "id"			, "task-id"			, "text"			, "ID"		)
		->submit("btn-submit", "Salvar")
		->build();
	}

	protected function getCreateForm($data)
	{
		log_message('debug', __METHOD__);
		log_message('debug', $data);

		return $this->form($this->getName()+"/create", $data["entry"])
			->submit("btn-submit", "Salvar")
			->build();
	}

	/*
		$v = ['a','b','c'];
		foreach($v as $key => $value)
		{
			echo $key;
			echo $value;
		}
		return;
	*/		

	public function edit($id) {
		log_message('info', __METHOD__);
		log_message('info', $id);
		
		
		log_message('info', 'Metodo Edit');
		
		log_message('info', 'Inicializando Controlador');
		$data = $this->init();		

		//echo json_encode($data);
		//return;
		
		//$data = $this->getSessionData();
		log_message('info', 'Carregando Modelo');
		$this->loadModel();
		log_message('info', 'Carregando Item');
		$note = $this->model->get_by_id($id);
		log_message('info', 'Resultado Obtido');
		
		log_message('debug', json_encode($note));

		if(!$note)
		{
			log_message('warn', 'Item Nao Encontrado');

			echo "edit".__LINE__;
			redirect($this->getName(), 'refresh', 301);
			return;
		}
		log_message('info', 'Item Encontrado');
		//$c = 'a'.$note."b" ;
		log_message('debug', $note);
		
		//echo __LINE__;
		//return;
		$data['entry'] = $note;
		
		log_message('info', 'Preparando Consulta');
		$data = $this->prepareGet($data);

		log_message('info', "Montando Formulario");
		$form = $this->getEditForm($data);
		if($this->isPost()) 
		{
			log_message('debug', "isPost");
			$form = $this->handleRequest($this, $form);
			$data = $this->getData($this, $form);
			$notes = $this->model->update_entry_by_id($data["id"],$data);
			$this->load->helper('url');
			//echo base_url();
			redirect($this->getName(), 'refresh', 301);
			return;
		}
		
		log_message('debug', "get");
		log_message('debug', $form);
		$data['form'] = $form;
		$file = 'twig/default/edit.html.twig';
		log_message('info', "Carregando Pagina $file");
		log_message('debug', $data);
		$this->twig->display($file, $data);
	}
	
	protected function createDefaultEntry()
	{
		return [];
	}

	public function create() {
		log_message('info', 'Create Controller.'); 

		$note = $this->createDefaultEntry();
		

		$this->loadModel();
		$data['entry'] = $note;
		$data = $this->prepareGet($data);
		$form = $this->getCreateForm($data);

		if($this->isPost()) 
		{
			$this->loadModel();
			$form = $this->handleRequest($this, $form);
			$data = $this->getData($this, $form);
			
			log_message('debug', json_encode($data));
			log_message('debug', json_encode($form));
			$notes = $this->model->insert_entry($data);
			$this->load->helper('url');
			//echo base_url();
			redirect($this->getName(), 'refresh', 301);
			return;
		}
		//$note = $this->model->get_by_id($id);
			 
		$data['form'] = $form;
		/*
		[
			"action"=>"abcd",
			"task"=>
			["id" => "task-code"
			]
		];
		*/
		//$file = $this->getTwigDefDir().'/create.html.twig';

		$file = 'twig/default/edit.html.twig';
		log_message('info', "Carregando Pagina $file");
		log_message('debug', $data);
		$this->twig->display($file, $data);
	}
	
	
	public function index() {
		return $this->list();
	}

	protected function getDefaultEntries() {
		return $this->model->get_entries_array();
	}


	public function list($filter="") {
		log_message('info', __METHOD__);

		//echo $this->input->get('abc');
		//return;
		
		log_message('info', 'Metodo List');
		//echo "oi";
		//return;
		//echo $this->isPost();
		//return ;
		
		log_message('info', 'Inicializando Dados Controls');
		$data = $this->init();
		
		log_message('info', 'Carregando Modelo');
		$this->loadModel();
		
		log_message('info', 'Carregando Objetos');
		$notes = $this->getDefaultEntries();
		//echo json_encode($notes);
		//	return;
		log_message('info', 'Resultado Obtido');
		log_message('info', $notes);

		$data['entries'] = $notes;

		/*
		$notesArray = [];
		foreach ($arr as $value) {
    		$notesArray[$value["id"]] = $value;
    	}
		$data['entriesMap'] = $notesArray;
		*/
		
		log_message('debug', $data);
		log_message('info', 'Preparando Dados de Controle');
		$data = $this->prepareGet($data);

		$file = 'twig/default/index.html.twig';
		log_message('info', "Carregando Pagina $file");
		log_message('debug', $data);
		$this->twig->display($file, $data);
	}
	
	public function update($id) {
		if(!$this->isPost()) return;
		$this->loadModel();
		//if($this->isPost()) echo 'post'; else echo 'get';
		$data = $this->input->input_stream();
		//echo json_encode($data);
		
		///$data['ID'] = $this->input->post('id')
		//return;
		$notes = $this->model->update_entry($data['uuid'], $data);
		$this->load->helper('url');
		//echo base_url();
		redirect('visitas', 'refresh', 301);
	}
	
	public function update2() {
		$data = array(
		'title' => $this->input->post('_title'),
		'description' => $this->input->post('_description')
		);
		$this->input->post(array('', 'field2'));
		//$loader = new \Twig\Loader\ArrayLoader([
		//	'index' => 'Hello {{ name }}!',
		//]);
		//$twig = new \Twig\Environment($loader);
		
		$this->load->model('notes_model');
		$note = $this->model->get_note($id);
		$data['title'] = $note['title'];
		$data['description'] = $note['description'];
		$data['all'] = $note;
		//$data['title'] = 'abc';
		//$data['grade'] = 'def';
		//$this->load->view('note_view', $data);
		//echo $twig->render('index', ['name' => 'Fabien']);
		//$data['title'] = "Testing Twig!!";
		//$this->twig->add_function(base_url);
		$this->twig->display('twig/note.html.twig', $data);
	}
	
}
function olabcd()
{
	return "olaa";
}
function base_url2()
{
	return CI_Config::base_url();
}
function getFunctions()
{
    return array(
        new \Twig_SimpleFunction('server_time_zone', array($this, 'getServerTimeZone')),
    );
}
?>
