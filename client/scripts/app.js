// YOUR CODE HERE:
var ChatterBox = function() {
  this.friends = [];
  this.message = '';
  this.username = 'anonimus';
  this.roomnames = [];
  this.messages = [];
};

ChatterBox.prototype.init = function() {

  $('body').on('click', '.username', (event) => {
    this.handleUsernameClick(event);
  });
  var context = this;
  $('#send').unbind('submit').bind('submit', function(event) {
    event.preventDefault();    
    context.handleSubmit(event);
    
  });
  $('.message').keyup((event) => {
    this.message = event.target.value;
  });
  $('.selectRoom').on('click', (event) => {
    this.filterRooms();
  });

  //room on click, go through rooms and render room;

};

ChatterBox.prototype.send = function(message) {
  
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
      context.messages = data.results;
      data.results.forEach((message) => {
        context.renderMessage(message);
        context.renderRoom(message.roomname);
      });
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
  //console.log('renderMessage', message);
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
  var chat = `<div class="chat">${name}: ${message} ${room} <br/> <br/> </div>`;

  $('#chats').append(chat);
};

ChatterBox.prototype.prependMessage = function(message) {
  var username = encodeURIComponent(message.username);
  var text = encodeURIComponent(message.text);
  var roomname = encodeURIComponent(message.roomname);
  var name = `<span class="username">${username}</span>`;
  var message = `<span class="message"> ${text} </span>`;
  var room = `<span class="room"> ${roomname} </span>`;
  var chat = `<div><span class="chat">${name}: ${message} ${room}</span> <br/><br/></div>`;

  $('#chats').prepend(chat);
};

ChatterBox.prototype.renderRoom = function(room) {
  var newRoom = `<option>${room}</option>`;
  if (!this.roomnames.includes(room) && room) {
    this.roomnames.push(room);
    $('#roomSelect').append(newRoom);
  }
};

ChatterBox.prototype.handleUsernameClick = function(event) {
  if (!this.friends.includes(event.target.innerHTML)) {
    this.friends.push(event.target.innerHTML);
    var div = $("#chats").find(`div:contains(${event.target.innerHTML})`);

    for (var i = 0; i < div.length; i++) {
      $(div[i]).css('font-weight', 'Bold');
    }
  }
};

ChatterBox.prototype.handleSubmit = function(event) {
  var message = {
    username: this.username,
    text: this.message,
    roomname: $('#roomSelect').val()
  };
  this.send(JSON.stringify(message));
  this.prependMessage(message);
};

ChatterBox.prototype.filterRooms = function() {
  this.clearMessages();
  this.messages.forEach(message => {
    if ($('#roomSelect').val() === message.roomname) {
      this.renderMessage(message);
    }
  });

};

var app = new ChatterBox();
app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
$(document).ready(() => {

  app.init();
  app.fetch();
});















