import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import ArticleList from "./pages/articleList/ArticleList";
import SuggestionList from "./pages/suggestionList/SuggestionList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import NewArticle from "./pages/newArticle/NewArticle";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import Article from "./pages/article/Article";

function App() {

  //const admin = useSelector((state) => state.user.currentUser.isAdmin);
  const admin = useSelector((state) => state.user.currentUser && state.user.currentUser.isAdmin);


  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        {admin && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
              <Route path="/articles">
                <ArticleList />
              </Route>
              <Route path="/article/:articleId">
                <Article />
              </Route>
              <Route path="/newarticle">
                <NewArticle />
              </Route>
              <Route path="/suggestions">
                <SuggestionList />
              </Route>
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;