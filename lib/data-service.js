import menuData from "@/data/MenuData";

export function getMenuItems() {
  return Array.isArray(menuData.items) ? [...menuData.items] : [];
}

