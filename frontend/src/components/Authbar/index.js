import React from 'react';

import { Container, AuthContainer, Name, Settings, Avatar } from './styles';

function Authbar() {
  return (
    <Container>
      <AuthContainer>
        <Name>Username</Name>
        <Settings className="fas fa-cog"/>
        <Avatar className="fas fa-user-tie" />
      </AuthContainer>
    </Container>
  );
}

export default Authbar;
