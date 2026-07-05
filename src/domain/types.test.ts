import { describe, expect, it } from "vitest";
import { hasClearance } from "./types";

describe("hasClearance", () => {
  it("grants higher clearance access to lower-required buildings", () => {
    expect(hasClearance("founder", "employee")).toBe(true);
    expect(hasClearance("engineer", "visitor")).toBe(true);
  });

  it("denies lower clearance access to higher-required buildings", () => {
    expect(hasClearance("visitor", "founder")).toBe(false);
    expect(hasClearance("employee", "system")).toBe(false);
  });

  it("allows same-level clearance", () => {
    expect(hasClearance("architect", "architect")).toBe(true);
  });
});
