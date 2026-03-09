import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Clientes
export const createClient = async (clientData) => {
  const response = await api.post('/clients', clientData);
  return response.data;
};

export const getClient = async (clientId) => {
  const response = await api.get(`/clients/${clientId}`);
  return response.data;
};

// Contas
export const getAccount = async (accountId) => {
  const response = await api.get(`/accounts/${accountId}`);
  return response.data;
};

export const getBalance = async (accountId) => {
  const response = await api.get(`/accounts/${accountId}/balance`);
  return response.data;
};

export const getStatement = async (accountId) => {
  const response = await api.get(`/accounts/${accountId}/statement`);
  return response.data;
};

// Transações
export const deposit = async (depositData) => {
  const response = await api.post('/transfers/deposit', depositData);
  return response.data;
};

export const withdraw = async (withdrawData) => {
  const response = await api.post('/transfers/withdraw', withdrawData);
  return response.data;
};

export const transfer = async (transferData) => {
  const response = await api.post('/transfers/transfer', transferData);
  return response.data;
};

export default api;