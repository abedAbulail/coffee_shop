import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from "react";

function App() {
  // ✅ useEffect inside the component
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

  // ✅ Hooks must be here (inside App)
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 مرحباً! أنا مساعد القهوة. كيف ممكن أساعدك اليوم؟" },
  ]);
  const [input, setInput] = useState("");
  const [data, setData] = useState()

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const webhookUrl = "https://zuccess.app.n8n.cloud/webhook-test/3a942a4f-1bb5-41a9-94b3-efa2670d2f4d";

    const session_id = localStorage.getItem("session_id")
    console.log(session_id)
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, id:session_id }),
      });

      const data = await res.json();
      setData(data)
      
      const botReply = data.output.general_response || "لم أفهم سؤالك 😅";
      
      const botMsg = { sender: "bot", text: botReply };
      
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "حدث خطأ أثناء الاتصال بالخادم ☕" },
      ]);
    }

    setInput("");
  };


  return (




    <div className="App">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm custom-navbar">
        <div className="container">
          <a className="navbar-brand fs-3 fw-bold" href="#">Coffee</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link active" href="#home">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#menu">Menu</a></li>
              <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
<header id="home" className="hero d-flex align-items-center position-relative" style={{ minHeight: '85vh' }}>
  <div className="container">
    <div className="row align-items-center">
      {/* Left Image */}
      <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
        <img
         
          src="./pexels-italo-melo-881954-2379004-removebg-preview_Nero_AI_Image_Upscaler_Photo_Face.png"
          alt="Flying Coffee Cup"
          className="img-fluid d-md-block d-none"
          style={{ maxHeight: '100%' }}
        />
      </div>

      {/* Right Text */}
      <div className="col-md-6 text-center text-md-start text-white">
        <h2 className="font fw-bold mb-3 fade-in shadow-text">
          Brewed Fresh, Served with Love
        </h2>
        <p className="lead mb-4 fade-in-delay shadow-text">
          Experience the aroma, taste, and comfort in every sip of our handcrafted coffee.
        </p>
        <button className="btn btn-gradient btn-lg shadow-sm mb-4">
          Explore Our Menu
        </button>

        {/* Categories inside Hero */}
        <div className="d-flex justify-content-center justify-content-md-start flex-wrap gap-3 mt-3">
          {['Espresso', 'Latte', 'Cappuccino', 'Mocha', 'Americano'].map((cat, idx) => (
            <div key={idx} className="category-card px-3 py-2 shadow-sm bg-white rounded">
              <p className="mb-0 fw-semibold text-dark">{cat}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Optional: Wavy SVG Shape at bottom */}
  {/* <div className="custom-shape-divider-bottom">...</div> */}
</header>


      {/* About Section */}
      <section id="about" className="about-section text-center text-dark py-5">
        <div className="container fade-in">
          <h2 className="fw-bold mb-4 text-brown display-5">About Us</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '720px' }}>
            Welcome to <strong className="text-brown">Coffee Haven</strong> — where passion meets perfection in every cup.  
            We believe coffee is more than a drink; it’s an experience that connects people.  
            Our beans are ethically sourced and freshly roasted to highlight their unique flavor, ensuring every sip is rich, smooth, and memorable.  
            Whether you’re here to work, unwind, or share laughter with friends, <strong className="text-brown">Coffee Haven</strong> is your home away from home.
          </p>
        </div>
      </section>

      {/* Menu Section */}
   <section id="menu" className="menu-section py-5 text-center text-dark position-relative">
  <div className="container">
    <h2 className="fw-bold mb-5 display-5 text-light text-coffee">Our Menu</h2>
    <div className="row g-4">
      {[
        { title: 'Espresso', price: 12, img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', desc: 'Rich and intense — the pure essence of coffee.', tag: 'Popular' },
        { title: 'Latte', price: 15, img: 'https://images.unsplash.com/photo-1498804103079-a6351b050096', desc: 'Creamy, smooth, and perfectly balanced.', tag: 'New' },
        { title: 'Cappuccino', price: 14, img: 'https://www.allrecipes.com/thmb/chsZz0jqIHWYz39ViZR-9k_BkkE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8624835-how-to-make-a-cappuccino-beauty-4x3-0301-13d55eaad60b42058f24369c292d4ccb.jpg', desc: 'A timeless favorite topped with velvety foam.', tag: 'Classic' },
        { title: 'Mocha', price: 18, img: 'data:image/jpeg;base64,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', desc: 'Chocolate-infused delight with a coffee kick.', tag: 'Sweet' },
        { title: 'Americano', price: 11, img: 'data:image/jpeg;base64,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', desc: 'Smooth, classic, and invigorating.', tag: 'Simple' },
        { title: 'Macchiato', price: 13, img: 'https://cdn.shopify.com/s/files/1/0617/1538/2531/files/Espresso-Macchiato-Kaffeeheimat-Hamburger-Kaffeeroesterei_1024x1024.jpg?v=1689565236', desc: 'Bold espresso with a hint of milk foam.', tag: 'Bold' },
      ].map((item, idx) => (
        <div className="col-md-4" key={idx}>
          <div className="card coffee-card border-0 shadow-lg h-100 hover-scale position-relative">
            {/* Tag Badge */}
            <span className="position-absolute top-0 start-0 bg-coffee text-white px-3 py-1 rounded-end fw-bold">{item.tag}</span>
            
            {/* Image */}
            <img src={item.img} className="card-img-top" alt={item.title} />
            
            {/* Card Body */}
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title fw-bold">{item.title}</h5>
                <span className="fw-bold text-coffee">{item.price} ₪</span>
              </div>
              <p className="card-text text-muted">{item.desc}</p>
              <button className="btn btn-gradient btn-sm shadow-sm">Order Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
<section
  id="chatbot"
  className="min-h-screen flex flex-col items-center justify-center py-10 px-4"
  style={{
    background: "radial-gradient(circle at top left, #8d6e63 0%, #3e2723 80%)",
  }}
>
  <div
    className="chat-box shadow-lg d-flex flex-column justify-content-between"
    style={{
      backgroundColor: "#fff",
      borderRadius: "20px",
      width: "100%",
      height: "500px",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Chat Output */}
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
    </div>
  </div>
))}

{/* المنتجات تظهر مرة واحدة */}
{data?.output?.data?.length > 0 && (
  <div className="container mt-3">
    <div className="row g-3">
      {data.output.data.map((item, index) => (
        <div key={index} className="col-6 col-md-4 col-lg-3">
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden h-100">
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

    {/* Chat Input */}
    <div className="chat-input-area d-flex border-top pt-2">
      <input
        type="text"
        value={input}
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

   
      <section id='contact' className="map-section position-relative">
        <div className="map-overlay d-flex align-items-center justify-content-center">
          <div>
          <h2 className="fw-bold text-light mb-4">Visit Us</h2>

             <p className="lead text-light fw-bold mb-4">
            123 Coffee Street, Bean City | Open daily 7am - 10pm
          </p>
          </div>
        </div>
        <iframe
          title="Coffee Haven Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3378.953050625241!2d35.25414917558507!3d32.22111331123177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151cfbdf25e7906f%3A0x3e5f5b0194e826ed!2sNablus!5e0!3m2!1sen!2s!4v1730037654321!5m2!1sen!2s"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      {/* Footer */}
      <footer className="footer bg-dark text-white pt-5 pb-3">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-4 mb-3 mb-md-0">
              <h5 className="fw-bold text-brown">Coffee Haven</h5>
              <p className="small">
                Brewed with love, connecting people one cup at a time. Visit us for an unforgettable coffee experience.
              </p>
            </div>

            <div className="col-md-4 mb-3 mb-md-0">
              <h5 className="fw-bold text-brown">Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#home" className="footer-link">Home</a></li>
                <li><a href="#menu" className="footer-link">Menu</a></li>
                <li><a href="#about" className="footer-link">About Us</a></li>
                <li><a href="#contact" className="footer-link">Contact</a></li>
              </ul>
            </div>

            <div className="col-md-4">
              <h5 className="fw-bold text-brown">Follow Us</h5>
              <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-2">
                <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
                <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
                <a href="#" className="social-icon"><i className="bi bi-twitter"></i></a>
              </div>
            </div>
          </div>

          <div className="text-center border-top pt-3 mt-3">
            <small>© 2025 Coffee Haven — Crafted with Love and Passion</small>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
