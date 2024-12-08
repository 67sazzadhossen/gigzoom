import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Profile from "../Component/Profile";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import WorkerTaskList from "../Pages/Worker/WorkerTaskList";
import WorkerSubmission from "../Pages/Worker/WorkerSubmission";
import WorkerWithdrawals from "../Pages/Worker/WorkerWithdrawals";
import DashboardHome from "../Pages/DashboardHome";
import AddNewTask from "../Pages/TaskCreator/AddNewTask";
import MyTask from "../Pages/TaskCreator/MyTask";
import PurchaseCoin from "../Pages/TaskCreator/PurchaseCoin";
import PaymentHistory from "../Pages/TaskCreator/PaymentHistory";
import ManageUsers from "../Pages/Admin/ManageUsers";
import ManageTask from "../Pages/Admin/ManageTask";
import UpdateTask from "../Pages/TaskCreator/UpdateTask";
import TaskDetails from "../Pages/Worker/TaskDetails";
import AdminRoute from "./AdminRoute";
import TaskCreatorRoute from "./TaskCreatorRoute";
import WorkerRoute from "./WorkerRoute";
import Payment from "../Pages/TaskCreator/Payment/Payment";
import ErrorPage from "../Pages/ErrorPage";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/sign-up",
        element: <Register></Register>,
      },
      {
        path: "/user-profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardHome></DashboardHome>
          </PrivateRoute>
        ),
      },

      // for worker

      {
        path: "/dashboard/task-list",
        element: (
          <WorkerRoute>
            <PrivateRoute>
              <WorkerTaskList></WorkerTaskList>
            </PrivateRoute>
          </WorkerRoute>
        ),
      },
      {
        path: "/dashboard/my-submission",
        element: (
          <WorkerRoute>
            <PrivateRoute>
              <WorkerSubmission></WorkerSubmission>
            </PrivateRoute>
          </WorkerRoute>
        ),
      },
      {
        path: "/dashboard/withdrawals",
        element: (
          <WorkerRoute>
            <PrivateRoute>
              <WorkerWithdrawals></WorkerWithdrawals>
            </PrivateRoute>
          </WorkerRoute>
        ),
      },
      {
        path: "/dashboard/task-details/:id",
        element: (
          <WorkerRoute>
            <PrivateRoute>
              <TaskDetails></TaskDetails>
            </PrivateRoute>
          </WorkerRoute>
        ),
      },
      // for task creator
      {
        path: "/dashboard/add-task",
        element: (
          <TaskCreatorRoute>
            <PrivateRoute>
              <AddNewTask></AddNewTask>
            </PrivateRoute>
          </TaskCreatorRoute>
        ),
      },
      {
        path: "/dashboard/my-task",
        element: (
          <TaskCreatorRoute>
            <PrivateRoute>
              <MyTask></MyTask>
            </PrivateRoute>
          </TaskCreatorRoute>
        ),
      },
      {
        path: "/dashboard/purchase-coin",
        element: (
          <TaskCreatorRoute>
            <PrivateRoute>
              <PurchaseCoin></PurchaseCoin>
            </PrivateRoute>
          </TaskCreatorRoute>
        ),
      },
      {
        path: "/dashboard/payment-history",
        element: (
          <TaskCreatorRoute>
            <PrivateRoute>
              <PaymentHistory></PaymentHistory>
            </PrivateRoute>
          </TaskCreatorRoute>
        ),
      },
      {
        path: "/dashboard/update-task/:id",
        element: (
          <TaskCreatorRoute>
            <PrivateRoute>
              <UpdateTask></UpdateTask>
            </PrivateRoute>
          </TaskCreatorRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
      },
      // for admin
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <PrivateRoute>
              <ManageUsers></ManageUsers>
            </PrivateRoute>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-task",
        element: (
          <AdminRoute>
            <PrivateRoute>
              <ManageTask></ManageTask>
            </PrivateRoute>
          </AdminRoute>
        ),
      },
    ],
  },
]);
