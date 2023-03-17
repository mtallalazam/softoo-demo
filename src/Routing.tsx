import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const LazyMainLayout = lazy(() => import('./layouts/MainLayout'));
const LazyHome = lazy(() => import('./pages/Home'));

const Routing = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LazyMainLayout />}>
            <Route index element={<LazyHome />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routing;
