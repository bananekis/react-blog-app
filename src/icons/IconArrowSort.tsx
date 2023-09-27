import { ComponentProps, FC } from "react";

type Props = ComponentProps<"svg">;

const IconArrowSort: FC<Props> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path d="M11.4641 5.25L7.99999 0L4.53589 5.25H11.4641Z" fill="currentColor" />
      <path d="M4.53589 10.75L7.99999 16L11.4641 10.75L4.53589 10.75Z" fill="currentColor" />
    </svg>
  );
};

export default IconArrowSort;
