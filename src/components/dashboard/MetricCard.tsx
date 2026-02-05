 import { motion } from "framer-motion";
 import { cn } from "@/lib/utils";
 
 interface MetricCardProps {
   title: string;
   value: string | number;
   subtitle?: string;
   icon?: React.ReactNode;
   trend?: "up" | "down" | "neutral";
   trendValue?: string;
   variant?: "default" | "primary" | "success" | "warning" | "destructive";
   delay?: number;
 }
 
 export function MetricCard({
   title,
   value,
   subtitle,
   icon,
   trend,
   trendValue,
   variant = "default",
   delay = 0,
 }: MetricCardProps) {
   const variantStyles = {
     default: "border-border/50",
     primary: "border-primary/30 bg-primary/5",
     success: "border-success/30 bg-success/5",
     warning: "border-warning/30 bg-warning/5",
     destructive: "border-destructive/30 bg-destructive/5",
   };
 
   return (
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5, delay }}
       className={cn(
         "glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.02]",
         variantStyles[variant]
       )}
     >
       <div className="flex items-start justify-between">
         <div className="space-y-1">
           <p className="text-sm text-muted-foreground">{title}</p>
           <p className="text-2xl font-bold font-mono text-foreground">{value}</p>
           {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
         </div>
         {icon && (
           <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary">
             {icon}
           </div>
         )}
       </div>
       {trend && trendValue && (
         <div className="mt-3 flex items-center gap-1">
           <span
             className={cn(
               "text-xs font-medium",
               trend === "up" && "text-success",
               trend === "down" && "text-destructive",
               trend === "neutral" && "text-muted-foreground"
             )}
           >
             {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
           </span>
         </div>
       )}
     </motion.div>
   );
 }