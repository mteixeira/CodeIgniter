<?php
class Reviews extends CI_Controller {
	public function show($id) {
		$this->load->model('reviews_model');
		$reviews = $this->reviews_model->get_reviews($id);
		$data['title'] = $reviews['title'];
		$data['grade'] = $reviews['description'];
		//$data['title'] = 'abc';
		//$data['grade'] = 'def';
		$this->load->view('movie_review', $data);
	}
}
?>