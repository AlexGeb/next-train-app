import React from 'react';
import { styled } from '@smooth-ui/core-sc';

import { styles } from '../styles';

const Row = styled.div`
  align-items: center;
  background-color: ${({ index }: { index: number }) =>
    index % 2 ? '#043a6b' : '#0c5da5'};
  color: white;
  display: flex;
  height: 70px;
  padding: 0px ${styles.sidePadding}px;
  width: 100%;
`;
const HeadSign = styled.div`
  ${props => `color: ${props.color}`};
  width: 5em;
`;
const Time = styled.div`
  font-size: 125%;
  width: 5em;
`;
const Direction = styled.div`
  font-size: 160%;
`;
const Span = styled.span`
  display: inline-block;
`;
const Img = styled.div`
  width: 5em;
`;

type PropsType = {
  departure: IDeparture;
  index: number;
};

export const Departure = (props: PropsType) => {
  const { index, departure } = props;
  const {
    displayInformations,
    stopDateTime: { departureDateTime },
  } = departure;
  return (
    <Row index={index}>
      <HeadSign color={displayInformations.color}>
        <Span>{displayInformations.headsign}</Span>
      </HeadSign>
      <Time>
        <Span>{departureDateTime}</Span>
      </Time>
      <Img>
        <img src={`/img/rer${displayInformations.label}.svg`} width={40} />
      </Img>
      <Direction>
        <Span>
          {displayInformations.direction.replace('Gare de ', '').split('(')[0]}
        </Span>
      </Direction>
    </Row>
  );
};
