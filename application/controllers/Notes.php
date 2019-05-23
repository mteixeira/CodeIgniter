<?php
require_once '../../vendor/autoload.php';

class Notes extends CI_Controller {
	
	
         /**
	 * Construtor da classe
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	    $this->load->library('Twig');
	}
	public function get($id) {
		
		$this->load->model('notes_model');
		$note = $this->notes_model->get_note($id);
		$data['title'] = $note['title'];
		$data['description'] = $note['description'];
		$data['all'] = $note;
		
		$this->twig->display('twig/note.html.twig', $data);
	}
	
	public function getAll() {
		echo $this->isPost();
		return ;
		$this->load->model('notes_model');
		$notes = $this->notes_model->get_notes();
		$data['notes'] = $notes;
		
		$this->twig->display('twig/notes.html.twig', $data);
	}
	
	public function update() {
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
		$note = $this->notes_model->get_note($id);
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

function isPost()
{
	return $this->input->method(TRUE) == "POST";
}
function base_url($path)
{
	return '../../'.$path;
}
?>