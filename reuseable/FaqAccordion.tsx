"use client";

import { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
  id?: string;
}

export interface FaqAccordionProps {
  items: FaqItem[];
  defaultOpenIndex?: number;
  allowMultiple?: boolean;
  className?: string;
}

export default function FaqAccordion({
  items,
  defaultOpenIndex = 0,
  allowMultiple = false,
  className = "",
}: FaqAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>(
    defaultOpenIndex >= 0 && defaultOpenIndex < items.length ? [defaultOpenIndex] : []
  );

  const toggleIndex = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={`flex flex-col gap-3 sm:gap-3.5 w-full ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        const itemId = item.id || `faq-item-${index}`;

        return (
          <div
            key={item.question}
            className={`transition-all duration-300 border border-[#ECE9E3] ${
              isOpen
                ? "rounded-[22px] sm:rounded-[24px] bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                : "rounded-[20px] sm:rounded-[24px] bg-[#F7F6F3] px-6 py-4 sm:px-7 sm:py-4.5 hover:bg-[#F2F0EC]"
            } group`}
          >
            <button
              type="button"
              onClick={() => toggleIndex(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${itemId}`}
              className={`w-full flex items-center justify-between gap-4 text-left cursor-pointer transition-colors ${
                isOpen ? "items-start" : "items-center"
              }`}
            >
              <span
                className={`font-sora text-[#002E40] font-medium leading-snug transition-colors ${
                  isOpen
                    ? "text-[14px] sm:text-[16px] pt-0.5"
                    : "text-[14px] sm:text-[16px] group-hover:text-[#F8780C]"
                }`}
              >
                {item.question}
              </span>

              {isOpen ? (
                <span
                  aria-hidden="true"
                  className="w-6 h-6 sm:w-6 sm:h-6 rounded-lg bg-[#002E40] text-white flex items-center justify-center shrink-0 text-lg leading-none shadow-sm transition-transform"
                >
                  −
                </span>
              ) : (
                <span
                  aria-hidden="true"
                  className="w-6 h-6 sm:w-6 sm:h-6 rounded-full bg-white border border-[#ECE9E3] text-[#62737A] flex items-center justify-center shrink-0 text-base leading-none shadow-sm group-hover:border-[#002E40] transition-colors"
                >
                  +
                </span>
              )}
            </button>

            <div
              id={`faq-answer-${itemId}`}
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100 mt-2.5" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-[#62737A] font-sora text-[14px] sm:text-base leading-[1.2] max-w-[580px] m-0">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

