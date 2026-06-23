import { apiService } from "@/lib/api/apiService";
import {
  GetNotificationsQuery,
  GetNotificationsResponse,
  MarkAsReadCommand,
} from "../types/notification.types";

export class NotificationService {
  async getNotifications(
    query: GetNotificationsQuery,
  ): Promise<GetNotificationsResponse> {
    return apiService.get<GetNotificationsResponse>(
      "/notification",
      // Cast to Record<string, unknown> to satisfy apiService parameter type
      query as unknown as Record<string, unknown>,
    );
  }

  async markAsRead(command: MarkAsReadCommand): Promise<void> {
    return apiService.post<void>("/notification/mark-read", command);
  }

  async markAllAsRead(): Promise<void> {
    return apiService.post<void>("/notification/mark-all-read", {});
  }
}
