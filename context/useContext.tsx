import React from "react";

export default function useContext<T>(context: React.Context<T>): T {
  const contextValue = React.useContext(context);
  if (contextValue === undefined) {
    throw new Error(`useContext must be used within a Provider`);
  }
  return contextValue;
}
