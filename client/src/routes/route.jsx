import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../Page/Home';
import MainPanel from '../Page/Admin/MainPanel';
import AdminLogin from '../Page/Admin/AdminLogin';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '',
                element: <Home/>
            }
        ]
    },

    {
        path: "admin",
        element: <MainPanel/>,
        children: [
            {
                path: 'login',
                element: <AdminLogin/>
            }
        ]
    }
])


export default routes;