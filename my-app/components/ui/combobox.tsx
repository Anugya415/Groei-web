"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  className,
  disabled = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value || "");

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    setOpen(false);
    onValueChange?.(optionValue);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={cn(
          "w-full flex items-center justify-between h-10 px-3 rounded-lg border-2 transition-all duration-200",
          "bg-[#1e1e2e] text-[#e8e8f0]",
          "border-[#2a2a3a]",
          "hover:border-[#6366f1]/50 hover:bg-[#1e1e2e]",
          "focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20",
          disabled && "opacity-50 cursor-not-allowed",
          open && "border-[#6366f1]"
        )}
        style={{
          backgroundColor: "#1e1e2e",
          color: "#e8e8f0",
          borderColor: open ? "#6366f1" : "#2a2a3a",
        }}
      >
        <span 
          className={cn(
            "text-sm truncate text-left flex-1 mr-3",
            !selectedOption ? "text-[#6b7280]" : "text-[#e8e8f0]"
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronsUpDown 
          className={cn(
            "h-4 w-4 flex-shrink-0 transition-transform",
            open && "rotate-180",
            "text-[#9ca3af]"
          )} 
        />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            style={{ backgroundColor: "rgba(10, 10, 15, 0.5)" }}
          />
          <div 
            className="absolute z-50 w-full mt-1 rounded-lg overflow-hidden shadow-xl"
            style={{
              backgroundColor: "#151520",
              border: "2px solid #2a2a3a",
              boxShadow: "0 10px 40px rgba(99, 102, 241, 0.1)",
            }}
          >
            <div className="max-h-60 overflow-auto">
              {options.length === 0 ? (
                <div 
                  className="px-3 py-2 text-sm text-center"
                  style={{ color: "#9ca3af" }}
                >
                  No options available
                </div>
              ) : (
                options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 text-sm transition-colors duration-150",
                      "hover:bg-[#1e1e2e]",
                      selectedValue === option.value && "bg-[#6366f1]/10"
                    )}
                    style={{
                      color: selectedValue === option.value ? "#6366f1" : "#e8e8f0",
                      backgroundColor: selectedValue === option.value ? "rgba(99, 102, 241, 0.1)" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (selectedValue !== option.value) {
                        e.currentTarget.style.backgroundColor = "#1e1e2e";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedValue !== option.value) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      } else {
                        e.currentTarget.style.backgroundColor = "rgba(99, 102, 241, 0.1)";
                      }
                    }}
                  >
                    <span className="truncate text-left flex-1 mr-3">{option.label}</span>
                    {selectedValue === option.value && (
                      <Check 
                        className="h-4 w-4 flex-shrink-0" 
                        style={{ color: "#6366f1" }}
                      />
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
