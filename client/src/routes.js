import * as ROUTE from "./utils/routesConst";
import Home from "./pages/Home";
import Testing from "./pages/Testing";
//  Admin
import Admin from "./pages/Admin";
import AdminLogin from "./pages/Admin/Login";
import AdminSubject from "./pages/Admin/Subject";
import AdminTest from "./pages/Admin/Test";
import AdminOneTest from "./pages/Admin/OneTest";
import AdminTestingDetails from "./pages/Admin/TestingDetails";

export const publicRoutes = [
    {
        path: ROUTE.TESTING_ROUTE + '/:id',
        Component: Testing
    },
    {
        path: ROUTE.HOME_ROUTE,
        Component: Home
    },
    // Admin pages
    {
        path: ROUTE.ADMIN_LOGIN_ROUTE,
        Component: AdminLogin
    },
];

export const authRoutes = [
    {
        path: ROUTE.ADMIN_HOME,
        Component: Admin
    },
    {
        path: ROUTE.ADMIN_SUBJECT_ROUTE,
        Component: AdminSubject
    },
    {
        path: ROUTE.ADMIN_TEST_ROUTE + '/:id',
        Component: AdminOneTest
    },
    {
        path: ROUTE.ADMIN_TEST_ROUTE,
        Component: AdminTest
    },
    {
        path: ROUTE.ADMIN_TESTING_DETAIL_ROUTE + '/:id',
        Component: AdminTestingDetails
    }
];
