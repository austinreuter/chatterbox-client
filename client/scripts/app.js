// YOUR CODE HERE:
//http://parse.sfm8.hackreactor.com/
var app = {

};
app.init = function() {

}
app.send = function(message) {
	//message = JSON.stringify(message);
	$.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: message,
    contentType: 'application/json',
    success: function (data) {
    	console.log(data);
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
}
app.fetch = function() {
	$.ajax({
  // This is the url you should use to communicate with the parse API server.
    //url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    success: function (data) {
    	console.log(data);
      console.log('chatterbox: Messages received');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive messages', data);
    }
  });

}

$(document).ready(function() {

  console.log('hello');
});