import {createBrowserRouter,} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import CreateJobs from "../pages/CreateJobs";

const router = createBrowserRouter([
    {
      path: "/",
      element:<App/>,
      children:[
        {path: "/",element: <Home/>},
        {
          path:"post-job",
          element: <CreateJobs/>
        }
    
      ],
    },
  ]);

  export default router;