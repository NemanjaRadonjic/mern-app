import React from "react";

import { Container } from "./styles";

// class Routes extends React.Component {
//   render() {
//     return <Container>{this.props.children}</Container>;
//   }
// }

function Routes({ children }) {
  return <Container>{children}</Container>;
}

export default Routes;
