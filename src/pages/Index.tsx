
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNavbar } from "@/components/TopNavbar";
import { Dashboard } from "@/components/Dashboard";
import { Projects } from "@/components/Projects";
import { Expenses } from "@/components/Expenses";
import { Goals } from "@/components/Goals";
import { ChatbotModal } from "@/components/ChatbotModal";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "projects":
        return <Projects />;
      case "expenses":
        return <Expenses />;
      case "goals":
        return <Goals />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <TopNavbar 
            activeView={activeView} 
            setActiveView={setActiveView}
            onChatbotOpen={() => setIsChatbotOpen(true)}
          />
          
          <main className="flex-1 p-6">
            {renderActiveView()}
          </main>
        </div>

        <ChatbotModal 
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;
