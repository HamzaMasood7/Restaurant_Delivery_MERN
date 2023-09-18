import { AdminNavbar } from "../../components/adminNavbar/AdminNavbar";
import { GetCategories } from "../../components/adminCategories/GetCategories";

export const AdminCategory = () => {
  return (
    <>
      <AdminNavbar />

      <div className="container mt-3 pt-3">
        <GetCategories />
      </div>
    </>
  );
};
