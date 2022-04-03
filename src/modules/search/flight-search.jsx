import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  Radio,
  FormControlLabel,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { validateSearch } from "../../utils/global-services";
import actions from "../../constants/actions";
import FlightListOneWay from "../../components/flight-list-grid/flight-list-one-way";

import CityJSON from "../../mocks/cities.json";
import { blue } from "@material-ui/core/colors";
import "./flight-search.css"


const cities = [...CityJSON];

const useStyles = makeStyles(() => ({
  filterContainer: {
    marginBottom: 25,
   background: blue
  },
}));

const FlightSearch = (props) => {
  const [source, setSource] = useState("");
  const [dest, setDest] = useState("");
  const [deptDate, setDeptDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [selectTrip, setSelectTrip] = useState("one");
  const [searchDone, setSearchDone] = useState(false);
  const [inputSource, setInputSource] = useState("");
  const [inputDest, setInputDest] = useState("");
  const [cityError, setCityError] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const flightList = useSelector((state) => state.flightSearch.searchList);
  const classes = useStyles();

  // On Page Load
  useEffect(() => {
    // Reset Flight List
    dispatch({
      type: actions.RESET_FLIGHT_LIST,
    });
  }, []);

  /**
   * @function handleSource
   * @param {object} newVal
   * @description get source city details
   */
  const handleSource = (newVal) => {
    setSource(newVal);
  };

  /**
   * @function handleDestination
   * @param {object} newVal
   * @description get destination city details
   */
  const handleDestination = (newVal) => {
    setDest(newVal);
  };

  /**
   * @function handleDeparture
   * @param {object} e
   * @description get departure time
   */
  const handleDeparture = (e) => {
    setDeptDate(e.target.value);
  };

  /**
   * @function handleSelectTrip
   * @param {object} e
   * @description get selected trip one way or round
   */
  const handleSelectTrip = (e) => {
    setSelectTrip(e.target.value);
  };

  /**
   * @function handleReturn
   * @param {object} e
   * @description get return date
   */
  const handleReturn = (e) => {
    setReturnDate(e.target.value);
  };

  /**
   * @function handleReset
   * @param {object} e
   * @description Reset all values
   */
  const handleReset = (e) => {
    setSelectTrip("one");
    setSource("");
    setDest("");
    setDeptDate("");
    setReturnDate("");
    setSearchDone(false);
    setInputSource("");
    setInputDest("");
    dispatch({
      type: actions.RESET_FLIGHT_LIST,
    });
  };

  /**
   * @function handleSearchFlight
   * @description Search Flight
   */

  const handleSearchFlight = () => {

    const payload = {};

    payload.source = source?.name;
    payload.destination = dest?.name;
    payload.deptDate = deptDate;
    payload.returnDate = returnDate;
    payload.tripType = selectTrip;
    //console.log("payload", payload);
    if (
      payload?.source?.toLowerCase() === payload?.destination?.toLowerCase()
    ) {
      setCityError(true);
      setSearchDone(false);
      return;
    } else {
      setCityError(false);
    }
    // Reset Flight List
    dispatch({
      type: actions.RESET_FLIGHT_LIST,
    });
    // Get flight List
    dispatch({
      type: actions.GET_FLIGHT_LIST,
      payload,
    });

    setSearchDone(true);
    console.log("====================================");
    console.log(flightList);
    console.log("====================================");
  };
  /**
   * @function handleBookNow
   * @param {object} bookingVal
   * @description book now
   */
  const handleBookNow = (bookingVal) => {
    let timer;
    dispatch({
      type: actions.SET_BOOKING_DETAILS,
      payload: bookingVal,
    });

    clearTimeout(timer);

    timer = setTimeout(() => {
      history.push("/flight-booking");
    }, 100);
  };

  return (
    <>
    <img className="img-flight-search" src="https://www.tripodeal.com/img/seepaysmall1.png" alt="imagefl"></img>
    <div className="input-form">
    <Grid container style={{ background:"#ffffff", padding:20 }}>
      <Grid item xs={12} md={12} className={classes.filterContainer}>
        <RadioGroup row onChange={handleSelectTrip} value={selectTrip}>
          <FormControlLabel
            value="one"
            control={<Radio color="primary" />}
            label="One Way"
          />
          <div>
            <FormControlLabel
              value="both"
              control={<Radio color="primary" />}
              label="Round Trip"
            />
          </div>
        </RadioGroup>
        {selectTrip === "both" && (
          <Typography
            variant="body1"
            color="error"
          >{`Round Trip Not available at the moment`}</Typography>
        )}
        <p></p>
      </Grid>

      <Grid item xs={12} md={6} className={classes.filterContainer}>
        <Autocomplete
          value={source}
          inputValue={inputSource}
          onChange={(event, newValue) => {
            handleSource(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputSource(newInputValue);
          }}
          getOptionSelected={(option) => (option.name ? option.name : "")}
          getOptionLabel={(option) => (option.name ? option.name : "")}
          options={cities}
          style={{ width: 400, }}
          renderInput={(params) => (
            <TextField {...params} label="Source City" variant="outlined" />
          )}
        />
      </Grid>
      

      <Grid item xs={12} md={6} className={classes.filterContainer}>
        <Autocomplete
          value={dest}
          inputValue={inputDest}
          onChange={(event, newValue) => {
            handleDestination(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputDest(newInputValue);
          }}
          getOptionSelected={(option) => (option.name ? option.name : "")}
          getOptionLabel={(option) => (option.name ? option.name : "")}
          options={cities}
          style={{ width: 400,  }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Destination City"
              variant="outlined"
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6} className={classes.filterContainer}>
        <TextField
          label="Journey Date"
          type="date"
          value={deptDate}
          onChange={handleDeparture}
          variant="outlined"
          style={{ width: 400 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>

      {selectTrip?.toUpperCase() === "BOTH" && (
        <Grid item xs={12} md={6} className={classes.filterContainer}>
          <TextField
            label="Return Date"
            type="date"
            value={returnDate}
            onChange={handleReturn}
            variant="outlined"
            style={{ width: 300 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <Button
          variant="contained"
          style={{ background:"#fb664a", color: "#fff" }}
          className={classes.filterContainer}
          onClick={handleSearchFlight}
          disabled={validateSearch(
            source,
            dest,
            deptDate,
            returnDate,
            selectTrip
          )}
        >
          {`Search Flight`}
        </Button>
        <Button
          style={{ marginLeft: "50px" }}
          variant="contained"
          color="primary"
          className={classes.filterContainer}
          onClick={handleReset}
        >
          {`Reset`}
        </Button>
      </Grid>

      <Grid item xs={12}>
        {cityError && (
          <Typography
            variant="body1"
            color="error"
          >{`Source and Destination City can not be same`}</Typography>
        )}
        {searchDone && (
          <FlightListOneWay flightList={flightList} bookNow={handleBookNow} />
        )}
      </Grid>
    </Grid>

    </div>
    
  
    </>
  );
};

FlightSearch.propTypes = {
  history: PropTypes.object,
  classes: PropTypes.object,
  dispatch: PropTypes.func,
  flightList: PropTypes.object,
};

export default FlightSearch;
