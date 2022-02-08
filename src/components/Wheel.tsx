import { Slice } from "./Slice";

const descriptions = [
  "Utdanning",
  "Oppdagelse",
  "Bærekraft",
  "Energi",
  "Rettferdighet",
  "Likestilling",
  "Utvikling",
  "Kunnskap",
  "Forskning",
  "Teknologi",
];

const foods = ["bønne", "mais", "høne", "mango", "vetikke", "gulrot", "blader", "eple", "brokkoli", "appelsin"];

const radius = 500;
const center = { x: 500, y: 500 };

export const Wheel = () => {
  return (
    <>
      <svg height="100%" width="100%" viewBox="0 0 1000 1000">
        <g className="App-logo">
          {descriptions.map((d, i) => (
            <Slice key={i} sliceCount={descriptions.length} sliceIndex={i} radius={radius} center={center} />
          ))}
        </g>
        <g style={{ cursor: "pointer" }}>
          <circle cx="500" cy="500" r="12%" fill="#f8f9fa" />
          <text
            className="font-bold"
            x="500"
            y="500"
            textAnchor="middle"
            alignmentBaseline="middle"
            style={{ userSelect: "none" }}
            fontSize="2em"
          >
            Klikk her!
          </text>
        </g>
      </svg>
      <svg height="100%" width="100%" viewBox="0 0 1000 1000">
        <g className="App-logo">
          {foods.map((d, i) => (
            <Slice key={i} sliceCount={descriptions.length} sliceIndex={i} radius={radius} center={center} />
          ))}
        </g>
        <g style={{ cursor: "pointer" }}>
          <circle cx="500" cy="500" r="12%" fill="#f8f9fa" />
          <text
            className="font-bold"
            x="500"
            y="500"
            textAnchor="middle"
            alignmentBaseline="middle"
            style={{ userSelect: "none" }}
            fontSize="2em"
          >
            Klikk her!
          </text>
        </g>
      </svg>
    </>
  );
};
