import axios from "axios";

const api = axios.create({

    baseURL: 'http://localhost:8080/api/v1/admin'
})

export default api;


// npm install json-server

//npx json-server --watch db.json --port 3001 



//http://localhost:8080/api/v1/admin