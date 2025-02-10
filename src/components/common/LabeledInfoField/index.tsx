interface LabeledInfoFieldProps {
  label: string;
  value: string;
}

export function LabeledInfoField({ label, value }: LabeledInfoFieldProps) {
  return (
    <div className="h-[70px] mb-2 flex items-center justify-between px-8 border border-[#d6d6d6] rounded-lg cursor-pointer">
      <span>{label}</span>
      <span className="max-w-[250px] font-light truncate">{value}</span>
    </div>
  );
}
