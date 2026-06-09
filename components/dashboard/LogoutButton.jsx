"use client";

import { useRouter } from "next/navigation";
import { logoutUser } from "../../services/authService";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();

    toast.success("Logged Out Successfully");

    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
    >
      <LogOut size={18} />
      Logout
    </button>
  );
}