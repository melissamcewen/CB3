import { Textarea } from "@/components/ui/textarea";

interface IngredientInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function IngredientInput({ value, onChange }: IngredientInputProps) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Paste your ingredients list</span>
      </label>
      <Textarea
        placeholder="Enter ingredients separated by commas..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-32"
      />
    </div>
  );
}
