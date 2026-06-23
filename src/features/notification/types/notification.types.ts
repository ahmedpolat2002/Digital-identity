export interface NotificationDto {
  id: string;
  userId: string;
  type:
    | "CredentialIssued"
    | "CredentialRevoked"
    | "IdentityUpdated"
    | "VerificationRequest"
    | "RecoveryRequest"
    | "SecurityAlert";
  title: string;
  message: string;
  data?: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
}

export interface GetNotificationsQuery {
  page?: number;
  pageSize?: number;
  isRead?: boolean;
  type?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface GetNotificationsResponse {
  items: NotificationDto[];
  totalCount: number;
  unreadCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface MarkAsReadCommand {
  notificationIds: string[];
}

export interface MarkAllAsReadCommand {}
