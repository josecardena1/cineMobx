import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';

import './App.css';
import Header from './componentes/Header';
import Entradas from './componentes/Entradas';
import Favoritos from './componentes/Favoritos';

import Inicio from './componentes/Inicio';
import Peliculas from './componentes/Peliculas';
import Footer from './componentes/Footer';
import DetallePelicula from './componentes/DetallePelicula';

function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Inicio />,
      },
      {
        path: '/films',
        element: <Peliculas />,
      },
      {
        path: '/entradas',
        element: <Entradas />,
      },
      {
        path: '/favoritos',
        element: <Favoritos />,
      },
      {
        path: '/DetallePelicula/:id',
        element: <DetallePelicula />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
