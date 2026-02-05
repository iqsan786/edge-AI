 import { motion } from "framer-motion";
 import { Database, Target, Cpu, Layers, BarChart3, AlertCircle } from "lucide-react";
 
 const systemSpecs = [
   { icon: <Database className="w-4 h-4" />, label: "Dataset", value: "MIMII Valve Sound" },
   { icon: <Target className="w-4 h-4" />, label: "Task", value: "Binary Classification" },
   { icon: <Cpu className="w-4 h-4" />, label: "Target Device", value: "Raspberry Pi / Edge MCU" },
   { icon: <Layers className="w-4 h-4" />, label: "Feature Type", value: "MFCC-based Audio" },
   { icon: <BarChart3 className="w-4 h-4" />, label: "Input Dimension", value: "4096" },
   { icon: <AlertCircle className="w-4 h-4" />, label: "Class Distribution", value: "Imbalanced (Normal >> Abnormal)" },
 ];
 
 export function SystemOverview() {
   return (
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5 }}
       className="glass rounded-xl p-6"
     >
       <div className="flex items-center gap-3 mb-6">
         <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
           <Cpu className="w-5 h-5 text-primary-foreground" />
         </div>
         <div>
           <h3 className="text-lg font-semibold text-foreground">System Configuration</h3>
           <p className="text-sm text-muted-foreground">EdgeSense-AI Platform Specifications</p>
         </div>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {systemSpecs.map((spec, index) => (
           <motion.div
             key={index}
             initial={{ opacity: 0, x: -10 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 + index * 0.05 }}
             className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/30"
           >
             <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
               {spec.icon}
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-xs text-muted-foreground">{spec.label}</p>
               <p className="text-sm font-medium text-foreground truncate">{spec.value}</p>
             </div>
           </motion.div>
         ))}
       </div>
     </motion.div>
   );
 }