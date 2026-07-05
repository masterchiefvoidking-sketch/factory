import type { OrgChartNode } from "./types";
import { DEPARTMENT_IDS } from "./types";
import { DEPARTMENTS, CROSS_DEPARTMENT_PROJECTS } from "./registry";
import { TENANTS } from "@/nexus/tenants";
import { nexus } from "@/nexus/factory";

/**
 * Build the interactive organization chart.
 * Founder → Departments → Applications → Projects → Objects
 */
export function buildOrgChart(): OrgChartNode {
  const founder: OrgChartNode = {
    id: "founder",
    type: "founder",
    label: "Morgan",
    parentId: null,
    meta: "Founder · Chief Architect · Final Decision Authority",
    accent: "#c9a227",
    children: [],
  };

  for (const deptId of DEPARTMENT_IDS) {
    const dept = DEPARTMENTS[deptId];
    const deptNode: OrgChartNode = {
      id: `dept-${deptId}`,
      type: "department",
      label: dept.name,
      parentId: "founder",
      meta: dept.purpose,
      accent: dept.accent,
      children: [],
    };

    for (const workerId of dept.workers) {
      const tenant = TENANTS[workerId];
      const appNode: OrgChartNode = {
        id: `app-${workerId}`,
        type: "application",
        label: tenant.name,
        parentId: deptNode.id,
        meta: tenant.description,
        accent: tenant.badgeColor,
        children: [],
      };

      // Attach relevant cross-department projects
      for (const proj of CROSS_DEPARTMENT_PROJECTS) {
        const participates = proj.participants.some((p) => p.worker === workerId);
        if (participates) {
          appNode.children!.push({
            id: `proj-${proj.id}-${workerId}`,
            type: "project",
            label: proj.title,
            parentId: appNode.id,
            meta: proj.participants.find((p) => p.worker === workerId)?.role,
            accent: dept.accent,
            children: [],
          });
        }
      }

      deptNode.children!.push(appNode);
    }

    founder.children!.push(deptNode);
  }

  // Factory-owned objects under relevant departments
  for (const obj of nexus.getAllObjects()) {
    const ownerTenant = obj.createdBy;
    const appNode = findNode(founder, `app-${ownerTenant}`);
    if (appNode) {
      appNode.children = appNode.children ?? [];
      appNode.children.push({
        id: `obj-${obj.id}`,
        type: "object",
        label: obj.title,
        parentId: appNode.id,
        meta: obj.type,
        accent: "#95a5a6",
      });
    }
  }

  return founder;
}

function findNode(root: OrgChartNode, id: string): OrgChartNode | null {
  if (root.id === id) return root;
  for (const child of root.children ?? []) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}
