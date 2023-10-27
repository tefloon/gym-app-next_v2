import SessionForm from "@/components/sessionForm";
import SessionList from "@/components/sessionList";
import { SetType, RowControlType } from "@/lib/types";

export default function AddSession() {
  const sessionFormProps = {
    isRowSelected: true,
    selectedRow: 2,
  };

  return (
    <div className="w-96">
      <SessionForm {...sessionFormProps} />
      <SessionList {...sessionFormProps} />
    </div>
  );
}
