import React from "react";
import AdminNav from "../Components/admin/nav/AdminNav";

const AdminLayout = props => {
  return (
    <div className="admin__container">
      <div className="admin__left_nav">
        <AdminNav />
      </div>
      <div className="admin__right">{props.children}</div>
    </div>
  );
};

export default AdminLayout;
