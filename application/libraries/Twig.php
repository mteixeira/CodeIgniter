<?php if (!defined('BASEPATH')) {exit('No direct script access allowed');}
/**
 * 
 * Arquivo inserido em application/libraries/Twig.php 
 * 
 */
require_once '../../vendor/autoload.php';


class Twig {
    /**
     * Referência da instância da classe CodeIgniter
     *
     * @var object
     */
    protected $CI;
    /**
     * Referência da instância da classe TWIG
     *
     * @var object
     */
    protected $_twig;
    /**
     * Diretório de templates da aplicação
     *
     * @var string
     */
    protected $_template_dir;
    /**
     * Diretório do cache dos templates da aplicação
     *
     * @var string
     */
    protected $_cache_dir;
    /***
     * Construtor da classe
     *
     * @param bool $debug verifica o valor do atributo DEBUG para a classe de template TWIG
     * @return
     */
    function __construct($debug = false)
    {
        $this->CI =& get_instance();
        $this->CI->config->load('twig');
        log_message('debug', "Twig Autoloader Loaded");
        //\Twig\Autoloader::register();
		//$twigAutoloader = new \Twig_Autoloader();
		//$twigAutoloader->register();
        $this->_template_dir = $this->CI->config->item('template_dir');
        $this->_cache_dir = $this->CI->config->item('cache_dir');
        $loader = new \Twig\Loader\FilesystemLoader($this->_template_dir);
        $this->_twig = new \Twig\Environment($loader, array(
            'cache' => $this->_cache_dir,
            'debug' => $debug,
            //'auto_reload' => TRUE
        ));
        foreach(get_defined_functions() as $functions) {
            foreach($functions as $function) {
                $this->_twig->addFunction(new Twig_SimpleFunction($function));
            }
        }
    }
    /**
     * Renderiza o template
     *
     * @param string $template nome do template
     * @param array $data valores a serem passados ao template
     * @return void
     */
    public function render($template, $data = array()) {
        $template = $this->_twig->loadTemplate($template);
        return $template->render($data);
    }
    /**
     * Renderiza o template verificando o tempo gasto de execução para renderização
     *
     * @param string $template nome do template
     * @param array $data valores a serem passados ao template
     * @return void
     */
    public function display($template, $data = array()) {
        $template = $this->_twig->loadTemplate($template);
        /* elapsed_time and memory_usage */
        $data['elapsed_time'] = $this->CI->benchmark->elapsed_time('total_execution_time_start', 'total_execution_time_end');
        $memory = (!function_exists('memory_get_usage')) ? '0' : round(memory_get_usage()/1024/1024, 2) . 'MB';
        $data['memory_usage'] = $memory;
        $template->display($data);
    }
    /**
     * Adiciona as funções no Twig
     * @param string $name nome da função
     * @return void
     */
    public function add_function($name)
    {
        $this->_twig->addFunction(new Twig_SimpleFunction($name));
    }
    public function add_function2($name, $function)
    {
        $this->_twig->addFunction(new \Twig\TwigFunction($name, $function));
    }
	
    public function add_filter($filter)
    {
        $this->_twig->addFilter($filter);
    }
}