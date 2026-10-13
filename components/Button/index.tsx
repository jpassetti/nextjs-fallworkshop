import CTA from "./CTA";
import Group from "@/components/primitives/Group";
import UI from "./UI";

const Button = ({children}: any) => {
	return <button>{children}</button>
}
Button.CTA = CTA;
Button.Group = Group;
Button.UI = UI;

export default Button;
