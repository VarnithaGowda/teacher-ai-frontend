/**
 * components/PageHeader.jsx
 * Reusable Page Header for EduGenie AI
 */

import { Sparkles } from "lucide-react";

export default function PageHeader({
  title,
  subtitle,
  icon: Icon,
}) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl shadow-lg overflow-hidden">

      <div className="px-8 py-7 flex items-center justify-between">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">

            {Icon && <Icon className="w-8 h-8 text-white" />}

          </div>

          <div>

            <h1 className="text-3xl font-bold text-white">

              {title}

            </h1>

            <p className="text-indigo-100 mt-2">

              {subtitle}

            </p>

          </div>

        </div>

        <div className="hidden md:flex">

          <div className="bg-white/20 backdrop-blur rounded-full px-4 py-2 flex items-center gap-2">

            <Sparkles className="w-5 h-5 text-yellow-300" />

            <span className="text-white font-medium">

              Powered by EduGenie AI

            </span>

          </div>

        </div>

      </div>

    </div>
  );
}