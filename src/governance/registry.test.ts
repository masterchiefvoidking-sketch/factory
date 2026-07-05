import { describe, expect, it } from "vitest";
import { FIRST_CERTIFIED_TENANT_ID, PROOF_LOG } from "./proof-log";
import { REPOSITORY_REGISTRY, getRepository } from "./registry";
import { OPEN_REPAIR_ITEMS } from "./repair-queue";

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

  it("records Citadel as first certified tenant (Proof #001)", () => {
    const citadel = getRepository("citadel");
    expect(citadel?.certificationStatus).toBe("pass");
    expect(citadel?.certificationScore).toBe(98);
    expect(citadel?.factoryCertificationReady).toBe(true);
    expect(citadel?.dailyDriverReady).toBe(false);
    expect(citadel?.liveFactoryIntegration).toBe(false);
    expect(citadel?.integrationStatus).toBe("manual");
    expect(citadel?.health).toBe("yellow");
    expect(citadel?.maturity).toBe("beta");
    expect(FIRST_CERTIFIED_TENANT_ID).toBe("citadel");
    expect(PROOF_LOG[0]?.certificationScore).toBe(98);
  });

  it("has open repair queue starting with Citadel CI", () => {
    expect(OPEN_REPAIR_ITEMS[0]?.id).toBe("R-011");
    expect(OPEN_REPAIR_ITEMS[0]?.repo).toBe("citadel");
    expect(OPEN_REPAIR_ITEMS[0]?.dependencyOrder).toBe(1);
  });
});
