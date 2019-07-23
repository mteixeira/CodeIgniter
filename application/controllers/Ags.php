<?php
require_once 'base_controller.php';
class Ags extends base_controller {

	protected function getName()
	{
		return 'Ags';
	}
	public function view($page = 'home')
	{
         echo "Hello World!".$page; 
	}
	public function index() { 
		$file = $this->getTwigDefDir().'/'.__FUNCTION__.".html.twig";
		$this->twig->display($file);
	} 


	
}
