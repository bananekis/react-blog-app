import { ComponentProps, FC } from "react";

type Props = ComponentProps<"svg">;

const IconVoteUp: FC<Props> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      {...props}
    >
      <path
        d="M13.7 7.7C13.5 7.9 13.3 8 13 8C12.7 8 12.5 7.9 12.3 7.7L7 2.4L1.7 7.7C1.3 8.1 0.7 8.1 0.3 7.7C-0.1 7.3 -0.1 6.7 0.3 6.3L6.3 0.3C6.7 -0.1 7.3 -0.1 7.7 0.3L13.7 6.3C14.1 6.7 14.1 7.3 13.7 7.7Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconVoteUp;
