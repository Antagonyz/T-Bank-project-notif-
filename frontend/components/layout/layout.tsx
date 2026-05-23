import Sidebar from "./sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F4F5F7] text-[#111318] md:flex md:bg-[#0B0F19] md:text-white">
      <Sidebar />

      <div className="w-full flex-1 overflow-y-auto pb-24 md:p-8 md:pb-8">
        <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 md:px-0 md:py-0">
          {children}
        </div>
      </div>
    </main>
  );
}
