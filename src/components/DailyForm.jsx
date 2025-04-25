import React from "react";
import { useForm } from "react-hook-form";
import { addDays, format, isValid } from "date-fns";

function getDaysOfWeek(startDate) {
  if (!startDate || !isValid(startDate)) return [];
  return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
}
function calculateHours(startTime, endTime) {
  if (!startTime || !endTime) return 0;

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  let hours = endHour - startHour;
  let minutes = endMinute - startMinute;

  if (minutes < 0) {
    hours -= 1;
    minutes += 60;
  }

  return hours + minutes / 60;
}
function DailyEntryForm({ weekRange, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const days = getDaysOfWeek(weekRange.startDate);

  const submitHandler = (data) => {
    const calculatedData = {
      hours: data.startTimes.map((_, idx) =>
        calculateHours(data.startTimes[idx], data.endTimes[idx])
      ),
      breaks: data.breaks,
      startTimes: data.startTimes,
      endTimes: data.endTimes,
    };
    onSubmit(calculatedData);
    reset();
  };

  if (!weekRange.startDate) {
    return (
      <div className="mt-4 text-gray-500">Select a week to enter hours.</div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-4 mt-4"
    >
      {days.map((day, idx) => (
        <div key={idx} className="border-b pb-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="w-full font-medium text-gray-700 mb-2">
              {format(day, "EEEE, MMM d")}
            </div>
            <div className="flex items-center gap-4">
              <label className="block text-sm font-medium text-gray-700">
                Start Time
                <input
                  type="time"
                  {...register(`startTimes.${idx}`)}
                  className="ml-2 border border-gray-300 rounded-md px-3 py-2"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                End Time
                <input
                  type="time"
                  {...register(`endTimes.${idx}`)}
                  className="ml-2 border border-gray-300 rounded-md px-3 py-2"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Break (minutes)
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="1440"
                  {...register(`breaks.${idx}`, {
                    min: { value: 0, message: "Min 0" },
                    max: { value: 1440, message: "Max 1440" },
                  })}
                  className="ml-2 w-24 border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Minutes"
                />
              </label>
            </div>
          </div>
          {watch(`startTimes.${idx}`) && watch(`endTimes.${idx}`) && (
            <div className="text-sm text-gray-600 mt-2">
              Hours:{" "}
              {calculateHours(
                watch(`startTimes.${idx}`),
                watch(`endTimes.${idx}`)
              ).toFixed(2)}
            </div>
          )}
          {errors.hours && errors.hours[idx] && (
            <span className="text-red-500 text-xs block mt-1">
              {errors.hours[idx].message}
            </span>
          )}
          {errors.breaks && errors.breaks[idx] && (
            <span className="text-red-500 text-xs block mt-1">
              {errors.breaks[idx].message}
            </span>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
      >
        Submit Week
      </button>
    </form>
  );
}

export default DailyEntryForm;
