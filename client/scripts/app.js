// YOUR CODE HERE:
var ChatterBox = function() {

};

ChatterBox.prototype.init = function() {

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

var app = new ChatterBox();
app.server = 'http://parse.CAMPUS.hackreactor.com/chatterbox/classes/messages';
















