import AdminContext from "src/store/AdminContext";

export default function withContext(WrappedComponent) {
  return () => (
    <AdminContext>
      <WrappedComponent />
    </AdminContext>
  );
}
