import React from 'react';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import styled from "styled-components";
import { colors } from "../../config/config";

const Wrapper = styled.div`
  .MuiSlider-root {
    width: 100%;
  }

  .MuiSlider-rail {
    color: rgba(0, 0, 0, 0.26);
  }
  
  .MuiSlider-track,
  .MuiSlider-thumb {
    color: ${colors.green};
  }
`

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
`

const Label = styled.label`
  flex-basis: 50%;
  position: relative;
`

const Input = styled(MuiInput)`
  height: 48px;
  line-height: 48px;
  padding: 0 12px;
  border: 1px solid #EDEAE3;
  border-radius: 8px;
`;

const Currency = styled.span`
  color: #9C8C8C;
  font-size: 16px;
  position: absolute;
  top: 13px;
  right: 10px;
  z-index: 3;
`

type Props = {
    selectedPrice: number[],
    changePrice: (event: Event, value: number[]) => void
}

const SliderRange = (props: Props) => {
    const { selectedPrice, changePrice } = props;
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    return (
        <Wrapper>
            <Slider
                value={selectedPrice}
                onChange={changePrice}
                valueLabelDisplay='off'
                min={1000}
                max={5000}
            />
            <InputWrapper>
                <Label>
                    <Input
                        value={minPrice}
                        size="small"
                        fullWidth
                        disableUnderline={true}
                        readOnly={true}
                        inputProps={{
                            step: 100,
                            min: minPrice,
                            max: maxPrice,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                    <Currency>CZK</Currency>
                </Label>
                <Label>
                    <Input
                        value={maxPrice}
                        size="small"
                        fullWidth={true}
                        disableUnderline={true}
                        readOnly={true}
                        inputProps={{
                            step: 100,
                            min: minPrice,
                            max: maxPrice,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                    <Currency>CZK</Currency>
                </Label>
            </InputWrapper>
        </Wrapper>
    );
};

export default SliderRange;
