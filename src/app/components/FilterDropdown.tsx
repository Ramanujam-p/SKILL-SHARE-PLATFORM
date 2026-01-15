import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { JSX, ReactNode } from "react";

/* ---------------- TYPES ---------------- */

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedOptions: string[];
  onSelectionChange: (ids: string[]) => void;
  icon?: ReactNode;
}

/* ---------------- COMPONENT ---------------- */

export function FilterDropdown({
  label,
  options,
  selectedOptions,
  onSelectionChange,
  icon,
}: FilterDropdownProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOption = (optionId: string) => {
    if (selectedOptions.includes(optionId)) {
      onSelectionChange(selectedOptions.filter((id) => id !== optionId));
    } else {
      onSelectionChange([...selectedOptions, optionId]);
    }
  };

  const clearAll = () => {
    onSelectionChange([]);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all text-sm font-medium text-gray-700"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {icon && <span className="text-gray-500">{icon}</span>}
        <span>{label}</span>

        {selectedOptions.length > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full"
          >
            {selectedOptions.length}
          </motion.span>
        )}

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="size-4 text-gray-500" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-10"
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden"
            >
              {/* Header */}
              {selectedOptions.length > 0 && (
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-gray-50">
                  <span className="text-xs font-medium text-gray-600">
                    {selectedOptions.length} selected
                  </span>
                  <button
                    onClick={clearAll}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Options */}
              <div className="max-h-64 overflow-y-auto p-2">
                {options.map((option, index) => {
                  const isSelected = selectedOptions.includes(option.id);

                  return (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => toggleOption(option.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                        isSelected
                          ? "bg-blue-50 text-blue-700"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <span className="text-sm font-medium">
                        {option.label}
                      </span>

                      <div className="flex items-center gap-2">
                        {option.count !== undefined && (
                          <span className="text-xs text-gray-500">
                            ({option.count})
                          </span>
                        )}

                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="size-4 bg-blue-500 rounded-sm flex items-center justify-center"
                          >
                            <svg
                              className="size-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
