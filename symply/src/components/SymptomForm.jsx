import { useState } from "react";

function SymptomForm() {
  const [symptoms, setSymptoms] = useState({
    mood: "",
    energy: 5,
    pain: 0,
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSymptoms((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const entry = {
    ...symptoms,
    timestamp: new Date().toISOString(),
  };

  const existing = JSON.parse(localStorage.getItem("symplyEntries")) || [];
  const updated = [...existing, entry];

  localStorage.setItem("symplyEntries", JSON.stringify(updated));
  alert("Entry saved 🌼");

  // Clear form after save (optional)
  setSymptoms({
    mood: "",
    energy: 5,
    pain: 0,
    notes: "",
  });
};


  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-emerald-700">🌿 Daily Symptom Log</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Mood</label>
        <select
          name="mood"
          value={symptoms.mood}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select mood</option>
          <option value="happy">😊 Happy</option>
          <option value="neutral">😐 Neutral</option>
          <option value="sad">😔 Sad</option>
          <option value="anxious">😰 Anxious</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Energy Level: {symptoms.energy}/10</label>
        <input
          type="range"
          min="0"
          max="10"
          name="energy"
          value={symptoms.energy}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Pain Level: {symptoms.pain}/10</label>
        <input
          type="range"
          min="0"
          max="10"
          name="pain"
          value={symptoms.pain}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Notes</label>
        <textarea
          name="notes"
          value={symptoms.notes}
          onChange={handleChange}
          rows="3"
          placeholder="Any extra details..."
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded w-full"
      >
        Save Entry
      </button>
    </form>
  );
}

export default SymptomForm;
