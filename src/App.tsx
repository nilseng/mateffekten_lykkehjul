import { useEffect, useState } from "react";
import "./App.css";
import { descriptions, foods, wordPlaceholder } from "./appConfig/wheelContent";
import { ISliceConfig } from "./components/Slice";
import { Wheel } from "./components/Wheel";

function App() {
  const [slice1, setSlice1] = useState<ISliceConfig>();
  const [slice2, setSlice2] = useState<ISliceConfig>();
  const [compoundWord, setCompoundWord] = useState<string>(wordPlaceholder);

  useEffect(() => {
    if (slice1 && slice2) {
      setCompoundWord(slice1.text + (slice1.compoundPostfix ?? "") + slice2.text);
    }
  }, [slice1, slice2]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="w-full h-full grid sm:grid-cols-5 gap-4 px-10">
          <div className="sm:col-span-2">
            <Wheel slices={descriptions} setSlice={setSlice1} />
          </div>
          <div className="flex w-full items-center justify-center">
            <div className="w-full border-2 border-gray-500 rounded-full font-bold font-custom text-xl text-gray-600 break-words p-4">
              {compoundWord}
            </div>
          </div>
          <div className="sm:col-span-2">
            <Wheel slices={foods} setSlice={setSlice2} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
