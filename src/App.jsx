import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "symply.entries.v1";
const todayISO = () => new Date().toISOString();
const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
};

export default function App() {
  const [tab, setTab] = useState("log"); // 'log' | 'trends' | 'journal'

  const [mood, setMood] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [pain, setPain] = useState(0);
  const [notes, setNotes] = useState("");

  const [entries, setEntries] = useState([]);
  const [range, setRange] = useState("7"); // '7' | '30' | 'all'
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEntries(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = (e) => {
    e.preventDefault();
    const entry = {
      id: crypto.randomUUID(),
      ts: todayISO(),
      mood: Number(mood),
      energy: Number(energy),
      pain: Number(pain),
      notes: notes.trim(),
    };
    setEntries((prev) => [entry, ...prev]);
    setNotes("");
    setTab("trends");
  };

  const removeEntry = (id) => setEntries((prev) => prev.filter((e) => e.id !== id));

  const filtered = useMemo(() => {
    let out = entries.slice();
    if (range !== "all") {
      const cutoff = daysAgo(Number(range));
      out = out.filter((e) => new Date(e.ts) >= cutoff);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter((e) => e.notes.toLowerCase().includes(q));
    }
    return out;
  }, [entries, range, search]);

  return (
    <div className="shell">
      <main className="container content">
        {tab === "log" && (
          <>
            <h1>Symply — Simple Symptom Tracker</h1>
            <form onSubmit={addEntry} aria-label="New entry">
              <div className="row">
                <Slider id="mood" label={`Mood: ${mood}`} min={0} max={10} value={mood} onChange={setMood} hint="0 = low, 10 = great" />
                <Slider id="energy" label={`Energy: ${energy}`} min={0} max={10} value={energy} onChange={setEnergy} hint="0 = depleted, 10 = buzzing" />
                <Slider id="pain" label={`Pain: ${pain}`} min={0} max={10} value={pain} onChange={setPain} hint="0 = none, 10 = severe" />
              </div>

              <div style={{ marginBottom: 12 }}>
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  rows="3"
                  placeholder="Anything notable today (symptoms, triggers, wins)…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <button className="primary" type="submit">Add Entry</button>
            </form>
          </>
        )}

        {tab === "trends" && (
          <>
            <h2>Trends</h2>
            <div className="controls">
              <select value={range} onChange={(e) => setRange(e.target.value)} aria-label="Filter by time range">
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="all">All time</option>
              </select>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search notes…" />
              <button type="button" onClick={() => { setRange("7"); setSearch(""); }}>Reset</button>
            </div>

            {filtered.length === 0 ? (
              <div className="empty">No data to show trends yet 📊</div>
            ) : (
              <div className="card">
                <p style={{ margin: 0 }}>
                  (Graph placeholder) — We’ll plug in Recharts here next. For now you have {filtered.length} entries in view.
                </p>
              </div>
            )}
          </>
        )}

        {tab === "journal" && (
          <>
            <h2>Journal</h2>
            {entries.length === 0 ? (
              <div className="empty">No entries yet. Add your first one above ✨</div>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {entries.map((e) => (
                  <EntryCard key={e.id} entry={e} onDelete={() => removeEntry(e.id)} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <nav className="tabbar">
        <TabButton active={tab === "log"} onClick={() => setTab("log")} label="Log" />
        <TabButton active={tab === "trends"} onClick={() => setTab("trends")} label="Trends" />
        <TabButton active={tab === "journal"} onClick={() => setTab("journal")} label="Journal" />
      </nav>
    </div>
  );
}

function Slider({ id, label, min, max, value, onChange, hint }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      <div className="small">{hint}</div>
    </div>
  );
}

function EntryCard({ entry, onDelete }) {
  const when = new Date(entry.ts).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
  return (
    <div className="entry">
      <div>
        <div className="meta">{when}</div>
        <div className="small">Mood {entry.mood} • Energy {entry.energy} • Pain {entry.pain}</div>
        {entry.notes && <p style={{ marginTop: 8 }}>{entry.notes}</p>}
      </div>
      <div>
        <button onClick={onDelete} aria-label="Delete entry">Delete</button>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label }) {
  return (
    <button
      className={`tabbtn ${active ? "active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
    >
      {label}
    </button>
  );
}
