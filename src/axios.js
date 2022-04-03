import axios from "axios";

// my on firebase function for create  SECRET_KEY  for stripe process
const instance = axios.create({
  baseURL: "https://us-central1-challenge-31a2b.cloudfunctions.net/api", // The Api (Cloud Function) URL
});

export default instance;
