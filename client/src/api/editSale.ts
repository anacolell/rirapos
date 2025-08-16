import { Sale } from "../types/types";
import { API_URL } from "./config";

export const updateSale = async (saleId: string, updatedSale: Sale) => {
  console.log("saleId", saleId, "updatedSale", updatedSale);
  const response = await fetch(`${API_URL}/sales/${saleId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedSale),
  });

  if (!response.ok) {
    const errorMessage = `Failed to update sale with ID ${saleId}. Status: ${response.status}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const updatedSaleData = await response.json();
  return updatedSaleData;
};
