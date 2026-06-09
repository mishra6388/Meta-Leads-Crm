import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/* ===========================
   GET ALL LEADS
=========================== */

export const getLeads = async () => {
  const snapshot = await getDocs(
    collection(db, "leads")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/* ===========================
   REAL TIME LEADS
=========================== */

export const subscribeToLeads = (
  callback
) => {
  return onSnapshot(
    collection(db, "leads"),
    (snapshot) => {
      const leads = snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );

      callback(leads);
    }
  );
};

/* ===========================
   GET SINGLE LEAD
=========================== */

export const getLeadById = async (
  id
) => {
  const leadRef = doc(
    db,
    "leads",
    id
  );

  const snapshot = await getDoc(
    leadRef
  );

  if (!snapshot.exists())
    return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

/* ===========================
   UPDATE LEAD
=========================== */

export const updateLead = async (
  id,
  data
) => {
  const leadRef = doc(
    db,
    "leads",
    id
  );

  await updateDoc(leadRef, {
    ...data,
    updatedAt:
      serverTimestamp(),
  });
};

/* ===========================
   DELETE LEAD
=========================== */

export const deleteLead = async (
  id
) => {
  const leadRef = doc(
    db,
    "leads",
    id
  );

  await deleteDoc(leadRef);
};

/* ===========================
   DASHBOARD STATS
=========================== */

export const getDashboardStats =
  async () => {
    const snapshot =
      await getDocs(
        collection(db, "leads")
      );

    const leads =
      snapshot.docs.map((doc) =>
        doc.data()
      );

    return {
      total: leads.length,

      newLeads:
        leads.filter(
          (lead) =>
            lead.status ===
            "New Lead"
        ).length,

      contacted:
        leads.filter(
          (lead) =>
            lead.status ===
            "Contacted"
        ).length,

      interested:
        leads.filter(
          (lead) =>
            lead.status ===
            "Interested"
        ).length,

      converted:
        leads.filter(
          (lead) =>
            lead.status ===
            "Converted"
        ).length,

      lost: leads.filter(
        (lead) =>
          lead.status ===
          "Lost"
      ).length,
    };
  };

/* ===========================
   REAL TIME DASHBOARD STATS
=========================== */

export const subscribeToDashboardStats =
  (callback) => {
    return onSnapshot(
      collection(db, "leads"),
      (snapshot) => {
        const leads =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        callback({
          total: leads.length,

          newLeads:
            leads.filter(
              (lead) =>
                lead.status ===
                "New Lead"
            ).length,

          contacted:
            leads.filter(
              (lead) =>
                lead.status ===
                "Contacted"
            ).length,

          interested:
            leads.filter(
              (lead) =>
                lead.status ===
                "Interested"
            ).length,

          converted:
            leads.filter(
              (lead) =>
                lead.status ===
                "Converted"
            ).length,

          lost:
            leads.filter(
              (lead) =>
                lead.status ===
                "Lost"
            ).length,
        });
      }
    );
  };