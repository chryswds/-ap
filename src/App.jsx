import { useState } from "react";
import WeekSelector from "./components/WeekSelector";
import DailyEntryForm from "./components/DailyForm";
import WeeklyOverview from "./components/WeeklyOverview";

function App() {
  const [weekRange, setWeekRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [weekData, setWeekData] = useState(null);

  const handleWeekChange = (startDate, endDate) => {
    setWeekRange({ startDate, endDate });
    setWeekData(null); // Reset week data when changing weeks
  };

  const handleDailyEntrySubmit = (data) => {
    setWeekData(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hour Tracking App</h1>
      <WeekSelector onWeekChange={handleWeekChange} />
      <DailyEntryForm weekRange={weekRange} onSubmit={handleDailyEntrySubmit} />
      {weekData && <WeeklyOverview weekData={weekData} />}
    </div>
  );
}

export default App;
