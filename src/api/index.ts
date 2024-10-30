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
  const response = await fetch(`${API_DOMAIN}/api/products?title=${title}&sort=${sort}&page=${page}&size=${size}`);
  const data = await response.json();
  return data;
}

export const getProductById = async (id: string) => {
  const response = await fetch(`${API_DOMAIN}/api/products/${id}`);
  const data = await response.json();
  return data;
}

export const createProduct = async (product: Partial<TProduct>) => {
  const response = await fetch(`${API_DOMAIN}/api/products/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(product)
  })
  const data = await response.json();
  return data;
}

export const updateProduct = async (id: string | number, product: Partial<TProduct>) => {
  const response = await fetch(`${API_DOMAIN}/api/products/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(product)
  })
  const data = await response.json();
  return data;
}

export const deleteProduct = async (id: string | number) => {
  const response = await fetch(`${API_DOMAIN}/api/products/${id}`, {
    method: 'DELETE',
  })
  const data = await response.json();
  return data;
}

export const uploadImage = async (formData: FormData) => {
  const response = await fetch(`${API_DOMAIN}/images/upload`, {
    method: 'POST',
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    body: formData,
  })
  const data = await response.text();
  return data
}