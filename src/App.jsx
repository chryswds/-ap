import { useState } from "react";
import WeekSelector from "./components/WeekSelector";
import DailyEntryForm from "./components/DailyForm";

function App() {
  const [weekRange, setWeekRange] = useState({
    startDate: null,
    endDate: null,
  });

  const handleWeekChange = (startDate, endDate) => {
    setWeekRange({ startDate, endDate });
    console.log("Week Start:", startDate);
    console.log("Week End:", endDate);
  };

  const handleDailyEntrySubmit = (data) => {
    console.log("Daily Entry Data:", data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hour Tracking App</h1>
      <WeekSelector onWeekChange={handleWeekChange} />
      <DailyEntryForm weekRange={weekRange} onSubmit={handleDailyEntrySubmit} />
    </div>
  );
}

export default App;
