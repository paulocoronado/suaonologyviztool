import { useEffect, useRef, useState, type ReactNode } from "react";

interface NavMenuProps {
  label: string;
  children: ReactNode;
}

export function NavMenu({ label, children }: NavMenuProps) {
  const [open, setOpen] = useState(false);
  const contenedorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contenedorRef.current &&
        !contenedorRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={contenedorRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-md px-3 py-1.5 text-sm font-medium text-indigo-100 hover:bg-indigo-900"
      >
        {label}
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-2 w-64 rounded-md border border-gray-200 bg-white p-3 text-gray-900 shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
}
