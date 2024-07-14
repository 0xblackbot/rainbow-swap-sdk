import axios from "axios";

export const API = axios.create({
    baseURL: 'https://api.blackbot.technology/rainbow/api'
});
