/** Text that rolls up to a duplicate of itself on hover. Pure CSS. */
export function RollText({ children }: { children: string }) {
  return (
    <span className="group/roll relative inline-flex overflow-hidden">
      <span className="transition-transform duration-500 ease-out-expo group-hover/roll:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute left-0 top-full transition-transform duration-500 ease-out-expo group-hover/roll:-translate-y-full"
      >
        {children}
      </span>
    </span>
  );
}
