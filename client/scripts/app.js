// YOUR CODE HERE:
var ChatterBox = function() {
  this.friends = [];
  this.message = '';
};

ChatterBox.prototype.init = function() {
  // $(document).ready(() => {
  //on click on '.username' run handlerUsernameClick
  //console.log($('#chats .chat .username'));
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
  // });
};

ChatterBox.prototype.send = function(message) {
  
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
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

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Messages received');
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
  var username = message.username;
  var text = message.text;
  var roomname = message.roomname;

  var name = `<span class="username">${username}</span>`;
  var message = `<span class="message"> ${text} </span>`;
  var room = `<span class="room"> ${roomname} </span>`;
  var chat = `<span class="chat">${name}: ${message} ${room}</span>`;

  $('#chats').append(chat);
};

ChatterBox.prototype.renderRoom = function(room) {
  var room = `<span>${room}</span>`;
  $('#roomSelect').append(room);
};

ChatterBox.prototype.handleUsernameClick = function(event) {
  this.friends.push(event.target.innerHTML);
};

ChatterBox.prototype.handleSubmit = function(event) {
  console.log('event', event);
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
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

var app = new ChatterBox();
app.server = 'http://parse.CAMPUS.hackreactor.com/chatterbox/classes/messages';
$(document).ready(() => {
  app.init();
});















