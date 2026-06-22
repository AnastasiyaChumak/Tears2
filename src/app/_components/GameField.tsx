import { FieldLabel } from "~/shared/ui/field"
import { Input } from "~/shared/ui/input"

const GameField = () => {
  return (
    <div>   
        <h1>Game "Guess the Number"</h1>
        <FieldLabel htmlFor="Type number here:"></FieldLabel>
        <Input placeholder="Let`s go!" />
    </div>
  )
}
 