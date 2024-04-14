import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import EmergencyPage from './pages/EmergencyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/emergency',
    element: <EmergencyPage />,
    children: [
      {
        path: ':emergencyId',
        element: <EmergencyPage />
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
