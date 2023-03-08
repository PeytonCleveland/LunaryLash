import { render, screen } from "@testing-library/react";
import { Footer } from "../../components";
import "@testing-library/jest-dom";

describe("Footer", () => {
  it("should render the footer component", () => {
    render(<Footer />);

    // Logo
    expect(screen.getByText("Lunary Lash")).toBeInTheDocument();

    // Contact column
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("334.224.4248")).toBeInTheDocument();
    expect(screen.getByText("334.224.4248")).toHaveAttribute(
      "href",
      "tel:3342244248"
    );
    expect(screen.getByText("morgan@lunarylash.com")).toBeInTheDocument();
    expect(screen.getByText("morgan@lunarylash.com")).toHaveAttribute(
      "href",
      "mailto:morgan@lunarylash.com"
    );

    // Social column
    expect(screen.getByText("Follow")).toBeInTheDocument();
    expect(screen.getAllByRole("link")[2]).toHaveAttribute(
      "href",
      "https://instagram.com"
    );
    expect(screen.getAllByRole("link")[3]).toHaveAttribute(
      "href",
      "https://facebook.com"
    );
    expect(screen.getAllByRole("link")[4]).toHaveAttribute(
      "href",
      "https://tiktok.com"
    );

    // Copyright
    expect(screen.getByText("© 2023 All Rights Reserved")).toBeInTheDocument();
  });
});
