import { API_URL } from "./config";

export const deleteSale = async (saleId: string) => {
  const response = await fetch(`${API_URL}/sales/${saleId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorMessage = `Failed to delete sale with ID ${saleId}. Status: ${response.status}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};
