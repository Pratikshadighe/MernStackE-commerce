import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

export const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      <Routes>
        {loading === false && (
          <Route
            {...rest}
            render={(props) => {
              if (isAuthenticated === false) {
                return <Navigate to="/login" />;
              }

              if (isAdmin === true && user.role !== "admin") {
                return <Navigate to="/login" />;
              }

              return <Component {...props} />;
            }}
          />
        )}
      </Routes>
    </Fragment>
  );
};
