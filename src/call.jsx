import React, { useEffect, useState, useRef } from "react";

const AGENT_ID = "agent_7701k88d9790exxrjw3yq6b90r0s";

export default function CallAgentPage() {
  const [micAccess, setMicAccess] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [status, setStatus] = useState("جاهز");
  const [error, setError] = useState(null);
  
  const wsRef = useRef(null);
  const audioContextRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioQueueRef = useRef([]);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setMicAccess(true);
        setStatus("تم السماح بالوصول للميكروفون");
      })
      .catch((err) => {
        setMicAccess(false);
        setError("يرجى السماح بالوصول للميكروفون");
        console.error("Microphone access denied:", err);
      });

    return () => {
      cleanup();
    };
  }, []);

  const startCall = async () => {
    if (!micAccess) {
      alert("يرجى السماح بالوصول للميكروفون");
      return;
    }

    setError(null);
    setStatus("جاري الاتصال...");
    setIsCalling(true);

    try {
      // Initialize Audio Context
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 16000
      });

      // Connect to WebSocket
      const wsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${AGENT_ID}`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = async () => {
        console.log("WebSocket connected");
        setStatus("متصل - يمكنك التحدث الآن");

        // Start capturing microphone audio
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
              sampleRate: 16000,
              channelCount: 1
            }
          });
          
          mediaStreamRef.current = stream;
          
          // Create audio processing
          const source = audioContextRef.current.createMediaStreamSource(stream);
          const processor = audioContextRef.current.createScriptProcessor(2048, 1, 1);
          
          processor.onaudioprocess = (e) => {
            if (ws.readyState === WebSocket.OPEN) {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcm16 = convertFloat32ToPCM16(inputData);
              const base64Audio = arrayBufferToBase64(pcm16);
              
              ws.send(JSON.stringify({
                user_audio_chunk: base64Audio
              }));
            }
          };
          
          source.connect(processor);
          processor.connect(audioContextRef.current.destination);
        } catch (err) {
          console.error("Failed to capture audio:", err);
          setError("فشل في التقاط الصوت من الميكروفون");
        }
      };

      ws.onmessage = async (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log("Received message:", message);
          
          if (message.type === "audio") {
            // Queue audio for playback
            const audioData = message.audio_event?.audio_base_64 || message.audio;
            if (audioData) {
              audioQueueRef.current.push(audioData);
              playNextAudio();
            }
          } else if (message.type === "interruption") {
            // Clear audio queue on interruption
            audioQueueRef.current = [];
            isPlayingRef.current = false;
          } else if (message.type === "agent_response") {
            console.log("Agent response:", message.agent_response_event || message);
          } else if (message.type === "ping") {
            // Respond to ping with pong
            ws.send(JSON.stringify({ type: "pong", event_id: message.ping_event?.event_id }));
          }
        } catch (err) {
          console.error("Error processing message:", err);
        }
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
        setError("حدث خطأ في الاتصال");
        setStatus("خطأ في الاتصال");
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
        setStatus("تم قطع الاتصال");
        setIsCalling(false);
        cleanup();
      };

    } catch (err) {
      console.error("Failed to start call:", err);
      setError("فشل بدء المكالمة: " + err.message);
      setStatus("خطأ");
      setIsCalling(false);
      cleanup();
    }
  };

  const playNextAudio = async () => {
    if (isPlayingRef.current || audioQueueRef.current.length === 0) {
      return;
    }

    isPlayingRef.current = true;
    const base64Audio = audioQueueRef.current.shift();

    try {
      // Decode base64 to raw audio bytes
      const binaryString = atob(base64Audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // ElevenLabs sends PCM16 audio at 16kHz, mono
      // Convert PCM16 to Float32 for Web Audio API
      const pcm16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(pcm16.length);
      for (let i = 0; i < pcm16.length; i++) {
        float32[i] = pcm16[i] / (pcm16[i] < 0 ? 0x8000 : 0x7FFF);
      }

      // Create audio buffer manually
      const audioBuffer = audioContextRef.current.createBuffer(
        1, // mono
        float32.length,
        16000 // 16kHz sample rate
      );
      audioBuffer.getChannelData(0).set(float32);
      
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      
      source.onended = () => {
        isPlayingRef.current = false;
        playNextAudio();
      };
      
      source.start();
    } catch (err) {
      console.error("Error playing audio:", err);
      isPlayingRef.current = false;
      playNextAudio();
    }
  };

  const convertFloat32ToPCM16 = (float32Array) => {
    const pcm16 = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return pcm16.buffer;
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const cleanup = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    audioQueueRef.current = [];
    isPlayingRef.current = false;
  };

  const endCall = () => {
    setStatus("تم إنهاء المكالمة");
    setIsCalling(false);
    cleanup();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          مكالمة صوتية مع البوت
        </h1>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">الحالة:</p>
          <p className="text-lg font-semibold text-gray-800">{status}</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={startCall}
            disabled={!micAccess || isCalling}
            className={`py-3 px-6 rounded-lg font-semibold text-white transition-all ${
              !micAccess || isCalling
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 active:scale-95"
            }`}
          >
            {isCalling ? "متصل..." : "بدء المكالمة"}
          </button>

          <button
            onClick={endCall}
            disabled={!isCalling}
            className={`py-3 px-6 rounded-lg font-semibold text-white transition-all ${
              !isCalling
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 active:scale-95"
            }`}
          >
            إنهاء المكالمة
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            {micAccess
              ? "✓ الميكروفون جاهز"
              : "✗ يرجى السماح بالوصول للميكروفون"}
          </p>
        </div>

        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs text-green-800 text-center">
            🎙️ لا يتطلب مفتاح API - يعمل مباشرة!
          </p>
        </div>
      </div>
    </div>
  );
}