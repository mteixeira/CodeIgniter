<script type="text/babel">
   'use strict';

	class Rank extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = { liked: false };
	  }

	  render() {
	    return <h1>oi</h1>;
	  }
	}

	var x = document.getElementsByClassName('Rank react');
	//var x = $("span.Rank.react");
	var i;
	for (i = 0; i < x.length; i++) {
		ReactDOM.render(
				<Rank rank="{x[i].getAttribute('rank')}"/>
				,x[i]);
	}
</script>
