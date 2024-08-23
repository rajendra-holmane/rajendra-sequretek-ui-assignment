import axios from 'axios';

const API_URL = 'https://reqres.in/api';

export const fetchUsers = (page: number) =>
    axios.get(`${API_URL}/users`, { params: { page } });

export const fetchUser = (id: number) =>
    axios.get(`${API_URL}/users/${id}`);

export const createUser = (data: { name: string; job: string }) =>
    axios.post(`${API_URL}/users`, data);

export const updateUser = (id: number, data: { name: string; job: string }) =>
    axios.put(`${API_URL}/users/${id}`, data);

export const deleteUser = (id: number) =>
    axios.delete(`${API_URL}/users/${id}`);