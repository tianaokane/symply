import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function TrendGraph() {
  const stored = JSON.parse(localStorage.getItem("symplyEntries")) || [];

  const data = stored.map((entry) => ({
    date: new Date(entry.timestamp).toLocaleDateString("en-GB"),
    energy: parseInt(entry.energy),
    mood: entry.mood === "happy" ? 3 : entry.mood === "neutral" ? 2 : entry.mood === "sad" ? 1 : entry.mood === "anxious" ? 0 : null,
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold text-emerald-700 mb-4">📊 Energy & Mood Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Line type="monotone" dataKey="energy" stroke="#10B981" name="Energy" />
          <Line type="monotone" dataKey="mood" stroke="#6366F1" name="Mood (0-3)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrendGraph;
