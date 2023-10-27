export type SetType = {
  id: string;
  sessionId: string;
  weight: number;
  reps: number;
  isCompleted?: boolean;
};

export type RowControlType = {
  index?: number;
  isRowSelected: boolean;
  selectedRow?: number;
};
