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
      const newValue = value > 0 ? value - 1 : 0
      setValue(newValue)
      setValueState(newValue)
  }

  return (
    <div className="p-3 flex justify-center items-center">
      <button
        onClick={decrement}
        disabled={value === 0}
        className={`text-xl border border-gray-300 text-gray-600 px-3 py-[3px] hover:border-gray-500 rounded-full cursor-pointer ${
          value === 0 ? "opacity-0 cursor-not-allowed" : ""}`}
          >−
      </button>
      <span className="w-16 text-center font-semibold "> {value} </span>
      <button
        onClick={increment}
        className="text-xl border border-gray-300 text-gray-600 px-3 py-[3px] hover:border-gray-500 rounded-full cursor-pointer"
      >+
      </button>
    </div>
  )
}

export default NumInput