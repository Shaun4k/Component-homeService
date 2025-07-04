import React from "react";
import SmallBox from "./SmallBox";
import BoxRow from "./BoxRow";
import CenterBox from "./CenterBox";
import leftIcon from "../../assets/left-icon.png";
import rightIcon from "../../assets/right-icon.svg";
import endCallIcon from "../../assets/end-call.svg";
import { useAgentCall } from "../../hooks/agent";
import "../../styles/BigBox.css";
import "../../styles/BoxRow.css";

const BigBox = ({ gap = "16px" }) => {
  const { isCallActive, isCallLoading, startCall, endCall } = useAgentCall();

  return (
    <div className="big-box" style={{ position: 'relative' }}>
      <BoxRow gap={gap}>
        <SmallBox color="#f4f4f4">
          <div className="small-box-icon">
            <img src={leftIcon} alt="Left Icon" />
          </div>
        </SmallBox>
        <SmallBox color="#4660ec">
          <button
            className="small-box-icon button"
            onClick={isCallActive ? endCall : undefined}
            disabled={isCallLoading}
          >
            <img
              src={isCallActive ? endCallIcon : rightIcon}
              alt={isCallActive ? "End Call" : "Right Icon"}
              className={isCallActive ? "large-icon" : undefined}
            />
          </button>
        </SmallBox>
      </BoxRow>
      <CenterBox
        isCallActive={isCallActive}
        isCallLoading={isCallLoading}
        startCall={startCall}
      />
    </div>
  );
};

export default BigBox;