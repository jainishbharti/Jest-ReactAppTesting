import { fireEvent, getAllByTestId, render } from "@testing-library/react";
import { act } from "react-test-renderer";
import { Button } from "./Button";

describe("Button Component", () => {
  it("rendered button", () => {
    const { getByTestId } = render(<Button />);
    const button = getByTestId("button");
    expect(button).toBeInTheDocument();
  });

  it("render 1 button before click", () => {
    const { getAllByTestId } = render(<Button />);
    const buttonList = getAllByTestId("button");
    expect(buttonList).toHaveLength(1);
  });

  it("render 2 buttons after button click", () => {
    const { getAllByTestId } = render(<Button />);
    act(() => {
      const buttonList = getAllByTestId("button");
      fireEvent.click(buttonList[0]);
    });
    expect(getAllByTestId("button")).toHaveLength(2);
  });
});
