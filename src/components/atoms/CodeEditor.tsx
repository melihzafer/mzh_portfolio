"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/atoms/Button";

interface CodeEditorProps {
  tabs: {
    name: string;
    content: string;
    language: string;
  }[];
  className?: string;
}

export default function CodeEditor({ tabs, className = "" }: CodeEditorProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [minimapData, setMinimapData] = useState<Array<{width: number, highlight: boolean}>>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Generate deterministic minimap based on content
    const generateMinimap = () => {
      const content = tabs[activeTab]?.content || '';
      return Array.from({ length: 20 }).map((_, i) => ({
        width: 30 + ((content.charCodeAt(i % content.length) || 50) % 70),
        highlight: (content.charCodeAt(i % content.length) || 50) % 5 === 0
      }));
    };
    setMinimapData(generateMinimap());
  }, [activeTab, tabs]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(tabs[activeTab].content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateLineNumbers = (content: string) => {
    const lines = content.split('\n');
    return lines.map((_, index) => index + 1);
  };

  return (
    <div className={`bg-[#0d1117] rounded-lg border border-[#30363d] overflow-hidden font-mono text-sm ${className}`}>
      {/* Tab Bar */}
      <div className="bg-[#161b22] border-b border-[#30363d] px-1 py-2 flex items-center">
        {tabs.map((tab, index) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(index)}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors mr-1 ${
              activeTab === index
                ? 'bg-[#0d1117] text-[#f0f6fc] border border-[#30363d]'
                : 'text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]'
            }`}
          >
            {tab.name}
          </button>
        ))}
        
        {/* Copy Button */}
        <Button
          onClick={handleCopy}
          variant="ghost"
          size="sm"
          className="ml-auto mr-2 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] border-none"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>

      {/* Editor Content */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex"
          >
            {/* Line Numbers */}
            <div className="bg-[#0d1117] text-[#6e7681] px-4 py-4 text-right select-none min-w-[60px] border-r border-[#30363d]">
              {generateLineNumbers(tabs[activeTab].content).map((lineNum) => (
                <div key={lineNum} className="leading-6">
                  {lineNum}
                </div>
              ))}
            </div>

            {/* Code Content */}
            <div className="flex-1 px-4 py-4 overflow-x-auto">
              <pre className="text-[#f0f6fc] whitespace-pre-wrap leading-6">
                <code>{tabs[activeTab].content}</code>
              </pre>
            </div>

            {/* Fake Minimap */}
            <div className="w-16 bg-[#161b22] border-l border-[#30363d] p-2 hidden lg:block">
              <div className="space-y-px">
                {isMounted && minimapData.map((item, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full ${
                      item.highlight ? 'bg-accent/60' : 'bg-[#30363d]'
                    }`}
                    style={{ width: `${item.width}%` }}
                  />
                ))}
              </div>
              
              {/* Viewport indicator */}
              <div className="absolute right-2 top-8 w-12 h-6 border border-accent/30 rounded-sm bg-accent/10" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
