import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

import { Button } from "@material-ui/core";
import Home from "../../components/Screens/Lhome/Lhome"
import Footer from "../../components/Footer/Footer"

const Dashboard = () => {
  const history = useHistory();

  return (
    <>
      <Home />
      <Footer />
      <Button
        title="Search Flights Here"
        fullWidth
        variant="outlined"
        color="primary"
        onClick={() => history.push("/flight-search")}
      >
        <p>{`Search Flights Here`}</p>
      </Button>
    </>
  );
};

Dashboard.propTypes = {
  history: PropTypes.object,
};

export default Dashboard;
