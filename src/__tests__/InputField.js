import { render, screen, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import InputField from "../components/AddFlashCard/InputField";

// Helper function to render the component within the Redux Provider
const renderWithRedux = (component) =>
  render(<Provider store={store}>{component}</Provider>);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Test suite for the InputField component
describe("InputField Component Tests", () => {
  // Setup: Render the InputField component before each test
  beforeEach(() => {
    renderWithRedux(<InputField />);
  });

  // Test: Should check the presence of group name input
  test("should be group name", () => {
    const groupname = screen.getByLabelText(/create group*/i);
    expect(groupname).toBeInTheDocument();
  });

  // Test: Should check the presence of description input
  test("should be description", () => {
    const description = screen.getByLabelText(/add description/i);
    expect(description).toBeInTheDocument();
  });

  // Test: Should check the presence of "Upload Image" text
  test("should be image of group", () => {
    const groupimage = screen.getByText("Upload Image");
    expect(groupimage).toBeInTheDocument();
  });

  // Test: Should check the presence of term input
  test("should be term", () => {
    const term = screen.getByLabelText(/enter term*/i);
    expect(term).toBeInTheDocument();
  });

  // Test: Should check the presence of definition input
  test("should be definition", () => {
    const definition = screen.getByLabelText(/Enter Definition*/i);
    expect(definition).toBeInTheDocument();
  });

  // Test: Should check the presence of term image input
  test("should be term image", () => {
    const termimage = screen.getByLabelText(/Select Image/i);
    expect(termimage).toBeInTheDocument();
  });

  // Test: Should check the presence of "add more" button
  test("should be add more button", () => {
    const addmorebutton = screen.getByText(/add more/i);
    expect(addmorebutton).toBeInTheDocument();
  });

  // Test: Should check the presence of "Create" button
  test("should be create button", () => {
    const create = screen.getByRole("button", { name: "Create" });
    expect(create).toBeInTheDocument();
  });
});
