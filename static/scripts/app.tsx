/// <reference path="./typings/main.d.ts" />
import React = __React;
import ReactDOM = React.__DOM;

var socket = new WebSocket("ws://localhost:8080/ws");

socket.onopen = function (event) {
  console.log("onopen event: " + event);
};

socket.onerror = function (event) {
  console.log("onerror event: " + event);
};

socket.onmessage = function(event) {
  console.log("message is: " + event.data);
};

/* REACTJS STUFF */
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
