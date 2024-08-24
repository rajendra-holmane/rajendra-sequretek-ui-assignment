import axios from 'axios';

const API_URL = 'https://reqres.in/api';

export const fetchUsers = (page: number) =>
    axios.get(`${API_URL}/users`);

export const fetchList = () =>
    axios.get(`${API_URL}/unknown`);

export const addUsers = () =>
    axios.get(`${API_URL}/users`);