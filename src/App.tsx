import "./App.css";
import { Wheel } from "./components/Wheel";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="w-full flex items-center justify-between content-center">
          <Wheel />
        </div>
      </header>
    </div>
  );
}

export default App;
