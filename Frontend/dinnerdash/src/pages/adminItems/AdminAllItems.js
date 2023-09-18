import { AdminNavbar } from "../../components/adminNavbar/AdminNavbar";
import { GetItem } from "../../components/adminItems/GetItem";

export const AdminAllItems = () => (
  <div>
    <AdminNavbar />
    <h1 className="display-1">Items</h1>
    <GetItem />
  </div>
);
