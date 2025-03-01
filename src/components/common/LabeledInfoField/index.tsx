import { Input } from '@/components/ui/input';

interface LabeledInfoFieldProps {
  label: string;
  value: string | number;
  type?: 'text' | 'number';
  isEditable?: boolean;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function LabeledInfoField({
  label,
  value,
  type = 'text',
  isEditable = false,
  onChange,
  placeholder,
  disabled = false,
}: LabeledInfoFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;

    const newValue = e.target.value;
    if (type === 'number') {
      // 빈 문자열이거나 유효한 숫자가 아닌 경우 처리
      if (newValue === '') {
        onChange(0);
        return;
      }
      const numValue = Number(newValue);
      if (!isNaN(numValue)) {
        onChange(numValue);
      }
    } else {
      onChange(newValue);
    }
  };

  return (
    <div className="h-[70px] mb-2 flex items-center justify-between px-8 border border-[#d6d6d6] rounded-lg">
      <span className="shrink-0 mr-4">{label}</span>
      {isEditable ? (
        <Input
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className="max-w-[250px] font-light text-right bg-transparent border-none outline-none"
        />
      ) : (
        <span className="max-w-[250px] font-light truncate text-right">
          {value}
        </span>
      )}
    </div>
  );
}
