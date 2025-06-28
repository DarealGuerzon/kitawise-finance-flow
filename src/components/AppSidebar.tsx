
import { useState } from "react";
import { Folder, Plus, DollarSign } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { AddProjectModal } from "@/components/AddProjectModal";

const mockProjects = [
  { id: 1, name: "Website Design", client: "ABC Corp", income: 45000, expected: 50000 },
  { id: 2, name: "Mobile App", client: "XYZ Ltd", income: 80000, expected: 75000 },
  { id: 3, name: "Logo Design", client: "StartupCo", income: 15000, expected: 20000 },
];

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

  return (
    <>
      <Sidebar className={`${collapsed ? "w-14" : "w-64"} bg-gray-900 border-r border-gray-800`}>
        <div className="p-4 border-b border-gray-800">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-blue-400" />
              <h1 className="text-xl font-bold text-white">Kitawise</h1>
            </div>
          )}
          <SidebarTrigger className="mt-2 text-gray-400 hover:text-white" />
        </div>

        <SidebarContent className="bg-gray-900">
          <SidebarGroup>
            <div className="flex items-center justify-between mb-2">
              <SidebarGroupLabel className="text-gray-300 text-sm font-medium">
                {!collapsed && "Current Projects"}
              </SidebarGroupLabel>
              {!collapsed && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
                  onClick={() => setIsAddProjectOpen(true)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              )}
            </div>

            <SidebarGroupContent>
              <SidebarMenu>
                {mockProjects.map((project) => (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton className="text-gray-300 hover:text-white hover:bg-gray-800">
                      <Folder className="h-4 w-4 text-blue-400" />
                      {!collapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{project.name}</div>
                          <div className="text-xs text-gray-500 truncate">{project.client}</div>
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <AddProjectModal 
        isOpen={isAddProjectOpen}
        onClose={() => setIsAddProjectOpen(false)}
      />
    </>
  );
}
