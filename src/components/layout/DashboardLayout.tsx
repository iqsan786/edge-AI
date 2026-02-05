 import { useState } from "react";
 import { motion } from "framer-motion";
 import { 
   LayoutDashboard, 
   GitCompare, 
   LineChart, 
   Cpu, 
   Info, 
   ChevronLeft, 
   ChevronRight,
   Activity,
   Zap
 } from "lucide-react";
 import { cn } from "@/lib/utils";
 
 interface NavItem {
   id: string;
   label: string;
   icon: React.ReactNode;
 }
 
 const navItems: NavItem[] = [
   { id: "overview", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
   { id: "comparison", label: "Model Comparison", icon: <GitCompare className="w-5 h-5" /> },
   { id: "training", label: "Training Results", icon: <LineChart className="w-5 h-5" /> },
   { id: "deployment", label: "Edge Deployment", icon: <Cpu className="w-5 h-5" /> },
   { id: "about", label: "About", icon: <Info className="w-5 h-5" /> },
 ];
 
 interface DashboardLayoutProps {
   activeSection: string;
   onSectionChange: (section: string) => void;
   children: React.ReactNode;
 }
 
 export function DashboardLayout({ activeSection, onSectionChange, children }: DashboardLayoutProps) {
   const [isCollapsed, setIsCollapsed] = useState(false);
 
   return (
     <div className="flex min-h-screen bg-background">
       {/* Sidebar */}
       <motion.aside
         initial={false}
         animate={{ width: isCollapsed ? 72 : 260 }}
         transition={{ duration: 0.3, ease: "easeInOut" }}
         className="fixed left-0 top-0 h-screen glass-strong z-50 flex flex-col"
       >
         {/* Logo */}
         <div className="flex items-center gap-3 p-4 border-b border-border/50">
           <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center glow-primary">
             <Zap className="w-5 h-5 text-primary-foreground" />
           </div>
           {!isCollapsed && (
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="flex flex-col"
             >
               <span className="font-semibold text-foreground">EdgeSense-AI</span>
               <span className="text-xs text-muted-foreground">Industrial Monitoring</span>
             </motion.div>
           )}
         </div>
 
         {/* Navigation */}
         <nav className="flex-1 p-3 space-y-1">
           {navItems.map((item) => (
             <button
               key={item.id}
               onClick={() => onSectionChange(item.id)}
               className={cn(
                 "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                 activeSection === item.id
                   ? "bg-primary/10 text-primary glow-primary"
                   : "text-muted-foreground hover:bg-secondary hover:text-foreground"
               )}
             >
               {item.icon}
               {!isCollapsed && (
                 <motion.span
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="text-sm font-medium"
                 >
                   {item.label}
                 </motion.span>
               )}
               {activeSection === item.id && !isCollapsed && (
                 <motion.div
                   layoutId="activeIndicator"
                   className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                 />
               )}
             </button>
           ))}
         </nav>
 
         {/* System Status */}
         {!isCollapsed && (
           <div className="p-4 border-t border-border/50">
             <div className="flex items-center gap-2 text-xs text-muted-foreground">
               <Activity className="w-3 h-3 text-success animate-pulse" />
               <span>System Online</span>
             </div>
           </div>
         )}
 
         {/* Collapse Button */}
         <button
           onClick={() => setIsCollapsed(!isCollapsed)}
           className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
         >
           {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
         </button>
       </motion.aside>
 
       {/* Main Content */}
       <motion.main
         initial={false}
         animate={{ marginLeft: isCollapsed ? 72 : 260 }}
         transition={{ duration: 0.3, ease: "easeInOut" }}
         className="flex-1 min-h-screen"
       >
         <div className="p-6 lg:p-8">
           {children}
         </div>
       </motion.main>
     </div>
   );
 }