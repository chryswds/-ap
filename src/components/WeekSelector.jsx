import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { startOfWeek, endOfWeek, format } from "date-fns";

function WeekSelector({ onWeekChange }) {
  const [selectedDate, setSelectedDate] = useState(new Date());


  const isMonday = (date) => {
    return date.getDay() === 1;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
    onWeekChange(weekStart, weekEnd);
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <label className="text-sm font-medium text-gray-700">Select Week</label>
      <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          filterDate={isMonday}
          dateFormat="MMMM d, yyyy"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholderText="Select a Monday"
        />
      </div>
      <div className="text-sm text-gray-600">
        Week: {format(startOfWeek(selectedDate, { weekStartsOn: 1 }), "MMM d")}{" "}
        - {format(endOfWeek(selectedDate, { weekStartsOn: 1 }), "MMM d, yyyy")}
      </div>
    </div>
  );
}

export default WeekSelector;
