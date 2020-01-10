// replace these values with those generated in your TokBox Account
var apiKey = "46490812";
var sessionId = "2_MX40NjQ5MDgxMn5-MTU3ODY3MzkyMTA4NH5sclBxaXY0SndZT2hDcksvYW5vdFFpL1J-fg";
var token = "T1==cGFydG5lcl9pZD00NjQ5MDgxMiZzaWc9YzYxNDE0NmMwMGJiYjNhOTY4NDBiZjFhMzZhY2RmMzUwNWYwMGNhNzpzZXNzaW9uX2lkPTJfTVg0ME5qUTVNRGd4TW41LU1UVTNPRFkzTXpreU1UQTROSDVzY2xCeGFYWTBTbmRaVDJoRGNrc3ZZVzV2ZEZGcEwxSi1mZyZjcmVhdGVfdGltZT0xNTc4NjczOTM2Jm5vbmNlPTAuOTM1ODAxNjgzNjUyODIzMyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTgxMjY1OTM2JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

// (optional) add server code here
initializeSession();

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, initialize a publisher and publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });

  publisher.cycleVideo();

}
