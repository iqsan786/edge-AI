 import { useState, useEffect } from "react";
 import { motion } from "framer-motion";
 import { Cpu, HardDrive, Clock, Activity, Upload, AlertTriangle, CheckCircle, FileAudio } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Progress } from "@/components/ui/progress";
 import { cn } from "@/lib/utils";
 
 interface AlertLog {
   id: number;
   timestamp: string;
   status: "normal" | "anomaly";
   confidence: number;
   filename: string;
 }
 
 const mockAlertLogs: AlertLog[] = [
   { id: 1, timestamp: "14:32:15", status: "normal", confidence: 0.94, filename: "valve_001.wav" },
   { id: 2, timestamp: "14:32:18", status: "normal", confidence: 0.91, filename: "valve_002.wav" },
   { id: 3, timestamp: "14:32:21", status: "anomaly", confidence: 0.87, filename: "valve_003.wav" },
   { id: 4, timestamp: "14:32:24", status: "normal", confidence: 0.96, filename: "valve_004.wav" },
   { id: 5, timestamp: "14:32:27", status: "normal", confidence: 0.89, filename: "valve_005.wav" },
 ];
 
 export function EdgeDeployment() {
   const [isMonitoring, setIsMonitoring] = useState(true);
   const [currentInference, setCurrentInference] = useState<{
     status: "normal" | "anomaly" | "processing" | "idle";
     confidence: number;
   }>({ status: "idle", confidence: 0 });
   const [inferenceTime, setInferenceTime] = useState(18);
   const [memoryUsage, setMemoryUsage] = useState(42);
   const [alertLogs, setAlertLogs] = useState<AlertLog[]>(mockAlertLogs);
 
   // Simulate live monitoring
   useEffect(() => {
     if (!isMonitoring) return;
     
     const interval = setInterval(() => {
       const isAnomaly = Math.random() < 0.15;
       const confidence = 0.82 + Math.random() * 0.17;
       
       setCurrentInference({
         status: isAnomaly ? "anomaly" : "normal",
         confidence,
       });
 
       setInferenceTime(16 + Math.random() * 8);
       setMemoryUsage(38 + Math.random() * 12);
 
       // Add to logs
       const newLog: AlertLog = {
         id: Date.now(),
         timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
         status: isAnomaly ? "anomaly" : "normal",
         confidence,
         filename: `valve_${String(Math.floor(Math.random() * 999)).padStart(3, "0")}.wav`,
       };
       setAlertLogs((prev) => [newLog, ...prev.slice(0, 9)]);
     }, 3000);
 
     return () => clearInterval(interval);
   }, [isMonitoring]);
 
   const handleSimulateUpload = () => {
     setCurrentInference({ status: "processing", confidence: 0 });
     
     setTimeout(() => {
       const isAnomaly = Math.random() < 0.3;
       const confidence = 0.85 + Math.random() * 0.14;
       setCurrentInference({
         status: isAnomaly ? "anomaly" : "normal",
         confidence,
       });
     }, 1500);
   };
 
   return (
     <div className="space-y-6">
       {/* Device Status Header */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="glass rounded-xl p-6"
       >
         <div className="flex items-center justify-between mb-6">
           <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
               <Cpu className="w-7 h-7 text-primary" />
             </div>
             <div>
               <h3 className="text-lg font-semibold text-foreground">Raspberry Pi 4 Model B</h3>
               <p className="text-sm text-muted-foreground">Edge Inference Device • CPU Mode</p>
             </div>
           </div>
           <div className="flex items-center gap-3">
             <div className={cn(
               "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
               isMonitoring ? "status-normal" : "bg-muted text-muted-foreground"
             )}>
               <Activity className={cn("w-4 h-4", isMonitoring && "animate-pulse")} />
               {isMonitoring ? "Live Monitoring" : "Paused"}
             </div>
             <Button
               variant="outline"
               size="sm"
               onClick={() => setIsMonitoring(!isMonitoring)}
             >
               {isMonitoring ? "Pause" : "Resume"}
             </Button>
           </div>
         </div>
 
         {/* Device Metrics */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className="p-4 rounded-lg bg-secondary/50">
             <div className="flex items-center gap-2 text-muted-foreground mb-2">
               <Clock className="w-4 h-4" />
               <span className="text-xs">Avg. Inference</span>
             </div>
             <p className="text-xl font-mono font-semibold text-foreground">
               {inferenceTime.toFixed(1)}ms
             </p>
           </div>
           <div className="p-4 rounded-lg bg-secondary/50">
             <div className="flex items-center gap-2 text-muted-foreground mb-2">
               <HardDrive className="w-4 h-4" />
               <span className="text-xs">Memory Usage</span>
             </div>
             <p className="text-xl font-mono font-semibold text-foreground">
               {memoryUsage.toFixed(0)} MB
             </p>
           </div>
           <div className="p-4 rounded-lg bg-secondary/50">
             <div className="flex items-center gap-2 text-muted-foreground mb-2">
               <Cpu className="w-4 h-4" />
               <span className="text-xs">Model Size</span>
             </div>
             <p className="text-xl font-mono font-semibold text-foreground">17.6 MB</p>
           </div>
           <div className="p-4 rounded-lg bg-secondary/50">
             <div className="flex items-center gap-2 text-muted-foreground mb-2">
               <Activity className="w-4 h-4" />
               <span className="text-xs">Throughput</span>
             </div>
             <p className="text-xl font-mono font-semibold text-foreground">~55/sec</p>
           </div>
         </div>
       </motion.div>
 
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Live Inference Widget */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="glass rounded-xl p-6"
         >
           <h3 className="text-lg font-semibold text-foreground mb-4">Live Inference Monitor</h3>
           
           {/* Upload Simulation */}
           <div className="mb-6">
             <Button
               onClick={handleSimulateUpload}
               className="w-full gradient-primary text-primary-foreground hover:opacity-90"
               disabled={currentInference.status === "processing"}
             >
               <Upload className="w-4 h-4 mr-2" />
               Simulate Audio Upload
             </Button>
           </div>
 
           {/* Result Display */}
           <div className={cn(
             "p-6 rounded-xl text-center transition-all duration-300",
             currentInference.status === "idle" && "bg-muted/50",
             currentInference.status === "processing" && "bg-primary/10 border border-primary/30",
             currentInference.status === "normal" && "bg-success/10 border border-success/30 glow-success",
             currentInference.status === "anomaly" && "bg-destructive/10 border border-destructive/30 glow-destructive"
           )}>
             {currentInference.status === "idle" && (
               <div className="text-muted-foreground">
                 <FileAudio className="w-12 h-12 mx-auto mb-2 opacity-50" />
                 <p>Awaiting audio input...</p>
               </div>
             )}
             {currentInference.status === "processing" && (
               <div className="text-primary">
                 <div className="w-12 h-12 mx-auto mb-2 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                 <p>Processing audio...</p>
               </div>
             )}
             {currentInference.status === "normal" && (
               <div className="text-success">
                 <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                 <p className="text-xl font-semibold">Normal Operation</p>
                 <p className="text-sm opacity-80">Confidence: {(currentInference.confidence * 100).toFixed(1)}%</p>
               </div>
             )}
             {currentInference.status === "anomaly" && (
               <div className="text-destructive">
                 <AlertTriangle className="w-12 h-12 mx-auto mb-2" />
                 <p className="text-xl font-semibold">Anomaly Detected!</p>
                 <p className="text-sm opacity-80">Confidence: {(currentInference.confidence * 100).toFixed(1)}%</p>
               </div>
             )}
           </div>
 
           {/* Confidence Bar */}
           {currentInference.status !== "idle" && currentInference.status !== "processing" && (
             <div className="mt-4">
               <div className="flex justify-between text-xs text-muted-foreground mb-1">
                 <span>Confidence Level</span>
                 <span>{(currentInference.confidence * 100).toFixed(1)}%</span>
               </div>
               <Progress 
                 value={currentInference.confidence * 100} 
                 className="h-2"
               />
             </div>
           )}
         </motion.div>
 
         {/* Alert Log History */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="glass rounded-xl p-6"
         >
           <h3 className="text-lg font-semibold text-foreground mb-4">Alert Log History</h3>
           <div className="space-y-2 max-h-[360px] overflow-y-auto">
             {alertLogs.map((log) => (
               <motion.div
                 key={log.id}
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 className={cn(
                   "flex items-center gap-3 p-3 rounded-lg text-sm",
                   log.status === "normal" ? "bg-success/5 border border-success/20" : "bg-destructive/5 border border-destructive/20"
                 )}
               >
                 {log.status === "normal" ? (
                   <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                 ) : (
                   <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                 )}
                 <span className="font-mono text-xs text-muted-foreground">{log.timestamp}</span>
                 <span className="flex-1 truncate text-foreground">{log.filename}</span>
                 <span className={cn(
                   "font-mono text-xs px-2 py-0.5 rounded",
                   log.status === "normal" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                 )}>
                   {(log.confidence * 100).toFixed(0)}%
                 </span>
               </motion.div>
             ))}
           </div>
         </motion.div>
       </div>
 
       {/* Memory Footprint Comparison */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.3 }}
         className="glass rounded-xl p-6"
       >
         <h3 className="text-lg font-semibold text-foreground mb-4">Memory Footprint Comparison</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
             <div className="flex justify-between text-sm mb-2">
               <span className="text-muted-foreground">Baseline Model</span>
               <span className="font-mono text-foreground">42.1 MB</span>
             </div>
             <div className="h-4 rounded-full bg-secondary overflow-hidden">
               <div className="h-full bg-warning/70 rounded-full" style={{ width: "100%" }} />
             </div>
             <p className="text-xs text-destructive mt-1">Exceeds typical edge device limits</p>
           </div>
           <div>
             <div className="flex justify-between text-sm mb-2">
               <span className="text-muted-foreground">QIFNet Edge</span>
               <span className="font-mono text-foreground">17.6 MB</span>
             </div>
             <div className="h-4 rounded-full bg-secondary overflow-hidden">
               <div className="h-full bg-primary rounded-full" style={{ width: "42%" }} />
             </div>
             <p className="text-xs text-success mt-1">58% smaller - Edge compatible</p>
           </div>
         </div>
       </motion.div>
     </div>
   );
 }