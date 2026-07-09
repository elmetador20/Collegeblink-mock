import useSWR from "swr";
import { useAppStore } from "@/stores/useAppStore";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useApplications() {
  const { data, error, isLoading, mutate } = useSWR("/api/applications", fetcher);
  const setApplications = useAppStore((state) => state.setApplications);

  if (data && !error) {
    setApplications(data);
  }

  return {
    applications: data || [],
    isLoading,
    error,
    mutate,
  };
}

export function useUpdateApplication() {
  const updateApplicationStatus = useAppStore(
    (state) => state.updateApplicationStatus
  );

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update");

      updateApplicationStatus(id, status);
      return true;
    } catch (error) {
      console.error("Error updating application:", error);
      return false;
    }
  };

  return { updateStatus };
}

export function useDeleteApplication() {
  const deleteApplication = async (id: string) => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "DELETE",
      });

      return res.ok;
    } catch (error) {
      console.error("Error deleting application:", error);
      return false;
    }
  };

  return { deleteApplication };
}
