"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const AccordionContext = React.createContext<{
    activeItem: string | undefined
    setActiveItem: (value: string | undefined) => void
    type: "single" | "multiple"
    collapsible?: boolean
}>({
    activeItem: undefined,
    setActiveItem: () => { },
    type: "single",
})

const Accordion = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        type?: "single" | "multiple"
        collapsible?: boolean
        value?: string
        defaultValue?: string
        onValueChange?: (value: string) => void
    }
>(({ className, type = "single", collapsible = false, value, defaultValue, onValueChange, ...props }, ref) => {
    const [activeItem, setActiveItem] = React.useState<string | undefined>(value || defaultValue)

    // Sync with controlled value if provided
    React.useEffect(() => {
        if (value !== undefined) {
            setActiveItem(value)
        }
    }, [value])

    const handleItemChange = (newValue: string | undefined) => {
        const nextValue = newValue === activeItem && collapsible ? undefined : newValue
        setActiveItem(nextValue)
        if (onValueChange && nextValue !== undefined) {
            onValueChange(nextValue)
        }
    }

    return (
        <AccordionContext.Provider
            value={{
                activeItem,
                setActiveItem: handleItemChange,
                type,
                collapsible,
            }}
        >
            <div ref={ref} className={cn("", className)} {...props} />
        </AccordionContext.Provider>
    )
})
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => (
    <div ref={ref} className={cn("border-b", className)} data-value={value} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
    const { activeItem, setActiveItem } = React.useContext(AccordionContext)
    // Walk up to find the Item's value. 
    // Since we can't easily pass context downwards without wrapping every Item in a context provider (which is heavy),
    // we rely on the parent Item structure or just finding the value. 
    // Actually, standard way is Item provides context. Let's wrap Item in context.

    // WAIT: To be robust, let's just make AccordionItem provide `value` context.
    return (
        <div className="flex">
            <AccordionTriggerImpl className={className} {...props} ref={ref}>{children}</AccordionTriggerImpl>
        </div>
    )
})
AccordionTrigger.displayName = "AccordionTrigger"

// Helper to access item context
const AccordionItemContext = React.createContext<{ value: string }>({ value: "" })

const AccordionItemWrapper = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => (
    <AccordionItemContext.Provider value={{ value }}>
        <AccordionItem ref={ref} className={className} value={value} {...props} />
    </AccordionItemContext.Provider>
))
AccordionItemWrapper.displayName = "AccordionItem"


const AccordionTriggerImpl = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
    const { activeItem, setActiveItem } = React.useContext(AccordionContext)
    const { value } = React.useContext(AccordionItemContext)
    const isOpen = activeItem === value

    return (
        <button
            ref={ref}
            onClick={() => setActiveItem(value)}
            className={cn(
                "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                className
            )}
            data-state={isOpen ? "open" : "closed"}
            {...props}
        >
            {children}
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </button>
    )
})


const AccordionContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const { activeItem } = React.useContext(AccordionContext)
    const { value } = React.useContext(AccordionItemContext)
    const isOpen = activeItem === value

    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden text-sm transition-all"
                >
                    <div ref={ref} className={cn("pb-4 pt-0", className)} {...props}>
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItemWrapper as AccordionItem, AccordionTrigger, AccordionContent }
