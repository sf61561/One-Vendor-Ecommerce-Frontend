import AdminLayout from "../components/layout/AdminLayout";
import AdminGuard from "./guards/AdminGuard";

const AdminRoutes = [
    {
        element: <AdminGuard />,
        children: [
            {
                path: "/admin",
                element: <AdminLayout />,
                children: [
                    {
                        index: true,
                        // element: <AdminDashboard />
                    },
                    {
                        path: "products",
                        // element: <AdminProducts />
                    },
                    {
                        path: "orders",
                        // element: <AdminOrders />
                    },
                    {
                        path: "users",
                        // element: <AdminUsers />
                    },
                ]
            }
        ]
    }
];

export default AdminRoutes;