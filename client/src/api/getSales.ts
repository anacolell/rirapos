import { API_URL } from "./config";

export const getSales = async () => {
  const response = await fetch(`${API_URL}/sales`);
  return response.json();
};
