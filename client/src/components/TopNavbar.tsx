
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
    <nav className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeView === item.id ? "default" : "ghost"}
              className={`flex items-center space-x-2 ${
                activeView === item.id 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
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
          className="flex items-center space-x-2 border-border text-foreground hover:bg-accent"
          onClick={onChatbotOpen}
        >
          <MessageSquare className="h-4 w-4" />
          <span>AI Assistant</span>
        </Button>
      </div>
    </nav>
  );
}
