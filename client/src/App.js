import "./style/App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import Reports from "./pages/Reports";
import Reservations from "./pages/Reservations";
import NewGroup from "./pages/NewGroup";
import GroupsList from "./pages/GroupsList";
import NewReservation from "./pages/NewReservation";
import PresenceList from "./pages/PresenceList";
import PresenceListHistory from "./pages/PresenceListHistory";
import MyReservations from "./pages/MyReservations";
import ClientPhones from "./components/ClientPhones";
import ClientEmails from "./components/ClientEmails";
import MainPage from "./pages/MainPage";
import GroupMembers from "./pages/GroupMembers";

let Layout = () => {
  return (
    <div id="main-wrapper">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/Client/phones",
        element: <ClientPhones />,
      },
      {
        path: "/Client/emails",
        element: <ClientEmails />,
      },
      {
        path: "/reservations",
        element: <Reservations />,
      },
      {
        path: "/newReservation",
        element: <NewReservation />,
      },
      {
        path: "/myReservations",
        element: <MyReservations />,
      },
      {
        path: "/newGroup",
        element: <NewGroup />,
      },
      {
        path: "/listGroups",
        element: <GroupsList />,
      },
      {
        path: "/GroupMembers",
        element: <GroupMembers />,
      },
      {
        path: "/presenceList",
        element: <PresenceList />,
      },
      {
        path: "/presenceListHistory",
        element: <PresenceListHistory />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
