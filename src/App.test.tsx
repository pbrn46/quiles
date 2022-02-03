import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"

it("renders without crashing", () => {
  render(<App />);
  const linkElement = screen.getByText(/power/i);
  expect(linkElement).toBeInTheDocument();
});
