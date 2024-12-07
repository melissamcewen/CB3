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
      <textarea
        className="textarea textarea-bordered h-32"
        placeholder="Enter ingredients separated by commas..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
