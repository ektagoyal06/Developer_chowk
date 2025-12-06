import Sidebar from "./components/Sidebar";

export default function AppLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-64 w-full p-6">
        {children}
      </main>
    </div>
  );
}
