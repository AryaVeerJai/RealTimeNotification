import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
const ENDPOINT = "https://localhost:3000";

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on('notification', (data) => {
      setNotifications((prev) => [...prev, data.message]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="App">
      <h1>Real-Time Notifications</h1>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
