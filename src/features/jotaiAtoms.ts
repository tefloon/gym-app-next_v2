import { atom } from "jotai";

const rowsAtom = atom({
  isSelected: false,
  selectedRow: "",
});

const selectedRow = atom(
  (get) => get(rowsAtom),
  (get, set, newSelectedRow: string) => {
    const currentRows = get(rowsAtom);
    if (newSelectedRow === currentRows.selectedRow && currentRows.isSelected) {
      set(rowsAtom, { isSelected: false, selectedRow: "" });
    } else set(rowsAtom, { isSelected: true, selectedRow: newSelectedRow });
  }
);

export { rowsAtom, selectedRow };
