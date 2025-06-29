import { useState, useEffect } from "react";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { AddProjectModal } from "@/components/AddProjectModal";
import { fetchProjects, addProject } from "@/lib/api";

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);

  // ✅ Fetch projects on load
  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  // ✅ Handle project add
  const handleAddProject = async (newProject: any) => {
    try {
      const saved = await addProject(newProject);
      setProjects((prev) => [...prev, saved]);
    } catch (err) {
      console.error("Failed to add project:", err);
    }
  };

  return (
    <>
      <Sidebar className={`${isCollapsed ? "w-14" : "w-64"} bg-sidebar border-r border-sidebar-border`}>
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-sidebar-foreground" />
              <h1 className="text-xl font-bold text-sidebar-foreground">Kitawise</h1>
            </div>
          )}
        </div>

        <SidebarContent className="bg-sidebar">
          <SidebarGroup>
            <div className="flex items-center justify-between mb-2">
              <SidebarGroupLabel className="text-sidebar-foreground/70 text-sm font-medium">
                {!isCollapsed && "Current Projects"}
              </SidebarGroupLabel>
              {!isCollapsed && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  onClick={() => setIsAddProjectOpen(true)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              )}
            </div>

            <SidebarGroupContent>
              <SidebarMenu>
                {projects.map((project) => (
                  <SidebarMenuItem key={project._id}>
                    <SidebarMenuButton className="text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent">
                      <Folder className="h-4 w-4 text-sidebar-foreground/60" />
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{project.name}</div>
                          <div className="text-xs text-sidebar-foreground/50 truncate">{project.client}</div>
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

      {/* 🆕 Pass the handler here */}
      <AddProjectModal 
        isOpen={isAddProjectOpen}
        onClose={() => setIsAddProjectOpen(false)}
        onAddProject={handleAddProject}
      />
    </>
  );
}
