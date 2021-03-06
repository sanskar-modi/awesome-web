var App = React.createClass({
  getInitialState: function(){
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: 'https://raw.githubusercontent.com/sindresorhus/awesome/master/readme.md',
      cache: true,
      success: function(data){
        var items = [];
        var item = {};
        var regExp = /\[([^\]]+)\]\(https:\/\/github\.com\/([\w\d-]+)\/([\w\d-]+)\)/g;
        var blob = data.match(regExp);
        blob.forEach(function (line){
          item = {};
          var foo = line.match(/\[([^\]]+)\]\(https:\/\/github\.com\/([\w\d-]+)\/([\w\d-]+)\)/);
          item['title'] = foo[1];
          item['username'] = foo[2];
          item['repo'] = foo[3];
          items.push(item);
        });
        console.log(items);
        this.setState({data: items})
      }.bind(this),
      error: function(xhr, status, err){
        console.error(status, err.toString());
      }.bind(this),
    });
  },
  render: function() {
    return (
      <div>
      <Header />
      <CardBox data={this.state.data}/>
      </div>
    );
  }
})

var Header = React.createClass({
  render: function() {
    return (
      <header className="container-fluid text-center">
        <img src="logo.png" alt="Awesome logo" />
        <h1>Awesome</h1>
        <p>
          A curated list of awesome lists.
        </p>
      </header>
    )
  }
})

var CardBox = React.createClass({
  render: function() {
    var cardNodes = this.props.data.map(function(item){
      return <Card title={item.title} username={item.username} repo={item.repo} />
    })
    return (
      <div className="container-fluid card-container text-center">
        <h2 className="card-container-heading text-center">Awesome List</h2>
        <hr className="underline" />
        {cardNodes}
      </div>
    )
  }
})

var Card = React.createClass({
  render: function() {
    return (
      <div className="card col-lg-2 col-md-2 col-sm-3 card col-xs-6">
        <div className="card-content">
          <h3 className="card-title">{this.props.title}</h3>
          <p>{this.props.username}</p>
          <p>{this.props.repo}</p>
          <a href={'https://github.com' + '/' + this.props.username + '/' + this.props.repo}>Fork on Github</a>
          <div className="cards-tags">
            <span className="tag">JS</span>
            <span className="tag">NodeJS</span>
          </div>
        </div>
      </div>
    )
  }
})

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
