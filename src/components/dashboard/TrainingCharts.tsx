 import { motion } from "framer-motion";
 import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
 
 const trainingData = [
   { epoch: 1, baselineLoss: 0.89, qifnetLoss: 0.82, baselineAcc: 0.52, qifnetAcc: 0.58 },
   { epoch: 5, baselineLoss: 0.71, qifnetLoss: 0.61, baselineAcc: 0.64, qifnetAcc: 0.72 },
   { epoch: 10, baselineLoss: 0.58, qifnetLoss: 0.45, baselineAcc: 0.71, qifnetAcc: 0.79 },
   { epoch: 15, baselineLoss: 0.48, qifnetLoss: 0.35, baselineAcc: 0.76, qifnetAcc: 0.83 },
   { epoch: 20, baselineLoss: 0.41, qifnetLoss: 0.28, baselineAcc: 0.79, qifnetAcc: 0.85 },
   { epoch: 25, baselineLoss: 0.36, qifnetLoss: 0.23, baselineAcc: 0.82, qifnetAcc: 0.87 },
   { epoch: 30, baselineLoss: 0.32, qifnetLoss: 0.19, baselineAcc: 0.84, qifnetAcc: 0.88 },
   { epoch: 35, baselineLoss: 0.29, qifnetLoss: 0.17, baselineAcc: 0.85, qifnetAcc: 0.88 },
   { epoch: 40, baselineLoss: 0.27, qifnetLoss: 0.15, baselineAcc: 0.86, qifnetAcc: 0.88 },
 ];
 
 const f1Data = [
   { name: "Baseline", f1: 0.78 },
   { name: "QIFNet Edge", f1: 0.87 },
 ];
 
 const confusionData = {
   baseline: { tp: 82, tn: 890, fp: 45, fn: 33 },
   qifnet: { tp: 95, tn: 912, fp: 23, fn: 20 },
 };
 
 export function TrainingCharts() {
   return (
     <div className="space-y-6">
       {/* Loss Chart */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="glass rounded-xl p-6"
       >
         <h3 className="text-lg font-semibold text-foreground mb-4">Training Loss vs Epochs</h3>
         <div className="h-[300px]">
           <ResponsiveContainer width="100%" height="100%">
             <LineChart data={trainingData}>
               <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
               <XAxis 
                 dataKey="epoch" 
                 stroke="hsl(var(--muted-foreground))" 
                 fontSize={12}
                 label={{ value: "Epoch", position: "bottom", fill: "hsl(var(--muted-foreground))" }}
               />
               <YAxis 
                 stroke="hsl(var(--muted-foreground))" 
                 fontSize={12}
                 label={{ value: "Loss", angle: -90, position: "insideLeft", fill: "hsl(var(--muted-foreground))" }}
               />
               <Tooltip 
                 contentStyle={{ 
                   backgroundColor: "hsl(var(--card))", 
                   border: "1px solid hsl(var(--border))",
                   borderRadius: "8px"
                 }}
               />
               <Legend />
               <Line 
                 type="monotone" 
                 dataKey="baselineLoss" 
                 name="Baseline" 
                 stroke="hsl(var(--chart-2))" 
                 strokeWidth={2}
                 dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 0 }}
               />
               <Line 
                 type="monotone" 
                 dataKey="qifnetLoss" 
                 name="QIFNet Edge" 
                 stroke="hsl(var(--chart-1))" 
                 strokeWidth={2}
                 dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 0 }}
               />
             </LineChart>
           </ResponsiveContainer>
         </div>
       </motion.div>
 
       {/* Accuracy Chart */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5, delay: 0.1 }}
         className="glass rounded-xl p-6"
       >
         <h3 className="text-lg font-semibold text-foreground mb-4">Accuracy vs Epochs</h3>
         <div className="h-[300px]">
           <ResponsiveContainer width="100%" height="100%">
             <LineChart data={trainingData}>
               <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
               <XAxis 
                 dataKey="epoch" 
                 stroke="hsl(var(--muted-foreground))" 
                 fontSize={12}
               />
               <YAxis 
                 stroke="hsl(var(--muted-foreground))" 
                 fontSize={12}
                 domain={[0.4, 1]}
                 tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
               />
               <Tooltip 
                 contentStyle={{ 
                   backgroundColor: "hsl(var(--card))", 
                   border: "1px solid hsl(var(--border))",
                   borderRadius: "8px"
                 }}
                 formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
               />
               <Legend />
               <Line 
                 type="monotone" 
                 dataKey="baselineAcc" 
                 name="Baseline" 
                 stroke="hsl(var(--chart-2))" 
                 strokeWidth={2}
                 dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 0 }}
               />
               <Line 
                 type="monotone" 
                 dataKey="qifnetAcc" 
                 name="QIFNet Edge" 
                 stroke="hsl(var(--chart-1))" 
                 strokeWidth={2}
                 dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 0 }}
               />
             </LineChart>
           </ResponsiveContainer>
         </div>
       </motion.div>
 
       {/* F1 Score & Confusion Matrix */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* F1 Score Comparison */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.2 }}
           className="glass rounded-xl p-6"
         >
           <h3 className="text-lg font-semibold text-foreground mb-4">F1-Score Comparison</h3>
           <p className="text-sm text-muted-foreground mb-4">
              F1-score is crucial due to class imbalance (Normal greatly exceeds Abnormal)
           </p>
           <div className="h-[200px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={f1Data} layout="vertical">
                 <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                 <XAxis type="number" domain={[0, 1]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                 <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
                 <Tooltip 
                   contentStyle={{ 
                     backgroundColor: "hsl(var(--card))", 
                     border: "1px solid hsl(var(--border))",
                     borderRadius: "8px"
                   }}
                 />
                 <Bar dataKey="f1" radius={[0, 4, 4, 0]}>
                   {f1Data.map((entry, index) => (
                     <Cell 
                       key={`cell-${index}`} 
                       fill={index === 1 ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))"} 
                     />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
         </motion.div>
 
         {/* Confusion Matrix */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.3 }}
           className="glass rounded-xl p-6"
         >
           <h3 className="text-lg font-semibold text-foreground mb-4">Confusion Matrix (QIFNet Edge)</h3>
           <div className="grid grid-cols-2 gap-2 max-w-[280px] mx-auto">
             <div className="text-center p-4 rounded-lg bg-success/20 border border-success/30">
               <p className="text-2xl font-mono font-bold text-success">{confusionData.qifnet.tp}</p>
               <p className="text-xs text-muted-foreground mt-1">True Positive</p>
             </div>
             <div className="text-center p-4 rounded-lg bg-destructive/20 border border-destructive/30">
               <p className="text-2xl font-mono font-bold text-destructive">{confusionData.qifnet.fp}</p>
               <p className="text-xs text-muted-foreground mt-1">False Positive</p>
             </div>
             <div className="text-center p-4 rounded-lg bg-destructive/20 border border-destructive/30">
               <p className="text-2xl font-mono font-bold text-destructive">{confusionData.qifnet.fn}</p>
               <p className="text-xs text-muted-foreground mt-1">False Negative</p>
             </div>
             <div className="text-center p-4 rounded-lg bg-success/20 border border-success/30">
               <p className="text-2xl font-mono font-bold text-success">{confusionData.qifnet.tn}</p>
               <p className="text-xs text-muted-foreground mt-1">True Negative</p>
             </div>
           </div>
           <p className="text-center text-xs text-muted-foreground mt-4">
             Predicted vs Actual: Normal / Abnormal
           </p>
         </motion.div>
       </div>
     </div>
   );
 }