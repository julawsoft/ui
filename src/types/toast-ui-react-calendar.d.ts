// src/types/toast-ui-react-calendar.d.ts
declare module "@toast-ui/react-calendar" {
  import type React from "react";

  export interface CalendarProps {
    height?: string | number;
    view?: "day" | "week" | "month";
    useCreationPopup?: boolean;
    useDetailPopup?: boolean;
    calendars?: any[];
    schedules?: any[];
    onBeforeCreateSchedule?: (event: any) => void;
    onClickSchedule?: (event: any) => void;
  }

  export default class Calendar extends React.Component<CalendarProps> {}
}

declare module "@toast-ui/calendar";
