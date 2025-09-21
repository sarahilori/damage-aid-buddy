import { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarTrigger,
  useSidebar 
} from '@/components/ui/sidebar';
import { 
  Home, 
  User, 
  Camera, 
  BarChart3, 
  BookOpen,
  Shield
} from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { title: 'Welcome', url: '/', icon: Home },
    { title: 'Profile', url: '/profile', icon: User },
    { title: 'Upload', url: '/upload', icon: Camera },
    { title: 'Results', url: '/results', icon: BarChart3 },
    { title: 'Education', url: '/education', icon: BookOpen },
  ];

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted/50";

  const AppSidebar = () => {
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";

    return (
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="px-3 py-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-md font-bold text-sm">
                    DD
                  </div>
                  {!isCollapsed && (
                    <span className="font-bold text-lg">Damage Detective</span>
                  )}
                </div>
              </div>
              
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} end className={getNavCls}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-12 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarTrigger className="ml-2" />
          </header>
          
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;