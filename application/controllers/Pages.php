<?php
require_once 'base_controller.php';
class Pages extends base_controller {

	protected function getName()
	{
		return 'Pages';
	}
	public function view($page = 'home')
	{
         echo "Hello World!".$page; 
	}
	public function index() { 
		 //echo "Hello World!"; 
		 redirect('Pages/dashboard', 'refresh', 301);
	} 
	
	public function dashboard()
	{
		$file = $this->getTwigDefDir().'/'.__FUNCTION__.".html.twig";
		$this->twig->display($file);
		//$this->load->view('dashboard');
	}
	
	public function cards()
	{
		$file = $this->getTwigDefDir().'/'.__FUNCTION__.".html.twig";
		$this->twig->display($file);
		//$this->load->view('dashboard');
	}
	
	public function buttons()
	{
		$file = $this->getTwigDefDir().'/'.__FUNCTION__.".html.twig";
		$this->twig->display($file);
		//$this->load->view('dashboard');
	}
	
	public function paginas()
	{
		$file = $this->getTwigDefDir().'/'.__FUNCTION__.".html.twig";
		$this->twig->display($file);
		//$this->load->view('dashboard');
	}
	
	public function teste()
	{
		$file = $this->getTwigDefDir().'/'.__FUNCTION__.".html.twig";
		$this->twig->display($file);
		//$this->load->view('dashboard');
	}
	
	public function login()
	{
		$file = $this->getTwigDefDir().'/'.__FUNCTION__.".html.twig";
		$this->twig->display($file);
		//$this->load->view('dashboard');
	}
	
	public function register()
	{
		$file = $this->getTwigDefDir().'/'.__FUNCTION__.".html.twig";
		$this->twig->display($file);
		//$this->load->view('dashboard');
	}

	public function messagearea($id1, $id2, $lastID = 0)
	{
		$this->load->model("Message_model");
		$chats = $this->Message_model->get_all_chats($id1);
		$data["chats"] = $chats;
		$messages = $this->Message_model->get_messages($id1, $id2, $lastID);
		$maxid = $lastID;
		foreach($messages as $message)
		{
			$maxid = max($maxid, $message["id"]);
		}
		$data["messages"] = $messages;
		$data["user1"] = $id1;
		$data["user2"] = $id2;

		$file = $this->getTwigDefDir().'/'.__FUNCTION__.".html.twig";
		$result['html'] = $this->twig->render($file, $data);
		$result['maxid'] = $maxid;
		echo json_encode($result);
		//$this->load->view('dashboard');
	}
	public function message($id1, $id2)
	{
		$this->load->model("Message_model");
		$chats = $this->Message_model->get_all_chats($id1);
		$data["chats"] = $chats;
		$messages = $this->Message_model->get_messages($id1, $id2);
		$data["messages"] = $messages;
		$data["user1"] = $id1;
		$data["user2"] = $id2;
		$chat_id = $this->Message_model->get_chat_id($id1, $id2);
		$data["chat_id"] = $chat_id;		
		
		$file = $this->getTwigDefDir().'/'.__FUNCTION__.".html.twig";
		$this->twig->display($file, $data);
		//$this->load->view('dashboard');
	}
	public function addmessage()
	{
		
		if($this->isPost()) 
		{
			$data = $this->input->input_stream();
			
			$this->load->model("Message_model");
			$chats = $this->Message_model->insert_entry($data["data"]);
			//redirect($data["call_url"], 'refresh', 301);
		}
	}

	
}