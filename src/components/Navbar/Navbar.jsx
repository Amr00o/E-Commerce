import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/image/freshcart-logo.svg';
import { AuthContext } from '../../Context/AuthContext';

export default function Navbar() {
  let {setUserIsLoggedIn, userIsLoggendIn} = useContext(AuthContext)
  let navigate = useNavigate()

  function logout() {
    setUserIsLoggedIn(false)
    localStorage.removeItem("token")
    navigate("/login")
  }

  return <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div className="container p-2">
    <Link className="navbar-brand" to='home'>
      <img src={logo} alt=""/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userIsLoggendIn? <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to='/home'>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/categories'>Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/brands'>Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/cart'>Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/wishlist">Wishlist</Link>
          </li>
      </ul> : null}
      
      <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
        <li className='nav-item d-flex align-items-center'>
          <i className='fab mx-2 fa-facebook'></i>
          <i className='fab mx-2 fa-twitter'></i>
          <i className='fab mx-2 fa-instagram'></i>
          <i className='fab mx-2 fa-youtube'></i>
          <i className='fab mx-2 fa-tiktok'></i>
        </li>
        {!userIsLoggendIn? <>
          <li className="nav-item">
          <Link className="nav-link" to='/login'>Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/register'>Register</Link>
        </li>
        </> : <li className="nav-item">
          <span onClick={logout} className="nav-link cursor-pointer" to='/logout'>Logout</span>
        </li>}

      </ul>
    </div>
  </div>
</nav>
  </>
}
