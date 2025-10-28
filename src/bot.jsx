import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Bot() {
  useEffect(() => {
    let sessionId = localStorage.getItem("session_id");

    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 10);
      localStorage.setItem("session_id", sessionId);
      console.log("Generated new session ID:", sessionId);
    } else {
      console.log("Existing session ID:", sessionId);
    }
  }, []);

  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 مرحباً! أنا مساعد القهوة. كيف ممكن أساعدك اليوم؟" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const webhookUrl = "https://zuccess.app.n8n.cloud/webhook/3a942a4f-1bb5-41a9-94b3-efa2670d2f4d";
    const session_id = localStorage.getItem("session_id");

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

    setInput("");
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
        
        /* Scrollbar styling */
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
      `}</style>

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8f5f0' }}>
        {/* Navbar */}
        <nav className="navbar navbar-elegant">
          <div className="container">
            <a className="navbar-brand text-white d-flex align-items-center" href="/">
              {/* <span style={{ fontSize: '2rem', marginRight: '10px' }}>☕</span> */}
              <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>Coffee Star</span>
            </a>
            <div>
              <span style={{ color: '#f5f5dc', fontFamily: 'Montserrat, sans-serif' }}>
                AI Assistant
              </span>
            </div>
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
              {/* Chat Header */}
              <div className="chat-header">
                <h2 className="chat-header-title">
                  <span>مساعد القهوة الذكي</span>
                </h2>
              </div>

              {/* Messages Area */}
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

              {/* Input Area */}
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
      </div>
    </>
  );
}