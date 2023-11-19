import { Route, Routes } from "react-router-dom";
import Pos from "./pages/pos";
import SalesList from "./pages/salesList";
import { CartProvider } from "./context/cartContext";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Pos />} />
        <Route path="/sales-list" element={<SalesList />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
