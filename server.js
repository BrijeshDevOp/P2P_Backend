    const http = require("http");
    const socket = require("websocket").server;

    const PORT = process.env.PORT || 10000;

    const server = http.createServer((req, res) => {
    // Add a simple health check for Render
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Server is running ✅");
    }
    });

    server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
    });

    const users = [];

    const Types = {
    SignIn: "SignIn",
    StartConnection: "StartConnection",
    Offer: "Offer",
    Answer: "Answer",
    IceCandidates: "IceCandidates",
    };

    const webSocket = new socket({ httpServer: server });

    webSocket.on("request", (req) => {
    const connection = req.accept();

    connection.on("message", (message) => {
        try {
        const data = JSON.parse(message.utf8Data);
        const currentUser = findUser(data.username);
        const userToReceive = findUser(data.target);
        console.log("Message received:", data);

        switch (data.type) {
            case Types.SignIn:
            if (currentUser) return;

            users.push({
                username: data.username,
                conn: connection,
                password: data.data,
            });
            break;

            case Types.StartConnection:
            if (!currentUser) {
                console.log("User not found:", data.username);
                return;
            }
            if (userToReceive) {
                sendToConnection(userToReceive.conn, {
                type: Types.StartConnection,
                username: currentUser.username,
                target: userToReceive.username,
                });
            } else {
                sendToConnection(currentUser.conn, {
                type: "Error",
                username: "server",
                target: data.username,
                data: "Target user not found",
                });
            }
            break;

            case Types.Offer:
            if (userToReceive) {
                sendToConnection(userToReceive.conn, {
                type: Types.Offer,
                username: data.username,
                target: data.target,
                data: data.data,
                });
            }
            break;

            case Types.Answer:
            if (userToReceive) {
                sendToConnection(userToReceive.conn, {
                type: Types.Answer,
                username: data.username,
                data: data.data,
                });
            }
            break;

            case Types.IceCandidates:
            if (userToReceive) {
                sendToConnection(userToReceive.conn, {
                type: Types.IceCandidates,
                username: data.username,
                data: data.data,
                });
            }
            break;
        }
        } catch (e) {
        console.error("Error handling message:", e.message);
        }
    });

    connection.on("close", () => {
        users.forEach((user) => {
        if (user.conn === connection) {
            users.splice(users.indexOf(user), 1);
        }
        });
    });
    });

    const sendToConnection = (connection, message) => {
    connection.send(JSON.stringify(message));
    };

    const findUser = (username) => {
    return users.find((u) => u.username === username);
    };
