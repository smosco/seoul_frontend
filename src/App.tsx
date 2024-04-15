import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Home from './pages/Home';
import EmergencyPage from './pages/EmergencyPage';
import RouteExplorer from './pages/RouteExplorer';

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
    path: '/emergency',
    element: null,
    children: [
      {
        path: ':emergencyId',
        element: <EmergencyPage />,
      },
    ],
  },
]);

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
