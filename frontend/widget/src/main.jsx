import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// For embeddable script usage: find or create a mount point
const mountId = 'chatbot-widget';
let mountPoint = document.getElementById(mountId);

if (!mountPoint) {
    mountPoint = document.createElement('div');
    mountPoint.id = mountId;
    document.body.appendChild(mountPoint);
}

ReactDOM.createRoot(mountPoint).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
