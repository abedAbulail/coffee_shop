import { useState,useEffect } from "react";

export default function Bot(){


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
  const [data, setData] = useState()

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
      data: data.output.data?.length > 0 ? data.output.data : null, // save data if exists
    };

    // append bot reply to messages
    setMessages((prev) => [...prev, botReply]);

  } catch (err) {
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "حدث خطأ أثناء الاتصال بالخادم ☕" },
    ]);
  }

  setInput("");
};



      return(
        
 <section
  id="chatbot"
  className="min-h-screen flex flex-col items-center justify-center py-10 px-4"
  style={{
    background: "radial-gradient(circle at top left, #8d6e63 0%, #3e2723 80%)"
    ,
    height:"100vh"
  }}
>
  <div
    className="chat-box shadow-lg d-flex flex-column justify-content-between"
    style={{
      backgroundColor: "#fff",
      borderRadius: "20px",
      width: "100%",
      height: "100vh",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      className="chat-output flex-grow-1 overflow-auto mb-3 d-flex flex-column"
      style={{ textAlign: "left", paddingRight: "10px" }}
    >
{messages.map((msg, i) => (
  <div key={i} className={`d-flex mb-2 ${msg.sender === "bot" ? "justify-content-start" : "justify-content-end"}`}>
    <div
      style={{
        backgroundColor: msg.sender === "bot" ? "#f2f2f2" : "#8d6e63",
        color: msg.sender === "bot" ? "#000" : "#fff",
        borderRadius: msg.sender === "bot" ? "18px 18px 18px 0" : "18px 18px 0 18px",
        padding: "10px 14px",
        maxWidth: "75%",
        wordWrap: "break-word",
      }}
    >
      {msg.text}

      {/* render data if exists */}
      {msg.data && (
        <div className="container mt-2">
          <div className="row g-3">
            {msg.data.map((item, index) => (
              <div key={index} className="col">
                <div className="card  shadow-sm border-0 rounded-4 overflow-hidden h-100">
                  <img
                    src={item.product_image}
                    className="card-img-top"
                    alt={`Product ${index}`}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body bg-white text-dark">
                    <p className="fw-bold mb-2">{item.product_info}</p>
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

    <div className="chat-input-area d-flex border-top pt-2">
      <input
        type="text"
        
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="اكتب رسالتك..."
        className="form-control"
       
        style={{
          borderRadius: "20px 0 0 20px",
          border: "1px solid #ccc",
          padding: "10px 15px",
        }}
      />
      <button
        className="send-btn"
        onClick={sendMessage}
        style={{
          backgroundColor: "#8d6e63",
          color: "white",
          border: "none",
          borderRadius: "0 20px 20px 0",
          padding: "10px 20px",
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#3e2723")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#8d6e63")}
      >
        إرسال
      </button>
    </div>
  </div>
</section> 
      )
}