import AuthRoutes from "./auth.routes";
import PublicRoutes from "./public.routes" 

const routes = [
    ...PublicRoutes,
    ...AuthRoutes
]

export default routes;