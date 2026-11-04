export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQListProps {
  items: FAQItem[];
  defaultOpenIndex?: number;
}

export default function FAQList({
  items,
  defaultOpenIndex = 0,
}: FAQListProps) {
  return (
    <div className="border-t border-[#e9edef] w-full">
      {items.map((item, index) => (
        <details
          className="group py-[18px] border-b border-[#e9edef]"
          key={item.question}
          open={index === defaultOpenIndex}
        >
          <summary className="relative pr-7 text-[#002e40] cursor-pointer text-[15px] font-medium font-sora list-none flex items-center justify-between [&::-webkit-details-marker]:hidden select-none">
            <span>{item.question}</span>
            <span className="text-[#f8780c] text-xl font-light leading-none group-open:hidden">
              +
            </span>
            <span className="text-[#f8780c] text-xl font-light leading-none hidden group-open:inline">
              −
            </span>
          </summary>
          <p className="max-w-[620px] mt-3 m-0 text-[#62737a] text-[13px] leading-[1.7] font-sora">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
