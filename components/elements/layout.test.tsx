import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Footer, Header } from "./layout"

describe("Header", () => {
  it("renders brand and tagline linking home", () => {
    render(<Header />)
    expect(
      screen.getByRole("link", { name: /ReBrew & ReDistill/ })
    ).toHaveAttribute("href", "/")
    expect(screen.getByText("酒造りを歩く。")).toBeInTheDocument()
  })
})

describe("Footer", () => {
  it("renders brand notation", () => {
    render(<Footer />)
    expect(screen.getByText("Tokyo, Japan")).toBeInTheDocument()
  })
})
