import * as React from "react"
import * as RadixSlider from '@radix-ui/react-slider'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sliderVariants = cva(
  "relative flex w-full touch-none select-none items-center",
  {
    variants: {
      size: {
        sm: "h-4",
        md: "h-5",
        lg: "h-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof RadixSlider.Root>,
  VariantProps<typeof sliderVariants> { }

const Slider = React.forwardRef<
  React.ElementRef<typeof RadixSlider.Root>,
  SliderProps
>(({ className, size, ...props }, ref) => (
  <RadixSlider.Root
    ref={ref}
    className={cn(sliderVariants({ size }), className)}
    {...props}
  >
    <RadixSlider.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-black">
      <RadixSlider.Range className="absolute h-full bg-white" />
    </RadixSlider.Track>
    <RadixSlider.Thumb className="block h-5 w-5 rounded-full bg-white border border-none shadow hover:bg-muted focus:outline-none" />
  </RadixSlider.Root>
))

Slider.displayName = "Slider"

export { Slider }