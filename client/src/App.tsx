import { Route, Routes } from "react-router-dom";
import Pos from "./pages/pos";
import SalesList from "./pages/salesList";
import { CartProvider } from "./context/cartContext";
import SaleDetail from "./pages/saleDetail";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Pos />} />
        <Route path="/sales" element={<SalesList />} />
        <Route path="/sales/:saleId" element={<SaleDetail />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
