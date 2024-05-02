import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import EmergencyPage from './pages/Report';
import RouteExplorer from './pages/RouteExplorer';
import DetailRoute from './pages/DetailRoute';
import NotFound from './components/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/routes',
    element: <RouteExplorer />,
  },
  {
    path: '/route-detail',
    element: <DetailRoute />,
  },
  {
    path: '/report',
    element: <EmergencyPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
