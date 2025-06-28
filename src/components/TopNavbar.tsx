
import { Button } from "@/components/ui/button";
import { MessageSquare, BarChart, Folder, CreditCard, Goal } from "lucide-react";

interface TopNavbarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onChatbotOpen: () => void;
}

export function TopNavbar({ activeView, setActiveView, onChatbotOpen }: TopNavbarProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart },
    { id: "projects", label: "Projects", icon: Folder },
    { id: "expenses", label: "Expenses", icon: CreditCard },
    { id: "goals", label: "Goals", icon: Goal },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeView === item.id ? "default" : "ghost"}
              className={`flex items-center space-x-2 ${
                activeView === item.id 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
              onClick={() => setActiveView(item.id)}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          className="flex items-center space-x-2 border-blue-200 text-blue-600 hover:bg-blue-50"
          onClick={onChatbotOpen}
        >
          <MessageSquare className="h-4 w-4" />
          <span>AI Assistant</span>
        </Button>
      </div>
    </nav>
  );
}
