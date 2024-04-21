import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SwitchDemo({label, checked, onCheckedChange, defaultChecked}) {
  return (
    <div className="flex items-center space-x-2">
      <Switch 
        id={label} 
        defaultChecked={defaultChecked}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor={label}>{label}</Label>
    </div>
  )
}
