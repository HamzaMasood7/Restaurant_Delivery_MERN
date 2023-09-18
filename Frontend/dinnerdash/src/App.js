import { HomePage } from "./pages/homePage/HomePage";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import "bootstrap/dist/css/bootstrap.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { useAuthContext } from "./hooks/useAuthContext";
import { AdminDashbord } from "./pages/adminDashbord/AdminDashbord";
import EmailVerification from "./components/emailVerification/EmailVerification";
import { AdminCategory } from "./pages/adminCategories/AdminCategories";
import { AdminItems } from "./pages/adminItems/AdminItems";
import { AdminAllItems } from "./pages/adminItems/AdminAllItems";
import { Cart } from "./pages/cart/Cart";
import { UserOrder } from "./pages/userOrder/UserOrder";
import { AdminAllOrder } from "./pages/adminOrder/AdminAllOrder";
import { UserProfile } from "./pages/userProfile/UserProfile";
import { Order } from "./pages/userOrder/Order";
import { AdminOrderDetail } from "./pages/adminOrder/AdminOrderDetail";
import { ItemPage } from "./pages/itemPage/ItemPage";
import { AdminCreateCategory } from "./pages/adminCategories/AdminCreateCategory";

function App() {
  const { user } = useAuthContext();
  const isAdmin = user && user.user.role === "admin";

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route
            exact
            path="/login"
            element={!user ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            exact
            path="/Register"
            element={!user ? <Register /> : <Navigate to={"/"} />}
          />
          <Route
            exact
            path="/order"
            element={user ? <UserOrder /> : <Navigate to={"/"} />}
          />
          <Route
            exact
            path="/profile/:id"
            element={user ? <UserProfile /> : <Navigate to={"/"} />}
          />
          <Route
            exact
            path="/order/:orderId"
            element={user ? <Order /> : <Navigate to={"/"} />}
          />
          <Route exact path="/item/:itemId" element={<ItemPage />} />
          <Route
            exact
            path="/admin/order/:orderId"
            element={isAdmin ? <AdminOrderDetail /> : <Navigate to={"/"} />}
          />
          <Route
            exact
            path="/admin"
            element={isAdmin ? <AdminDashbord /> : <Navigate to={"/"} />}
          />
          <Route
            exact
            path="api/auth/:id/verify/:token"
            element={<EmailVerification />}
          />
          <Route
            exact
            path="/order/:id"
            element={user ? <HomePage /> : <Navigate to={"/"} />}
          />

          <Route
            exact
            path="/admin/categories"
            element={isAdmin ? <AdminCategory /> : <Navigate to={"/"} />}
          />
          <Route
            exact
            path="/admin/create-category"
            element={isAdmin ? <AdminCreateCategory /> : <Navigate to={"/"} />}
          />
          <Route
            exact
            path="/admin/order"
            element={isAdmin ? <AdminAllOrder /> : <Navigate to={"/"} />}
          />
          <Route
            path="/admin/create-item"
            element={isAdmin ? <AdminItems /> : <Navigate to={"/"} />}
          />

          <Route
            exact
            path="/admin/items"
            element={isAdmin ? <AdminAllItems /> : <Navigate to={"/"} />}
          />
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
