const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function getProducts(category) {
  const response = await fetch(baseUrl + 'products?category=' + category);
  if (response.ok) return response.json();
  throw response;
}

export async function getProduct(id) {
  const response = await fetch(baseUrl + 'products/' + id);
  const jsonResponse = response.json();
  if (response.ok) return jsonResponse;
  throw response;
}
