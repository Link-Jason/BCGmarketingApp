import menuData from "@/data/menu_data.json";

export function getMenuItems() {
  return Array.isArray(menuData.items) ? [...menuData.items] : [];
}

