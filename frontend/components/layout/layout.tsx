import Sidebar from "./sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen bg-[#0B0F19] text-white">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        {children}
      </div>
    </main>
  );
}