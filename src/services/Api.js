import axios from 'axios';

export class Api {

    static base_url = "http://127.0.0.1:8000/api";

    // Users list
    static getdata(filter) {
        const url = `${this.base_url}/users?search=${filter}`;
        return axios.get(url);
    }


    // Add
    static add(input) {
        const url = `${this.base_url}/add`;
        return axios.post(url,input);
    }

}