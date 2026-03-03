
import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", ...props }, ref) => {
        const variants = {
            primary: "bg-[#6fcbcc] text-white shadow-lg shadow-[#6fcbcc]/20",
            outline: "border-2 border-[#6fcbcc] text-[#6fcbcc] bg-transparent",
            ghost: "text-charcoal hover:bg-[#6fcbcc]/10",
            link: "text-[#6fcbcc] underline-offset-4 hover:underline",
        }

        const hoverStyles = {
            primary: { backgroundColor: "#5bb0b1", boxShadow: "0 10px 15px -3px rgba(111, 203, 204, 0.3)" },
            outline: { backgroundColor: "rgba(111, 203, 204, 0.05)" },
            ghost: { backgroundColor: "rgba(111, 203, 204, 0.15)" },
            link: {},
        }

        return (
            <motion.button
                whileHover={props.disabled ? {} : hoverStyles[variant]}
                whileTap={props.disabled ? {} : { scale: 0.98 }}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fcbcc] disabled:pointer-events-none disabled:opacity-50 disabled:grayscale",
                    variants[variant],
                    size === "default" && "h-11 px-8",
                    size === "sm" && "h-9 px-4 text-xs",
                    size === "lg" && "h-14 px-10 text-lg",
                    size === "icon" && "h-10 w-10",
                    className
                )}
                ref={ref as any}
                {...(props as any)}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
