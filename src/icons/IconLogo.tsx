import { ComponentProps, FC } from "react";
import logo from "./logo.svg";

type Props = ComponentProps<"img">;

const IconLogo: FC<Props> = (props) => {
  return <img src={logo} alt="logo" {...props} />;
};

export default IconLogo;
