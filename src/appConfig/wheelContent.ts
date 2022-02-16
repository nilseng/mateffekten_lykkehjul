import apple from "../images/apple.png";
import carrot from "../images/carrot.png";
import cassava from "../images/cassava.png";
import leafs from "../images/leafs.png";
import lettuce from "../images/lettuce.png";
import orange from "../images/orange.png";
import mango from "../images/mango.png";
import bean from "../images/bean.png";
import corn from "../images/corn.png";
import hen from "../images/hen.png";
import { colors } from "./colors";
import { ISliceConfig } from "../components/Slice";

export const descriptions: ISliceConfig[] = [
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

export const foods: ISliceConfig[] = [
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

export const wordPlaceholder = "Spinn hjulene!";
