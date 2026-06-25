import { notificationService } from "@/features/notification/services/notificationService";
import { Notifications } from "@mui/icons-material";
import { Badge, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const NotificationCenter = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationService.getNotifications({}),
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const markAsReadMutation = useMutation({
    mutationFn: (notificationIds: string[]) =>
      notificationService.markAsRead({ notificationIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return (
    <div>
      <Badge badgeContent={data?.unreadCount || 0}>
        <Notifications />
      </Badge>

      <Menu open={Boolean(data)} onClose={() => {}}>
        {data?.items.map((notification) => (
          <MenuItem key={notification.id}>
            <div>
              <Typography variant="subtitle2">{notification.title}</Typography>
              <Typography variant="body2">{notification.message}</Typography>
              <Typography variant="caption">
                {new Date(notification.createdAt).toLocaleString()}
              </Typography>
            </div>
            {!notification.isRead && (
              <Button
                size="small"
                onClick={() => markAsReadMutation.mutate([notification.id])}
              >
                Mark as Read
              </Button>
            )}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
