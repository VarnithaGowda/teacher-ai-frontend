/**
 * components/AIStudioCard.jsx
 */

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function AIStudioCard({
  title,
  description,
  icon: Icon,
  color,
  path,
}) {
  return (
    <Link
      to={path}
      className="group bg-white rounded-2xl border border-gray-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 p-6"
    >
      <div
        className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-5`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>

      <h3 className="text-lg font-semibold text-gray-800">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-2">
        {description}
      </p>

      <div className="flex items-center mt-6 text-indigo-600 font-medium">

        Launch

        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />

      </div>

    </Link>
  );
}