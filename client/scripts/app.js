// YOUR CODE HERE:
var ChatterBox = function() {
  this.friends = [];
  this.message = '';
};

ChatterBox.prototype.init = function() {

  $('body').on('click', '.username', (event) => {
    this.handleUsernameClick(event);
  });
  var context = this;
  $('.submit').unbind('submit').bind('submit', function(event) {
    event.preventDefault();    

    console.log('I AM BEING CALLED');
    context.handleSubmit(event);
    
  });
  $('.message').keyup((event) => {
    this.message += event.target.value;
  });

  //room on click, go through rooms and render room;

};

ChatterBox.prototype.send = function(message) {
  //stringify object values for message
  // var usernameString = JSON.stringify(message.username);
  // var textString = JSON.stringify(message.text);
  // var roomnameString = JSON.stringify(message.roomname);
  // message = {
  //   username: usernameString,
  //   message: textString,
  //   roomname: roomnameString
  // };
  
  $.ajax({
    url: this.server,
    type: 'POST',
    data: message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });

};

ChatterBox.prototype.fetch = function() {
  var context = this;
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    contentType: 'application/json',
    data: {order: '-createdAt'},
    success: function (data) {
      console.log('chatterbox: Messages received');
      console.log('fetched data:', data);
      data.results.forEach((message) => {
        //console.log(message);
        context.renderMessage(message);
      });
      //call renderMessage?
      //room on each {message}? -add- this to our [rooms]
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive messages', data);
    }
  });

};

ChatterBox.prototype.clearMessages = function() {
  // access chat dom node; go through each child/chat, delete it;
  $('#chats').empty();
};

ChatterBox.prototype.renderMessage = function(message) {
  console.log('renderMessage', message);
  var username = encodeURIComponent(message.username);
  var text = encodeURIComponent(message.text);
  var roomname = encodeURIComponent(message.roomname);
  /*
  var lt = /</g, 
      gt = />/g, 
      ap = /'/g, 
      ic = /"/g;
  value = value.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
  */
  var name = `<span class="username">${username}</span>`;
  var message = `<span class="message"> ${text} </span>`;
  var room = `<span class="room"> ${roomname} </span>`;
  var chat = `<span class="chat">${name}: ${message} ${room}</span> <br/><br/>`;

  $('#chats').append(chat);
};

ChatterBox.prototype.renderRoom = function(room) {
  var room = `<span>${room}</span>`;
  //go through each message, and if it is the room select
  $('#roomSelect').append(room);
};

ChatterBox.prototype.handleUsernameClick = function(event) {
  this.friends.push(event.target.innerHTML);
};

ChatterBox.prototype.handleSubmit = function(event) {
  console.log('event', event);
  $.ajax({
    url: this.server,
    type: 'POST',
    data: message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

var app = new ChatterBox();
app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
$(document).ready(() => {

  app.init();
  app.fetch();
});















