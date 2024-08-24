import axios from 'axios';

const API_URL = 'https://reqres.in/api';

export const fetchUsers = (page: number) =>
    axios.get(`${API_URL}/users`);

export const fetchUserById = (id: number) =>
    axios.get(`${API_URL}/users/${id}`);

export const deleteUser = (id: number) =>
    axios.delete(`${API_URL}/users/${id}`);

export const fetchList = () =>
    axios.get(`${API_URL}/unknown`);

export const createUser = (
    data: { 
        id: number; 
        first_name: string; 
        last_name: string; 
        avatar?: string;
    }
) =>
    axios.post(`${API_URL}/users`, data);

export const updateUser = (
    data: { 
        id: number; 
        first_name: string; 
        last_name: string; 
        email?: string;
        avatar?: string;
    }
) =>
    axios.put(`${API_URL}/users/${data.id}`, data);