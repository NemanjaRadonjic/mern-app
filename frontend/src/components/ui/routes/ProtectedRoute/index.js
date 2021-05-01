import React from "react";
import { Route, Redirect } from "react-router-dom";

import { toast } from "react-toastify";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = window.localStorage.getItem("user"); // needs a fix
  return (
    <Route
      {...rest}
      render={(props) =>
        rest.userPrivilege ? (
          user ? (
            <Component {...props} type={rest.type} />
          ) : (
            toast.error(rest.redirectMsg) && <Redirect to={rest.redirectTo} />
          )
        ) : user ? (
          toast.error(rest.redirectMsg) && <Redirect to={rest.redirectTo} />
        ) : (
          <Component {...props} type={rest.type} />
        )
      }
    />
  );
};

export default ProtectedRoute;
