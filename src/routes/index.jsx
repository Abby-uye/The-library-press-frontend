
import RegisterReader from "../features/registerReader";
import LibraryPress from "../features/LibraryPress";
import Home from "../features/Home";
import SearchBook from "../features/SearchBook";
export const Routes = [
    {
        path: "",
        element: <Home/>
    },
    {
        path:"/search/:id",
        element : <LibraryPress/>
    },
    {
        path: "/register",
        element: <RegisterReader/>
    },
    {
        path: "/search",
        element: <SearchBook/>
    }

]