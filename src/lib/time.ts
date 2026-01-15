export function timeAgo(timestamp: any) {
  if (!timestamp) return "just now";

  const now = Date.now();
  const seconds = Math.floor((now - timestamp.toMillis()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}
