import { useState } from "react";
import "./App.css";
import { ISliceConfig } from "./components/Slice";
import { Wheel } from "./components/Wheel";
import { colors } from "./utils/colors";

const descriptions: ISliceConfig[] = [
  { text: "Energi", bgColor: colors.blue },
  { text: "Rettferdighet", bgColor: colors.yellow },
  { text: "Likestilling", bgColor: colors.orange2 },
  { text: "Utvikling", bgColor: colors.orange },
  { text: "Kunnskap", bgColor: colors.green },
  { text: "Forskning", bgColor: colors.red },
  { text: "Teknologi", bgColor: colors.blue },
  { text: "Utdanning", bgColor: colors.orange },
  { text: "Oppdagelse", bgColor: colors.green },
  { text: "Bærekraft", bgColor: colors.red },
];

const foods: ISliceConfig[] = [
  { text: "mango", bgColor: colors.blue },
  { text: "cassavarot", bgColor: colors.yellow },
  { text: "gulrot", bgColor: colors.orange2 },
  { text: "blader", bgColor: colors.orange },
  { text: "eple", bgColor: colors.green },
  { text: "brokkoli", bgColor: colors.red },
  { text: "appelsin", bgColor: colors.blue },
  { text: "bønne", bgColor: colors.orange },
  { text: "mais", bgColor: colors.green },
  { text: "høne", bgColor: colors.red },
];

function App() {
  const [compoundWord] = useState<string>("placeholder");

  return (
    <div className="App">
      <header className="App-header">
        <div className="w-full h-full grid sm:grid-cols-5 gap-4 px-4">
          <div className="sm:col-span-2">
            <Wheel slices={descriptions} />
          </div>
          <div className="flex w-full items-center justify-center">
            <div className="border border-gray-500 rounded-full p-4">{compoundWord}</div>
          </div>
          <div className="sm:col-span-2">
            <Wheel slices={foods} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
