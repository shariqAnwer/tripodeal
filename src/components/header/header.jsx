import React from "react";
import {Link} from "react-router-dom"
import "./header.css"

import "./header.css";
// import { useHistory } from "react-router-dom";
// import Image from 'material-ui-image'

const Header = () => {
  // const history = useHistory();

  return (
   <>
      <div>
            <div className="main">
                <div className="logo_1">
                <Link to = "/"><img  className="abc_1" src="https://www.tripodeal.com/img/cheapfaresgo_logo.png" alt="logo" /></Link> 
                </div>
                <div className="secondary_">
                    <Link className="secondary_main" to="/" href="/"><h4>Home</h4></Link>
                    <Link className="secondary_main" to="/flight-search" href="/src/modules/search/flight-search.jsx"><h4>FLIGHTS</h4></Link>
                    <Link className="secondary_main" to= {"/Hotels"} href="/src/modules/Hotels/Hotels.jsx"><h4>HOTELS</h4></Link>
                    <Link className="secondary_main" to="/package" href="/package"> <h4>PACKAGES</h4></Link>

                    <div className="account_logo">

                        <i class="fas fa-user-circle"></i>
                        <select name="" id="">
                            <option value="">MY ACCOUNT</option>
                            <option value="">My Booking</option>
                            <option value="">Log In</option>
                            <option value="">Sign Up</option>

                        </select>
                    </div>


                </div>

            </div>
        </div>
        <hr/>
   </>
  );
};

export default Header;

//onClick={() => history.push("/")}