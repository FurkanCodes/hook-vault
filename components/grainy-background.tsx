import React from "react";

import { ReactNode } from "react";

const GrainyBackground = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* Fixed grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none -z-50"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "182px",
          opacity: 0.12,
          // You can change the color using background-color and mix-blend-mode
          backgroundColor: "blue",
        }}
      />
      {children}
    </>
  );
};
export default GrainyBackground;
