 import { useState } from "react";
 import { motion } from "framer-motion";
 import { Slider } from "@/components/ui/slider";
 import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
 
 const dimensionData = [
   { dim: "1024", baselineSize: 10.5, qifnetSize: 4.4, baselineLatency: 12, qifnetLatency: 5 },
   { dim: "2048", baselineSize: 21.0, qifnetSize: 8.8, baselineLatency: 24, qifnetLatency: 10 },
   { dim: "4096", baselineSize: 42.1, qifnetSize: 17.6, baselineLatency: 45, qifnetLatency: 18 },
   { dim: "8192", baselineSize: 84.2, qifnetSize: 35.2, baselineLatency: 92, qifnetLatency: 36 },
 ];
 
 export function ScalabilitySection() {
   const [selectedDim, setSelectedDim] = useState(2);
   const currentData = dimensionData[selectedDim];
 
   const chartData = [
     { name: "Baseline", size: currentData.baselineSize, latency: currentData.baselineLatency },
     { name: "QIFNet Edge", size: currentData.qifnetSize, latency: currentData.qifnetLatency },
   ];
 
   return (
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       className="glass rounded-xl p-6"
     >
       <h3 className="text-lg font-semibold text-foreground mb-2">Scalability & Efficiency Analysis</h3>
       <p className="text-sm text-muted-foreground mb-6">
         Explore how QIFNet Edge maintains efficiency across different feature dimensions
       </p>
 
       {/* Dimension Slider */}
       <div className="mb-8">
         <div className="flex justify-between text-sm text-muted-foreground mb-3">
           <span>Feature Dimension</span>
           <span className="font-mono text-primary font-semibold">{currentData.dim}</span>
         </div>
         <Slider
           value={[selectedDim]}
           onValueChange={(v) => setSelectedDim(v[0])}
           max={3}
           min={0}
           step={1}
           className="w-full"
         />
         <div className="flex justify-between text-xs text-muted-foreground mt-2">
           {dimensionData.map((d) => (
             <span key={d.dim}>{d.dim}</span>
           ))}
         </div>
       </div>
 
       {/* Charts */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Model Size */}
         <div>
           <h4 className="text-sm font-medium text-foreground mb-3">Model Size (MB)</h4>
           <div className="h-[200px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={chartData} layout="vertical">
                 <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                 <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                 <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={90} />
                 <Tooltip
                   contentStyle={{
                     backgroundColor: "hsl(var(--card))",
                     border: "1px solid hsl(var(--border))",
                     borderRadius: "8px",
                   }}
                   formatter={(value: number) => [`${value} MB`, "Size"]}
                 />
                 <Bar dataKey="size" radius={[0, 4, 4, 0]}>
                   {chartData.map((entry, index) => (
                     <Cell
                       key={`cell-${index}`}
                       fill={index === 1 ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))"}
                     />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
         </div>
 
         {/* Inference Latency */}
         <div>
           <h4 className="text-sm font-medium text-foreground mb-3">Inference Latency (ms)</h4>
           <div className="h-[200px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={chartData} layout="vertical">
                 <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                 <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                 <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={90} />
                 <Tooltip
                   contentStyle={{
                     backgroundColor: "hsl(var(--card))",
                     border: "1px solid hsl(var(--border))",
                     borderRadius: "8px",
                   }}
                   formatter={(value: number) => [`${value} ms`, "Latency"]}
                 />
                 <Bar dataKey="latency" radius={[0, 4, 4, 0]}>
                   {chartData.map((entry, index) => (
                     <Cell
                       key={`cell-${index}`}
                       fill={index === 1 ? "hsl(var(--chart-3))" : "hsl(var(--chart-5))"}
                     />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
         </div>
       </div>
 
       {/* Efficiency Note */}
       <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
         <p className="text-sm text-foreground">
           <span className="font-semibold text-primary">Key Insight:</span> QIFNet Edge maintains a consistent{" "}
           <span className="font-mono">~58%</span> reduction in model size and{" "}
           <span className="font-mono">~60%</span> faster inference across all dimensions, demonstrating
           scalable efficiency through Hadamard-based structured feature mixing.
         </p>
       </div>
     </motion.div>
   );
 }