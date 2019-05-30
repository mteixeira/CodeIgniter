<?php
//require_once '../../vendor/autoload.php';

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
		
		$this->load->helper('form');
		$this->load->helper('url'); 
	    $this->load->library('Twig');
	    $this->load->library('session');
		//$filter = new \Twig\TwigFilter('base_url', 'CI_Config::base_url');
		//$this->twig->add_filter($filter);
		//$this->twig->add_function('olabcd');
		$this->twig->add_function2('base_3url', function(){
			return base_url();
		});
		$this->twig->add_function2('path', function($txtpath, $args = []){
			
			log_message('debug', "path = $txtpath");
			log_message('debug', 'args = '.json_encode($args));
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
		$this->twig->add_function2('asset', function($url = ""){
			return base_url($url);
		});
		$this->twig->add_function2('_base_url', function($url = ""){
			return base_url($url);
		});
		$this->twig->add_function2('_current_url', function(){
			return current_url();
		});
		$this->twig->add_function2('form_start', function($form){
			echo "<!-- ".json_encode($form)."-->";
			echo form_open($form["_action"]);
		});
		$this->twig->add_function2('form_end', function($form){
			echo "</form>";
		});
		$this->twig->add_function2('form_widget', function($form){
			
		$file = 'twig/form/form_widget.html.twig';
		$this->twig->display($file, ["form" =>$form]);
		return ;
			foreach ($form as $key => $value)
			{
				if($key[0]=="_")continue;
				base_controller::form_row($this->twig, $value);
			}
		});
		$this->twig->add_function2('form_row', function($form){
			return base_controller::form_row($this->twig, $form);
		});
		$this->init();
		//base_url
	}
	
	static public function form_row($twig, $field){
 
		$file = 'twig/form/form_row.html.twig';
		$twig->display($file, ["field" =>$field]);
		return ;
		if(false){
			$c = "";
			if(isset($field['value'])) 
			{
				$value2 = "".$field['value'];
			}
			else
			{
				$value2 = "";
			}
			$options = "";
			
			if(isset($field['options'])) 
			{
				
				foreach ($field['options'] as $key=>$value)
				{
					$selected = "";
					if(is_array($value))
					{
						$id = $value["id"];
						$val = $value["value"];
					}
					else
					{
						$id = $value;
						$val = $value;
						
					}
					if($id == $field['value']) $selected = "selected";
					
					$options = $options."<option value='$id' $selected>$val</option>".PHP_EOL;
				}
				$value2 = $options;
			} 

			$vars = "";
			foreach ($field['vars'] as $key => $value)
			{
				$vars = $vars."$key = '$value' ";
			}

			/*<select class="form-control" name="status" id="task-status">
			
						{% for status_entry in status_entries %}
							{% set selected = '' %}
							{% if status_entry  == entry.status %}
							{% set selected = 'selected' %}
							{% endif %}
							<option {{ selected }}>{{ status_entry }}</option>
						{% endfor %}
			</select>
			*/
			if($field['_form_label']) 
				$c = "<div class='form-group'>
			<label for='".$field['vars']['id']."' class='col-form-label'>".$field['label'].":</label>
			<".$field['_form_type']." $vars >$value2</".$field['_form_type'].">
				</div>";
			else 
				$c = "<".$field['_form_type']." $vars >".$field['label']."</".$field['_form_type'].">";

			echo $c;
			return ;//form_open('news/create');
		}
	}
    
    function isPost()
	{
		return $this->input->method(TRUE) == "POST";
	}
    
    function base_url2($path)
	{
		return '../../'.$path;
	}

	function form($action, $obj)
	{
		log_message('debug', __METHOD__);
		return new FormCreator($action, $obj);
	}

	function handleRequest($request, $form)
	{
		log_message('debug', __METHOD__);
		if($request->isPost()) 
		{
			$data = $request->input->input_stream();
			$form["_data"] = $data;
			foreach ($form as $key => $value)
			{
				if($key[0]=="_")continue;
				log_message('debug', json_encode($value));
				if(isset($value["vars"]["name"])) log_message('debug', $value["vars"]["name"]);
				if(isset($value["vars"]["name"])) $form[$key]["value"]= $data[$value["vars"]["name"]];
			}
		}
		return $form;
	}
	
	function getPostData($request)
	{
		log_message('debug', __METHOD__);
		if($request->isPost()) 
		{
			$data = $request->input->input_stream();
			return $data;
		}
		return [];
	}
	
	function getData($request, $form)
	{
		log_message('debug', __METHOD__);
		if($request->isPost()) 
		{
			$data = $form["_data"];
			return $data;
		}
		return [];
	}

	public function init()
	{
		if(!isset($data)) $data = [];
		return $this->loadData();

	}
	public function loadData()
	{
		return $this->_appData();
	}
	public function _appData()
	{
		log_message('debug', __METHOD__);

		$data["app"] = array_merge(isset($data["app"])?$data["app"]:[], [
			"request" => [
				"method" => $this->input->method(TRUE),
				"headers"=> [
					"get" => function($parm)
					{
						if($parm == "referer")
						{
							echo "123";
							return $this->getRefererURL();
						}
					},
					"get_referer" => $this->getRefererURL()
				]
			],
			"controller" => $this->getName()
		]);
		log_message('debug', $data);
		return $data;
	}
	function getRefererURL()
	{
		$referer = "";
		if(isset($_SERVER['HTTP_REFERER'])) $referer = filter_var($_SERVER['HTTP_REFERER'], FILTER_VALIDATE_URL);
	
		if (!empty($referer)) {
		
			return $referer ;
		
		} else {
		
			return 'javascript:history.go(-1)';
		
		}
	}
}

class FormCreator{
	public $form;
	public $object;
	
	public function __construct($action, $object)
	{
		$this->form   =	["_action"=> $action, "_object" => $object];
		$this->object = $object;

	}
	function input($name, $fieldName, $id, $type, $label, $vars = [])
	{
		log_message('debug', __METHOD__);
		log_message('debug', $name);

		log_message("debug", json_encode($this->object));
		//array_push($response["notes"], $product);
		$this->form[$name] = [
			"_form_label"=>true,
			"_form_value"=>true,
			"_form_type"=>"input",
			"label"=>$label,
			"vars"=>
			array_merge  ([
				"id"=>$id, 
				"name"=>$fieldName,
				"type"=>$type,
				"class"=>"form-control",
				"value"=>$this->object[$name],
			], $vars),
		];
		return $this;
	}
	function textarea($name, $fieldName, $id, $type, $label, $vars = [])
	{
		log_message('info', __METHOD__);
		log_message('info', $name);

		//array_push($response["notes"], $product);
		$this->form[$name] = [
			"_form_label"=>true,
			"_form_value"=>false,
			"_form_type"=>"textarea",
			"label"=>$label,
			"vars"=>
			array_merge  ([
				"id"=>$id, 
				"name"=>$fieldName,
				"class"=>"form-control",
			], $vars),
			"value"=>$this->object[$name],
		];
		return $this;
	}
	function select($name, $fieldName, $id, $options, $label, $vars = [])
	{
		log_message('info', __METHOD__);
		log_message('info', $name);

		$this->form[$name] = [
			"_form_label"=>true,
			"_form_value"=>false,
			"_form_type"=>"select",
			"label"=>$label,
			"vars"=>
			array_merge  ([
				"id"=>$id, 
				"name"=>$fieldName,
				"class"=>"form-control",
			], $vars),
			"value"=>$this->object[$name],
			"options"=>$options,
		];
		return $this;
		/*<select class="form-control" name="status" id="task-status">
            
                      {% for status_entry in status_entries %}
                          {% set selected = '' %}
                          {% if status_entry  == entry.status %}
                            {% set selected = 'selected' %}
                          {% endif %}
                            <option {{ selected }}>{{ status_entry }}</option>
                      {% endfor %}
			</select>
			*/
	}
	function submit($id, $label)
	{
		log_message('info', __METHOD__);
		log_message('info', $label);

		$this->form["submit"] = [
			"_form_label"=>false,
			"_form_value"=>false,
			"_form_type"=>"button",
			"vars"=>
			[
				"id"=>$id, 
				"type"=>"submit",
				"class"=>"btn btn-primary",
			],
			"label"=>$label,
		];
		return $this;
	}
	function build()
	{
		return $this->form;
	}
}
?>