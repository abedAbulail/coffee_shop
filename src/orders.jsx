import { createClient } from "@supabase/supabase-js";
import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Order() {
  const supabase = createClient(
    "https://svrgtdigntwgepklbyav.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2cmd0ZGlnbnR3Z2Vwa2xieWF2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTYzODgwNywiZXhwIjoyMDc3MjE0ODA3fQ.qS4tgxAW4a23cZ-haHMI7iVNiexprSp4eN-zcuNLE5Q"
  );

  const [orders, setOrders] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchData();

    // Real-time subscription
    const orderChannel = supabase
      .channel("public:Order")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Order" },
        (payload) => {
          setOrders((prev) => [payload.new, ...prev]);
        }
      ).on(
  "postgres_changes",
        { event: "UPDATA", schema: "public", table: "Order" },
        (payload) => {
          setOrders((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();
      

    return () => {
      supabase.removeChannel(orderChannel);
    };
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("Order")
      .select("*")
      .order("created_at", { ascending: false });
    console.log(data);
    if (data) setOrders(data);
  };

  // Scroll to top when new order comes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [orders]);

  const handleDone = async (orderId) => {
    // You can implement delete or status update logic here
    alert(`Order #${orderId} marked as done`);
    const res = await supabase.from("Order").update({"finished":true}).eq("id",orderId)

    console.log(orders)
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');
        
        body {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .navbar-elegant {
          background: linear-gradient(135deg, #8B6F47 0%, #6B5335 100%);
          padding: 1rem 0;
          box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }
        
        .dashboard-hero {
          background: linear-gradient(135deg, #8B6F47 0%, #6B5335 100%);
          padding: 4rem 0 3rem;
          position: relative;
          overflow: hidden;
        }
        
        .dashboard-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><text x="10" y="50" font-size="60" opacity="0.03" fill="white">☕</text></svg>');
          opacity: 0.3;
        }
        
        .dashboard-title {
          font-size: 3rem;
          font-weight: 300;
          color: #fff;
          margin-bottom: 0.5rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
          position: relative;
          z-index: 2;
        }
        
        .dashboard-subtitle {
          font-size: 1.1rem;
          color: #f5f5dc;
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          letter-spacing: 2px;
          text-transform: uppercase;
          position: relative;
          z-index: 2;
        }
        
        .orders-section {
          background: #f8f5f0;
          min-height: calc(100vh - 300px);
          padding: 3rem 0;
        }
        
        .section-label {
          font-size: 0.9rem;
          color: #8B6F47;
          text-transform: uppercase;
          letter-spacing: 3px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 400;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        
        .section-heading {
          font-size: 2.2rem;
          font-weight: 300;
          color: #6B5335;
          margin-bottom: 3rem;
          text-align: center;
        }
        
        .order-card {
          background: white;
          border: none;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 2px 15px rgba(0,0,0,0.08);
          height: 100%;
        }
        
        .order-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .order-card-header {
          background: linear-gradient(135deg, #8B6F47 0%, #6B5335 100%);
          padding: 1.5rem;
          color: white;
        }
        
        .order-number {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
        }
        
        .order-price {
          font-size: 1.8rem;
          font-weight: 700;
          color: #f5f5dc;
        }
        
        .order-body {
          padding: 1.5rem;
        }
        
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .info-row:last-of-type {
          border-bottom: none;
          margin-bottom: 1rem;
        }
        
        .info-label {
          font-weight: 600;
          color: #6B5335;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.9rem;
        }
        
        .info-value {
          color: #666;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.9rem;
          text-align: right;
        }
        
        .order-time {
          color: #999;
          font-size: 0.85rem;
        }
        
        .btn-done {
          background: linear-gradient(135deg, #8B6F47 0%, #6B5335 100%);
          color: white;
          border: none;
          padding: 0.75rem;
          border-radius: 8px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          width: 100%;
        }
        
        .btn-done:hover {
          background: linear-gradient(135deg, #6B5335 0%, #8B6F47 100%);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(107, 83, 53, 0.3);
        }
        
        .no-orders {
          text-align: center;
          padding: 4rem 2rem;
        }
        
        .no-orders-icon {
          font-size: 5rem;
          color: #8B6F47;
          margin-bottom: 1rem;
          opacity: 0.5;
        }
        
        .no-orders-text {
          font-size: 1.5rem;
          color: #6B5335;
          font-weight: 300;
        }
        
        .footer-elegant {
          background: #3d2f24;
          color: #f5f5dc;
          padding: 2rem 0;
          margin-top: auto;
        }
        
        .stats-badge {
          background: rgba(255,255,255,0.2);
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          display: inline-block;
          color: white;
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          font-size: 0.9rem;
          margin-top: 1rem;
        }
      `}</style>

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <nav className="navbar navbar-elegant">
          <div className="container">
            <a className="navbar-brand text-white d-flex align-items-center" href="/">
              {/* <span style={{ fontSize: '2rem', marginRight: '10px' }}>☕</span> */}
              <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>Coffee Star</span>
            </a>
            <div>
              <span style={{ color: '#f5f5dc', fontFamily: 'Montserrat, sans-serif' }}>
                Dashboard
              </span>
            </div>
          </div>
        </nav>

        <section className="dashboard-hero">
          <div className="container text-center">
            <h1 className="dashboard-title">Order Dashboard</h1>
            <p className="dashboard-subtitle">Live Order Tracking</p>
            <div className="stats-badge">
              {orders.length} Active {orders.length === 1 ? 'Order' : 'Orders'}
            </div>
          </div>
        </section>

        {/* Orders Section */}
        <section className="orders-section flex-grow-1">
          <div className="container">
            <p className="section-label">Orders</p>
            <h2 className="section-heading">Current Orders</h2>

            <div ref={containerRef} >
              {orders.length === 0 ? (
                <div className="no-orders">
                  {/* <div className="no-orders-icon">☕</div> */}
                  <p className="no-orders-text">No orders at the moment</p>
                  <p style={{ color: '#999', fontFamily: 'Montserrat, sans-serif', fontSize: '0.95rem' }}>
                    New orders will appear here in real-time
                  </p>
                </div>
              ) : (
                <div className="row g-4">
                  {orders.map((order, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3">
                      <div className="order-card">
                        {/* Card Header */}
                        <div className="order-card-header">
                          <div className="d-flex justify-content-between align-items-center">
                            <h5 className="order-number">Order #{order.id}</h5>
                            <div className="order-price">${order.price || "0"}</div>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="order-body">
                          <div className="info-row">
                            <span className="info-label">Customer</span>
                            <span className="info-value">{order.customer_name || "-"}</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">Phone</span>
                            <span className="info-value">{order.phone_number || "-"}</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">Order</span>
                            <span className="info-value">{order.customer_order || "-"}</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">Time</span>
                            <span className="info-value order-time">
                              {new Date(order.created_at).toLocaleString("en-US", {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>

                          {/* Done Button */}

                         
                          {order.finished? <div
                            className="btn-done text-center"
                            
                          >
                           Done
                          </div>: <button
                            className="btn-done"
                            onClick={() => handleDone(order.id)}
                          >
                            Mark as Done
                          </button>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer-elegant">
          <div className="container text-center">
            <p style={{ margin: 0, fontFamily: 'Montserrat, sans-serif', fontSize: '0.9rem' }}>
              © {new Date().getFullYear()} Coffee Star — Crafted with Love and Passion
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}