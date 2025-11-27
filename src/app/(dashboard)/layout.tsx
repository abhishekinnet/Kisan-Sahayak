import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { ParticleBackground } from "@/components/dashboard/particle-background";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatProvider } from "@/context/chat-provider";
import { ChatPanel } from "@/components/chat/chat-panel";
import { ChatTrigger } from "@/components/chat/chat-trigger";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <ChatProvider>
        <AppSidebar />
        <div className="relative flex flex-col h-screen w-full">
          <ParticleBackground />
          <Header />
          <main className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-4 sm:p-6 md:p-8">
                {children}
              </div>
            </ScrollArea>
          </main>
          <ChatTrigger />
          <ChatPanel />
        </div>
      </ChatProvider>
    </SidebarProvider>
  );
}
