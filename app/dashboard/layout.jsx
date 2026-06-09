import Sidebar from "../../components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}