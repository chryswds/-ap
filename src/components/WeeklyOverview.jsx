import React from "react";

function WeeklyOverview({ weekData }) {
  if (!weekData || !weekData.hours || weekData.hours.length === 0) {
    return null;
  }

  const { hours, breaks, startTimes, endTimes } = weekData;

  const totalHours = hours.reduce(
    (sum, hour) => sum + (parseFloat(hour) || 0),
    0
  );

  const totalBreakMinutes = breaks.reduce(
    (sum, breakTime) => sum + (parseInt(breakTime) || 0),
    0
  );
  const totalBreakHours = totalBreakMinutes / 60;

  const totalLessBreaks = totalHours - totalBreakHours;

  const daysWorked = hours.filter((hour) => parseFloat(hour) > 0).length;
  const averageHours = daysWorked > 0 ? totalLessBreaks / daysWorked : 0;

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Weekly Overview</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="border-b pb-2">
          <span className="font-medium">Days Worked:</span>
          <span className="float-right">{daysWorked} days</span>
        </div>
        <div className="border-b pb-2">
          <span className="font-medium">Total Hours Worked:</span>
          <span className="float-right">{totalHours.toFixed(2)} hours</span>
        </div>
        <div className="border-b pb-2">
          <span className="font-medium">Total Break Time:</span>
          <span className="float-right">
            {totalBreakMinutes} minutes ({totalBreakHours.toFixed(2)} hours)
          </span>
        </div>
        <div className="border-b pb-2">
          <span className="font-medium">Total Hours (Less Breaks):</span>
          <span className="float-right">
            {totalLessBreaks.toFixed(2)} hours
          </span>
        </div>
        <div className="border-b pb-2">
          <span className="font-medium">Average Hours per Working Day:</span>
          <span className="float-right">{averageHours.toFixed(2)} hours</span>
        </div>
      </div>
    </div>
  );
}

export default WeeklyOverview;
