"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Users,
  RefreshCw,
  Search,
} from "lucide-react";

import LeadsTable from "../../../components/leads/LeadsTable";

import {
  subscribeToLeads,
} from "../../../services/leadService";

export default function LeadsPage() {
  const [leads, setLeads] =
    useState([]);

  const [
    filteredLeads,
    setFilteredLeads,
  ] = useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("All");

  useEffect(() => {
    const unsubscribe =
      subscribeToLeads((data) => {
        setLeads(data);
      });

    return () =>
      unsubscribe();
  }, []);

  useEffect(() => {
    let filtered = [...leads];

    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.name
            ?.toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||
          lead.phone?.includes(
            searchTerm
          ) ||
          lead.email
            ?.toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )
      );
    }

    if (
      statusFilter !== "All"
    ) {
      filtered = filtered.filter(
        (lead) =>
          lead.status ===
          statusFilter
      );
    }

    setFilteredLeads(
      filtered
    );
  }, [
    leads,
    searchTerm,
    statusFilter,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Users
            className="text-blue-600"
            size={32}
          />

          <h1 className="text-4xl font-bold text-gray-900">
            Leads Management
          </h1>
        </div>

        <p className="text-gray-600 text-lg">
          Manage and track all your
          leads in one place
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-3.5 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by name, phone or email"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="w-full border rounded-lg pl-10 pr-4 py-3"
            />
          </div>

          <select
            value={
              statusFilter
            }
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="border rounded-lg px-4 py-3"
          >
            <option value="All">
              All Status
            </option>

            <option value="New Lead">
              New Lead
            </option>

            <option value="Contacted">
              Contacted
            </option>

            <option value="Interested">
              Interested
            </option>

            <option value="Follow Up">
              Follow Up
            </option>

            <option value="Converted">
              Converted
            </option>

            <option value="Lost">
              Lost
            </option>
          </select>

          <button
            onClick={
              clearFilters
            }
            className="bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-3 font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="text-gray-700 font-semibold">
          Showing Leads:
          <span className="text-blue-600 text-2xl ml-2">
            {
              filteredLeads.length
            }
          </span>
        </div>

        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg">
          <RefreshCw
            size={18}
          />
          Real Time
        </button>
      </div>

      <LeadsTable
        leads={
          filteredLeads
        }
      />
    </div>
  );
}