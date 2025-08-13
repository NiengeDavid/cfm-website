import React from "react";

interface TextProviderProps {
  children: React.ReactNode;
  className?: string;
}

export default function TextProvider({
  children,
  className,
}: TextProviderProps) {
  const renderContent = () => {
    if (typeof children === "string") {
      return children
        .split("\n")
        .map((paragraph, index) => (
          <p
            key={index}
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ));
    }
    return children;
  };

  return (
    <div className={`text-black dark:text-white ${className || ""}`}>
      {renderContent()}
    </div>
  );
}
