type Item = {
  name: string;
  children?: string[];
};
export function buildItems(tree: any[]): Record<string, Item> {
  const items: Record<string, Item> = {
    root: { name: "root", children: [] },
  };
  tree.forEach((node) => {
    const parts = node.path.split("/");
    const name = parts[parts.length - 1];
    const parentPath = parts.length > 1 ? parts.slice(0, -1).join("/") : "root";

    if (!items[node.path]) {
      items[node.path] = { name };
    }
    if (node.type === "tree") {
      items[node.path].children = items[node.path].children ?? [];
    }

    if (!items[parentPath]) {
      items[parentPath] = { name: parts[parts.length - 2], children: [] };
    }
    if (!items[parentPath].children) {
      items[parentPath].children = [];
    }
    if (!items[parentPath].children!.includes(node.path)) {
      items[parentPath].children!.push(node.path);
    }
  });

  return items;
}
