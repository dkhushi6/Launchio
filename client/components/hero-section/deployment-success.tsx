"use client";
import React, { useState } from "react";
import { Card } from "../ui/card";
import { Check, Copy, ExternalLink, Globe } from "lucide-react";
import { Button } from "../ui/button";
import { handleCopy } from "../../app/functions/handleCopy";

const DeploymentSuccess = ({ deployUrl }: { deployUrl: string }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div>
      {" "}
      <Card className="p-5 border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium uppercase tracking-wide">
              <Globe size={12} />
              Deployment successful
            </div>
            <a
              href={deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-green-700 hover:underline truncate"
            >
              {deployUrl.replace("https://", "")}
            </a>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              onClick={() => handleCopy({ deployUrl, setCopied })}
              className="flex items-center justify-center h-8 w-8 rounded-md border border-green-300 hover:bg-green-100 dark:hover:bg-green-900 transition text-green-700"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </Button>
            <a
              href={deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-8 w-8 rounded-md border border-green-300 hover:bg-green-100 dark:hover:bg-green-900 transition text-green-700"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DeploymentSuccess;
