import { Routes, Route } from 'react-router-dom';
import { Home, CreateProduct, UpdateProduct, WatchProduct } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/create" element={<CreateProduct />} />
      <Route path="/products/:id" element={<WatchProduct />} />
      <Route path="/products/:id/edit" element={<UpdateProduct />} />
    </Routes>
  );
}

export default App;
