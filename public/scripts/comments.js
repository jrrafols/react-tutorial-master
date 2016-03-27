var CommentBox = React.createClass({
    getInitialState: function(){
        return {data: []};  
    },
    loadCommentsFromServer: function(){
        $.ajax({
           url: this.props.url,
           dataType: 'json',
           cache: false,
           success: function(data){
               this.setState({data: data});
           }.bind(this),
           error: function(xhr, status, err){
               console.error(this.props.url, status, err.toString());
           }.bind(this)
        });
    },
    componentDidMount: function(){
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);  
    },
    handleCommentSubmit: function(comment){
        var comments = this.state.data;
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({data:newComments});
        $.ajax({
           url: this.props.url,
           dataType: 'json',
           type: 'POST',
           data: comment,
           success: function(data){
               this.setState({data:data});
           }.bind(this),
           error: function(xhr, status, err){
               this.setState({data:comments});
               console.error(this.props.url, status, err.toString());
           }.bind(this)
        });
    },
    handleCommentDelete: function(id){
      console.log("id: " + id, this.state.data);
      var comments = this.state.data;
      var newComments = comments.filter(function(item){ 
          return item.id !== id;
        });
      this.setState({data:newComments});
      
      $.ajax({
           url: this.props.url + '/' + id,
           dataType: 'json',
           type: 'DELETE',
           success: function(data){
               //state has already been set. Do nothing.
           }.bind(this),
           error: function(xhr, status, err){
               //Save failed, revert to previous state of the app
               this.setState({data:comments});
               console.error(this.props.url, status, err.toString());
           }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} onCommentDelete={this.handleCommentDelete} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

var CommentList = React.createClass({
    handleCommentDelete: function(id){
      console.log("id: " + id);
      this.props.onCommentDelete(id)
    },
    render: function(){
        var commentNodes = this.props.data.map(function(comment){
            return (
                <Comment author={comment.author} key={comment.id} id={comment.id} onCommentDelete={this.handleCommentDelete}>
                    {comment.text}
                </Comment>
            );
        }, this);
        return( 
          <div className="commentList">
            {commentNodes}
          </div>  
        );
    }
});

var CommentForm = React.createClass({
    getInitialState: function(){
      return {author: "", text: ""};  
    },
    handleAuthorChange: function(e){
      this.setState({author: e.target.value});
    },
    handleTextChange: function(e){
      this.setState({text: e.target.value});
    },
    handleSubmit: function(e){
      e.preventDefault();
      var author = this.state.author.trim();
      var text = this.state.text.trim();
      if (!text || !author) return;
      
      this.props.onCommentSubmit({author:author, text: text});
      this.setState({author: "", text: ""});
    },
    render: function(){
        return(
          <form className="commentForm" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Name" value={this.state.author} onChange={this.handleAuthorChange} />
            <input type="text" placeholder="Comment" value={this.state.text} onChange={this.handleTextChange} />
            <input type="submit" value="Post" />
          </form>  
        );
    }
});

var Comment = React.createClass({
    handleDeleteComment: function(e){
      e.preventDefault();
      this.props.onCommentDelete(this.props.id)
    },
    render: function(){
        return(
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}<br />
                <a href="#" className="delete" onClick={this.handleDeleteComment} >Delete</a>
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={30000} />,
    document.getElementById('content')
);