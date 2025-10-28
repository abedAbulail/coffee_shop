import { createClient } from "@supabase/supabase-js";
import React, { useState, useEffect, useRef } from "react";

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
      console.log(data)
    if (data) setOrders(data);
  };

  // Scroll to top when new order comes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [orders]);

  return (
<>

    <section
  className="d-flex flex-column min-vh-100"
  style={{
    background: "radial-gradient(circle at top left, #8d6e63 0%, #3e2723 80%)",
  }}
>
  {/* Header */}
  <header className="py-4 text-center text-white shadow-sm">
    <h1 className="mb-1" style={{ fontWeight: 700, fontSize: "2rem" }}>
      Dashboard
    </h1>
    <p className="mb-0 fs-5">Track customer orders</p>
  </header>

  {/* Main Content */}

<main className="flex-grow-1 w-100 d-flex flex-column align-items-center py-5">

  <div
    ref={containerRef}
    className="w-100 px-3"
    style={{  minHeight: "50vh", overflowY: "auto" }}
  >
    {orders.length === 0 ? (
      <p className="text-light text-center fs-5">No orders at the moment...</p>
    ) : (
      <div className="row justify-content-center g-4">
        {orders.map((order, index) => (
          <div key={index} className="col-12 col-md-4 col-lg-3">
            <div className="card border-0 rounded-4 shadow-sm">
         
              {/* Card Body */}
              <div className="card-body shadow" style={{ backgroundColor: "#fff" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
    <h5 className="card-title mb-0" style={{ fontWeight: "600" }}>
      Order #{order.id}
    </h5>
    <span style={{
        color:"#6f4e37"
    }} className="fw-bold">${order.price || "-"}</span>
  </div>

                {/* Info Rows */}
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold">Name:</span>
                  <span>{order.customer_name || "-"}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold">Phone:</span>
                  <span>{order.phone_number || "-"}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold">Order:</span>
                  <span>{order.customer_order || "-"}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="fw-bold">Time:</span>
                  <span className="text-muted">
                    {new Date(order.created_at).toLocaleString("en-US")}
                  </span>
                </div>

                {/* Done Button */}
                <button
                  className="btn btn-dark w-100" style={{
                    backgroundColor:"#6f4e37"
                  }}
                  onClick={() => alert(`Order #${order.id} marked as done`)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</main>

  {/* Footer */}
  <footer className="py-3 text-center text-white bg-dark mt-auto">
    <p className="mb-0">&copy; {new Date().getFullYear()} Coffee Shop Dashboard</p>
  </footer>
</section>



      </>


  );
}
