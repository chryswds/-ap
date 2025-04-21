import React from "react";
import { useForm } from "react-hook-form";
import { addDays, format, isValid } from "date-fns";

function getDaysOfWeek(startDate) {
  if (!startDate || !isValid(startDate)) return [];
  return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
}

function DailyEntryForm({ weekRange, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const days = getDaysOfWeek(weekRange.startDate);

  const submitHandler = (data) => {
    onSubmit(data);
    reset();
  };

  if (!weekRange.startDate) {
    return <div className="mt-4 text-gray-500">Select a week to enter hours.</div>;
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-4 mt-4">
      {days.map((day, idx) => (
        <div key={idx}>
          <label className="block text-sm font-medium text-gray-700">
            {format(day, "EEEE, MMM d")}
            <input
              type="number"
              step="0.1"
              min="0"
              max="24"
              {...register(`hours.${idx}`, {
                required: "Required",
                min: { value: 0, message: "Min 0" },
                max: { value: 24, message: "Max 24" },
              })}
              className="ml-4 w-24 border border-gray-300 rounded-md px-3 py-2"
              placeholder="Hours"
            />
          </label>
          {errors.hours && errors.hours[idx] && (
            <span className="text-red-500 text-xs">{errors.hours[idx].message}</span>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit Week
      </button>
    </form>
  );
}

export default DailyEntryForm;