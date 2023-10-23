// to be implemented

import { twMerge } from "tailwind-merge";

interface CreateToastNotificationProps {
  message: string;
  type: "success" | "error";
}

export function createToastNotification({
  message,
  type,
}: CreateToastNotificationProps) {
  const toastContainer = document.querySelector("#toastNotificationsContainer");

  if (!toastContainer) {
    throw new Error("Toast container not found");
  }

  const backgroundColor = type === "success" ? "bg-green-500" : "bg-red-500";
  const borderColor =
    type === "success" ? "border-green-500" : "border-red-500";
  const toastElement = document.createElement("div");
  toastElement.className = twMerge(
    `text-white-custom px-5 py-3 rounded-lg shadow-lg border-1`,
    backgroundColor,
    borderColor,
  );
  toastElement.textContent = message;

  toastContainer.appendChild(toastElement);
}
