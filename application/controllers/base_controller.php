<?php
require_once '../../vendor/autoload.php';

abstract class base_controller extends CI_Controller {
	
	
	abstract protected function getName();
	
	protected function prepareGet($obj)
	{
		//teste
		return $obj;
	}
	
	protected function getTwigDefDir()
	{
		return 'twig/'.$this->getName();
	}
    
    /**
	 * Construtor da classe
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
		
		$this->load->helper('url'); 
	    $this->load->library('Twig');
		//$filter = new \Twig\TwigFilter('base_url', 'CI_Config::base_url');
		//$this->twig->add_filter($filter);
		//$this->twig->add_function('olabcd');
		$this->twig->add_function2('base_3url', function(){
			return base_url();
		});
		$this->twig->add_function2('path', function($txtpath, $args = []){
			$object = new stdClass();
			foreach ($args as $key => $value)
			{
				$txtpath = str_replace("{{$key}}", $value, $txtpath);
			}
			return site_url($txtpath);
		});
		$this->twig->add_function2('_site_url', function($url = ""){
			return site_url($url);
		});
		$this->twig->add_function2('_base_url', function($url = ""){
			return base_url($url);
		});
		$this->twig->add_function2('_current_url', function(){
			return current_url();
		});

		
		

		//base_url
    }
    
    function isPost()
	{
		return $this->input->method(TRUE) == "POST";
	}
    
    function base_url2($path)
	{
		return '../../'.$path;
	}
}
?>