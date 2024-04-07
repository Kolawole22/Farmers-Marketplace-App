import { useContext, useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../config.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "./context.service";
import axios from "axios";

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);
  const [token, setToken] = useState(null);
  const { createErrandSent, setCreatErrandSent } = useContext(GlobalContext);

  const [messageToSend, setMessageToSend] = useState(null);

  const fetchToken = async () => {
    const asyncToken = await AsyncStorage.getItem("user_token");
    if (asyncToken !== null) {
      console.log("token:::", asyncToken);
      setToken(asyncToken);
    } else {
      console.log("There's no token for socket connection");
    }
  };

  const initializeSocket = () => {
    if (!token) return;

    const SOCKET_URL = `${BACKEND_URL}/product/?token=${token}`;

    try {
      const socket = new WebSocket(SOCKET_URL, {
        transports: ["websocket"],
      });

      console.log("socket:::", socket);

      socketRef.current = socket;

      socket.onopen = (e) => {
        console.log("Socket connected", socket.readyState);
        setIsConnected(true);
        // if (messageToSend) {
        //   socket.send(JSON.stringify(messageToSend));
        //   setMessageToSend(null);
        // }
      };

      socket.onmessage = (event) => {
        console.log(
          "Received message from the hometown farm server:",
          event.data
        );
        // if (event.data) {
        //   setCreatErrandSent(true);
        // } else {
        //   setCreatErrandSent(false);
        // }
      };

      socket.onclose = (event) => {
        if (event.code === 1000) {
          console.log("WebSocket connection closed gracefully");
        } else {
          console.log(
            `WebSocket connection closed with code: ${event.code}`,
            `reason: ${event.reason}`
          );
        }
      };

      socket.onerror = (error) => {
        console.log("Socket error", error);
        setIsConnected(false);
      };
    } catch (err) {
      console.log("Socket is not initialized", err);
      setIsConnected(false);
    }
  };

  const handleSendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
      console.log("message sent in socket", message);
    } else {
      setMessageToSend(message); // Save the message to send when the socket opens
    }
  };

  const handleSocketConnection = () => {
    fetchToken();
  };

  useEffect(() => {
    initializeSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]); // Run the effect whenever the token changes

  return {
    handleSocketConnection,
    isConnected,
    sendMessage: handleSendMessage,
    // ...other functions and state you want to expose
  };
};

export default useSocket;
