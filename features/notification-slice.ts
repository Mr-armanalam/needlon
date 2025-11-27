// store/notificationSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type NotificationType = {
  id: string;
  title: string;
  message: string;
  type: "order" | "offer" | "system"; 
  time: Date; 
  read: boolean;
};

export interface NotificationState {
  notifications: NotificationType[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
};


export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async () => {
    const response = await fetch("/api/notification");
    const result = await response.json();

    if (!response.ok) throw new Error(result.error || "Failed to fetch");

    return result.notification as NotificationType[];
  }
);

export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (notification_id: string) => {
    const response = await fetch("/api/notification", {
      method: "PATCH",
      body: JSON.stringify({ notification_id }),
      headers: { "Content-Type": "application/json" },
    });

    await response.json();
    if (!response.ok) throw new Error("Failed to update");

    return notification_id;
  }
);

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchNotifications.fulfilled,
      (state, action: PayloadAction<NotificationType[]>) => {
        state.loading = false;
        state.notifications = action.payload;
      }
    );
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed";
    });

    // mark as read
    builder.addCase(markAsRead.fulfilled, (state, action) => {
      const id = action.payload;
      const target = state.notifications.find((n) => n.id === id);
      if (target) target.read = true;
    });
  },
});

export default notificationSlice.reducer;
