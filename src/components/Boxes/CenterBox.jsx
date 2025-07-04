import React, { useState, useEffect, useRef } from "react";
import "../../styles/CenterBox.css";
import ConnectButton from "./ConnectButton";
import { LiveAudioVisualizer } from "react-audio-visualize";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

const CenterBox = ({ isCallActive, isCallLoading, startCall }) => {
  const [mediaRecorder, setMediaRecorder] = useState();
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    let stream;
    if (isCallActive) {
      setElapsed(0);
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
      navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
        stream = s;
        const recorder = new window.MediaRecorder(stream);
        setMediaRecorder(recorder);
        recorder.start();
      });
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        mediaRecorder.stop();
        setMediaRecorder(undefined);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        mediaRecorder.stop();
        setMediaRecorder(undefined);
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line
  }, [isCallActive]);

  return (
    <div className="center-box">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <ConnectButton
          isCallActive={isCallActive}
          isCallLoading={isCallLoading}
          startCall={startCall}
        />
        <div className="audio-analyser-box" style={{ width: 200, height: 75, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', overflow: 'hidden', position: 'relative' }}>
          {mediaRecorder ? (
            <div style={{ transform: 'translateX(20%)' }}>
              <LiveAudioVisualizer
                mediaRecorder={isCallActive ? mediaRecorder : undefined}
                width={400}
                height={75}
                gap={5}
                minDecibels={-70}
                maxDecibels={-60}
              />
            </div>
          ) : (
            <div style={{ width: 100, height: 75 }} />
          )}
        </div>
        <div style={{ marginTop: "0.5rem", fontSize: "1.1rem", color: "#222", fontWeight: 500, letterSpacing: 1 }}>
          {isCallActive ? formatTime(elapsed) : "00:00"}
        </div>
      </div>
    </div>
  );
};

export default CenterBox; 