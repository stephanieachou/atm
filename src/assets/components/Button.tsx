import { memo } from "react";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  children?: React.ReactNode;
};

function Button({ children, disabled, id, onClick }: ButtonProps) {
  return (
    <button id={id} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default memo(Button);
