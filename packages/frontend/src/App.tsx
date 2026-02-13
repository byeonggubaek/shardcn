import { Routes, Route } from "react-router-dom";
import MainLayout from '@/layouts/MainLayout.tsx';
import MarketSimple from '@/pages/MarketSimple.tsx';
import MarketDetail from '@/pages/MarketDetail.tsx';
import TrendHotplace from '@/pages/TrendHotplace.tsx';
import TrendSns from '@/pages/TrendSns.tsx';
import DashSummary from '@/pages/DashSummary.tsx';
import DashSale from '@/pages/DashSale.tsx';
import GuideIntro from '@/pages/GuideIntro.tsx';
import GuideBoard from '@/pages/GuideBoard.tsx';
import Home from '@/pages/Home.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />           {/* / */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
      <Route path="/market/simple" element={<MainLayout />}>
        <Route index element={<MarketSimple />} />           {/* / */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
      <Route path="/market/detail" element={<MainLayout />}>
        <Route index element={<MarketDetail />} />           {/* / */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>      
      <Route path="/trends/hotplace" element={<MainLayout />}>
        <Route index element={<TrendHotplace />} />           {/* / */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>      
      <Route path="/trends/sns" element={<MainLayout />}>
        <Route index element={<TrendSns />} />           {/* / */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>      
      <Route path="/dashboard/summary" element={<MainLayout />}>
        <Route index element={<DashSummary />} />           {/* / */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>      
      <Route path="/dashboard/sale" element={<MainLayout />}>
        <Route index element={<DashSale />} />           {/* / */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>      
      <Route path="/guide/intro" element={<MainLayout />}>
        <Route index element={<GuideIntro />} />           {/* / */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>      
      <Route path="/guide/board" element={<MainLayout />}>
        <Route index element={<GuideBoard />} />           {/* / */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>      
    </Routes>
  );
}

export default App;