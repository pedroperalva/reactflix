import Header from "./";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Example/Header",
  component: Header,
};

const Template = (args) => (
  <MemoryRouter>
    <Header {...args} />
  </MemoryRouter>
);

export const HeaderArgs = Template.bind({});

HeaderArgs.args = {};
