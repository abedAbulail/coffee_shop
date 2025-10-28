import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes,Route,Link } from 'react-router-dom';
import Home from './home';
import Bot from './bot';
import Order from './orders';
function App() {

  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-dark  shadow-sm custom-navbar">
        <div className="container">
          <a className="navbar-brand fs-3 fw-bold" href="#">Coffee</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link active" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="/bot">Chatbot</a></li>
              <li className="nav-item"><a className="nav-link" href="/order">Order</a></li>
            </ul>
          </div>
        </div>
      </nav>


<Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/bot' element={<Bot/>}/>
    <Route path='/order' element={<Order/>}/>
</Routes>

</>
  );
}

export default App;
