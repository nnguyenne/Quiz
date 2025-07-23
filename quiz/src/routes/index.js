import Home from '../Page/Home';
import Login from '../Page/Login';
import Error404 from '../Page/Error404';
import LayoutDefault from '../Layout/LayoutDefault';
import Register from '../Page/Register';
import PrivateRouter from '../components/PrivateRouter';
import Questions from '../Page/Questions';
import Topics from '../Page/Topics';
import History from '../Page/History';
import Result from '../Page/Result';
import Profile from '../Page/Profile';
export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                element: <PrivateRouter />,
                children: [
                    {
                        path: `:questions/:topicName`,
                        element: <Questions />
                    },
                    {
                        path: "Question",
                        element: <Questions />
                    },
                    {
                        path: "History",
                        element: <History />
                    },
                    {
                        path: "Result",
                        element: <Result />
                    },
                    {
                        path: "Profile",
                        element: <Profile />
                    },
                ]
            },
            {
                path: "Topics",
                element: <Topics />
            },
        ]
    },
    {
        path: "*",
        element: <Error404 />
    }
]
