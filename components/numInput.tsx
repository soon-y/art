import { Button } from "./ui/button"
import { useState } from "react"

interface props {
  initial: number
  setValue: React.Dispatch<React.SetStateAction<number>>
}

const NumInput: React.FC<props> = ({ initial, setValue }) => {
  const [value, setValueState] = useState<number>(initial || 0)

  const increment = () => {
    setValue(value + 1)
    setValueState(value + 1)
  }

  const decrement = () => {
    const newValue = value > 1 ? value - 1 : 1
    setValue(newValue)
    setValueState(newValue)
  }

  return (
    <div className="w-full p-3 flex justify-center items-center">
      <Button variant={"outline"} onClick={decrement} disabled={value === 1} className={`text-xl px-[14px] rounded-full`}>
        <span className="text-muted-foreground select-none">&minus;</span>
      </Button>
      <span className="w-16 text-center font-semibold "> {value} </span>
      <Button variant={"outline"} onClick={increment} className="text-xl px-[14px] rounded-full">
      <span className="text-muted-foreground select-none">&#43;</span>
      </Button>
    </div>
  )
}

export default NumInput