 import { useState } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { DashboardLayout } from "@/components/layout/DashboardLayout";
 import { MetricCard } from "@/components/dashboard/MetricCard";
 import { PipelineVisualization } from "@/components/dashboard/PipelineVisualization";
 import { SystemOverview } from "@/components/dashboard/SystemOverview";
 import { ModelComparisonPanel } from "@/components/dashboard/ModelComparisonPanel";
 import { TrainingCharts } from "@/components/dashboard/TrainingCharts";
 import { EdgeDeployment } from "@/components/dashboard/EdgeDeployment";
 import { ScalabilitySection } from "@/components/dashboard/ScalabilitySection";
 import { AboutSection } from "@/components/dashboard/AboutSection";
 import { Database, Target, Cpu, Layers } from "lucide-react";
 
 export default function Dashboard() {
   const [activeSection, setActiveSection] = useState("overview");
 
   const renderContent = () => {
     switch (activeSection) {
       case "overview":
         return (
           <motion.div
             key="overview"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="space-y-6"
           >
             {/* Page Header */}
             <div className="mb-8">
               <h1 className="text-3xl font-bold text-foreground mb-2">EdgeSense-AI Dashboard</h1>
               <p className="text-muted-foreground">
                 Industrial Machine Anomaly Detection • MIMII Valve Sound Dataset
               </p>
             </div>
 
             {/* Key Metrics */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
               <MetricCard
                 title="Model Accuracy"
                 value="88%"
                 subtitle="QIFNet Edge"
                 icon={<Target className="w-5 h-5" />}
                 variant="primary"
                 delay={0}
               />
               <MetricCard
                 title="Parameters"
                 value="4.4M"
                 subtitle="58% reduction"
                 icon={<Layers className="w-5 h-5" />}
                 trend="down"
                 trendValue="vs 10.5M baseline"
                 delay={0.1}
               />
               <MetricCard
                 title="Model Size"
                 value="17.6 MB"
                 subtitle="Edge deployable"
                 icon={<Database className="w-5 h-5" />}
                 variant="success"
                 delay={0.2}
               />
               <MetricCard
                 title="Inference Time"
                 value="~18ms"
                 subtitle="CPU mode"
                 icon={<Cpu className="w-5 h-5" />}
                 delay={0.3}
               />
             </div>
 
             {/* System Overview */}
             <SystemOverview />
 
             {/* Pipeline Visualization */}
             <PipelineVisualization />
 
             {/* Scalability */}
             <ScalabilitySection />
           </motion.div>
         );
 
       case "comparison":
         return (
           <motion.div
             key="comparison"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="space-y-6"
           >
             <div className="mb-8">
               <h1 className="text-3xl font-bold text-foreground mb-2">Model Comparison</h1>
               <p className="text-muted-foreground">
                 Baseline Neural Network vs QIFNet Edge (Proposed)
               </p>
             </div>
             <ModelComparisonPanel />
           </motion.div>
         );
 
       case "training":
         return (
           <motion.div
             key="training"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="space-y-6"
           >
             <div className="mb-8">
               <h1 className="text-3xl font-bold text-foreground mb-2">Training Results</h1>
               <p className="text-muted-foreground">
                 Training metrics and evaluation visualizations
               </p>
             </div>
             <TrainingCharts />
           </motion.div>
         );
 
       case "deployment":
         return (
           <motion.div
             key="deployment"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="space-y-6"
           >
             <div className="mb-8">
               <h1 className="text-3xl font-bold text-foreground mb-2">Edge Deployment</h1>
               <p className="text-muted-foreground">
                 Real-time inference simulation on edge hardware
               </p>
             </div>
             <EdgeDeployment />
           </motion.div>
         );
 
       case "about":
         return (
           <motion.div
             key="about"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="space-y-6"
           >
             <div className="mb-8">
               <h1 className="text-3xl font-bold text-foreground mb-2">About & Documentation</h1>
               <p className="text-muted-foreground">
                 Project overview and technical documentation
               </p>
             </div>
             <AboutSection />
           </motion.div>
         );
 
       default:
         return null;
     }
   };
 
   return (
     <DashboardLayout activeSection={activeSection} onSectionChange={setActiveSection}>
       <AnimatePresence mode="wait">
         {renderContent()}
       </AnimatePresence>
     </DashboardLayout>
   );
 }