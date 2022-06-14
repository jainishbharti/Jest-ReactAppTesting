import { fireEvent, render } from "@testing-library/react";
import { act } from "react-test-renderer";
import Input from "./Input";

describe("Input Component", () => {
  it("rendered input", () => {
    const { getByTestId } = render(<Input showDiv={true} />);

    const input = getByTestId("searchBar");
    expect(input).toBeInTheDocument();
  });

  it("render the text", () => {
    const { getByTestId } = render(<Input showDiv={true} />);
    const div = getByTestId("divWeWantToShow");
    expect(div).toBeInTheDocument();
  });

  it("don't render the text", () => {
    const { queryByTestId } = render(<Input showDiv={false} />);
    const div = queryByTestId("divWeWantToShow");
    expect(div).not.toBeInTheDocument();
  });

  it("change on input when we type something", async () => {
    const { getByTestId } = render(<Input showDiv={true} />);
   await act(async() => {
      
      const input = getByTestId("searchBar");
      expect(input).toBeInTheDocument();
      
      const header = getByTestId("displaySearch");
      const inputWord = "Tyrantt";
      await fireEvent.change(input, { target: { value: inputWord } });
      expect(header.innerHTML).toBe(inputWord);
    });
  });
});
