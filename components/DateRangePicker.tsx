import React, { useState } from 'react';

export default function DateRangePicker() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [useDateRange, setUseDateRange] = useState(false);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const toggleDateRange = () => {
    setUseDateRange(!useDateRange);
    if (useDateRange) {
      setStartDate('');
      setEndDate('');
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="useDateRange">
          <input
            type="checkbox"
            id="useDateRange"
            checked={useDateRange}
            onChange={toggleDateRange}
          />
          Set Date Range
        </label>
      </div>

      {useDateRange && (
        <>
          <div>
            <label htmlFor="startDate">Start Date:</label>
            <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} />
          </div>

          <div>
            <label htmlFor="endDate">End Date:</label>
            <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} />
          </div>
        </>
      )}

      <div>
        <p>
          Selected Range: {useDateRange ? `${startDate} to ${endDate}` : 'No date range selected'}
        </p>
      </div>
    </div>
  );
}
