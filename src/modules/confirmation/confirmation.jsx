import React, { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "../../axios";
import "./confirmation.scss";

const useStyles = makeStyles(() => ({
  button: {
    marginTop: 10,
  },
}));

const Confirmation = ({
  history: {
    location: {
      state: { email, fName, lName, mobile },
    },
  },
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const bookingData = useSelector((state) => state.flightSearch.bookingDetails);
  const [clientSecret, setClientSecret] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${bookingData?.result?.price * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [bookingData]);

  // console.log("THE SECRET IS >>>", clientSecret);
  // console.log("👱", bookingData.flightNbr);

  const handleChange = (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff...
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        history.replace("/flight-ticket", { email, fName, lName, mobile });
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <>
      <Typography
        variant="body2"
        color="textPrimary"
      >{`Thank you for the Booking. Click the below button to return to home page`}</Typography>

      {/* Payment section - Payment method */}
      <div className="payment__section">
        <div className="payment__title">
          <h3>Payment Method</h3>
        </div>
        <div className="payment__details">
          {/* Stripe magic will go */}

          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />

            <div className="payment__priceContainer">
              <CurrencyFormat
                renderText={(value) => <h3>Order Total: {value}</h3>}
                decimalScale={2}
                value={bookingData?.result?.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
              <button disabled={processing || disabled || succeeded}>
                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
              </button>
            </div>

            {/* Errors */}
            {error && <div>{error}</div>}
          </form>
        </div>
      </div>
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={() => history.push("/")}
      >{`Back to Home`}</Button>
    </>
  );
};

Confirmation.propTypes = {
  history: PropTypes.object,
  classes: PropTypes.object,
};

export default Confirmation;
