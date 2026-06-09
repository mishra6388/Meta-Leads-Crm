"use client";

import { useEffect, useState } from "react";
import { BarChart3, TrendingUp } from "lucide-react";
import StatsCard from "../../components/dashboard/StatsCard";

import {
  subscribeToDashboardStats,
} from "../../services/leadService";

export default function DashboardPage() {
  const [stats, setStats] =
    useState({
      total: 0,
      newLeads: 0,
      contacted: 0,
      interested: 0,
      converted: 0,
      lost: 0,
    });

  useEffect(() => {
    const unsubscribe =
      subscribeToDashboardStats(
        (data) => {
          setStats(data);
        }
      );

    return () =>
      unsubscribe();
  }, []);

  const conversionRate =
    stats.total > 0
      ? Math.round(
          (stats.converted /
            stats.total) *
            100
        )
      : 0;

  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3
            className="text-blue-600"
            size={32}
          />

          <h1 className="text-4xl font-bold text-gray-900">
            Dashboard
          </h1>
        </div>

        <p className="text-gray-600 text-lg">
          Welcome back! Here's your
          leads overview.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Leads"
          value={stats.total}
        />

        <StatsCard
          title="New Leads"
          value={stats.newLeads}
        />

        <StatsCard
          title="Contacted"
          value={stats.contacted}
        />

        <StatsCard
          title="Interested"
          value={stats.interested}
        />

        <StatsCard
          title="Converted"
          value={stats.converted}
        />

        <StatsCard
          title="Lost"
          value={stats.lost}
        />
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              Conversion Rate
            </h3>

            <TrendingUp
              className="text-green-600"
              size={24}
            />
          </div>

          <div className="text-5xl font-bold text-green-600 mb-2">
            {conversionRate}%
          </div>

          <p className="text-gray-600 text-sm">
            {stats.converted} out of{" "}
            {stats.total} leads
            converted
          </p>

          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${conversionRate}%`,
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Lead Status Summary
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                New Leads
              </span>

              <span className="font-bold text-blue-600">
                {stats.newLeads}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                Contacted
              </span>

              <span className="font-bold text-purple-600">
                {stats.contacted}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                Interested
              </span>

              <span className="font-bold text-amber-600">
                {stats.interested}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                Converted
              </span>

              <span className="font-bold text-green-600">
                {stats.converted}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                Lost
              </span>

              <span className="font-bold text-red-600">
                {stats.lost}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}