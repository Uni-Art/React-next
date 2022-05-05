import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import styled from "styled-components";
import { colors } from "../../config/config";
import { Caravans } from "./index";

const Wrapper = styled.div`
  padding: 12px 12px 8px;
  border: 1px solid ${colors.beige};
  border-radius: 8px;

  label {
    margin: 0;
  }

  &.active {
    border: 2px solid ${colors.green};
  }

  .MuiCheckbox-root {
    display: none;
  }
`
const ButtonCheckBox = styled.div`
  .category-name {
    font-size: 16px;
    color: ${colors.darkBlue};
    margin-bottom: 4px;
  }
  .category-description {
    font-size: 12px;
    line-height: 14px;
    color: ${colors.darkGrey};
  }
`

interface Props {
    changeChecked(id: number): void,
    caravans: Caravans,
}

const CheckboxCategory = ( props: Props) => {
    const { changeChecked, caravans } = props;
    const { checked, label, subTitle, id } = caravans;

    return (
        <Wrapper className={checked ? 'active' : ''}>
            <FormControlLabel
                control={
                    <Checkbox
                        size='small'
                        checked={checked}
                        onChange={() => changeChecked(id)}
                        inputProps={{ 'aria-label': 'checkbox with small size' }}
                    />
                }
                label={
                    <ButtonCheckBox>
                        <div className="category-name">{label}</div>
                        <div className="category-description">{subTitle}</div>
                    </ButtonCheckBox>
                }
            />
        </Wrapper>
    );
};

export default CheckboxCategory;
