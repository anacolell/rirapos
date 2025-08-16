import { Sale } from "../types/types";
import { API_URL } from "./config";

// export const updateSale = async (saleId: string, updatedSale: Sale) => {
//   console.log("saleId", saleId, "updatedSale", updatedSale);
//   const response = await fetch(`${API_URL}/sales/${saleId}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(updatedSale),
//   });

//   if (!response.ok) {
//     const errorMessage = `Failed to update sale with ID ${saleId}. Status: ${response.status}`;
//     console.error(errorMessage);
//     throw new Error(errorMessage);
//   }

//   const updatedSaleData = await response.json();
//   return updatedSaleData;
// };

export const updateSale = async (saleId: string, updatedSale: Sale) => {
  console.log("Sending update to:", `${API_URL}/sales/${saleId}`);
  console.log("Payload:", updatedSale);

  try {
    const response = await fetch(`${API_URL}/sales/${saleId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSale),
    });

    console.log("Fetch response status:", response.status);

    if (!response.ok) {
      const text = await response.text();
      console.error("Update failed, server response:", text);
      throw new Error(
        `Failed to update sale with ID ${saleId}. Status: ${response.status}`
      );
    }

    const data = await response.json();
    console.log("Update successful, server returned:", data);
    return data;
  } catch (error) {
    console.error("Fetch error while updating sale:", error);
    throw error;
  }
};
