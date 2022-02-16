import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders instruction text", () => {
  render(<App />);
  const instruction = screen.getByText(/spinn hjulene/i);
  expect(instruction).toBeInTheDocument();
});
