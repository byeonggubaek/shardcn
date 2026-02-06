// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout.tsx';
import Home from '@/pages/Home.tsx';
import Simple from '@/pages/Simple.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/market/simple" element={<MainLayout />}>
        <Route index element={<Simple />} />
      </Route>      
    </Routes>
  );
}

export default App;