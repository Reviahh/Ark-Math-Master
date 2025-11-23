import React from 'react';

interface RhombusButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  active?: boolean;
}

const RhombusButton: React.FC<RhombusButtonProps> = ({ 
  children, 
  variant = 'primary', 
  active = false,
  className = '', 
  ...props 
}) => {
  
  const baseStyles = "relative px-8 py-3 font-bold uppercase tracking-widest text-sm transition-all duration-200 focus:outline-none rhombus-btn group";
  
  const variants = {
    primary: active 
      ? "bg-ark-yellow text-black hover:bg-white" 
      : "bg-ark-panel text-ark-text border-l-4 border-ark-yellow hover:bg-ark-yellow hover:text-black",
    secondary: active
      ? "bg-ark-accent text-black"
      : "bg-ark-panel text-ark-subtext border-l-4 border-ark-accent hover:bg-ark-accent hover:text-black",
    danger: "bg-ark-danger text-white hover:bg-red-600"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {/* Decorative line */}
      <div className="absolute top-0 right-0 w-2 h-2 bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
};

export default RhombusButton;
