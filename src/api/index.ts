const API_DOMAIN = 'http://localhost:3000';
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

export const getProductById = async (id: number) => {
  const response = await fetch(`${API_DOMAIN}/api/products/${id}`);
  const data = await response.json();
  return data;
}