import { Sidebar } from "@/components/shared/Sidebar";
import { Header } from "@/components/shared/Header";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { LayoutProvider } from "@/components/providers/LayoutProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutProvider>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header />
        <div className="flex flex-1 relative">
          <Sidebar />
          <main className="flex-1 p-6 md:p-8 lg:p-10">
            <PageWrapper>
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </PageWrapper>
          </main>
        </div>
      </div>
    </LayoutProvider>
  );
}
