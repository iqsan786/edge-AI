 import { motion } from "framer-motion";
 import { AudioWaveform, Cpu, Brain, AlertTriangle, CheckCircle } from "lucide-react";
 
 const pipelineSteps = [
   { icon: <AudioWaveform className="w-5 h-5" />, label: "Audio Signal", sublabel: "WAV Input" },
   { icon: <Cpu className="w-5 h-5" />, label: "MFCC Extraction", sublabel: "4096 Features" },
   { icon: <Brain className="w-5 h-5" />, label: "QIFNet Edge", sublabel: "Inference" },
   { icon: <CheckCircle className="w-5 h-5" />, label: "Anomaly Detection", sublabel: "Output" },
 ];
 
 export function PipelineVisualization() {
   return (
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5, delay: 0.2 }}
       className="glass rounded-xl p-6"
     >
       <h3 className="text-lg font-semibold text-foreground mb-6">Processing Pipeline</h3>
       
       <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
         {pipelineSteps.map((step, index) => (
           <div key={index} className="flex items-center">
             <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
               className="flex flex-col items-center min-w-[100px]"
             >
               <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-2">
                 {step.icon}
               </div>
               <span className="text-sm font-medium text-foreground text-center">{step.label}</span>
               <span className="text-xs text-muted-foreground">{step.sublabel}</span>
             </motion.div>
             
             {index < pipelineSteps.length - 1 && (
               <motion.div
                 initial={{ scaleX: 0 }}
                 animate={{ scaleX: 1 }}
                 transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                 className="w-8 h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 mx-2"
               />
             )}
           </div>
         ))}
       </div>
     </motion.div>
   );
 }