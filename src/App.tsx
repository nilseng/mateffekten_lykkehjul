import { useEffect, useState } from "react";
import "./App.css";
import { ISliceConfig } from "./components/Slice";
import { Wheel } from "./components/Wheel";
import { colors } from "./utils/colors";
import apple from "./images/apple.png";
import carrot from "./images/carrot.png";
import cassava from "./images/cassava.png";
import leafs from "./images/leafs.png";
import lettuce from "./images/lettuce.png";
import orange from "./images/orange.png";
import mango from "./images/mango.png";
import bean from "./images/bean.png";
import corn from "./images/corn.png";
import hen from "./images/hen.png";

const descriptions: ISliceConfig[] = [
  { text: "Energi", bgColor: colors.blue },
  { text: "Rettferdighet", bgColor: colors.yellow, compoundPostfix: "s" },
  { text: "Likestilling", bgColor: colors.orange2, compoundPostfix: "s" },
  { text: "Utvikling", bgColor: colors.orange, compoundPostfix: "s" },
  { text: "Kunnskap", bgColor: colors.green, compoundPostfix: "s" },
  { text: "Forskning", bgColor: colors.red, compoundPostfix: "s" },
  { text: "Teknologi", bgColor: colors.blue },
  { text: "Utdanning", bgColor: colors.orange, compoundPostfix: "s" },
  { text: "Oppdagelse", bgColor: colors.green, compoundPostfix: "s" },
  { text: "Bærekraft", bgColor: colors.red, compoundPostfix: "s" },
];

const foods: ISliceConfig[] = [
  { text: "mango", bgColor: colors.blue, imageSrc: mango },
  { text: "cassavarot", bgColor: colors.yellow, imageSrc: cassava },
  { text: "gulrot", bgColor: colors.orange2, imageSrc: carrot },
  { text: "blader", bgColor: colors.orange, imageSrc: leafs },
  { text: "eple", bgColor: colors.green, imageSrc: apple },
  { text: "salat", bgColor: colors.red, imageSrc: lettuce },
  { text: "appelsin", bgColor: colors.blue, imageSrc: orange },
  { text: "bønne", bgColor: colors.orange, imageSrc: bean },
  { text: "mais", bgColor: colors.green, imageSrc: corn },
  { text: "høne", bgColor: colors.red, imageSrc: hen },
];

const wordPlaceholder = "Spinn hjulene!";

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
