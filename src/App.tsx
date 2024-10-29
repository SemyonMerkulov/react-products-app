import { Routes, Route } from 'react-router-dom';
import { Home, Product } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<Product />} />
    </Routes>
  );
}

export default App;
