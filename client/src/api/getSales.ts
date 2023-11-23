export const getSales = async () => {
  const response = await fetch("http://localhost:5000/sales");
  return response.json();
};
