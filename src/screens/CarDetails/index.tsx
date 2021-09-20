import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import { CarDTO } from '../../dtos/CarDTO';

import { getAccessoriesIcon } from '../../utils/getAccessoriesIcon';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
} from './styles';

type ScreenParamList = {
  [screen: string]: {} | undefined;
};

type ScreenNavigationProp = NativeStackNavigationProp<ScreenParamList>;

export function CarDetails() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute();
  const car = route.params as CarDTO;

  function handleConfirmRental() {
    navigation.navigate('Scheduling', car);
  }

  function hadleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={hadleBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoriesIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button
          title="Escolher período do alguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
