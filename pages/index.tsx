import React from 'react';
import Head from "next/head";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { NextPageContext } from "next";
import Image from "next/image";
import FilterPanel from "../src/components/Filterpanel/index";
import { colors } from "../src/config/config"

const Container = styled.div`
  max-width: 1440px;
  margin: auto;
  padding: 0 16px;
`

const Divider = styled.div`
  margin: 0 0 32px;
  width: 100%;
  height: 1px;
  background-color: ${colors.beige}
`;

const CaravansList = styled.div`
  display: flex;
  gap: 32px;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 45px;
`;

const CaravanItem = styled.div`
  border: 1px solid ${colors.beige};
  border-radius: 8px;
  overflow: hidden;

  & img {
    width: 100%;
  }
`;

const CaravanItemContent = styled.div`
  display: flex;
  flex-flow: column;
  padding: 12px 16px 16px;
  color:#1F2244;
`;
const CaravanItemPrice = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PriceWrapper = styled.div`
  display: flex;
`;

const Price = styled.div`
  display: flex;
  margin-right: 8px;
  font-weight: bold;
`;


const CaravanItemCategory = styled.span`
  color: #FF5E55;
  font-weight: 700;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const CaravanItemName = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  margin: 0 0 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid ${colors.beige};
`;
const CaravanItemLocation = styled.span`
  font-size: 14px;
  line-height: 16px;
  height: 16px;
  margin-bottom: 9px;
`;

const CaravanItemAccessories = styled.div`
  display: flex;
  align-items: center;
  height: 34px;
  padding-bottom: 14px;
  margin-bottom: 14px;
  border-bottom: 1px solid ${colors.beige};

  & img {
    margin-left: 12px;

    &:first-child {
      margin-left: 0;
    }
  }

  & span {
    margin: 0 10px 0 3px;
  }
`
const ButtonMore = styled.button`
  display: block;
  width: auto;
  height: 48px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  margin: 0 auto 45px;
  padding: 13px 36px;
  background-color: ${colors.green};
  color: ${colors.white};
  cursor: pointer;
`

const Row = styled.div`
  width: 100%;
`

type Caravan = {
    location: string,
    instantBookable: boolean,
    name: string,
    passengersCapacity: number,
    sleepCapacity: number
    price: number,
    toilet: boolean,
    shower: boolean,
    vehicleType: string,
    pictures: string[],
}

type CaravansResponse = {
    count: number,
    items: Caravan[],
}

type Props = {
    count: number,
    items: Caravan[]
}

const Home = (props: Props) => {
    const { items, count } = props;
    const [instantBookable, setInstantBookable] = useState(false);
    const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);
    const [pagination, setPagination] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const perPage = 6;
    const maxPage = Math.ceil(count / perPage);

    const [caravansType, setCaravansType] = useState([
        { id: 1, checked: false, label: 'Campervan', subTitle: 'A house with which you can go everywhere.', value: 'Campervan' },
        { id: 2, checked: false, label: 'Intergrated', subTitle: 'The most versatile motorhome to live your best life.', value: 'Intergrated' },
        { id: 3, checked: false, label: 'Builtin', subTitle: 'This is a great option for anyone who is planning a very long trip.', value: 'BuiltIn' },
        { id: 4, checked: false, label: 'Alcove', subTitle: 'Popular choice if you love the comforts of a caravan', value: 'Alcove' },
    ]);

    const [list, setList] = useState(items);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('localhost:3000/api/data');
                const data: CaravansResponse | undefined = await response.json();
                if (data) {
                    setList(data.items.slice(pagination * perPage));
                    setLastPage(Math.ceil(count / perPage));
                }
            } catch (e) {
                console.log(e);
            }
        }

        if (items?.length === 0) {
            fetchData();
        }
        return
    },[]);

    const handleChangeChecked = (id: number) => {
        const caravansList = caravansType;
        const changeChecked = caravansList.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setCaravansType(changeChecked);
    };

    const handleChangePrice = (event: Event, value: number[]) => {
        setSelectedPrice(value);
    };

    const handleInstantBookable = (InstantBookable: boolean) => {
        setInstantBookable(InstantBookable)
    };

    const applyFilters = () => {
        let updatedList = items;

        // vehicleType Filter
        const vehicleTypeChecked = caravansType
            .filter((item) => item.checked)
            .map((item) => item.value);

        if (vehicleTypeChecked.length) {
            updatedList = updatedList.filter((item) =>
                vehicleTypeChecked.includes(item.vehicleType)
            );
        }

        // Price Filter
        const minPrice = selectedPrice[0];
        const maxPrice = selectedPrice[1];

        updatedList = updatedList.filter(
            (item) => item.price >= minPrice && item.price <= maxPrice
        );

        // instantBookable
        if (instantBookable) {
            updatedList = updatedList.filter(
                (item) => item.instantBookable
            )
        }

        setLastPage(Math.ceil(count / perPage));
        setList(updatedList.slice(0, pagination * perPage));
    };

    const loadMore = () => {
        const newPage = pagination + 1;
        setPagination(newPage);
    }

    useEffect(() => {
        applyFilters();
    }, [instantBookable, caravansType, selectedPrice, pagination]);


    const caravansList = list?.map((caravan, index) => (
        <CaravanItem key={`caravan-${index}`}>
            <Image
                src={`${caravan.pictures[0]}`}
                width={390}
                height={190}
                placeholder="blur"
                blurDataURL="https://via.placeholder.com/392x293?text=Place+Holder"
                objectFit="cover"
            />
            <CaravanItemContent>
                <CaravanItemCategory>{caravan.vehicleType}</CaravanItemCategory>
                <CaravanItemName>{caravan.name}</CaravanItemName>
                <CaravanItemLocation>{caravan.location}</CaravanItemLocation>
                <CaravanItemAccessories>
                    <Image src="/images/icon-person.svg" width={20} height={20} alt="icon person" />
                    <span>{ caravan.passengersCapacity }</span>
                    <Image src="/images/icon-bed.svg" width={20} height={20} alt="icon bed" />
                    <span>{ caravan.sleepCapacity }</span>
                    { caravan.toilet
                        ? (
                        <Image src="/images/icon-toilet.svg" width={20} height={20} alt="icon toilet" />
                    ) && caravan.toilet
                        : <></>
                    }
                    { caravan.shower
                        ? (
                            <Image src="/images/icon-shower.svg" width={20} height={20} alt="icon shower" />
                        )
                        : <></>
                    }
                </CaravanItemAccessories>
                <CaravanItemPrice>
                    <div>Price from</div>
                    <PriceWrapper>
                        <Price>
                            {caravan.price} CZK/day
                        </Price>
                        {caravan.instantBookable && (<Image src="/images/icon-highlight.svg" width={20} height={20} alt="icon highlight" />)}
                    </PriceWrapper>
                </CaravanItemPrice>
            </CaravanItemContent>
        </CaravanItem>
    ));

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>CARAVANS | home</title>
                <meta name="keywords" content="Karavany" />
                <meta name="author" content="Martin Porjanda" />
            </Head>
            <FilterPanel
                instantBookable={handleInstantBookable}
                selectedPrice={selectedPrice}
                caravansType={caravansType}
                changeChecked={handleChangeChecked}
                changePrice={handleChangePrice}
            />
            <Divider />
            <Container>
                <CaravansList>
                    { caravansList }
                    { !items?.[0] && (<div>Loading...</div>) }
                    { pagination !== lastPage && (
                        <Row>
                            <ButtonMore onClick={loadMore}>Loading more</ButtonMore>
                        </Row>
                    )}
                </CaravansList>
            </Container>
        </>
    )
}

Home.getInitialProps = async (ctx: NextPageContext): Promise<CaravansResponse | undefined> => {
    if (!ctx.req) {
        return ({
            count: 0,
            items: []
        })
    }

    const response = await fetch('http://localhost:3000/api/data');
    return await response.json();
}

export default Home
