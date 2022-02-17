import { useEffect, useState } from "react";
import useWindowDimensions from "./useWindowDimensions";
import { ISliceConfig } from "../components/Slice";

const md = 768;
const lg = 1024;

export const useCompoundWord = ({ slice1, slice2 }: { slice1?: ISliceConfig; slice2?: ISliceConfig }) => {
  const { width } = useWindowDimensions();

  const [compoundWord, setCompoundWord] = useState<string>();

  useEffect(() => {
    if (slice1 && slice2) {
      if (width && width < lg && width > md)
        setCompoundWord(slice1.text + (slice1.compoundPostfix ?? "") + "-\n" + slice2.text);
      else setCompoundWord(slice1.text + (slice1.compoundPostfix ?? "") + slice2.text);
    } else {
      setCompoundWord(undefined);
    }

    return () => setCompoundWord(undefined);
  }, [slice1, slice2, width]);

  return compoundWord;
};
