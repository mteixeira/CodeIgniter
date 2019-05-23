<?php
require_once '../../vendor/autoload.php';
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
	public function edit($id) {
		
		
		$this->loadModel();
		$note = $this->model->get_by_id($id);
		
		$data['entry'] = $note;
		$data = $this->prepareGet($data);
		
		$file = $this->getTwigDefDir().'/edit.html.twig';
		$this->twig->display($file, $data);
	}
	
	public function create() {
		log_message('info', 'Create Controller.');
		if($this->isPost()) 
		{
			$this->loadModel();
			$data = $this->input->input_stream();
			
			log_message('debug', json_encode($data));
			$notes = $this->model->insert_entry($data);
			$this->load->helper('url');
			//echo base_url();
			redirect($this->getName(), 'refresh', 301);
			return;
		}
		//$note = $this->model->get_by_id($id);
			
		$note = array(
			'cli_id' => '2',
			'status' => 'Solicitada'
		);

		$data['entry'] = $note;
		$data = $this->prepareGet($data);
		
		$file = $this->getTwigDefDir().'/create.html.twig';
		$this->twig->display($file, $data);
	}
	
	public function index() {
		
		//echo $this->isPost();
		//return ;
		$this->loadModel();
		$notes = $this->model->get_entries();
		$data['entries'] = $notes;
		$data = $this->prepareGet($data);
		
		$file = $this->getTwigDefDir().'/index.html.twig';
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