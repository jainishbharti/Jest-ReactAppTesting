import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-test-renderer";
import { Login } from "./login";

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "John Doe" },
    }),
  },
}));

test("username input should be rendered", () => {
  render(<Login />);
  const userInput = screen.getByTestId("username");
  expect(userInput).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<Login />);
  const passInput = screen.getByPlaceholderText("Password");
  expect(passInput).toBeInTheDocument();
});

test("login button should be rendered", () => {
  render(<Login />);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

test("username input should be empty", () => {
  render(<Login />);
  const usernameInput = screen.getByPlaceholderText(/username/i);
  expect(usernameInput.value).toBe("");
});

test("password input should be empty", () => {
  render(<Login />);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  expect(passwordInput.value).toBe("");
});

test("button should be disabled", () => {
  render(<Login />);
  const button = screen.getByRole("button");
  expect(button).toBeDisabled();
});

test("error message sould not be visible", () => {
  render(<Login />);
  const error = screen.queryByTestId("error");
  expect(error).not.toBeVisible();
});

test("username input should change", () => {
  render(<Login />);
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const testValue = "test";
  fireEvent.change(usernameInput, { target: { value: testValue } });
  expect(usernameInput.value).toBe(testValue);
});

test("password input should change", () => {
  render(<Login />);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const testValue = "password";
  fireEvent.change(passwordInput, { target: { value: testValue } });
  expect(passwordInput.value).toBe(testValue);
});

test("button should not be disabled when input exists", () => {
  render(<Login />);
  const button = screen.getByRole("button");
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(usernameInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });
  expect(button).not.toBeDisabled();
});

test("loading should not be rendered first", () => {
  render(<Login />);
  const loading = screen.queryByText("Please wait...");
  expect(loading).not.toBeInTheDocument();
});

test("loading should be rendered", () => {
  render(<Login />);
  const buttonEl = screen.queryByRole("button");
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(usernameInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.click(screen.getByRole("button"));
  expect(buttonEl).toHaveTextContent(/please wait../i);
});

test("loading should not be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.queryByRole("button");
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(usernameInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => expect(buttonEl).not.toHaveTextContent(/please wait../i));
});

test("user name should be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.queryByRole("button");
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(usernameInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.click(screen.getByRole("button"));

  const userItem = await screen.findByText(/john doe/i);
  expect(userItem).toBeInTheDocument();
});
