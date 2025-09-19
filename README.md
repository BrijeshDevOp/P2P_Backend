# P2P File Transfer Backend

A WebRTC signaling server that enables peer-to-peer file transfers and screen sharing between clients. This backend acts as a signaling server to facilitate WebRTC connections without storing or routing the actual file data.

## 🚀 Features

- **WebRTC Signaling**: Facilitates peer-to-peer connections between clients
- **Real-time Communication**: WebSocket-based messaging for instant connection setup
- **User Management**: Simple username-based user identification system
- **Connection Brokering**: Handles offer/answer exchange and ICE candidate sharing
- **Error Handling**: Robust error handling for connection failures
- **Cloud Ready**: Configured for deployment on Render.com

## 🏗️ Architecture

This server implements the WebRTC signaling protocol using:
- **HTTP Server**: Basic health check endpoint
- **WebSocket Server**: Real-time bidirectional communication
- **In-Memory Storage**: Temporary user session management

### Message Types

The server handles the following WebRTC signaling messages:

| Message Type | Description |
|--------------|-------------|
| `SignIn` | User registration with username and password |
| `StartConnection` | Initiate connection request to target user |
| `Offer` | WebRTC offer containing session description |
| `Answer` | WebRTC answer responding to an offer |
| `IceCandidates` | ICE candidates for NAT traversal |

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd P2P_FILE_TRANSFER/BACKEND
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

The server will start on port 10000 (or the port specified in the `PORT` environment variable).

## 🚀 Usage

### Local Development
```bash
npm start
```
Server will be available at `http://localhost:10000`

### Health Check
Visit `http://localhost:10000/` to verify the server is running.

### WebSocket Connection
Connect to the WebSocket server at `ws://localhost:10000` for signaling.

## 📡 API Reference

### WebSocket Messages

#### Sign In
```json
{
  "type": "SignIn",
  "username": "user123",
  "data": "password123"
}
```

#### Start Connection
```json
{
  "type": "StartConnection",
  "username": "user1",
  "target": "user2"
}
```

#### WebRTC Offer
```json
{
  "type": "Offer",
  "username": "user1",
  "target": "user2",
  "data": {
    "sdp": "...",
    "type": "offer"
  }
}
```

#### WebRTC Answer
```json
{
  "type": "Answer",
  "username": "user2",
  "target": "user1",
  "data": {
    "sdp": "...",
    "type": "answer"
  }
}
```

#### ICE Candidates
```json
{
  "type": "IceCandidates",
  "username": "user1",
  "target": "user2",
  "data": {
    "candidate": "...",
    "sdpMLineIndex": 0,
    "sdpMid": "..."
  }
}
```

## 🌐 Deployment

### Render.com Deployment

This project is configured for deployment on Render.com using the included `render.yaml` file.

1. **Connect your repository** to Render.com
2. **Select the `server` branch** for deployment
3. **Environment variables** (if needed):
   - `PORT`: Will be automatically set by Render

The deployment configuration:
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free tier
- **Environment**: Node.js

### Manual Deployment

For other platforms, ensure:
- Node.js runtime is available
- Port is configurable via `PORT` environment variable
- WebSocket connections are supported

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port number | `10000` |

### Server Configuration

The server listens on all interfaces (`0.0.0.0`) to accept connections from any IP address, making it suitable for cloud deployment.

## 📁 Project Structure

```
BACKEND/
├── server.js          # Main server file (production)
├── index.js           # Alternative server file (development)
├── package.json       # Dependencies and scripts
├── render.yaml        # Render.com deployment config
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## 🔍 How It Works

1. **Client Registration**: Users connect via WebSocket and sign in with a username
2. **Connection Request**: User A requests to connect to User B
3. **Signaling Exchange**: Server facilitates the exchange of WebRTC offers, answers, and ICE candidates
4. **P2P Connection**: Once signaling is complete, clients establish direct peer-to-peer connection
5. **File Transfer**: Actual file transfer happens directly between peers (not through this server)

## 🛡️ Security Considerations

- **No Data Storage**: Server doesn't store files or persistent user data
- **Session-Based**: User sessions are temporary and cleared on disconnect
- **Password Field**: Basic password field available (implement proper authentication as needed)
- **CORS**: Configure CORS policies for production use

## 🐛 Troubleshooting

### Common Issues

1. **Connection Refused**
   - Ensure the server is running
   - Check if the port is available
   - Verify firewall settings

2. **WebSocket Connection Failed**
   - Check if WebSocket protocol is supported
   - Verify the WebSocket URL format
   - Ensure no proxy is blocking WebSocket connections

3. **User Not Found Errors**
   - Verify both users are signed in
   - Check username spelling
   - Ensure users are connected to the same server instance

## 📝 Development

### Running in Development Mode

For development with auto-restart:
```bash
npx nodemon server.js
```

### Code Structure

- **server.js**: Production-ready server with enhanced error handling
- **index.js**: Simplified development version
- Both files implement the same WebRTC signaling protocol

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🔗 Related Projects

This backend is designed to work with WebRTC-enabled frontend applications for:
- File sharing
- Screen sharing
- Video/audio calls
- Real-time data transfer

---

**Status**: 🟢 **HOSTED** - Currently deployed and running