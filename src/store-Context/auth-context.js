import React from "react";

const authContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
});
export default authContext;
