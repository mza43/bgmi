import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import SalesPage from "./pages/SalesPage/SalesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DetailsPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
