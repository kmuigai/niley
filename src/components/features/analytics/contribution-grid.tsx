"use client"

import { useState } from "react"
import { BookOpen } from "lucide-react"

export function ContributionGrid() {
  const [hoveredSquare, setHoveredSquare] = useState<{ week: number; day: number } | null>(null)

  // Generate 6 months of contribution data (26 weeks x 7 days)
  const generateContributionData = () => {
    const weeks = []
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - 6) // Start 6 months ago
    startDate.setDate(startDate.getDate() - startDate.getDay()) // Start on Sunday

    for (let week = 0; week < 26; week++) {
      const weekData = []
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(startDate)
        currentDate.setDate(startDate.getDate() + week * 7 + day)

        // Random activity level (0-3) with most days having some activity for a good streak
        const activity = Math.random() < 0.7 ? Math.floor(Math.random() * 3) + 1 : 0

        weekData.push({
          activity,
          date: currentDate,
          booksRead: activity > 0 ? Math.floor(Math.random() * 4) + 1 : 0,
          readingPartner: "Nile",
        })
      }
      weeks.push(weekData)
    }
    return weeks
  }

  const contributionData = generateContributionData()

  // Generate month labels
  const getMonthLabels = () => {
    const months = []
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - 6)
    startDate.setDate(1) // First day of the month

    const seenMonths = new Set()

    for (let week = 0; week < 26; week++) {
      const weekStartDate = new Date(startDate)
      weekStartDate.setDate(startDate.getDate() + week * 7)

      const monthKey = `${weekStartDate.getFullYear()}-${weekStartDate.getMonth()}`

      if (!seenMonths.has(monthKey) && weekStartDate.getDate() <= 7) {
        seenMonths.add(monthKey)
        months.push({
          week,
          label: weekStartDate.toLocaleDateString("en-US", { month: "short" }),
        })
      }
    }
    return months
  }

  const monthLabels = getMonthLabels()
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getSquareColor = (activity: number) => {
    const colors = [
      "bg-[#EBEDF0]", // Empty - light gray
      "bg-[#C6E48B]", // Light activity - light green
      "bg-[#7BC96F]", // Medium activity - medium green
      "bg-[#239A3B]", // High activity - dark green
    ]
    return colors[activity] || colors[0]
  }

  return (
    <div className="w-full">
      {/* Month labels */}
      <div className="flex mb-3">
        <div className="w-10"></div> {/* Space for day labels */}
        <div className="flex-1 relative h-4">
          {monthLabels.map((month, index) => (
            <div
              key={index}
              className="absolute text-xs text-gray-600 font-medium"
              style={{ left: `${(month.week / 26) * 100}%` }}
            >
              {month.label}
            </div>
          ))}
        </div>
      </div>

      {/* Grid container */}
      <div className="flex">
        {/* Day labels */}
        <div className="flex flex-col mr-3">
          {dayLabels.map((day, index) => (
            <div key={index} className="h-3 mb-1 text-xs text-gray-600 flex items-center w-7">
              {index % 2 === 1 ? day : ""} {/* Show every other day to save space */}
            </div>
          ))}
        </div>

        {/* Contribution grid */}
        <div className="flex-1 relative">
          <div className="grid grid-flow-col gap-1" style={{ gridTemplateRows: "repeat(7, 1fr)" }}>
            {contributionData.map((week, weekIndex) =>
              week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-3 h-3 rounded-sm cursor-pointer transition-all hover:ring-1 hover:ring-sage hover:ring-opacity-50 ${getSquareColor(day.activity)}`}
                  onMouseEnter={() => setHoveredSquare({ week: weekIndex, day: dayIndex })}
                  onMouseLeave={() => setHoveredSquare(null)}
                />
              )),
            )}
          </div>

          {/* Tooltip */}
          {hoveredSquare && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-xl whitespace-nowrap z-10">
              <div className="flex items-center gap-2">
                <BookOpen className="h-3 w-3" />
                <div>
                  {contributionData[hoveredSquare.week][hoveredSquare.day].booksRead > 0 ? (
                    <>
                      <div className="font-medium">
                        {contributionData[hoveredSquare.week][hoveredSquare.day].booksRead} books read with Nile
                      </div>
                      <div className="text-gray-300 text-xs">
                        {contributionData[hoveredSquare.week][hoveredSquare.day].date.toLocaleDateString()}
                      </div>
                    </>
                  ) : (
                    <div>No reading activity</div>
                  )}
                </div>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-end items-center mt-4">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>Less</span>
          <div className="flex space-x-1">
            {[0, 1, 2, 3].map((level) => (
              <div key={level} className={`w-3 h-3 rounded-sm ${getSquareColor(level)}`} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  )
} 