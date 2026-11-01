import Swal from "sweetalert2";

const themed = {
  background: "var(--color-base-100)",
  color: "var(--color-base-content)",
  confirmButtonColor: "#23306b",
  cancelButtonColor: "#6b7280",
};

export function successAlert(title, text) {
  return Swal.fire({ ...themed, icon: "success", title, text, confirmButtonText: "Great" });
}

export async function confirmDelete(title) {
  const result = await Swal.fire({
    ...themed,
    icon: "warning",
    title: "Delete this event?",
    text: `"${title}" and everyone's sign-ups for it will be removed. This cannot be undone.`,
    showCancelButton: true,
    confirmButtonText: "Delete event",
    confirmButtonColor: "#c9372c",
    cancelButtonText: "Keep it",
    focusCancel: true,
  });
  return result.isConfirmed;
}
