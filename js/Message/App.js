//import Header from './components/Header';
//import {VisiblePage} from './components/VisiblePage.js';
//import store from '../Message/components/VisiblePage.js';
//import Container from 'react-bootstrap';


const Nav = ReactBootstrap.Nav;
const NavDropdown = ReactBootstrap.NavDropdown;

const Container  = ReactBootstrap.Container;

const API_Component = {

	Header:(active) => {
		return (
			<Navbar bg="dark" variant="dark">
			    <Navbar.Brand href="#home">
			      <img
			        alt=""
			        src="/logo.svg"
			        width="30"
			        height="30"
			        className="d-inline-block align-top"
			      />
			      {' React Bootstrap'}
			    </Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav activeKey={active.type +"_"+ active.value} className="mr-auto">
				    	<Nav.Link href="#" >Homee</Nav.Link>
				    	<NavDropdown title="Dropdown" id="basic-nav-dropdown">
				        	<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
				        	<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
				        	<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
				        	<NavDropdown.Divider />
				        	<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
				      	</NavDropdown>
					</Nav>
				    <Form inline>
				      	<FormControl type="text" placeholder="Search" className="mr-sm-2" />
				      	<Button variant="outline-success">Search</Button>
				    </Form>
				</Navbar.Collapse>
			</Navbar>
		)
	},

	VisiblePage: (active) => {
		return (
				<h1  bg="danger">VisiblePage</h1>
			)
	},
	Sidebar: (active) => {
		return (
				<h1   bg="success">Sidebar</h1>
			)
	},

	Page: () => {
		return (
			<React.Fragment>
				<API_Component.Header />
				<Container fluid>
				<Row>
					<Col xs={12} md={3} xl={2} className="bg-success">
					<API_Component.Sidebar/>
					</Col>
					<Col xs={12} md={9} xl={8}  className="bg-danger">
					<API_Component.VisiblePage />
					</Col>
				</Row>
				</Container>
			</React.Fragment>
			)
	},

}


class App extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      posts: []
	    };
	}
	componentDidMount() {
		var posts = [];
		var medias = [];
		/*
	    fetch("http://mteixeira.hospedagemdesites.ws/tutorialWP/wp-json/wp/v2/posts")
	      .then(res => res.json())
	      .then(
	        (result) => {
	          	store.dispatch(updatePosts(result));
	          	store.dispatch(clickPost("Posts"));
				posts
	        },
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
	        (error) => {
	        	this.setState({
	            	isLoaded: true,
	            	error
	        	});
	        }
	      )
	    */
  	}

  	fetchData(link, updateFunc)
  	{
  		fetch(link)
  		.then(res => res.json())
	    .then(
	        (result) => {
	         	this.setState({
	            	isLoaded: true
	          	});
	          	updateFunc(result);
	          	//store.dispatch(clickPost("Posts"));
	        },
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
	        (error) => {
	        	this.setState({
	            	isLoaded: true,
	            	error
	        	});
	        }
	    )
  	}
	render(){
		//<Header active={store.getState().activePage}/>
		return (
				<API_Component.Page/>
		)
		//return (<h1>Ola</h1>)
	}
}

ReactDOM.render(
	//<Posts posts={null} onPostClick={onPostClick}/>,
    <ReactRedux.Provider store={store}>
  		<App />
  	
    </ReactRedux.Provider>
    ,
  document.getElementById('app')

);
