
import RegisterReader from "../features/registerReader";
import LibraryPress from "../features/LibraryPress";
import Home from "../features/Home";
import SearchBook from "../features/SearchBook";
import Login from "../features/Login";
export const Routes = [
    {
        path: "",
        element: <Home/>
    },
    {
        path: "/home",
        element : <LibraryPress/>
    },
    {
        path: "/register",
        element: <RegisterReader/>
    },
    {
        path:"/search/:id",
        element: <SearchBook/>
    },
    {
        path: "/login",
        element: <Login/>
    }
]