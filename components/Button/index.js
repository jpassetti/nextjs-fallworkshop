import CTA from "./CTA";
import Group from './Group';
import UI from './UI';

const Button = ({children}) => {
	return <button>{children}</button>
}
Button.CTA = CTA;
Button.Group = Group;
Button.UI = UI;

export default Button;
