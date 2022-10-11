import SearchMovie from "./";
import { AiOutlineSearch } from "react-icons/ai";

export default {
  title: "Example/SearchMovie",
  component: SearchMovie,
};

const Template = (args) => <SearchMovie {...args} />;

export const SearchMovieArgs = Template.bind({});

SearchMovieArgs.args = {
  placeholder: "Exemplo",
  color: "#fff",
  backgroundColor: "#61dafb",
  icon: <AiOutlineSearch size={24} />,
};
