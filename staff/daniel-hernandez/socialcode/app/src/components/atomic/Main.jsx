import { forwardRef } from "react";

const Main = forwardRef(({ className, children }, ref) => {
  return (
    <main className={className} ref={ref}>
      {children}
    </main>
  );
});

export default Main;
