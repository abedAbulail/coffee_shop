import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Home() {
  const Catigories = [
    { Title: "Drinks",SubTitle:"Refreshing flavors to boost your day", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tazzina_di_caff%C3%A8_a_Ventimiglia.jpg/500px-Tazzina_di_caff%C3%A8_a_Ventimiglia.jpg" },
    { Title: "Sweets", SubTitle: "Delightful treats for every craving", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMWpdmjxsdPKf121ultCPE3fEFOp_cbXvY_Q&s" },
    { Title: "Meals", SubTitle: "Tasty dishes made with love", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5EQ5BhFq-Jryp78taygwUkEz-QxHjGVzabA&s" }
  ];

  const testimonials = [
    { name: "Alice M.", img: "https://randomuser.me/api/portraits/women/65.jpg", text: "Best coffee shop in town! Amazing atmosphere and friendly staff." },
    { name: "David K.", img: "https://randomuser.me/api/portraits/men/54.jpg", text: "I come here every morning. The espresso is perfection!" },
    { name: "Maria S.", img: "https://randomuser.me/api/portraits/women/28.jpg", text: "Love the cozy ambiance and delicious pastries. Highly recommend!" }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400",
    "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400"
  ];

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Montserrat:wght@300;400;500&display=swap');
        
        * {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .navbar-elegant {
          background: linear-gradient(135deg, #8B6F47 0%, #6B5335 100%);
          padding: 1rem 0;
          box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }
        
        .nav-link-elegant {
          color: #f5f5dc !important;
          font-size: 0.95rem;
          letter-spacing: 1px;
          text-decoration:none;
          text-transform: uppercase;
          font-family: 'Montserrat', sans-serif;
          font-weight: 400;
          margin: 0 0.5rem;
          transition: all 0.3s ease;
        }
        
        .nav-link-elegant:hover {
          color: #fff !important;
          transform: translateY(-2px);
        }

        .bg-coffee{
        background-image:url('./pexels-myfoodie-2568459.jpg');
        width:100%;
        height:400px;
        background-size: cover;
        border-radius: 20px;
        }
        
        .hero-elegant {
          background: linear-gradient(135deg, #8B6F47 0%, #6B5335 100%);
          min-height: 85vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        
        .hero-elegant::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><text x="10" y="50" font-size="60" opacity="0.03" fill="white">☕</text></svg>');
          opacity: 0.3;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
        }
        
        .hero-title {
          font-size: 4rem;
          font-weight: 300;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        
        .hero-subtitle {
          font-size: 1.2rem;
          color: #f5f5dc;
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          letter-spacing: 2px;
          margin-bottom: 2rem;
        }
        
        .btn-elegant {
          background: white;
          color: #6B5335;
          padding: 12px 40px;
          border-radius: 0;
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 0.9rem;
          border: 2px solid white;
          transition: all 0.3s ease;
        }
        
        .btn-elegant:hover {
          background: transparent;
          color: white;
          border-color: white;
        }
        
        .coffee-splash {
          max-width: 100%;
          height: auto;
          filter: drop-shadow(0 10px 30px rgba(0,0,0,0.3));
          border-radus: 10px;
        }
        
        .section-title {
          font-size: 2.5rem;
          font-weight: 300;
          color: #6B5335;
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .section-subtitle {
          font-size: 1rem;
          color: #8B6F47;
          text-transform: uppercase;
          letter-spacing: 3px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 400;
          margin-bottom: 3rem;
          text-align: center;
        }
        
        .team-card {
          background: #f8f8f8;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          border: none;
        }
        
        .team-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .team-img {
          width: 150px;
          height: 150px;
          object-fit: cover;
          margin-bottom: 1.5rem;
          border: 3px solid #8B6F47;
        }
        
        .team-name {
          font-size: 1.5rem;
          color: #6B5335;
          margin-bottom: 0.5rem;
        }
        
        .team-role {
          font-size: 0.9rem;
          color: #8B6F47;
          font-family: 'Montserrat', sans-serif;
        }
        
        .testimonial-card {
          background: white;
          padding: 2.5rem;
          border-left: 4px solid #8B6F47;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
          margin-bottom: 2rem;
        }
        
        .testimonial-text {
          font-size: 1.1rem;
          color: #555;
          font-style: italic;
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }
        
        .testimonial-author {
          display: flex;
          align-items: center;
          gap: .7rem;
        }
        
        .testimonial-img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .gallery-item {
          overflow: hidden;
          aspect-ratio: 1;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .gallery-item:hover {
          transform: scale(1.05);
        }
        
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s ease;
        }
        
        .gallery-item:hover img {
          transform: scale(1.1);
        }
        
        .feature-card {
          text-align: center;
          padding: 2rem;
        }
        
        .feature-icon {
          font-size: 3rem;
          color: #8B6F47;
          margin-bottom: 1.5rem;
        }
        
        .feature-title {
          font-size: 1.5rem;
          color: #6B5335;
          margin-bottom: 1rem;
        }
        
        .feature-text {
          font-size: 0.95rem;
          color: #666;
          font-family: 'Montserrat', sans-serif;
          line-height: 1.6;
        }
        
        .menu-section-elegant {
          background: linear-gradient(to bottom, #f8f5f0 0%, #fff 100%);
        }
        
        .footer-elegant {
          background: #3d2f24;
          color: #f5f5dc;
          padding: 3rem 0 1rem;
        }
        
        .footer-title {
          color: #8B6F47;
          font-size: 1.3rem;
          margin-bottom: 1rem;
        }
        
        .footer-link {
          color: #f5f5dc;
          text-decoration: none;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        
        .footer-link:hover {
          color: #8B6F47;
          padding-left: 5px;
        }
        
        .social-icon-elegant {
          width: 40px;
          height: 40px;
          border: 2px solid #8B6F47;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #8B6F47;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        
        .social-icon-elegant:hover {
          background: #8B6F47;
          color: white;
        }
        
        .book-table-btn {
          background: white;
          color: #6B5335;
          padding: 8px 25px;
          border-radius: 50px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          font-size: 0.85rem;
          border: none;
          transition: all 0.3s ease;
        }
        
        .book-table-btn:hover {
          background: #f5f5dc;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
      `}</style>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-elegant sticky-top">
        <div className="container">
          <a className="navbar-brand text-white d-flex align-items-center" href="#home">
            <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>Coffee Star</span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item"><a className="nav-link-elegant" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link-elegant" href="/order">Order</a></li>


              <li className="nav-item ms-3">
                <a style={{textDecoration:"none"}} href='/bot' className="book-table-btn">🛒 Make Order Now</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-elegant">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 hero-content">
              <h1 className="hero-title">Great Coffee For<br/>Some Joy</h1>
              <p className="hero-subtitle">FRESHLY BREWED PERFECTION</p>
              <p style={{ color: '#f5f5dc', fontSize: '1.1rem', marginBottom: '2rem', fontFamily: 'Montserrat, sans-serif', fontWeight: '300' }}>
                There are people who can't start their day without having a<br/>
                freshly brewed cup of coffee and we understand them.
              </p>
              <a style={{textDecoration:"none"}} href='/bot' className="btn-elegant">Order Coffee Now</a>
            </div>
            <div className=" col-lg-6 text-center">
                <div className='bg-coffee d-lg-block d-none'>

                </div>

            </div>
          </div>
        </div>
      </section>
      

      <section className="py-5" style={{ background: '#f8f5f0' }}>
        <div className="container">
          <p className="section-subtitle">Our Categoryes</p>
          <h2 className="section-title">Our Best Categoryes In Coffee Shop</h2>
          <div className="row mt-5">
            {Catigories.map((item, idx) => (
              <div key={idx} className="col-md-4 mb-4">
                <div className="team-card">
                  <img src={item.img} alt={item.Title} className="team-img rounded-circle" />
                  <h5 className="team-name">{item.Title}</h5>
                  <p className="team-role">{item.SubTitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-5 bg-white">
        <div className="container">
          <p className="section-subtitle">WHY CHOOSE US</p>
          <h2 className="section-title">Explore Our Coffee Shop</h2>
          <div className="row mt-5">
            {[
              { icon: './icons/coffee-cup.png', title: 'Brewed Coffee', text: 'You can order our coffee in the online store or find our store in your city.' },
              { icon: './icons/coffee-bean (1).png', title: 'Ground Coffee', text: 'You can order our coffee in the online store or find our store in your city.' },
              { icon: './icons/blender.png', title: 'Mexican Blender', text: 'You can order our coffee in the online store or find our store in your city.' },
              { icon: './icons/coffee-bean.png', title: 'Arabia Beans', text: 'You can order our coffee in the online store or find our store in your city.' }
            ].map((feature, idx) => (
              <div key={idx} className="col-md-3 mb-4">
                <div className="feature-card">
                  <div className="feature-icon"><img width={30} src={feature.icon} alt="" /></div>
                  <h5 className="feature-title">{feature.title}</h5>
                  <p className="feature-text">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5" style={{ background: '#f8f5f0' }}>
        <div className="container">
          <p className="section-subtitle">TESTIMONIAL</p>
          <h2 className="section-title">Our Satisfied Customer Says</h2>
          <div className="row mt-5">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="col-md-4 mb-4">
                <div className="testimonial-card">
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    {/* <img src="./blank-profile-picture-973460_640.webp" alt={testimonial.name} className="testimonial-img" /> */}
                    <div>
                      <h6 style={{ margin: 0, color: '#6B5335' }}>{testimonial.name}</h6>
                      <div style={{ color: '#8B6F47' }}>★★★★★</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Drink Promo Section */}
<section className="py-5" style={{ backgroundColor: '#d8d8b0' }}>
  <div className="container">
    <div className="row align-items-center">
      {/* Text */}
      <div className="col-lg-6 mb-4 mb-lg-0">
        <h3 style={{ color: '#2e4d2c', fontWeight: 600 }}>Free drink? Yes, please.</h3>
        <p style={{ fontSize: '1rem', color: '#2e4d2c' }}>
          Enjoy a <strong>free handcrafted drink</strong> when you make a qualifying purchase during your first week as a CoffeeStar® Rewards member.
        </p>
        <a href="/bot" className="btn btn-outline-dark mt-3" style={{ borderRadius: '50px', padding: '10px 30px' }}>Join & order</a>
      </div>
      {/* Image */}
      <div className="col-lg-6 text-center">
        <img
          src="./coldbrew-iced-latte-with-my-recipe-photo-by-@ellamiller_photo-f1e3d9e.jpg"
          alt="Iced Coffee Promo"
          className="img-fluid rounded"
          style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
        />
      </div>
    </div>
  </div>
</section>


      {/* Menu Section */}
      <section id="menu" className="menu-section-elegant py-5">
        <div className="container">
          <p className="section-subtitle">MENU</p>
          <h2 className="section-title">Our All Time Best Menu</h2>
          <div className="row mt-5">
            {[
              { name: 'Espresso', price: 12, img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93' },
              { name: 'Cappuccino', price: 14, img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d' },
              { name: 'Latte', price: 15, img: 'https://images.unsplash.com/photo-1498804103079-a6351b050096' },
              { name: 'Mocha', price: 16, img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7' },
             
                { name: 'Chocolate Cake', price: 18, img: 'https://static.toiimg.com/thumb/53096885.cms?imgsize=1572013&width=800&height=800' },
                { name: 'Cheesecake', price: 20, img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587' },

                { name: 'Grilled Chicken', price: 35, img: 'https://joyfullymad.com/wp-content/uploads/2023/08/grilled-chicken-salad-5.jpg' },
                { name: 'Pasta Alfredo', price: 30, img: 'https://www.modernhoney.com/wp-content/uploads/2018/08/Fettuccine-Alfredo-Recipe-1.jpg' }
                ].map((item, idx) => (
                            <div key={idx} className="col-md-6 mb-4">
                <div className="d-flex align-items-center bg-white p-3 shadow-sm" style={{ borderRadius: '8px' }}>
                  <img src={item.img} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div className="flex-grow-1 ms-3">
                    <h5 style={{ color: '#6B5335', marginBottom: '0.5rem' }}>{item.name}</h5>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: 0 }}>Fresh brewed coffee with rich flavor</p>
                  </div>
                  <h5 style={{ color: '#8B6F47', fontWeight: '600' }}>${item.price}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="footer-elegant">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h5 className="footer-title">Coffee Star</h5>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.9rem', lineHeight: '1.8' }}>
                Brewed with love, connecting people one cup at a time. Visit us for an unforgettable coffee experience.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <h5 className="footer-title">Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#home" className="footer-link">Home</a></li>
                <li className="mb-2"><a href="#menu" className="footer-link">Menu</a></li>
                {/* <li className="mb-2"><a href="#about" className="footer-link">About Us</a></li>
                <li className="mb-2"><a href="#contact" className="footer-link">Contact</a></li> */}
              </ul>
            </div>
            <div className="col-md-4 mb-4">
              <h5 className="footer-title">Follow Us</h5>
              <div className="d-flex gap-3 mt-3">
                <a href="#" className="social-icon-elegant">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="social-icon-elegant">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="social-icon-elegant">
                  <i className="bi bi-twitter"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="text-center border-top pt-3 mt-4" style={{ borderColor: '#6B5335 !important' }}>
            <small style={{ fontFamily: 'Montserrat, sans-serif' }}>© 2025 Coffee Star Abd Abulail— Crafted with Love and Passion</small>
          </div>
        </div>
      </footer>
    </div>
  );
}