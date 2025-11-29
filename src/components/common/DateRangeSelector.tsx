import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

interface DateRangeSelectorProps {
  onRangeChange: (startDate: Date, endDate: Date) => void;
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ onRangeChange }) => {
  const today = new Date();
  const [rangeType, setRangeType] = useState<"week" | "month" | "custom">("week");
  const [startDate, setStartDate] = useState<Date>(startOfWeek(today, { weekStartsOn: 1 }));
  const [endDate, setEndDate] = useState<Date>(endOfWeek(today, { weekStartsOn: 1 }));

  const handlePresetChange = (type: "week" | "month" | "custom") => {
    setRangeType(type);
    let start = startDate;
    let end = endDate;

    if (type === "week") {
      start = startOfWeek(today, { weekStartsOn: 1 });
      end = endOfWeek(today, { weekStartsOn: 1 });
    } else if (type === "month") {
      start = startOfMonth(today);
      end = endOfMonth(today);
    }
    setStartDate(start);
    setEndDate(end);
    onRangeChange(start, end);
  };

  const handleCustomChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (start && end) {
      setStartDate(start);
      setEndDate(end);
      onRangeChange(start, end);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-white shadow rounded-2xl border border-gray-200">
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePresetChange("week")}
          className={`px-3 py-1 rounded-lg text-sm ${
            rangeType === "week" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Esta Semana
        </button>
        <button
          onClick={() => handlePresetChange("month")}
          className={`px-3 py-1 rounded-lg text-sm ${
            rangeType === "month" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Este Mês
        </button>
        <button
          onClick={() => handlePresetChange("custom")}
          className={`px-3 py-1 rounded-lg text-sm ${
            rangeType === "custom" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Personalizado
        </button>
      </div>

      {rangeType === "custom" && (
        <div className="flex items-center gap-2">
          <DatePicker
            selected={startDate}
            onChange={(dates) => handleCustomChange(dates as [Date, Date])}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            dateFormat="dd/MM/yyyy"
            className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
          />
        </div>
      )}

      <div className="ml-auto text-sm text-gray-600">
        <span className="font-medium">De:</span> {format(startDate, "dd/MM/yyyy")}{" "}
        <span className="font-medium">Até:</span> {format(endDate, "dd/MM/yyyy")}
      </div>
    </div>
  );
};
