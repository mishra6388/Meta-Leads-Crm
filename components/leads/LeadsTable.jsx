"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { deleteLead } from "../../services/leadService";

export default function LeadsTable({
  leads = [],
}) {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {
      await deleteLead(id);

      alert("Lead deleted successfully");

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert("Failed to delete lead");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-100">
            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Phone
            </th>

            <th className="p-4 text-left">
              Email
            </th>

            <th className="p-4 text-left">
              Campaign
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {leads.length > 0 ? (
            leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="p-4">
                  <Link
                    href={`/dashboard/leads/${lead.id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {lead.name}
                  </Link>
                </td>

                <td className="p-4">
                  {lead.phone}
                </td>

                <td className="p-4">
                  {lead.email}
                </td>

                <td className="p-4">
                  {lead.campaignName}
                </td>

                <td className="p-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {lead.status}
                  </span>
                </td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      handleDelete(
                        lead.id
                      )
                    }
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="text-center p-6 text-gray-500"
              >
                No Leads Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}