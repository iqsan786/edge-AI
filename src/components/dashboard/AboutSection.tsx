 import { motion } from "framer-motion";
 import { BookOpen, Cpu, Zap, Shield, Target, Award } from "lucide-react";
 
 const features = [
   {
     icon: <Zap className="w-5 h-5" />,
     title: "Quantum-Inspired Architecture",
     description: "Leverages Hadamard-based structured feature mixing for efficient representation learning without quantum hardware.",
   },
   {
     icon: <Cpu className="w-5 h-5" />,
     title: "Edge-Optimized Design",
     description: "Achieves 58% parameter reduction enabling deployment on resource-constrained devices like Raspberry Pi.",
   },
   {
     icon: <Target className="w-5 h-5" />,
     title: "Industrial Relevance",
     description: "Trained on MIMII dataset with real-world valve machine sounds for practical anomaly detection.",
   },
   {
     icon: <Shield className="w-5 h-5" />,
     title: "Imbalanced Data Handling",
     description: "Optimized for scenarios where normal samples greatly exceed anomalies, common in industrial settings.",
   },
 ];
 
 export function AboutSection() {
   return (
     <div className="space-y-6">
       {/* Hero Section */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="glass rounded-xl p-8 text-center"
       >
         <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 glow-primary">
           <BookOpen className="w-8 h-8 text-primary-foreground" />
         </div>
         <h2 className="text-2xl font-bold text-foreground mb-4">About EdgeSense-AI</h2>
         <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
           This project demonstrates a <span className="text-primary font-medium">quantum-inspired structured feature mixing approach</span>{" "}
           that reduces model size and computation, enabling real-time industrial anomaly detection on edge hardware.
           The focus is on <span className="text-primary font-medium">edge efficiency</span> and practical deployment,
           not quantum computing advantages.
         </p>
       </motion.div>
 
       {/* Features Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {features.map((feature, index) => (
           <motion.div
             key={feature.title}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 + index * 0.05 }}
             className="glass rounded-xl p-6"
           >
             <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                 {feature.icon}
               </div>
               <div>
                 <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                 <p className="text-sm text-muted-foreground">{feature.description}</p>
               </div>
             </div>
           </motion.div>
         ))}
       </div>
 
       {/* Technical Summary */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.3 }}
         className="glass rounded-xl p-6"
       >
         <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
           <Award className="w-5 h-5 text-primary" />
           Project Summary
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="p-4 rounded-lg bg-secondary/50">
             <p className="text-xs text-muted-foreground mb-1">Dataset</p>
             <p className="font-medium text-foreground">MIMII Valve Sound Dataset</p>
             <p className="text-xs text-muted-foreground mt-1">Industrial machine audio recordings</p>
           </div>
           <div className="p-4 rounded-lg bg-secondary/50">
             <p className="text-xs text-muted-foreground mb-1">Model Architecture</p>
             <p className="font-medium text-foreground">QIFNet Edge</p>
             <p className="text-xs text-muted-foreground mt-1">Hadamard-based feature mixing MLP</p>
           </div>
           <div className="p-4 rounded-lg bg-secondary/50">
             <p className="text-xs text-muted-foreground mb-1">Deployment Target</p>
             <p className="font-medium text-foreground">Edge Microprocessors</p>
             <p className="text-xs text-muted-foreground mt-1">Raspberry Pi, ARM-based devices</p>
           </div>
         </div>
       </motion.div>
 
       {/* Disclaimer */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.4 }}
         className="p-4 rounded-lg border border-border/50 bg-muted/30"
       >
         <p className="text-sm text-muted-foreground text-center">
           <span className="font-medium text-foreground">Note:</span> This is a research demonstration for academic final-year project evaluation.
           The system uses simulated data for real-time monitoring demonstrations.
         </p>
       </motion.div>
     </div>
   );
 }