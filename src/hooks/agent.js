import { useState, useRef, useCallback } from "react";
import axios from "axios";
import { RetellWebClient } from "retell-client-js-sdk";

export const useAgentCall = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isCallLoading, setIsCallLoading] = useState(false);
  const retellWebClientRef = useRef(null);

  const registerCall = async (agentId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/start-call`,
        {},
        {
          headers: { "agentX-ID": agentId, "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Conversation error:", error.message);
      throw error;
    }
  };

  const endCall = useCallback(() => {
    if (retellWebClientRef.current) {
      try {
        retellWebClientRef.current.stopCall();
      } catch (error) {
        console.error("Error stopping call:", error);
      }
      retellWebClientRef.current = null;
    }
    setIsCallActive(false);
    setIsCallLoading(false);
    window.location.reload();
  }, []);

  const startCall = useCallback(
    async (agentId) => {
      // Prevent starting another call if one is already active
      if (isCallActive || isCallLoading) return;

      setIsCallLoading(true);

      // Ensure only one active call
      if (isCallActive) {
        endCall();
      }

      try {
        const registerCallResponse = await registerCall(agentId);

        const { access_token, call_id, sample_rate } = registerCallResponse;

        if (call_id) {
          const retellWebClient = new RetellWebClient();

          retellWebClientRef.current = retellWebClient;

          // Listen for lifecycle events to update UI state
          retellWebClient.on("call_started", () => {
            setIsCallActive(true);
            setIsCallLoading(false);
          });

          retellWebClient.on("call_ended", () => {
            endCall();
          });

          retellWebClient.on("error", () => {
            endCall();
          });

          await retellWebClient.startCall({
            accessToken: access_token,
            sampleRate: sample_rate,
          });
        }
      } catch (error) {
        console.error("Error starting conversation:", error);
        // Clean up state if initialization fails
        endCall();
      }
    },
    [isCallActive, isCallLoading, endCall]
  );

  return {
    isCallActive,
    isCallLoading,
    startCall,
    endCall,
  };
};
