import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import styled from "styled-components";
import { colors } from "../../config/config";

const Wrapper = styled.div`
  .MuiButtonBase-root {
    height: 48px;
    color: #1F2244;
    padding: 0 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 48px;
    border-radius: 8px;
    min-width: 176px;
    border: 1px solid ${colors.beige};
    justify-content: flex-start;
  }
`

type Props = {
    instantBookable: (id:boolean) => void,
}

const StandaloneToggleButton = (props: Props) => {
    const {instantBookable} = props;
    const [selected, setSelected] = React.useState(false);

    return (
        <Wrapper>
            <ToggleButton
                value="check"
                selected={selected}
                onChange={() => setSelected(!selected)}
                onClick={() => instantBookable(!selected)}
                size={"medium"}
            >Yes
            </ToggleButton>
        </Wrapper>
    );
}

export default StandaloneToggleButton;
