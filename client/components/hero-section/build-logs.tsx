import React, { useState } from "react";
import { Card } from "../ui/card";
import { LoaderCircle, ChevronDown, ChevronUp } from "lucide-react";

const BuildLogs = ({
  logs,
  hasError,
  deployMode,
}: {
  logs: string[];
  hasError: boolean;
  deployMode: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);
  const done = !deployMode;

  return (
    <Card className="bg-zinc-950 border-zinc-800 p-4 font-mono text-xs text-zinc-400 flex flex-col gap-1">
      <div className="flex items-center justify-between mb-2">
        <p className="text-zinc-500 text-[11px] uppercase tracking-widest">
          Build Output
        </p>
        {done && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        )}
      </div>
      <div
        className={`flex flex-col gap-1 overflow-y-auto transition-all duration-300 ${
          done && !expanded ? "max-h-20" : "max-h-96"
        }`}
      >
        {logs.map((log, i) => (
          <p
            key={i}
            className={log.startsWith("ERROR:") ? "text-red-400" : "text-zinc-400"}
          >
            {log}
          </p>
        ))}
        {!hasError && (
          <span className="flex items-center gap-1.5 mt-1">
            <LoaderCircle className="animate-spin" size={10} />
            waiting for build to complete
          </span>
        )}
      </div>
    </Card>
  );
};

export default BuildLogs;
