"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        return (
          <div key={item.question} className="surface-card overflow-hidden">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span className="text-base font-bold text-ink">{item.question}</span>
              <span className="text-2xl font-light text-brand-dark">{isOpen ? "-" : "+"}</span>
            </button>
            {isOpen ? (
              <div className="border-t border-line px-6 py-5 text-sm leading-7 text-muted">{item.answer}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
