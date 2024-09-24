import {createBrowserRouter,} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import CreateJobs from "../pages/CreateJobs";
import MyJobs from "../pages/MyJobs";
import SalaryPage from "../pages/SalaryPage";
import UpdateJobs from "../pages/UpdateJobs";
import Login from "../components/Login";
import JobDetails from "../pages/JobDetails";
import SignUp from "../components/signUp";

const router = createBrowserRouter([
    {
      path: "/",
      element:<App/>,
      children:[
        {path: "/",element: <Home/>},
        {
          path:"/post-job",
          element: <CreateJobs/>
        },

        {
          path:"/my-jobs",
          element: <MyJobs/>
        },

        {
          path:"/salary",
          element: <SalaryPage/>
        },

        {
          path:"edit-job/:id",
          element: <UpdateJobs/>,
          loader: ({params}) => fetch(`http://localhost:3000/all-jobs/${params.id}`)
        },

        {
          path: "/job/:id",
          element: <JobDetails/>
        },

        {
          path: "/login",
          element: <Login/>
        },

        {
          path: "/sign-up",
          element: <SignUp/>
        }
    
      ],
    },
  ]);

  export default router;