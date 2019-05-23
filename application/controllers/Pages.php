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
}