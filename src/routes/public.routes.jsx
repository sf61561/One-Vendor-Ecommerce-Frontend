import MainLayout from "../components/layout/MainLayout.jsx";
import HomePage from "../components/pages/HomePage.jsx";

const PublicRoutes = [
    {
        path: '/',
        element:<MainLayout/>,
        children:[
            {
                index:true,
                path:'dashboard',
                element:<HomePage />
            }
        ]
    }
]

export default PublicRoutes;