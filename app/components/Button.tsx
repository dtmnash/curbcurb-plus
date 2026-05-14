import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({ children, href, onClick, className = "", type = "button" }: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center bg-primary text-white px-5 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-sm";
  const combinedClasses = `${baseClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
}
