// Create a new WebSocket connection
const socket = new WebSocket('ws://172.28.28.49:8080/join?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM3MjA2NTgwLCJpYXQiOjE3MzU5MTA1ODAsImp0aSI6IjJmNTQ1MjNjZWVhODRmY2ZiZjUyNmRkNTEwNDJjMWFlIiwidXNlcl9pZCI6MX0.162w3cxojhRPk7Q_JlIUsjmciSlL6p7Ml0aL3NNpy9Q');

// Event listener for when the connection is successfully established
socket.addEventListener('open', (event) => {
  console.log('WebSocket connection established.');

  // Send a message to the server
  // socket.send('Hello, server!');
});

// Event listener for when a message is received from the server
socket.addEventListener('message', (event) => {
  console.log('Message received from server:', event);

  
  // Process the received message (if it's JSON)
  try {
      const data = JSON.parse(event.data);
      document.getElementById("messages").innerHTML += `<p>${data.message.content}</p>`;
    console.log('Parsed data:', data);
  } catch (error) {
    console.error('Error parsing message as JSON:', error);
  }
});

// Event listener for when the WebSocket connection is closed
socket.addEventListener('close', (event) => {
  console.log('WebSocket connection closed.', event);
});

// Event listener for when there's an error with the WebSocket
socket.addEventListener('error', (error) => {
  console.error('WebSocket error:', error);
});

// Example function to close the connection
function closeWebSocket() {
  if (socket.readyState === WebSocket.OPEN) {
    socket.close(); // Gracefully close the WebSocket connection
    console.log('WebSocket connection manually closed.');
  }
}

document.getElementById("send").addEventListener("click", function() {
    const message = document.getElementById("message").value;
    // socket.send(message);
    socket.send(JSON.stringify({
      type: 'server_message',
      server_id: '1',
      channel_id: '1',
      message: message
    }))
    document.getElementById("message").value = "";
})

document.getElementById("connect_server").addEventListener("click", function() {
  // socket.send(message);
  socket.send(JSON.stringify({
    type: 'server_join',
    server_id: '1',
    channel_id: '1'
  }))
})

