import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const { asPath } = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    setIsAdmin(isAdmin ? isAdmin === "yes" : false);
  }, [asPath]);

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;

export { AdminProvider };
