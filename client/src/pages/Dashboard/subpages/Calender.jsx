import React, { useState } from "react";
import dayjs from "dayjs";
import clsx from "clsx";

const transactions = [
  { date: "2024-11-01", type: "income", amount: 500 },
  { date: "2024-11-05", type: "expense", amount: 200 },
  { date: "2024-11-20", type: "income", amount: 800 },
  { date: "2024-11-22", type: "expense", amount: 300 },
];

const Calender = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const startOfWeek = startOfMonth.startOf("week");
  const endOfWeek = endOfMonth.endOf("week");

  const generateCalendar = () => {
    const days = [];
    let day = startOfWeek;

    while (day.isBefore(endOfWeek)) {
      days.push(day);
      day = day.add(1, "day");
    }

    return days;
  };

  const getTransactionForDate = (date) => {
    return transactions.filter(
      (t) => dayjs(t.date).isSame(date, "day")
    );
  };

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  return (
    <div className="bg-gray-500 bg-opacity-10 h-screen">
        <div className="py-10">
            <div className=" p-6 max-w-6xl mx-auto bg-white rounded-lg shadow">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={handlePrevMonth}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Prev
                </button>
                <h2 className="text-lg font-bold">
                  {currentMonth.format("MMMM YYYY")}
                </h2>
                <button
                  onClick={handleNextMonth}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Next
                </button>
              </div>
              {/* Calendar */}
              <div className="grid grid-cols-7 gap-2 text-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="font-medium text-gray-500">
                    {day}
                  </div>
                ))}
                {generateCalendar().map((day, index) => {
                  const transactionsForDay = getTransactionForDate(day);
                  return (
                    <div
                      key={index}
                      className={clsx(
                        "p-2 border rounded-lg",
                        day.isSame(currentMonth, "month")
                          ? "bg-gray-100"
                          : "bg-gray-50 text-gray-400"
                      )}
                    >
                      <div className="font-bold text-sm">{day.date()}</div>
                      {transactionsForDay.map((t, idx) => (
                        <div
                          key={idx}
                          className={clsx(
                            "mt-1 text-xs font-medium px-2 py-1 rounded",
                            t.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                          )}
                        >
                          {t.type === "income" ? "+" : "-"}${t.amount}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
        </div>
    </div>
  );
};

export default Calender;
