export const deleteSale = async (saleId: string) => {
  await fetch(`http://localhost:5000/sales/${saleId}`, {
    method: "DELETE",
  });
};
