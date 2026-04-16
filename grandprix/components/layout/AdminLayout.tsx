import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { LayoutProvider } from "@/components/providers/LayoutProvider";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <div className="min-h-screen flex flex-col bg-slate-50/50">
        <Header />
        <div className="flex flex-1 relative">
          <Sidebar />
          <main className="flex-1 p-8 animate-in fade-in duration-500">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </LayoutProvider>
  );
}
