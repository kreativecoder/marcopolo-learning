import axios from 'axios'
import {API_BASE_PATH} from "./constants";

export function signup(payload) {
    return axios.post(API_BASE_PATH + '/users/register', payload);
}

export function login(payload) {
    return axios.post(API_BASE_PATH + '/users/login', payload);
}

export function getAllProducts() {
    return axios.get(API_BASE_PATH + '/products');
}

export function getProduct(productId) {
    return axios.get(API_BASE_PATH + '/products/' + productId);
}

export function addProduct(product) {
    return axios.post(API_BASE_PATH + '/products', product);
}

export function editProduct(productId, product) {
    return axios.post(API_BASE_PATH + '/products/' + productId, product);
}

export function deleteProduct(productId) {
    return axios.delete(API_BASE_PATH + '/products/' + productId);
}

export function getCurrentUser() {
    return axios.get(API_BASE_PATH + '/users/current');
}

export function setAuthToken() {
    const token = localStorage.getItem('access_token');
    axios.defaults.headers.common['Authorization'] = '';
    delete axios.defaults.headers.common['Authorization'];

    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}