
//import Posts from './Posts'
//require('./Posts')

//import { Posts } from './Posts';
//require("react-bootstrap")
const Col = ReactBootstrap.Col;
const Card = ReactBootstrap.Card;
const Spinner = ReactBootstrap.Spinner;
const Navbar = ReactBootstrap.Navbar;
const Nav = ReactBootstrap.Nav;
const NavDropdown = ReactBootstrap.NavDropdown;
const Form = ReactBootstrap.Form;
const FormControl = ReactBootstrap.FormControl;
const Button  = ReactBootstrap.Button;

const connect  = ReactRedux.connect;

class MyComponent extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      items: []
	    };
	}

  componentDidMount() {
    fetch("http://mteixeira.hospedagemdesites.ws/tutorialWP/wp-json/wp/v2/posts")
      .then(res => res.json())
      .then(
        (result) => {
         	this.setState({
            	isLoaded: true,
            	items: result
          	});
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

  	render() {
	    const { error, isLoaded, items } = this.state;
		if (error) {
	      	return <div>Error: {error.message}</div>;
	    } else if (!isLoaded) {
	      	return <div>Loading...</div>;
	    } else {
	      return (
	        <ul>
	          {items.map(item => (
	            <li key={item.id}>
	              <a href={item.link}>{item.id} - {item.title.rendered}</a>
	            </li>
	          ))}
	        </ul>
	      );
	    }
	}
}
/*
class Post extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      post: []
	    };
	}




  componentDidMount() {
    fetch("http://mteixeira.hospedagemdesites.ws/tutorialWP/wp-json/wp/v2/posts/" + this.props.postID)
      .then(res => res.json())
      .then(
        (result) => {
         	this.setState({
            	isLoaded: true,
            	post: result
          	});
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

  	render() {
	    const { error, isLoaded, post } = this.state;
		if (error) {
	      	return <div>Error: {error.message}</div>;
	    } else if (!isLoaded) {
	      	return <div>Loading...</div>;
	    } else {
	      return (
	      	<article>
	        	<h1>{post.id} - {post.title.rendered}</h1>
	        	<div dangerouslySetInnerHTML={{__html : post.content.rendered } }></div>

	        	<a onClick={()=>this.props.onClick("Posts")} >Voltar</a>
	        	{JSON.stringify(post)}
	        </article>
	      );
	    }
	}
}
*/

const Icon = ({icon}) => {
	return (<i class={"fas fa-" + icon}></i>)
}


const Link = ({ active, children, onClick, filter }) => {
	console.log("Link", active, children)
  if (false) {
    return <span>{children}</span>
  }

  return (
    <a
      href=""
      key={active.type +"_"+ active.value}
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  )
}


const NavLink = ({ active, children, onClick, filter }) => {
	console.log("Link", active, children)
  if (false) {
    return <span>{children}</span>
  }

  return (
    <Nav.Link
      href=""
      key={active.type +"_"+ active.value}
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </Nav.Link>
  )
}





const mapHeaderStateToProps = (state, ownProps) => {
  return {
    //active: ownProps.filter === state.ActivePage.type
    active: state.ActivePage
  }
}

const mapHeaderDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(clickPost(
      	{	type: ownProps.type, value:ownProps.filter
      			 }
      	)
      )
    }
  }
}



const FilterLink = connect(
  mapHeaderStateToProps,
  mapHeaderDispatchToProps
)(Link)

const NavFilterLink = connect(
  mapHeaderStateToProps,
  mapHeaderDispatchToProps
)(NavLink)

const PostTags2 = ({ tags, activePage }) => {
	console.log("PostMeta", tags)
	//console.log("post", post)
	//<Link/>
	if(tags.length)
	{
		const tagsLink = tags.map(postTag=>(
			<FilterLink 
				type="Tags" 
				filter={postTag.id}
				> {postTag.name}</FilterLink>
				)
			)
		return (
		      	<Col className="text-justify" >
		      		<Icon icon="folder-open"/>
		      		<Icon icon="tags"/>
		      		{tagsLink}
		        </Col>
		      );
	}
	else
		return (<React.Fragment/>)

}
const createMetaLinks = (type, icon) => {
	return ({ values }) => {
		console.log("PostMeta", values)
		//console.log("post", post)
		//<Link/>
		if(values.length)
		{
			const objLink = values.map(postObj=>(
				<FilterLink 
					type={type}
					filter={postObj.id}
					> {postObj.name}</FilterLink>
					)
				)
			return (
			      	<Col className="text-justify" >
			      		<Icon icon={icon}/>
			      		{objLink}
			        </Col>
			      );
		}
		else
			return (<React.Fragment/>)

	}
}
const PostTags = createMetaLinks("Tags", "tag")
const PostCategorias = createMetaLinks("Categorias", "folder-open")

const PostMeta = ({ post, tags, categorias, activePage }) => {
	console.log("PostMeta", post, tags)
	//console.log("post", post)
	//<Link/>
	return (
			<React.Fragment>
	      		<PostCategorias values={categorias
	      				.filter( cat => 
	      					post.categories.find(postCatID => postCatID==cat.id) ) }
	      				/>
	      		<PostTags values={tags
	      				.filter( tag => 
	      					post.tags.find(postTagID => postTagID==tag.id) ) }
	      				/>
			</React.Fragment>
	      );

}

const Post = ({ post, activePage, onPostClick }) => {
	console.log("Post", post, activePage)
	return (
	      	<article className="text-justify" >
	        	<h1>{post.id} - {post.title.rendered}</h1>
	        	<div dangerouslySetInnerHTML={{__html : post.content.rendered } }></div>

	        	<button onClick={()=>store.dispatch(clickPost({type:"Posts", value:""}))} >Voltar</button>
	        	<br/>
	        	<PostMeta post={post} tags={store.getState().tags} categorias={store.getState().categorias} activePage={activePage}
	        	 />
	        	<Link active={activePage} type="Post" filter="142" onClick={()=>store.dispatch(clickPost({type:"Post", value:"142"}))}>Teste</Link>
	        	<br/>
	        	{JSON.stringify(post)}
	        </article>
	      );

}
function PostCard(props){
	/*
	return (
		<li key={props.post.id}>
          <a onClick={()=>props.onPostClick(props.post.id)} 
          	key={props.post.id}>{props.post.id} - {props.post.title.rendered}
          </a>
        </li>
	);
	*/
	console.log("PostCard", props)
	console.log("PostCard", props.media, props.post)
	return (
		 <Card className="text-justify" onClick={()=>props.onPostClick(props.post.type, props.post.id)} >
		    <Card.Img variant="top" src={props.media?props.media.source_url:""} className="p-2" />
		    <Card.Body>
		    	<Card.Title>{props.post.title.rendered}</Card.Title>
		    	<Card.Text dangerouslySetInnerHTML={{__html : props.post.excerpt? props.post.excerpt.rendered: "" } }/>
		    </Card.Body>
		    <Card.Footer>
		    	<small className="text-muted">Last updated 3 mins ago</small>
		    </Card.Footer>
		</Card>
		)
}


class Posts extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: true,
	      posts: []
	    };
	}

	/*
  componentDidMount() {
    fetch("http://mteixeira.hospedagemdesites.ws/tutorialWP/wp-json/wp/v2/posts")
      .then(res => res.json())
      .then(
        (result) => {
         	this.setState({
            	isLoaded: true,
            	posts: result
          	});
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
  	*/

  	render() {
	    const { error, isLoaded } = this.state;
	    const { posts, medias } = this.props;
		if (error) {
	      	return <div>Error: {error.message}</div>;
	    } else if (!isLoaded) {
	      	return (
	      		<Spinner animation="border" role="status" className="m-4">
				  <span className="sr-only">Loading...</span>
				</Spinner>
	      		)
	      	;
	    } else {
	      const postsList = posts.map(post => (
	            <PostCard 
	            	key={post.id} 
	            	post={post} 
	            	media={medias.filter(m=>m.id == post.featured_media)[0]} 
	            	onPostClick={this.props.onPostClick} />
	            ));
	      return (
	        	<ReactBootstrap.CardDeck className="m-4">
		          {postsList}
		        </ReactBootstrap.CardDeck>
	      );
	    }
	}
}

const getVisiblePage = (posts, medias, carros, activePage) => {

	console.log("getVisiblePages",posts, medias, carros, activePage);

	const defaultProps = {
			posts: null, 
			medias: medias, 
    		activePage:activePage, 
			post: posts.filter(t => t.id == activePage.value)[0] 
		}

	if(!posts || !medias) return defaultProps;

  switch (activePage.type) {
  	case 'NONE' :
    	return {
    		posts: null, 
    		medias: null, 
    		activePage:activePage, 
    		post: null 
    	}
    case 'SHOW_ALL':
    case 'Posts':
      return {
      		posts: posts, 
      		medias: medias, 
      		activePage:activePage, 
      		post: null
      	}
    case 'Carros':
      return {
      		posts: carros, 
      		medias: medias, 
      		activePage:activePage, 
      		post: null
      	}
    case 'Carro':
      return {
      		posts: null, 
      		medias: medias, 
      		activePage:activePage, 
      		post: carros.filter(t => t.id == activePage.value)[0] 
      	}
    case 'Tags':
      return {
      		posts: posts.filter(post => post.tags.find(t=> t == activePage.value)), 
      		medias: medias, 
      		activePage:activePage, 
      		post: null
      	}
    case 'Categorias':
      return {
      		posts: posts.filter(post => post.categories.find(t=> t == activePage.value)), 
      		medias: medias, 
      		activePage:activePage, 
      		post: null
      	}
    default:
    	return defaultProps;
  }
}

const Header = (active) => {
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
			    	<NavFilterLink type="Posts" filter="">Home</NavFilterLink>
			    	<NavFilterLink type="Carros" filter="">Carros</NavFilterLink>
			    	<NavFilterLink type="Post"  filter="182">Post 1</NavFilterLink>
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
}

const mapStateToProps = state => {
	console.log("mapStateToProps",state);
  	return getVisiblePage(state.posts, state.medias, state.carros, state.ActivePage)
}
const mapDispatchToProps = dispatch => {
	console.log("mapDispatchToProps",dispatch);
	 
	return {
		onPostClick: (postType, id) => {
			console.log("onPostClick", postType, id);
			var type = "Posts"
			switch(postType)
			{
				case "post":
					type = "Post"
					break;
				case "carros":
					type = "Carro"
					break;
				default:
					type = "Posts"
					break;
			}
			dispatch(clickPost({type:type, value:id} ))
		}
	}
}


const Page = ({ posts, post, activePage, medias, onPostClick }) => {
	console.log("Page",posts, post, activePage, medias, onPostClick);
	//console.log("Page ", posts, post);
	if(posts)
		return (
			  <Posts posts={posts} medias={medias} onPostClick={onPostClick}/>
		)
	else if (post)
		return (<Post post={post} activePage={activePage} onPostClick={onPostClick}/>)
	else
		return (
			<Spinner animation="border" role="status" className="m-4">
			  <span className="sr-only">Loading...</span>
			</Spinner>
			); 

}

const VisiblePage = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)

/*
class Page extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      current: "Posts"
	    };
	}
	render(){
		if(this.state.current == "Posts")
			return (
				<Posts
					onClick={(i)=>this.setState({current: i})}
				/>)
		else
			return (
				<Post postID={this.state.current} 
					onClick={(i)=>this.setState({current: i})}
				/>)
	}
}
*/

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
	  	this.fetchData("http://mteixeira.hospedagemdesites.ws/tutorialWP/wp-json/wp/v2/posts",
	  			(result)=> {
	  				store.dispatch(updatePosts(result));
	          		store.dispatch(clickPost({type:"Posts", value:""}));
	  			})
	  	this.fetchData("http://mteixeira.hospedagemdesites.ws/tutorialWP/wp-json/wp/v2/media",
	  			(result)=> store.dispatch(updateMedia(result))
	  			)
	  	this.fetchData("http://mteixeira.hospedagemdesites.ws/tutorialWP/wp-json/wp/v2/tags",
	  			(result)=> store.dispatch(updateTags(result))
	  			)
	  	this.fetchData("http://mteixeira.hospedagemdesites.ws/tutorialWP/wp-json/wp/v2/carros",
	  			(result)=> store.dispatch(updateCarros(result))
	  			)
	  	this.fetchData("http://mteixeira.hospedagemdesites.ws/tutorialWP/wp-json/wp/v2/categories",
	  			(result)=> store.dispatch(updatecategories(result))
	  			)
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
		return (
			<React.Fragment>
				<Header active={store.getState().activePage}/>
		        <ReactBootstrap.Container className="text-center">
					<VisiblePage />
				</ReactBootstrap.Container>
			</React.Fragment>
		)
	}
}

ReactDOM.render(
	//<Posts posts={null} onPostClick={onPostClick}/>,

  <ReactRedux.Provider store={store}>
    <App />
  </ReactRedux.Provider>,
  document.getElementById('app')
);
