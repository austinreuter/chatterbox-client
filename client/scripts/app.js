// YOUR CODE HERE:
var ChatterBox = function() {
  this.friends = [];
};

ChatterBox.prototype.init = function() {
  $(document).ready(() => {
    //on click on '.username' run handlerUsernameClick
    console.log('hi');
    //console.log($('#chats .chat .username'));
    $('body').on('click', '.username', (event) => {
      this.handleUsernameClick(event);
    });
  });


};

ChatterBox.prototype.send = function(message) {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.CAMPUS.hackreactor.com/chatterbox/classes/messages',
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
    url: 'http://parse.CAMPUS.hackreactor.com/chatterbox/classes/messages',
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
  console.log('friends after name click', this.friends);
  //console.log('event', event, 'this', this);

};

var app = new ChatterBox();
app.server = 'http://parse.CAMPUS.hackreactor.com/chatterbox/classes/messages';
app.init();















