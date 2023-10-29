import Home from "../Home/Home";
import Register from "../Register/Register";
import ListPage from "../List/ListPage";

const routes = [
  { path: "/signup", component: <Register /> },
  { path: "/home", component: <Home /> },
  { path: "/list", component: <ListPage /> },
];

export default routes;
