import { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const AGENT_ID = "agent_3701k8qkxwzzfd0vsvhe5et127qa";

export default function Bot() {
  // Chat state
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 مرحباً! أنا مساعد القهوة. كيف ممكن أساعدك اليوم؟" },
  ]);
  const [input, setInput] = useState("");
  
  // Call modal state
  const [showCallModal, setShowCallModal] = useState(false);
  const [micAccess, setMicAccess] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState("Ready");
  const [callError, setCallError] = useState(null);
  
  // Call refs
  const wsRef = useRef(null);
  const audioContextRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioQueueRef = useRef([]);
  const isPlayingRef = useRef(false);
  const currentSourceRef = useRef(null);

  // Initialize session ID without localStorage
  useEffect(() => {
    const sessionId = Math.random().toString(36).substring(2, 10);
    console.log("Session ID:", sessionId);
  }, []);

  // Request microphone access
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setMicAccess(true);
      })
      .catch((err) => {
        setMicAccess(false);
        console.error("Microphone access denied:", err);
      });

    return () => {
      cleanup();
    };
  }, []);

  // Chat functions
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setInput("");
    setMessages((prev) => [...prev, userMsg]);

    const webhookUrl = "https://zuccess.app.n8n.cloud/webhook/3a942a4f-1bb5-41a9-94b3-efa2670d2f4d";
    const session_id = Math.random().toString(36).substring(2, 10);

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, id: session_id }),
      });

      const data = await res.json();

      const botReply = {
        sender: "bot",
        text: data.output.general_response || "لم أفهم سؤالك 😅",
        data: data.output.data?.length > 0 ? data.output.data : null,
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "حدث خطأ أثناء الاتصال بالخادم ☕" },
      ]);
    }
  };

  // Call functions
  const startCall = async () => {
    if (!micAccess) {
      alert("يرجى السماح بالوصول للميكروفون");
      return;
    }

    setCallError(null);
    setCallStatus("Calling...");
    setIsCalling(true);

    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 16000
      });

      const wsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${AGENT_ID}`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = async () => {
        console.log("WebSocket connected");
        setCallStatus("Connected");

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
          setCallError("Mic Failed");
        }
      };

      ws.onmessage = async (event) => {
        try {
          const message = JSON.parse(event.data);
          
          if (message.type === "audio") {
            const audioData = message.audio_event?.audio_base_64 || message.audio;
            if (audioData) {
              audioQueueRef.current.push(audioData);
              // Only start playing if nothing is currently playing
              if (!isPlayingRef.current) {
                playNextAudio();
              }
            }
          } else if (message.type === "interruption") {
            // Stop current audio and clear queue
            stopCurrentAudio();
            audioQueueRef.current = [];
            isPlayingRef.current = false;
          } else if (message.type === "ping") {
            ws.send(JSON.stringify({ type: "pong", event_id: message.ping_event?.event_id }));
          }
        } catch (err) {
          console.error("Error processing message:", err);
        }
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
        setCallError("حدث خطأ في الاتصال");
        setCallStatus("خطأ في الاتصال");
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
        setCallStatus("تم قطع الاتصال");
        setIsCalling(false);
        cleanup();
      };

    } catch (err) {
      console.error("Failed to start call:", err);
      setCallError("فشل بدء المكالمة: " + err.message);
      setCallStatus("خطأ");
      setIsCalling(false);
      cleanup();
    }
  };

  const stopCurrentAudio = () => {
    if (currentSourceRef.current) {
      try {
        currentSourceRef.current.stop();
        currentSourceRef.current.disconnect();
      } catch (err) {
        // Audio already stopped
      }
      currentSourceRef.current = null;
    }
  };

  const playNextAudio = async () => {
    // Don't start if already playing or queue is empty
    if (isPlayingRef.current || audioQueueRef.current.length === 0) {
      return;
    }

    isPlayingRef.current = true;
    const base64Audio = audioQueueRef.current.shift();

    try {
      const binaryString = atob(base64Audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const pcm16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(pcm16.length);
      for (let i = 0; i < pcm16.length; i++) {
        float32[i] = pcm16[i] / (pcm16[i] < 0 ? 0x8000 : 0x7FFF);
      }

      const audioBuffer = audioContextRef.current.createBuffer(1, float32.length, 16000);
      audioBuffer.getChannelData(0).set(float32);
      
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      
      // Store reference to current playing source
      currentSourceRef.current = source;
      
      source.onended = () => {
        currentSourceRef.current = null;
        isPlayingRef.current = false;
        // Play next audio chunk if available
        if (audioQueueRef.current.length > 0) {
          playNextAudio();
        }
      };
      
      source.start();
    } catch (err) {
      console.error("Error playing audio:", err);
      currentSourceRef.current = null;
      isPlayingRef.current = false;
      // Try next audio on error
      if (audioQueueRef.current.length > 0) {
        playNextAudio();
      }
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
    stopCurrentAudio();
    
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
    setCallStatus("تم إنهاء المكالمة");
    setIsCalling(false);
    cleanup();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Montserrat:wght@300;400;500;600&family=Cairo:wght@300;400;600;700&display=swap');
        
        body {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .navbar-elegant {
          background: linear-gradient(135deg, #8B6F47 0%, #6B5335 100%);
          padding: 1rem 0;
          box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }
        
        .call-button {
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid white;
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: 25px;
          font-family: 'Cairo', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .call-button:hover {
          background: white;
          color: #8B6F47;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .modal-content {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          max-width: 450px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: transparent;
          border: none;
          font-size: 1.5rem;
          color: #666;
          cursor: pointer;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s;
        }
        
        .modal-close:hover {
          background: #f0f0f0;
          color: #333;
        }
        
        .chat-hero {
          background: linear-gradient(135deg, #8B6F47 0%, #6B5335 100%);
          padding: 3rem 0 2rem;
          position: relative;
          overflow: hidden;
        }
        
        .chat-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><text x="10" y="50" font-size="60" opacity="0.03" fill="white">☕</text></svg>');
          opacity: 0.3;
        }
        
        .chat-title {
          font-size: 2.5rem;
          font-weight: 300;
          color: #fff;
          margin-bottom: 0.5rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
          position: relative;
          z-index: 2;
        }
        
        .chat-subtitle {
          font-size: 1rem;
          color: #f5f5dc;
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          letter-spacing: 2px;
          text-transform: uppercase;
          position: relative;
          z-index: 2;
        }
        
        .chat-section {
          background: #f8f5f0;
          min-height: calc(100vh - 200px);
          padding: 2rem 0;
        }
        
        .chat-container {
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          overflow: hidden;
          max-width: 900px;
          margin: 0 auto;
          height: 70vh;
          display: flex;
          flex-direction: column;
        }
        
        .chat-header {
          background: linear-gradient(135deg, #8B6F47 0%, #6B5335 100%);
          padding: 1.5rem;
          color: white;
          text-align: center;
        }
        
        .chat-header-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
          background: #fafafa;
        }
        
        .message-wrapper {
          display: flex;
          margin-bottom: 1.5rem;
          animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .message-bot {
          justify-content: flex-start;
        }
        
        .message-user {
          justify-content: flex-end;
        }
        
        .message-bubble {
          max-width: 70%;
          padding: 1rem 1.25rem;
          border-radius: 18px;
          font-family: 'Cairo', sans-serif;
          font-size: 1rem;
          line-height: 1.6;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        
        .message-bubble-bot {
          background: white;
          color: #333;
          border-bottom-left-radius: 4px;
          border: 1px solid #e0e0e0;
        }
        
        .message-bubble-user {
          background: linear-gradient(135deg, #8B6F47 0%, #6B5335 100%);
          color: white;
          border-bottom-right-radius: 4px;
        }
        
        .product-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          height: 100%;
        }
        
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
        
        .product-image {
          height: 160px;
          object-fit: cover;
          width: 100%;
        }
        
        .product-info {
          padding: 1rem;
          font-family: 'Cairo', sans-serif;
          font-size: 0.95rem;
          color: #6B5335;
          font-weight: 600;
        }
        
        .chat-input-area {
          background: white;
          padding: 1.5rem;
          border-top: 2px solid #f0f0f0;
        }
        
        .chat-input {
          border: 2px solid #e0e0e0;
          border-radius: 25px;
          padding: 0.75rem 1.5rem;
          font-family: 'Cairo', sans-serif;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .chat-input:focus {
          border-color: #8B6F47;
          box-shadow: 0 0 0 3px rgba(139, 111, 71, 0.1);
          outline: none;
        }
        
        .send-button {
          background: linear-gradient(135deg, #8B6F47 0%, #6B5335 100%);
          color: white;
          border: none;
          border-radius: 25px;
          padding: 0.75rem 2rem;
          font-family: 'Cairo', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .send-button:hover {
          background: linear-gradient(135deg, #6B5335 0%, #8B6F47 100%);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(107, 83, 53, 0.3);
        }
        
        .send-button:active {
          transform: translateY(0);
        }
        
        .chat-messages::-webkit-scrollbar {
          width: 8px;
        }
        
        .chat-messages::-webkit-scrollbar-track {
          background: #f0f0f0;
        }
        
        .chat-messages::-webkit-scrollbar-thumb {
          background: #8B6F47;
          border-radius: 4px;
        }
        
        .chat-messages::-webkit-scrollbar-thumb:hover {
          background: #6B5335;
        }
        
        .btn-primary-modal {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-family: 'Cairo', sans-serif;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }
        
        .btn-primary-modal:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
        }
        
        .btn-primary-modal:disabled {
          background: #d1d5db;
          cursor: not-allowed;
        }
        
        .btn-danger-modal {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-family: 'Cairo', sans-serif;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }
        
        .btn-danger-modal:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
        }
        
        .btn-danger-modal:disabled {
          background: #d1d5db;
          cursor: not-allowed;
        }
      `}</style>

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8f5f0' }}>
        {/* Navbar with Call Button */}
        <nav className="navbar navbar-elegant">
          <div className="container">
            <a className="navbar-brand text-white d-flex align-items-center" href="/">
              <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>Coffee Star</span>
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="chat-hero">
          <div className="container text-center">
            <h1 className="chat-title">Coffee Assistant</h1>
            <p className="chat-subtitle">Ask me anything about our menu</p>
          </div>
        </section>

        {/* Chat Section */}
        <section className="chat-section flex-grow-1">
          <div className="container">
            <div className="chat-container">
              <div className="chat-header">
                <h2 className="chat-header-title d-flex justify-content-between">
                  <div>
                    <span>مساعد القهوة الذكي</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <button 
                      className="call-button"
                      onClick={() => setShowCallModal(true)}
                    >
                      <span>CALL</span>
                    </button>
                  </div>
                </h2>
              </div>

              <div className="chat-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`message-wrapper ${msg.sender === "bot" ? "message-bot" : "message-user"}`}>
                    <div className={`message-bubble ${msg.sender === "bot" ? "message-bubble-bot" : "message-bubble-user"}`}>
                      {msg.text}

                      {msg.data && (
                        <div className="mt-3">
                          <div className="row g-3">
                            {msg.data.map((item, index) => (
                              <div key={index} className="col-12 col-md-6">
                                <div className="product-card">
                                  <img
                                    src={item.product_image}
                                    className="product-image"
                                    alt={`Product ${index}`}
                                  />
                                  <div className="product-info">
                                    {item.product_info}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="chat-input-area">
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="اكتب رسالتك هنا..."
                    className="chat-input flex-grow-1"
                  />
                  <button
                    className="send-button"
                    onClick={sendMessage}
                  >
                    إرسال
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call Modal */}
        {showCallModal && (
          <div className="modal-overlay" onClick={() => !isCalling && setShowCallModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
              {!isCalling && (
                <button 
                  className="modal-close"
                  onClick={() => setShowCallModal(false)}
                >
                  ×
                </button>
              )}
              
              <h2 style={{ 
                fontFamily: 'Cairo, sans-serif', 
                fontSize: '1.75rem', 
                fontWeight: '700',
                color: '#333',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                Voice Calling With Bot
              </h2>

              <div style={{
                background: '#f9fafb',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1.5rem'
              }}>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#6b7280',
                  marginBottom: '0.5rem',
                  fontFamily: 'Cairo, sans-serif'
                }}>
                  Status
                </p>
                <p style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: 0,
                  fontFamily: 'Cairo, sans-serif'
                }}>
                  {callStatus}
                </p>
              </div>

              {callError && (
                <div style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  padding: '1rem',
                  borderRadius: '10px',
                  marginBottom: '1rem'
                }}>
                  <p style={{ 
                    color: '#dc2626',
                    fontSize: '0.875rem',
                    margin: 0,
                    fontFamily: 'Cairo, sans-serif'
                  }}>
                    {callError}
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={startCall}
                  disabled={!micAccess || isCalling}
                  className="btn btn-dark p-3"
                  style={{backgroundColor:"#6B5335"}}
                >
                  {isCalling ? "Connected..." : "Start Calling"}
                </button>

                <button
                  onClick={endCall}
                  disabled={!isCalling}
                  className="btn-danger-modal"
                >
                  End The Call
                </button>
              </div>

              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: '#eff6ff',
                borderRadius: '10px'
              }}>
                <p style={{ 
                  fontSize: '0.75rem',
                  color: '#1e40af',
                  textAlign: 'center',
                  margin: 0,
                  fontFamily: 'Cairo, sans-serif'
                }}>
                  {micAccess
                    ? "✓ Mic Is Ready"
                    : "✗ Please Allow Mic Access"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}