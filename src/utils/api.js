import axios from "axios";

export default axios.create({
  baseURL: "https://text-translator2.p.rapidapi.com",

  headers: {
    "x-rapidapi-key": "4e2035245bmshc980db1faec1db2p191562jsn188612e3eed9",
    "x-rapidapi-host": "text-translator2.p.rapidapi.com",
  },
});
