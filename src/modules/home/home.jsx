import React, { lazy, Suspense } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid, CssBaseline, Container, Toolbar } from "@material-ui/core";

import "../../styles.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Header from "../../components/header/header";
import ErrorBoundaries from "../../components/error-boundaries/error-boundaries";
const Dashboard = lazy(() => import("./dashboard"));
const Confirmation = lazy(() => import("../confirmation/confirmation"));
const FlightSearch = lazy(() => import("../search/flight-search"));
const FlightBooking = lazy(() => import("../booking/flight-booking"));
const Ticket = lazy(() => import("../ticket/ticket"));
const Hotels = lazy(() => import("../Hotels/Hotels"));



const promise = loadStripe(
  "pk_test_51Hz6kSKELfugVTBI236RZqs4Q7VFNYLXRABPDeRQDoyPwoWf7YIEXFPHIGHL9l2p6ktjxhgdOCQHYbey61rFhUdH00UeSfVRB6"
);
const Home = () => {
  return (
    <div className="root">
      <CssBaseline />
      <Router>
        <Header />
        <Toolbar />
        <Container style={{ marginTop: "50px" }}>
          <Grid container styles={{ marginTop: 100 }}>
            <Grid item xs={12} sm={12}>
              <ErrorBoundaries>
                <Suspense fallback={<div>Loading...</div>}>
                  <Switch>
                    <Route path={`/`} exact={true} component={Dashboard} />

                    <Route
                      exact={true}
                      path={`/flight-search`}
                      component={FlightSearch}
                    />
                     <Route
                      exact={true}
                      path={`/Hotels`}
                      component={Hotels}
                    />
                    <Route
                      exact={true}
                      path={`/flight-booking`}
                      component={FlightBooking}
                    />
                    <Route
                      exact={true}
                      path={`/flight-ticket`}
                      component={Ticket}
                    />
                    <Elements stripe={promise}>
                      <Route
                        exact={true}
                        path={`/confirmation`}
                        component={Confirmation}
                      />
                    </Elements>
                  </Switch>
                </Suspense>
              </ErrorBoundaries>
            </Grid>
          </Grid>
        </Container>
      </Router>
    </div>
  );
};

export default Home;
