import { FieldLabel } from "~/shared/ui/field"
import { Input } from "~/shared/ui/input"

const GameField = () => {
  return (
    <div>   
        <h1>Game Field</h1>
        <FieldLabel htmlFor="Type number here:"></FieldLabel>
        <Input placeholder="Type number here:" />
    </div>
  )
}
 