import { Button } from "./ui/button";
import { useNotifications } from "../../hooks/useNotifications";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function NotificationsPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const notifications = useNotifications(user?.uid);

  if (notifications.length === 0)
    return <p className="text-sm text-gray-500">No notifications</p>;

  return (
    <div className="space-y-3">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="border p-3 rounded-lg flex justify-between"
        >
          <div>
            <p className="font-medium">{n.title}</p>
            <p className="text-sm text-gray-600">{n.message}</p>
          </div>

          <Button
            size="sm"
            onClick={() =>
              navigate(`/dashboard/requests/${n.requestId}`)
            }
          >
            View
          </Button>
        </div>
      ))}
    </div>
  );
}
