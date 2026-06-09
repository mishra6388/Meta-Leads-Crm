import { TrendingUp } from "lucide-react";

const iconMap = {
  "Total Leads": "📊",
  "New Leads": "🆕",
  "Contacted": "📞",
  "Interested": "👀",
  "Converted": "✅",
  "Lost": "❌",
};

export default function StatsCard({
  title,
  value,
}) {
  const icon = iconMap[title] || "📈";
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100 group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
            {title}
          </p>
        </div>
        <span className="text-3xl group-hover:scale-110 transition-transform">{icon}</span>
      </div>

      <h2 className="text-4xl font-bold text-gray-900 mb-2">
        {value}
      </h2>
      
      <div className="flex items-center text-green-600 text-sm font-medium">
        <TrendingUp size={16} className="mr-1" />
        <span>Up this month</span>
      </div>
    </div>
  );
}