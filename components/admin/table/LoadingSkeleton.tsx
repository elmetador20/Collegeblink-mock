"use client";

import React from "react";

interface LoadingSkeletonProps {
  columnsCount: number;
  rowsCount?: number;
}

export function LoadingSkeleton({ columnsCount, rowsCount = 5 }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: rowsCount }).map((_, rIdx) => (
        <tr key={rIdx} className="animate-pulse">
          {Array.from({ length: columnsCount }).map((_, cIdx) => (
            <td key={cIdx} className="px-5 py-4">
              <div className="h-4 bg-zinc-200/80 dark:bg-zinc-800/80 rounded-md w-3/4" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
export default LoadingSkeleton;
