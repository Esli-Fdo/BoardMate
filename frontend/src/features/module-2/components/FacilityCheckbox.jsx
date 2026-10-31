import {
  Wifi,
  Bath,
  WashingMachine,
  Utensils,
  Armchair,
  Bike,
  Check,
} from 'lucide-react'

const iconMap = {
  Wifi,
  Bath,
  WashingMachine,
  Utensils,
  Armchair,
  Bike,
}

function FacilityCheckbox({ label, iconName, checked, onChange }) {
  const IconComponent = iconMap[iconName]

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(label)}
      className={`group flex items-center gap-2.5 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
        checked
          ? 'border-primary bg-primary-soft text-primary shadow-xs'
          : 'border-line bg-white text-muted hover:border-primary/40 hover:text-ink'
      }`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
          checked
            ? 'border-primary bg-primary text-white'
            : 'border-line bg-page group-hover:border-primary/50'
        }`}
      >
        {checked && <Check size={12} strokeWidth={3} />}
      </span>

      {IconComponent && (
        <IconComponent
          size={16}
          className={checked ? 'text-primary' : 'text-muted group-hover:text-ink'}
        />
      )}

      <span>{label}</span>
    </button>
  )
}

export default FacilityCheckbox
