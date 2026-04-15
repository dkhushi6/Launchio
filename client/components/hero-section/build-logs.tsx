import React from "react";
import { Card } from "../ui/card";
import { LoaderCircle } from "lucide-react";

const BuildLogs = ({ logs }: { logs: string[] }) => {
  return (
    <Card className="bg-zinc-950 border-zinc-800 p-4 font-mono text-xs text-zinc-400 flex flex-col gap-1 min-h-40 overflow-y-auto">
      <p className="text-zinc-500 mb-2 text-[11px] uppercase tracking-widest">
        Build Output
      </p>
      {logs.map((log, i) => (
        <p key={i} className="text-zinc-400">
          {log}
        </p>
      ))}
      <span className="flex items-center gap-1.5 mt-1">
        <LoaderCircle className="animate-spin" size={10} />
        waiting for build to complete
      </span>
    </Card>
  );
};

export default BuildLogs;
