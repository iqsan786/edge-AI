 import { motion } from "framer-motion";
 import { Brain, Zap, Scale, Clock, HardDrive, CheckCircle, XCircle } from "lucide-react";
 import { cn } from "@/lib/utils";
 
 interface ModelSpec {
   name: string;
   description: string;
   params: string;
   accuracy: string;
   f1Score: string;
   modelSize: string;
   inferenceTime: string;
   edgeSuitable: boolean;
   features: string[];
   isProposed?: boolean;
 }
 
 const models: ModelSpec[] = [
   {
     name: "Baseline Neural Network",
     description: "Large Dense MLP Architecture",
     params: "10.5M",
     accuracy: "76-88%",
     f1Score: "0.72-0.85",
     modelSize: "42.1 MB",
     inferenceTime: "~45ms",
     edgeSuitable: false,
     features: ["Dense Fully Connected Layers", "High Parameter Count", "Standard Backpropagation", "Not Optimized for Edge"],
   },
   {
     name: "QIFNet Edge",
     description: "Quantum-Inspired Feature Mixing",
     params: "4.4M",
     accuracy: "~88%",
     f1Score: "0.86-0.89",
     modelSize: "17.6 MB",
     inferenceTime: "~18ms",
     edgeSuitable: true,
     features: ["Hadamard-Based Mixing", "~60% Fewer Parameters", "Structured Sparsity", "Edge-Optimized"],
     isProposed: true,
   },
 ];
 
 const comparisonMetrics = [
   { label: "Parameters", baseline: "10.5M", proposed: "4.4M", improvement: "-58%" },
   { label: "Accuracy", baseline: "~76-88%", proposed: "~88%", improvement: "+12%" },
   { label: "F1 Score", baseline: "0.72-0.85", proposed: "0.86-0.89", improvement: "+15%" },
   { label: "Model Size", baseline: "42.1 MB", proposed: "17.6 MB", improvement: "-58%" },
   { label: "Inference", baseline: "~45ms", proposed: "~18ms", improvement: "-60%" },
   { label: "Edge Ready", baseline: "No", proposed: "Yes", improvement: "✓" },
 ];
 
 export function ModelComparisonPanel() {
   return (
     <div className="space-y-6">
       {/* Model Cards */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {models.map((model, index) => (
           <motion.div
             key={model.name}
             initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5, delay: 0.1 * index }}
             className={cn(
               "glass rounded-xl p-6 relative overflow-hidden",
               model.isProposed && "border-primary/50 glow-primary"
             )}
           >
             {model.isProposed && (
               <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
                 PROPOSED
               </div>
             )}
             
             <div className="flex items-start gap-4 mb-6">
               <div className={cn(
                 "w-12 h-12 rounded-xl flex items-center justify-center",
                 model.isProposed ? "gradient-primary" : "bg-secondary"
               )}>
                 {model.isProposed ? (
                   <Zap className="w-6 h-6 text-primary-foreground" />
                 ) : (
                   <Brain className="w-6 h-6 text-muted-foreground" />
                 )}
               </div>
               <div>
                 <h3 className="text-lg font-semibold text-foreground">{model.name}</h3>
                 <p className="text-sm text-muted-foreground">{model.description}</p>
               </div>
             </div>
 
             {/* Metrics Grid */}
             <div className="grid grid-cols-2 gap-3 mb-6">
               <div className="p-3 rounded-lg bg-secondary/50">
                 <p className="text-xs text-muted-foreground mb-1">Parameters</p>
                 <p className="text-lg font-mono font-semibold text-foreground">{model.params}</p>
               </div>
               <div className="p-3 rounded-lg bg-secondary/50">
                 <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                 <p className="text-lg font-mono font-semibold text-foreground">{model.accuracy}</p>
               </div>
               <div className="p-3 rounded-lg bg-secondary/50">
                 <p className="text-xs text-muted-foreground mb-1">Model Size</p>
                 <p className="text-lg font-mono font-semibold text-foreground">{model.modelSize}</p>
               </div>
               <div className="p-3 rounded-lg bg-secondary/50">
                 <p className="text-xs text-muted-foreground mb-1">Inference</p>
                 <p className="text-lg font-mono font-semibold text-foreground">{model.inferenceTime}</p>
               </div>
             </div>
 
             {/* Features */}
             <div className="space-y-2">
               {model.features.map((feature, idx) => (
                 <div key={idx} className="flex items-center gap-2 text-sm">
                   <div className={cn(
                     "w-1.5 h-1.5 rounded-full",
                     model.isProposed ? "bg-primary" : "bg-muted-foreground"
                   )} />
                   <span className="text-muted-foreground">{feature}</span>
                 </div>
               ))}
             </div>
 
             {/* Edge Suitability */}
             <div className={cn(
               "mt-6 flex items-center gap-2 p-3 rounded-lg",
               model.edgeSuitable ? "status-normal" : "status-anomaly"
             )}>
               {model.edgeSuitable ? (
                 <CheckCircle className="w-4 h-4" />
               ) : (
                 <XCircle className="w-4 h-4" />
               )}
               <span className="text-sm font-medium">
                 {model.edgeSuitable ? "Edge Deployment Ready" : "Not Suitable for Edge"}
               </span>
             </div>
           </motion.div>
         ))}
       </div>
 
       {/* Comparison Table */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5, delay: 0.3 }}
         className="glass rounded-xl overflow-hidden"
       >
         <div className="p-4 border-b border-border/50">
           <h3 className="text-lg font-semibold text-foreground">Performance Comparison</h3>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full">
             <thead>
               <tr className="border-b border-border/30">
                 <th className="text-left p-4 text-sm font-medium text-muted-foreground">Metric</th>
                 <th className="text-center p-4 text-sm font-medium text-muted-foreground">Baseline</th>
                 <th className="text-center p-4 text-sm font-medium text-primary">QIFNet Edge</th>
                 <th className="text-center p-4 text-sm font-medium text-muted-foreground">Improvement</th>
               </tr>
             </thead>
             <tbody>
               {comparisonMetrics.map((metric, index) => (
                 <tr key={metric.label} className="border-b border-border/20 last:border-0">
                   <td className="p-4 text-sm font-medium text-foreground">{metric.label}</td>
                   <td className="p-4 text-center text-sm font-mono text-muted-foreground">{metric.baseline}</td>
                   <td className="p-4 text-center text-sm font-mono text-primary font-medium">{metric.proposed}</td>
                   <td className="p-4 text-center">
                     <span className={cn(
                       "text-sm font-mono font-medium px-2 py-1 rounded",
                       metric.improvement.startsWith("-") || metric.improvement === "✓" 
                         ? "bg-success/10 text-success" 
                         : metric.improvement.startsWith("+") 
                         ? "bg-success/10 text-success"
                         : "bg-muted text-muted-foreground"
                     )}>
                       {metric.improvement}
                     </span>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </motion.div>
     </div>
   );
 }