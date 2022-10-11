import CircleBtn from "./";
import { BiMoviePlay } from "react-icons/bi";

export default {
  title: "Example/CircleBtn",
  component: CircleBtn,
};

const Template = (args) => <CircleBtn {...args} />;

export const CircleBtnArgs = Template.bind({});

CircleBtnArgs.args = {
  title: "Assistir Trailer",
  color: "#000",
  backgroundColor: "#61dafb",
  icon: <BiMoviePlay size={24} />,
};
