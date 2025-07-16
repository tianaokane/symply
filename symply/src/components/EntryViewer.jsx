function EntryViewer() {

    const [filter, setFilter] = useState("all");

const filterEntries = () => {
  const now = new Date();
  return stored.filter((entry) => {
    const entryDate = new Date(entry.timestamp);
    if (filter === "7days") {
      return now - entryDate <= 7 * 24 * 60 * 60 * 1000;
    } else if (filter === "month") {
      return now - entryDate <= 30 * 24 * 60 * 60 * 1000;
    }
    return true;
  });
};

  const stored = JSON.parse(localStorage.getItem("symplyEntries")) || [];

  if (stored.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center text-gray-500">
        No entries yet. Start tracking to see your history! 🌧️
      </div>
    );
  }

  const handleDelete = (indexToRemove) => {
  const filtered = stored.filter((_, index) => index !== indexToRemove);
  localStorage.setItem("symplyEntries", JSON.stringify(filtered));
  window.location.reload(); // quick reload for now
};


  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold text-emerald-700 mb-4">📔 Symptom Journal</h2>
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
        <select
        className="mb-4 p-2 border rounded"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        >
        <option value="all">All Time</option>
        <option value="7days">Last 7 Days</option>
        <option value="month">Last 30 Days</option>
        </select>

        {filterEntries()
          .slice()
          .reverse()
          .map((entry, index) => (
            <div key={index} className="border-b pb-2">
              <p className="text-sm text-gray-400">
                {new Date(entry.timestamp).toLocaleString()}
              </p>
              <p><span className="font-medium">Mood:</span> {entry.mood}</p>
              <p><span className="font-medium">Energy:</span> {entry.energy}/10</p>
              <p><span className="font-medium">Pain:</span> {entry.pain}/10</p>
              <p><span className="font-medium">Notes:</span> {entry.notes || "None"}</p>

              <button
                onClick={() => handleDelete(stored.length - 1 - index)}
                className="text-red-500 hover:text-red-700 text-sm mt-1"
                >
                🗑️ Delete
                </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default EntryViewer;
