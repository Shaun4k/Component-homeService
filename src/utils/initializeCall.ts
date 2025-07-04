import retellWebClient from "./retell-web-client";
import registerCall from "./registerCall"

export const initializeCall = async (
  agentId: string,
  onStart: () => void,
  onError: () => void
) => {
  console.log("initializeCall", agentId);
  try {
    const registerCallResponse = await registerCall(agentId);
    if (registerCallResponse.call_id) {
      await retellWebClient.startCall({
        accessToken: registerCallResponse.access_token,
        sampleRate: registerCallResponse.sample_rate
      });
      onStart(); // for setting state or triggering UI changes
    }
  } catch (error) {
    console.error("Error starting call:", error);
    onError();
  }
};

export const handleEndCall = () => {
  retellWebClient.stopCall();
};
