import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          toast.error(rest.redirectMsg) && <Redirect to={rest.redirectTo} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default ProtectedRoute;
