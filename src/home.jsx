import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export default function Home() {






  // ✅ Hooks must be here (inside App)
 
  const categories = ["Espresso", "Latte", "Cappuccino", "Mocha", "Americano"];

  return (




    <div className="App">

      {/* Navbar */}

<header
  id="home"
  className="hero d-flex align-items-center position-relative"
>
  <div className="container">
    <div className="row align-items-center">
      {/* Left Cards Section */}
      <div className="col-md-6 mb-4 mb-md-0">
        <div className="row g-3">
          {[
            { name: "Espresso", img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93' },
            { name: "Cappuccino", img: 'https://images.unsplash.com/photo-1498804103079-a6351b050096' },
            { name: "Latte", img: 'https://www.allrecipes.com/thmb/chsZz0jqIHWYz39ViZR-9k_BkkE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8624835-how-to-make-a-cappuccino-beauty-4x3-0301-13d55eaad60b42058f24369c292d4ccb.jpg' },
            { name: "Mocha", img: 'https://cdn.shopify.com/s/files/1/0617/1538/2531/files/Espresso-Macchiato-Kaffeeheimat-Hamburger-Kaffeeroesterei_1024x1024.jpg?v=1689565236'},
          ].map((coffee, index) => (
          <div key={index} className="col-6">
              <div
                className="card border-0 shadow-sm text-center rounded-4"
                style={{
                  backgroundColor: "#fff",
                  transition: "0.3s",
                }}
              >
                <img
                  src={coffee.img}
                  alt={coffee.name}
                  className="card-img-top rounded-top-4"
                  style={{
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body p-2">
                  <h6
                    className="fw-semibold mb-0"
                    style={{ color: "#3e2723" }}
                  >
                    {coffee.name}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Text Section */}
      <div className="col-md-6 text-center text-md-start text-white">
        <h2 className="fw-bold mb-3 fade-in shadow-text font">
          Brewed Fresh, Served with Love
        </h2>

        <p className="lead mb-4 fade-in-delay shadow-text">
          Experience the aroma, taste, and comfort in every sip of our handcrafted coffee.
        </p>

        <button className="btn btn-gradient btn-lg shadow-sm mb-4">
          Explore Our Menu
        </button>

        {/* Coffee Categories */}
        <div className="d-flex justify-content-center justify-content-md-start flex-wrap gap-3 mt-3">
          {["Espresso", "Latte", "Cappuccino", "Mocha", "Americano"].map(
            (cat, idx) => (
              <div
                key={idx}
                className="category-card px-3 py-2 shadow-sm bg-white rounded"
              >
                <p className="mb-0 fw-semibold text-dark">{cat}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  </div>
</header>

      {/* About Section */}
    <section id="about" className="about-section py-5 bg-light text-dark">
  <div className="container fade-in">
    <div className="row align-items-center">
      {/* Left Image */}
      <div className="col-md-6 mb-4 mb-md-0 text-start ">
        <img
          src="./pexels-italo-melo-881954-2379004-removebg-preview_Nero_AI_Image_Upscaler_Photo_Face.png"
          alt="Barista smiling"
          className="img-fluid rounded-4 shadow bg-coffee"
          style={{ maxHeight: "400px",width:"100%", objectFit: "cover" }}
        />
      </div>

      {/* Right Text */}
      <div className="col-md-6 text-center text-md-start">
        <h2 className="fw-bold mb-3 display-6 text-brown">About Us</h2>
        <p className="lead text-muted">
          Welcome to <strong className="text-brown">Coffee Haven</strong> — where passion meets perfection in every cup.
          We believe coffee is more than a drink; it’s an experience that connects people.
          Our beans are ethically sourced and freshly roasted to highlight their unique flavor,
          ensuring every sip is rich, smooth, and memorable.
        </p>
        <p className="lead text-muted mb-4">
          Whether you’re here to work, unwind, or share laughter with friends,
          <strong className="text-brown"> Coffee Haven</strong> is your home away from home.
        </p>
        <button className="btn btn-dark btn-lg rounded-pill shadow-sm">
          Learn More
        </button>
      </div>
    </div>
  </div>
</section>


<section id="menu" className="menu-section py-5 bg-dark text-light">
  <div className="container">
    <h2 className="fw-bold mb-5 text-center display-6">Our Menu</h2>

    {[
      {
        title: "Hot Coffee",
        items: [
          { title: "Espresso", price: 12, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93", desc: "Rich and intense — the pure essence of coffee.", tag: "Popular" },
          { title: "Cappuccino", price: 14, img: "https://www.allrecipes.com/thmb/chsZz0jqIHWYz39ViZR-9k_BkkE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8624835-how-to-make-a-cappuccino-beauty-4x3-0301-13d55eaad60b42058f24369c292d4ccb.jpg", desc: "A timeless favorite topped with velvety foam.", tag: "Classic" },
          { title: "Latte", price: 15, img: "https://images.unsplash.com/photo-1498804103079-a6351b050096", desc: "Creamy, smooth, and perfectly balanced.", tag: "New" },
        ],
      },
      {
        title: "Iced & Cold Coffee",
        items: [
          { title: "Iced Latte", price: 16, img: "https://www.livveganstrong.com/wp-content/uploads/2024/01/cinnamon-dolce-latte-fp.jpg", desc: "Chilled espresso with milk and ice.", tag: "Refreshing" },
          { title: "Cold Brew", price: 17, img: "https://images.unsplash.com/photo-1511920170033-f8396924c348", desc: "Slow-steeped for smoothness and sweetness.", tag: "Bestseller" },
          { title: "Iced Mocha", price: 18, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93", desc: "A cool blend of coffee and chocolate.", tag: "Choco Lovers" },
        ],
      },
      {
        title: "Desserts",
        items: [
          { title: "Cheesecake", price: 20, img: "https://www.jocooks.com/wp-content/uploads/2018/11/cheesecake-1-22.jpg", desc: "Creamy classic cheesecake with a buttery crust.", tag: "Sweet Treat" },
          { title: "Chocolate Muffin", price: 10, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587", desc: "Rich chocolate muffin baked fresh daily.", tag: "Favorite" },
        ],
      },
    ].map((category, i) => (
      <div key={i} className="menu-category mb-5">
        <h4 className="fw-bold mb-4">{category.title}</h4>

        {category.items.map((item, j) => (
          <div
            key={j}
            className="menu-item d-flex align-items-center bg-light text-dark rounded-4 shadow-sm mb-3 p-3"
            style={{ transition: "transform 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={item.img}
              alt={item.title}
              className="rounded-3 me-3"
              style={{ width: "130px", height: "100px", objectFit: "cover" }}
            />
            <div className="flex-grow-1 text-start">
              <h6 className="fw-bold mb-1">{item.title}</h6>
              <p className="small text-muted mb-2">{item.desc}</p>
              <span className="badge bg-secondary text-light px-3 py-1">{item.tag}</span>
            </div>
            <div className="text-end ms-3">
              <h6 className="fw-bold">${item.price}</h6>
            </div>
          </div>
        ))}
      </div>
    ))}

       <div className='text-center'>
        <a className='btn btn-coffee ' href="/bot">Order</a>
    </div>

  </div>

 

</section>




<section id="testimonials" className="testimonials-section">
  <div className="container">
    <h2 className="fw-bold mb-5 text-center  text-brown ">What Our Customers Say</h2>

    <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">

        {/* Testimonial 1 */}
        <div className="carousel-item active">
          <div className="testimonial-card">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Customer"
            />
            <div className="text-content">
              <p>"Absolutely love Coffee Haven!"</p>
              <div className="stars">
                {[...Array(5)].map((_, i) => <i key={i} className="bi bi-star-fill"></i>)}
              </div>
              <h6>Sarah J.</h6>
              <small>New York, USA</small>
            </div>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="carousel-item">
          <div className="testimonial-card">
            <img
              src="https://randomuser.me/api/portraits/men/36.jpg"
              alt="Customer"
            />
            <div className="text-content">
              <p>"Great coffee, friendly staff, and a perfect place to relax and work."</p>
              <div className="stars">
                {[...Array(4)].map((_, i) => <i key={i} className="bi bi-star-fill"></i>)}
                <i className="bi bi-star"></i>
              </div>
              <h6>Michael K.</h6>
              <small>London, UK</small>
            </div>
          </div>
        </div>

        {/* Testimonial 3 */}
        <div className="carousel-item">
          <div className="testimonial-card">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="Customer"
            />
            <div className="text-content">
              <p>"The best iced latte I’ve ever had! Cozy vibes and perfect service."</p>
              <div className="stars">
                {[...Array(5)].map((_, i) => <i key={i} className="bi bi-star-fill"></i>)}
              </div>
              <h6>Emma L.</h6>
              <small>Paris, France</small>
            </div>
          </div>
        </div>

      </div>

      {/* Carousel Controls */}
      {/* <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button> */}

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

