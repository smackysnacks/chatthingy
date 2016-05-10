/// <reference path="typings/main.d.ts" />
// import React = __React;
// import ReactDOM = React.__DOM;
import * as ws from "./ws";

console.log("before");
console.log(ws.socket);
console.log("after");

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});
ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
