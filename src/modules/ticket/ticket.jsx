import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./ticket.scss";

function Ticket({
  history: {
    location: {
      state: { email, fName, lName, mobile },
    },
  },
}) {
  const bookingData = useSelector((state) => state.flightSearch.bookingDetails);

  const [ticket, setTicket] = useState([]);

  useEffect(() => {
    if (bookingData) {
      setTicket(bookingData.result);
    } else {
      setTicket([]);
    }
  }, [bookingData]);
  console.log("====================================");
  console.log(ticket);
  console.log("====================================");

  return (
    <>
      <h1>Your Ticket</h1>

      <div className="containerT">
        <div className="ticket basic">
          <p>Admit One</p>
        </div>

        <div className="ticket airline">
          <div className="top">
            <h1>boarding pass</h1>
            <div className="big">
              <p className="from">{ticket.deptCity}</p>
              <p className="to">
                <i className="fas fa-arrow-right"></i> {ticket.arivalCity}
              </p>
            </div>
            <div className="top--side">
              <i className="fas fa-plane"></i>
              <p>AirLine Name</p>
              <p>{ticket.airlineName}</p>
            </div>
            <img
              src={ticket.airlineLogo}
              alt="airlineLogo"
              className="logoImg"
            />
          </div>

          <div className="bottom">
            <div className="column">
              <div className="row row-1">
                <p>
                  <span>Flight</span>
                  {ticket.flightNbr}
                </p>

                <p className="row--right">
                  <span>Gate</span>B3
                </p>
              </div>

              <div className="row row-2">
                <p>
                  <span>Boards</span>
                  {ticket.deptTime}
                </p>
                <p className="row--center">
                  <span>no of stops</span>
                  {ticket.noOfStops}
                </p>
                <p className="row--right">
                  <span>Arrives</span>
                  {ticket.arivalTime}
                </p>
              </div>

              <div className="row row-2">
                <p>
                  <span>Passenger</span>
                  {`${fName} ${lName}`}
                </p>
                <p className="row--center">
                  <span>Seat</span>11E
                </p>
                <p className="row--right">
                  <span>Group</span>3
                </p>
              </div>

              <div>
                <p>
                  <span>Email</span>
                  {email}
                </p>
                <p>
                  <span>Mobile Number</span>
                  {mobile}
                </p>
              </div>
            </div>
            <div className="bar--code"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ticket;
