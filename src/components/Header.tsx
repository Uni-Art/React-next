import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { colors } from "../config/config";

const Heading = styled.header`
  border-bottom: 1px solid ${colors.beige};
`;

const Container = styled.div`
  margin: auto;
  max-width: 1240px;
  padding: 22px 16px;
`

const Header = (): JSX.Element => {
    return (
        <Heading>
            <Container>
                <Image src="/images/logo-caravans.svg" width={140} height={25} alt="logo Caravans" />
            </Container>
        </Heading>
    );
}

export default Header;
