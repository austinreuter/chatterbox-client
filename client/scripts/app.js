
class ChatterBox {
  constructor() {
    this.friends = [];
    this.message = '';
    this.username = '';
    this.roomnames = [];
    this.messages = [];
  }

  init() {
    $('body').on('click', '.username', (event) => {
    this.handleUsernameClick(event);
    });
    $('#send').unbind('submit').bind('submit', event => {
      event.preventDefault();    
      this.handleSubmit(event);
      
    });
    $('.message').keyup(event => {
      this.message = event.target.value;
    });
    $('.selectRoom').on('click', event => {
      this.filterRooms();
    });
    $('.fetch').on('click', event => {
      this.clearMessages();
      this.fetch();
    });
  }

  send(message) {
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
  }

  fetch() {
    var context = this;
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      contentType: 'application/json',
      data: {order: '-createdAt'},
      success: function(data) {
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
  }

  clearMessages() {
    $('#chats').empty();
  }

  render(message) {
    var pack = (string) => {
      return string.split('%20').join(' ');
    }
    var user = pack(encodeURIComponent(message.username));
    var text = pack(encodeURIComponent(message.text));
    var room = pack(encodeURIComponent(message.roomname));
      user = `<span class="username">${user}</span>`;
      text = `<span class="message"> ${text} </span>`;
      room = `<span class="room"> ${room} </span>`;

    return `<div class="chat">${user}: ${text} ${room} <br/> <br/> </div>`; 
  }
  renderMessage(message) {
    $('#chats').append(this.render(message));
  }
  prependMessage(message) {
    $('#chats').prepend(this.render(message));
  }

  renderRoom(room) {
    var newRoom = `<option>${room}</option>`;
    if (!this.roomnames.includes(room) && room) {
      this.roomnames.push(room);
      $('#roomSelect').append(newRoom);
    }
  }

  handleUsernameClick(event) {
    if (!this.friends.includes(event.target.innerHTML)) {
      this.friends.push(event.target.innerHTML);
      var div = $("#chats").find(`div:contains(${event.target.innerHTML})`);
  
      for (var i = 0; i < div.length; i++) {
        $(div[i]).css('font-weight', 'Bold');
      }
    }
  }

  handleSubmit(event) {
    var message = {
      username: this.username,
      text: this.message,
      roomname: $('#roomSelect').val()
    };
    this.send(JSON.stringify(message));
    this.prependMessage(message);
  }

  filterRooms() {
    this.clearMessages();
    this.messages.forEach(message => {
      if ($('#roomSelect').val() === message.roomname) {
        this.renderMessage(message);
      }
    });
  }
};


var app = new ChatterBox();
app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';

$(document).ready(() => {
  app.init();
  app.fetch();

});



