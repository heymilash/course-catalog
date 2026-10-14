"use client";

import { useEffect } from "react";

export default function CoursesError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" className="shell empty-page" role="alert">
      <span className="eyebrow">Course catalog</span>
      <h1>Something went wrong</h1>
      <p>Could not load the data. The backend may not be running.</p>
      <button type="button" onClick={() => retry()} className="button button-primary">
        Try again
      </button>
    </main>
  );
}
