export function ActionStyle({ children }) {
  return (
    <div className="flex min-h-8 min-w-36 max-w-64 flex-row items-center justify-center space-x-1 rounded-md bg-blue-500 px-1 py-1 text-sm font-semibold text-white shadow-md shadow-blue-500/40 hover:bg-blue-600 md:min-h-10 md:min-w-48 md:space-x-3 md:px-3 md:py-2 md:text-base md:shadow-lg">
      {children}
    </div>
  );
}
export function SecondaryActionStyle({ children }) {
  return (
    <div className="flex min-h-8 min-w-36 max-w-64 flex-row items-center justify-center space-x-1 rounded-md bg-gray-200 px-1 py-1 text-sm font-semibold text-blue-500 hover:bg-gray-100 md:min-h-10 md:min-w-48 md:space-x-3 md:px-3 md:py-2 md:text-base md:shadow-lg">
      {children}
    </div>
  );
}

export function SecondaryStyle({ children }) {
  return (
    <div className="flex min-h-8 max-w-64 flex-row items-center justify-center space-x-2 rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-gray-500/40 hover:bg-gray-800">
      {children}
    </div>
  );
}
