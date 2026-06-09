"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader, Phone, Mail, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

import {
  getLeadById,
  updateLead,
} from "../../../../services/leadService";

export default function LeadDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [lead, setLead] =
    useState(null);

  const [status, setStatus] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadLead();
  }, []);

  const loadLead = async () => {
    const data =
      await getLeadById(id);

    if (data) {
      setLead(data);
      setStatus(
        data.status || "New Lead"
      );
      setNotes(data.notes || "");
    }
  };

  const handleSave =
    async () => {
      setIsSaving(true);
      try {
        await updateLead(id, {
          status,
          notes,
        });

        toast.success(
          "Lead Updated Successfully"
        );
      } catch (error) {
        toast.error("Failed to update lead");
      } finally {
        setIsSaving(false);
      }
    };

  if (!lead) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading lead details...</p>
        </div>
      </div>
    );
  }

  const statusColors = {
    "New Lead": "bg-blue-100 text-blue-800 border-blue-300",
    "Contacted": "bg-purple-100 text-purple-800 border-purple-300",
    "Interested": "bg-amber-100 text-amber-800 border-amber-300",
    "Follow Up": "bg-indigo-100 text-indigo-800 border-indigo-300",
    "Converted": "bg-green-100 text-green-800 border-green-300",
    "Lost": "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Leads
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            {lead.name}
          </h1>
          <p className="text-blue-100">Lead ID: {lead.id}</p>
          <span className={`inline-block mt-4 px-4 py-2 rounded-full text-sm font-bold ${statusColors[status]}`}>
            {status}
          </span>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-6">Contact Information</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="font-semibold text-gray-700 block text-sm mb-2 flex items-center gap-2">
                    <Mail size={16} className="text-blue-600" />
                    Email
                  </label>
                  <p className="text-gray-900 text-lg">{lead.email}</p>
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block text-sm mb-2 flex items-center gap-2">
                    <Phone size={16} className="text-blue-600" />
                    Phone
                  </label>
                  <p className="text-gray-900 text-lg">{lead.phone}</p>
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block text-sm mb-2">Campaign</label>
                  <p className="text-gray-900 text-lg font-medium">{lead.campaignName}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-6">Update Status</h3>
              
              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
                className={`w-full border-2 rounded-xl p-4 text-lg font-semibold transition-all ${statusColors[status]}`}
              >
                <option>
                  New Lead
                </option>

                <option>
                  Contacted
                </option>

                <option>
                  Interested
                </option>

                <option>
                  Follow Up
                </option>

                <option>
                  Converted
                </option>

                <option>
                  Lost
                </option>
              </select>
            </div>
          </div>

          <div className="mb-8">
            <label className="font-bold text-gray-900 block text-sm uppercase tracking-wide mb-3">
              Notes & Follow-up
            </label>

            <textarea
              rows={6}
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
              placeholder="Add notes, follow-up details, or important observations about this lead..."
              className="w-full border-2 border-gray-200 rounded-xl p-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={
                handleSave
              }
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Changes
                </>
              )}
            </button>

            <a
              href={`https://wa.me/91${lead.phone}`}
              target="_blank"
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>

            <a
              href={`tel:${lead.phone}`}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Phone size={20} />
              Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}