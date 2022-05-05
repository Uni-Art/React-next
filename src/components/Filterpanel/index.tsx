import React from 'react';
import styled from "styled-components";
import { colors, device } from "../../config/config";
import CheckboxCategory from './CheckboxCategory';
import SliderRange from './SliderRange';
import StandaloneToggleButton from "./StandaloneToggleButton";
import Image from "next/image";

const Row = styled.div`
  max-width: 1240px;
  margin: auto;
  display: flex;
  flex-flow: column;
  justify-content: center;

  @media ${device.tablet} {
    flex-flow: row;
    flex-wrap: wrap;
  }
`
const Filter = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${colors.beige};

  &:last-child {
    border: none;
  }

  @media ${device.tablet} {
    width: 23%;
    border:none;

    &:last-child {
      width: 17%;
    }
  }
`

const FilterPrice = styled(Filter)`
  @media ${device.tablet} {
    width: 60%;
    border-left: 1px solid ${colors.beige};
    border-right: 1px solid ${colors.beige};
  }
`

const FilterTitle = styled.div`
  font-size: 16px;
  line-height: 16px;
  color: ${colors.darkGrey};
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;

  & span {
    margin-left: 8px;
  }
`

const FilterButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(156px, 1fr));
  gap: 16px;
`

type Props = {
    selectedPrice: number[],
    caravansType: Caravans[],
    changeChecked: (id: number) => void,
    changePrice: (event: Event, value: number[]) => void,
    instantBookable: (id:boolean) => void,
}

export interface Caravans {
    id: number,
    checked: boolean,
    label: string,
    subTitle: string,
    value: string
}

const Index = (props: Props ): JSX.Element => {
    const {selectedPrice, caravansType, changeChecked, changePrice, instantBookable} = props;

    return (
        <Row>
            <Filter>
                <FilterTitle>Price per Day</FilterTitle>
                <SliderRange selectedPrice={selectedPrice} changePrice={changePrice}/>
            </Filter>
            <FilterPrice>
                <FilterTitle>Caravan types</FilterTitle>
                <FilterButtons>
                    {caravansType.map((caravans) => (
                        <CheckboxCategory
                            key={caravans.id}
                            caravans={caravans}
                            changeChecked={changeChecked}
                        />
                    ))}
                </FilterButtons>
            </FilterPrice>
            <Filter>
                <FilterTitle>
                    Instant booking
                    <Image
                        src="/images/icon-highlight.svg"
                        width={20}
                        height={20}
                        alt="icon highlight"
                    />
                </FilterTitle>
                <StandaloneToggleButton instantBookable={instantBookable}/>
            </Filter>
        </Row>
    )
};

export default Index;
