import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import All_Issue from "../pages/All_Issue";
import Add_Issue from "../pages/Add_Issue";
import My_Issue from "../pages/My_Issue";
import MyContribution from "../pages/MyContribution";
import IssueDetails from "../pages/IssueDetails";
import PrivateRoute from "../components/PrivateRoute";
import ErrorPage from "../components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "all-issue",
        Component: All_Issue,
      },
      {
        path: "add-issue",
        element: (
          <PrivateRoute>
            <Add_Issue></Add_Issue>
          </PrivateRoute>
        ),
      },
      {
        path: "my-issue",
        element: (
          <PrivateRoute>
            <My_Issue></My_Issue>
          </PrivateRoute>
        ),
      },
      {
        path: "my-contribution",
        element: (
          <PrivateRoute>
            <MyContribution></MyContribution>
          </PrivateRoute>
        ),
      },
      {
        path: "issue-details/:id",
        element: (
          <PrivateRoute>
            <IssueDetails></IssueDetails>
          </PrivateRoute>
        ),
      },

      {
        path: "login",
        Component: Login,
      },

      {
        path: "register",
        Component: Register,
      },
    ],
  },

  {
    path: "*",
    Component: ErrorPage,
  },
]);

export default router;
