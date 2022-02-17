import { useState } from "react";
import "./App.css";
import { descriptions, foods, wordPlaceholder } from "./appConfig/wheelContent";
import { ISliceConfig } from "./components/Slice";
import { Wheel } from "./components/Wheel";
import { useCompoundWord } from "./hooks/useCompoundWord";

function App() {
  const [slice1, setSlice1] = useState<ISliceConfig>();
  const [slice2, setSlice2] = useState<ISliceConfig>();
  const compoundWord = useCompoundWord({ slice1, slice2 });

  return (
    <div className="App">
      <header className="App-header">
        <div className="w-full h-full grid md:grid-cols-5 gap-4 px-10">
          <div className="md:col-span-2 flex items-center justify-center">
            <div className="w-full lg:max-w-none max-w-md">
              <Wheel slices={descriptions} setSlice={setSlice1} />
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="w-full max-w-sm border-2 border-gray-500 rounded-full font-bold font-custom text-xl text-gray-600 p-4">
              {compoundWord ? compoundWord : wordPlaceholder}
            </div>
          </div>
          <div className="md:col-span-2 flex items-center justify-center">
            <div className="w-full lg:max-w-none max-w-md">
              <Wheel slices={foods} setSlice={setSlice2} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
