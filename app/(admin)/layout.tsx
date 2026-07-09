import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar/Sidebar";
import { Topbar } from "@/components/admin/topbar/Topbar";
import { DEMO_MODE } from "@/lib/demo";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user: { name?: string | null; email?: string | null };

  if (DEMO_MODE) {
    user = {
      name: "Demo Admin",
      email: "demo@collegeblink.com",
    };
  } else {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      redirect("/login?callbackUrl=/admin");
    }

    if (session.user.role !== "ADMIN") {
      redirect("/");
    }

    user = session.user;
  }

  return (
    <div className="h-screen bg-[#FAF8F4] dark:bg-zinc-950 flex overflow-hidden">
      <AdminSidebar user={user} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar user={user} />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8 lg:px-6 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}