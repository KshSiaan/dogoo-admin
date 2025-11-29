"use client";

import { useEffect, useState } from "react";
import LoadingPage from "./loading-page";

export default function Page() {
  //   const [isLoading, setIsLoading] = useState(true)

  //   useEffect(() => {
  //     // Simulate redirect after 3 seconds
  //     const timer = setTimeout(() => {
  //       window.location.href = "https://example.com"
  //     }, 3000)

  //     return () => clearTimeout(timer)
  //   }, [])

  return <LoadingPage />;
}
