import { useEffect, useState } from "react";

const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    setIsAdmin(!!isAdmin);
    setLoading(false);
  }, []);

  return { isAdmin, loading };
};

export default useIsAdmin;
