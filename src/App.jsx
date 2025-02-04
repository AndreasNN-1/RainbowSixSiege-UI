import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import LayoutAdmin from "./layout/admin/LayoutAdmin";
import HomeAdmin from "./pages/admin/HomeAdmin";

import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <PageNotFound />,
      children: [
        { path: "/", element: <Home /> },
      ],
    },
    {
      element: <LayoutAdmin />,
      errorElement: <PageNotFound />,
      children: [
        { path: "/admin", element: <HomeAdmin /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
