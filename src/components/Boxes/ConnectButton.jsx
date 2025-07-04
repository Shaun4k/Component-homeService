import React from "react";
import "../../styles/ConnectButton.css";

const AGENT_ID = "5dd78249-ffb2-4878-9bd9-451ce1bb8145";

const ConnectButton = ({ isCallActive, isCallLoading, startCall }) => {
  let buttonText = "Connect";
  if (isCallLoading) buttonText = "Connecting...";
  else if (isCallActive) buttonText = "Connected •";

  return (
    <button
      className="connect-button"
      onClick={() => startCall(AGENT_ID)}
      disabled={isCallActive || isCallLoading}
    >
      {buttonText}
    </button>
  );
};

export default ConnectButton; 