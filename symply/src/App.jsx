import SymptomForm from "./components/SymptomForm";
import EntryViewer from "./components/EntryViewer";
import TrendGraph from "./components/TrendGraph";

function App() {
  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-start p-6">
      <div className="w-full max-w-xl">
        <SymptomForm />
        <EntryViewer />
        <TrendGraph />
      </div>
    </div>
  );
}

export default App;
