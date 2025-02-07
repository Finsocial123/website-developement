

import { useState, createContext, useContext } from "react"

// Event Context
const EventContext = createContext()

const useEvents = () => useContext(EventContext)

// TradingCalendar Component
export default function TradingCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "GDP Report",
      type: "economic",
      date: "2025-02-03",
      time: "08:30 AM",
      impact: "high",
      description: "Quarterly GDP growth rate report",
      country: "US",
    },
    {
      id: 2,
      title: "Apple Earnings",
      type: "earnings",
      date: "2025-02-05",
      time: "16:30 PM",
      impact: "medium",
      description: "Q4 2024 earnings report",
      forecast: "$1.23 per share",
    },
    {
      id: 3,
      title: "Microsoft Revenue",
      type: "revenue",
      date: "2025-02-06",
      time: "09:00 AM",
      impact: "high",
      description: "Annual revenue report",
      forecast: "$62.5B",
    },
  ])

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, { ...newEvent, id: Date.now() }])
  }

  const handleMonthChange = (newDate) => {
    setCurrentMonth(newDate)
  }

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      <div className="min-h-screen dark:bg-black dark:text-white text-black bg-white">
        <div className="max-w-7xl mx-auto p-4">
          <CalendarHeader currentMonth={currentMonth} onMonthChange={handleMonthChange} />
          <FilterButtons />
          <Legend />
          <CalendarGrid currentMonth={currentMonth} />
        </div>
      </div>
    </EventContext.Provider>
  )
}

// CalendarHeader Component
function CalendarHeader({ currentMonth, onMonthChange }) {
  const formatMonth = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(date)
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentMonth)
    newDate.setMonth(currentMonth.getMonth() + direction)
    onMonthChange(newDate)
  }

  const goToToday = () => {
    onMonthChange(new Date())
  }

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sticky top-0 z-10 p-4 border-b-2 border-blue-500 rounded-3xl">
      <h1 className="text-2xl font-bold">Trading Calendar</h1>
      <div className="flex items-center gap-2 flex-wrap">
        <button onClick={goToToday} className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
          Today
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            &#9664;
          </button>
          <span className="text-sm whitespace-nowrap">{formatMonth(currentMonth)}</span>
          <button
            onClick={() => navigateMonth(1)}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            &#9654;
          </button>
        </div>
        <CreateEventModal />
      </div>
    </header>
  )
}

// FilterButtons Component
function FilterButtons() {
  const [activeFilter, setActiveFilter] = useState("economic")
  const [timeZone, setTimeZone] = useState("UTC")

  const filters = [
    { id: "economic", label: "Economic" },
    { id: "earnings", label: "Earnings" },
    { id: "revenue", label: "Revenue" },
    { id: "dividends", label: "Dividends" },
  ]

  const timeZones = [
    { value: "UTC", label: "UTC" },
    { value: "EST", label: "Eastern Time" },
    { value: "PST", label: "Pacific Time" },
    { value: "GMT", label: "GMT" },
  ]

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 px-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-3 py-1 rounded-full ${
              activeFilter === filter.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <select
        value={timeZone}
        onChange={(e) => setTimeZone(e.target.value)}
        className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded"
      >
        {timeZones.map((tz) => (
          <option key={tz.value} value={tz.value}>
            {tz.label}
          </option>
        ))}
      </select>
    </div>
  )
}

// Legend Component
function Legend() {
  const impacts = [
    { level: "High", color: "bg-red-500" },
    { level: "Medium", color: "bg-yellow-500" },
    { level: "Low", color: "bg-green-500" },
  ]

  return (
    <div className="flex items-center gap-4 px-4 mb-6">
      <span className="text-sm font-medium">Impact:</span>
      <div className="flex gap-4">
        {impacts.map(({ level, color }) => (
          <div key={level} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-sm">{level}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// CalendarGrid Component
function CalendarGrid({ currentMonth }) {
  const { events } = useEvents()

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getImpactColor = (impact) => {
    const colors = {
      high: "bg-red-500",
      medium: "bg-yellow-500",
      low: "bg-green-500",
    }
    return colors[impact] || "bg-gray-500"
  }

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  const daysCells = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    daysCells.push(<div key={`empty-${i}`} className="bg-gray-100 dark:bg-gray-800"></div>)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const dateString = date.toISOString().split("T")[0]
    const dayEvents = events.filter((event) => event.date === dateString)

    daysCells.push(
      <div
        key={day}
        className="min-h-[100px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-2"
      >
        <div className="text-sm font-medium mb-1">{day}</div>
        <div className="space-y-1">
          {dayEvents.map((event) => (
            <div key={event.id} className="relative group">
              <div className="text-xs p-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors">
                <div className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${getImpactColor(event.impact)}`} />
                  <span className="font-medium truncate">{event.title}</span>
                </div>
              </div>
              <div className="absolute z-10 invisible group-hover:visible bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg p-2 w-48">
                <p className="font-medium">{event.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{event.time}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{event.description}</p>
                {event.forecast && <p className="text-xs mt-1">Forecast: {event.forecast}</p>}
                {event.country && <p className="text-xs mt-1">Country: {event.country}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>,
    )
  }

  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map((day) => (
        <div key={day} className="text-center font-medium text-sm py-2 bg-gray-200 dark:bg-gray-700">
          {day}
        </div>
      ))}
      {daysCells}
    </div>
  )
}

// CreateEventModal Component
function CreateEventModal() {
  const [isOpen, setIsOpen] = useState(false)
  const { addEvent } = useEvents()
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    type: "",
    impact: "",
    description: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEventData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addEvent(eventData)
    setIsOpen(false)
    setEventData({
      title: "",
      date: "",
      time: "",
      type: "",
      impact: "",
      description: "",
    })
  }

  if (!isOpen)
    return (
      <button onClick={() => setIsOpen(true)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
        Create New
      </button>
    )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={eventData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-3xl dark:bg-black dark:text-white text-black bg-white border-2"
                required
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={eventData.date}
                onChange={handleInputChange}
                className="mt-1 block w-full  rounded-3xl dark:bg-black dark:text-white text-black bg-white border-2"
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium ">
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={eventData.time}
                onChange={handleInputChange}
                className="mt-1 block w-full  rounded-3xl dark:bg-black dark:text-white text-black bg-white border-2"
                required
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium ">
                Type
              </label>
              <select
                id="type"
                name="type"
                value={eventData.type}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-3xl dark:bg-black dark:text-white text-black bg-white border-2"
                required
              >
                <option value="">Select type</option>
                <option value="economic">Economic</option>
                <option value="earnings">Earnings</option>
                <option value="revenue">Revenue</option>
                <option value="dividends">Dividends</option>
              </select>
            </div>
            <div>
              <label htmlFor="impact" className="block text-sm font-medium">
                Impact
              </label>
              <select
                id="impact"
                name="impact"
                value={eventData.impact}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-3xl dark:bg-black dark:text-white text-black bg-white border-2"
                required
              >
                <option value="">Select impact</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={eventData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-3xl dark:bg-black dark:text-white text-black bg-white border-2"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

