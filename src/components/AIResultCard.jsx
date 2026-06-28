/**
 * components/AIResultCard.jsx
 * Reusable AI Output Card
 */

import { Copy, Download, RefreshCcw } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";
import toast from "react-hot-toast";

export default function AIResultCard({
  title,
  subtitle,
  content,
  onRegenerate,
}) {
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

      {/* Header */}

      <div className="flex items-center justify-between px-6 py-4 border-b">

        <div>

          <h2 className="text-xl font-semibold text-gray-800">
            {title}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {subtitle}
          </p>

        </div>

        <div className="flex gap-2">

          <button
            onClick={copyContent}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-gray-50 transition"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>

          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-gray-50 transition"
          >
            <Download className="w-4 h-4" />
            PDF
          </button>

          {onRegenerate && (
            <button
              onClick={onRegenerate}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              <RefreshCcw className="w-4 h-4" />
              Regenerate
            </button>
          )}

        </div>

      </div>

      {/* Markdown */}

      <div className="p-6">

        <MarkdownRenderer
          content={content}
        />

      </div>

    </div>
  );
}