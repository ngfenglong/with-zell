import clsx from 'clsx';

export const OuterContainer = ({ className, ...props }) => {
  return (
    <div className={clsx('sm:px-8', className)}>
      <div className="mx-auto max-w-7xl lg:px-8">{props.children}</div>
    </div>
  );
};

export const InnerContainer = ({ className, ...props }) => {
  return (
    <div className={clsx('relative px-4 sm:px-8 lg:px-12', className)}>
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{props.children}</div>
    </div>
  );
};

export const Container = ({ children, ...props }) => {
  return (
    <OuterContainer {...props}>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  );
};

export default Container;
