"use client";

import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import { Tree, TreeItem, TreeItemLabel } from "./tree";
import { Item } from "@/lib/types/client-types";
import { Button } from "./ui/button";

const indent = 20;
type ItemPropTypes = {
  items: Record<string, Item>;
  setRootDir: (dir: string) => void;
  setEditRootDirMode: (mode: boolean) => void;
};
export default function FolderTree({
  items,
  setRootDir,
  setEditRootDirMode,
}: ItemPropTypes) {
  const tree = useTree<Item>({
    dataLoader: {
      getChildren: (itemId) => items?.[itemId]?.children ?? [],
      getItem: (itemId) => items?.[itemId],
    },
    features: [syncDataLoaderFeature, hotkeysCoreFeature],
    getItemName: (item) => item.getItemData().name,
    indent,
    initialState: {
      expandedItems: [],
    },
    isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
    rootItemId: "root",
  });
  return (
    <div className="flex h-full flex-col gap-2 *:first:grow">
      <div>
        <Tree
          className="before:-ms-1 my-3 relative before:absolute before:inset-0 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
          indent={indent}
          tree={tree}
        >
          {tree.getItems().map((item) => {
            return (
              <TreeItem item={item} key={item.getId()}>
                <TreeItemLabel
                  className={
                    "before:-inset-y-0.5 before:-z-10 relative before:absolute before:inset-x-0 before:bg-background cursor-pointer"
                  }
                  onClick={() => {
                    setRootDir(item.getId());
                  }}
                >
                  <span className="flex items-center gap-2">
                    {item.isExpanded() ? (
                      <FolderOpenIcon className="pointer-events-none size-4 text-muted-foreground" />
                    ) : (
                      <FolderIcon className="pointer-events-none size-4 text-muted-foreground" />
                    )}
                    {item.getItemName()}
                  </span>
                </TreeItemLabel>
              </TreeItem>
            );
          })}
        </Tree>
        <div className="flex gap-5 mx-2 justify-between">
          {" "}
          <Button
            variant={"outline"}
            onClick={() => {
              setRootDir("./");
              setEditRootDirMode(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              setEditRootDirMode(false);
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
