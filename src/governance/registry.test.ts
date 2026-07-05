import { describe, expect, it } from "vitest";
import { REPOSITORY_REGISTRY, getRepository } from "./registry";
import { MASTER_REPAIR_QUEUE } from "./repair-queue";

describe("governance registry", () => {
  it("includes three audited foundation repos", () => {
    const ids = REPOSITORY_REGISTRY.map((r) => r.id);
    expect(ids).toContain("factory-standards");
    expect(ids).toContain("factory-core");
    expect(ids).toContain("factory");
  });

  it("marks unaudited tenants with null audit score", () => {
    const bosslady = getRepository("bosslady");
    expect(bosslady?.auditScore).toBeNull();
    expect(bosslady?.confidence).toBe("low");
  });

  it("has ordered repair queue starting with standards", () => {
    expect(MASTER_REPAIR_QUEUE[0]?.repo).toBe("factory-standards");
    expect(MASTER_REPAIR_QUEUE[0]?.dependencyOrder).toBe(1);
  });
});
