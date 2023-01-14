// import AdminContext from "src/store/AdminContext";
import { AdminProvider } from "src/store/AdminContext";
// import AdminLayout from "./AdminLayout";

export default function withContext(WrappedComponent) {
  return () => (
    <AdminProvider>
      <WrappedComponent />
    </AdminProvider>
  );
}
