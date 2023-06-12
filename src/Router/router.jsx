import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Error from "../components/Shared/Error";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Classes from "../Pages/Classes/Classes";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layouts/Dashboard";
import Myclasses from "../Pages/Dashboard/User/Myclasses";
import MyEnrolledClasses from "../Pages/Dashboard/User/MyEnrolledClasses";
import MyPaymentHistory from "../Pages/Dashboard/User/MyPaymentHistory";
import InstructorClasses from "../Pages/Dashboard/Instructor/InstructorClasses";
import AddClass from "../Pages/Dashboard/Instructor/AddClass";
import ManageClasses from "../Pages/Dashboard/Admin/ManageClasses";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import CommonDashboard from "../Pages/Dashboard/CommonDashboard";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
      {
        path: "classes",
        element: <Classes></Classes>,
      },
      {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <Error></Error>,
        children: [
          // Common routes
          {
            path:"common",
            element: <CommonDashboard></CommonDashboard>,
          },
          // User routes
          {
            path: "myclasses",
            element: <Myclasses></Myclasses>,
          },
          {
            path:"enrolled",
            element: <MyEnrolledClasses></MyEnrolledClasses>
          },
          {
            path:"paymentHistory",
            element: <MyPaymentHistory></MyPaymentHistory>
          },
          // Instructor routes
          {
            path:"instructorClasses",
            element: <InstructorRoute><InstructorClasses></InstructorClasses></InstructorRoute>
          },
          {
            path:"instructorAddClass",
            element:<InstructorRoute><AddClass></AddClass></InstructorRoute>,
          },
          // Admin Routes
          {
            path:"manageClasses",
            element:<AdminRoute><ManageClasses></ManageClasses></AdminRoute> ,
          },
          {
            path:"manageUsers",
            element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>,
          },
        ],
      },
    ],
  },
  {},
]);

export default router;
