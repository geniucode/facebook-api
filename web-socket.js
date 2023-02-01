import { WebSocketServer } from "ws";
export const createWebSocket = async () => {
  const server = new WebSocketServer(
    {
      port: process.env.wsPort,
    },
    () => {
      const users = new Set();

      const sendMessage = (message) => {
        users.forEach((user) => {
          user.ws.send(JSON.stringify(message));
        });
      };
      server.on("connection", (ws) => {
        const userRef = {
          ws,
        };
        users.add(userRef);

        ws.on("message", (message) => {
          console.log(message);
          try {
            // Parsing the message
            const data = JSON.parse(message);

            // Checking if the message is a valid one

            if (typeof data.body !== "string") {
              console.error("Invalid message");
              return;
            }

            // Sending the message

            const messageToSend = {
              sender: "Ali",
              body: data.body,
              sentAt: Date.now(),
            };

            sendMessage(messageToSend);
          } catch (e) {
            console.error("Error passing message!", e);
          }
        });

        ws.on("close", (code, reason) => {
          users.delete(userRef);
          console.log(`Connection closed: ${code} ${reason}!`);
        });
      });
      console.log(`Server started on port ${process.env.wsPort}`);
    }
  );
};
