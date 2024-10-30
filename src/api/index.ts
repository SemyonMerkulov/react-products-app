import { TProduct } from "../types";

export const API_DOMAIN = 'http://localhost:3000';
const headers = new Headers();
headers.append("Content-Type", "application/json");

type getProductsProps = {
  sort: string,
  title: string,
  page: number,
  size: number,
}

export const getProducts = async ({ sort, title, page, size }: getProductsProps) => {
  try {  
    const response = await fetch(`${API_DOMAIN}/api/products?title=${title}&sort=${sort}&page=${page}&size=${size}`);
    if (!response.ok) { 
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при отправке запроса на сервер:', error);
    throw error;
  }
}

export const getProductById = async (id: string) => {
  try {
    const response = await fetch(`${API_DOMAIN}/api/products/${id}`);
    if (!response.ok) { 
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при отправке запроса на сервер:', error);
    throw error;
  }  
}

export const createProduct = async (product: Partial<TProduct>) => {
  try {
    const response = await fetch(`${API_DOMAIN}/api/products/`, {
      method: 'POST',
      headers,
      body: JSON.stringify(product)
    })
    if (!response.ok) { 
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при отправке запроса на сервер:', error);
    throw error;
  }  
}

export const updateProduct = async (id: string | number, product: Partial<TProduct>) => {
  try {
    const response = await fetch(`${API_DOMAIN}/api/products/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(product)
    })
    if (!response.ok) { 
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при отправке запроса на сервер:', error);
    throw error;
  }  
}

export const deleteProduct = async (id: string | number) => {
  try {
    const response = await fetch(`${API_DOMAIN}/api/products/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) { 
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при отправке запроса на сервер:', error);
    throw error;
  }  
}

export const uploadImage = async (formData: FormData) => {
  try {
    const response = await fetch(`${API_DOMAIN}/images/upload`, {
      method: 'POST',
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: formData,
    })
    if (!response.ok) { 
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }

    const data = await response.text();
    return data
  } catch (error) {
    console.error('Ошибка при отправке запроса на сервер:', error);
    throw error;
  }    
}