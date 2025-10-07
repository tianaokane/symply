import React from "react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts"

export default function Trend({ entries }) {
  if (!entries || entries.length === 0) {
    return <div className="empty">No data to show trends yet 📉</div>
  }

  // transform entries → data points
  const data = entries
    .slice() // shallow copy
    .reverse() // oldest first
    .map(e => ({
      date: new Date(e.ts).toLocaleDateString([], { month: "short", day: "numeric" }),
      mood: e.mood,
      energy: e.energy,
      pain: e.pain,
    }))

  return (
    <div style={{ height: 300, marginTop: 24 }}>
      <h2>Trends</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="mood" stroke="#1f77b4" />
          <Line type="monotone" dataKey="energy" stroke="#2ca02c" />
          <Line type="monotone" dataKey="pain" stroke="#d62728" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
