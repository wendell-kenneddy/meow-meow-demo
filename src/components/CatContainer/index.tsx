import { ComponentPropsWithoutRef, forwardRef } from 'react';

type CatContainerProps = ComponentPropsWithoutRef<'div'>;

const CatContainer = forwardRef<HTMLDivElement, CatContainerProps>(
  ({ children }, ref) => (
    <div
      ref={ref}
      className={`
      w-[280px]
      h-[280px]
      md:w-[480px]
      md:h-[480px]
      lg:w-[640px]
      lg:h-[640px]
      border-white
      border-rounded
    `}
    >
      {children}
    </div>
  )
);

CatContainer.displayName = 'CatContainer';

export { CatContainer };
