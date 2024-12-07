import { FilterOptions } from "@/lib/types";
import { filterCategories } from "@/lib/config/categories";

interface FilterOptionsProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
}

export function FilterOptions({ filters, onChange }: FilterOptionsProps) {
  return (
    <div className="flex flex-wrap gap-4 my-4">
      {Object.entries(filterCategories).map(([key, category]) => (
        <label key={key} className="label cursor-pointer">
          <input
            type="checkbox"
            className="checkbox checkbox-primary mr-2"
            checked={filters[key]}
            onChange={(e) => onChange({ ...filters, [key]: e.target.checked })}
          />
          <span className="label-text">{category.label}</span>
        </label>
      ))}
    </div>
  );
}
