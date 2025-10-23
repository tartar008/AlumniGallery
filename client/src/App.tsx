import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import HomePage from "@/pages/home";
import MembersPage from "@/pages/members";
import MemberProfilePage from "@/pages/member-profile";
import GalleryPage from "@/pages/gallery";
import TimelinePage from "@/pages/timeline";
import DashboardPage from "@/pages/dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/members" component={MembersPage} />
      <Route path="/members/:id" component={MemberProfilePage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/timeline" component={TimelinePage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <header className="flex items-center gap-4 p-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-30">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <h1 className="font-serif font-semibold text-lg">Alumni Showcase</h1>
                </header>
                <main className="flex-1 overflow-y-auto">
                  <Router />
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
