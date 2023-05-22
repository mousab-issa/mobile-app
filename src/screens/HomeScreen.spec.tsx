import { render } from "../utils/test-utils";
import { HomeScreen } from "./HomeScreen";

describe("home screen renders correctly", () => {
  it("renders correctly", () => {
    const { findByTestId } = render(<HomeScreen />);
    expect(findByTestId("table")).toBeTruthy();
  });
});
