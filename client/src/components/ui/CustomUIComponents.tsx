import React, {
  ReactNode,
  InputHTMLAttributes,
  ButtonHTMLAttributes,
  LabelHTMLAttributes,
} from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

export const DialogTrigger: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>{children}</>
);

export const DialogContent: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>{children}</>
);

export const DialogHeader: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="mb-4">{children}</div>
);

export const DialogTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

export const DialogFooter: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="mt-4">{children}</div>
);

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <button
    {...props}
    className={`rounded-md px-4 py-2 ${props.className || ""}`}
  >
    {children}
  </button>
);

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => (
  <input
    {...props}
    className={`border px-3 py-2 rounded-md w-full ${props.className || ""}`}
  />
);

export const Label: React.FC<LabelHTMLAttributes<HTMLLabelElement>> = ({
  children,
  ...props
}) => (
  <label {...props} className="block text-sm font-medium">
    {children}
  </label>
);

