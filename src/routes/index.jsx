import AdminRoutes from "./admin.routes";
import AuthRoutes from "./auth.routes";
import PublicRoutes from "./public.routes" 

const routes = [
    ...PublicRoutes,
    ...AuthRoutes,
    ...AdminRoutes
]

export default routes;