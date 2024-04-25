import { Visa, MasterCard, Dot } from '../../assets';
import * as S from './CardPreview.style';

import { CARD_NUMBER } from '../../constants/conditions';
import { cardNumbersType } from '../../types/cardNumbers';
import { cardBrandsType } from '../../types/cardBrands';
import checkCardGlobalBrand from '../../utils/checkCardGlobalBrand';

interface CardPreviewProps {
  cardNumbers: cardNumbersType;
  brand: cardBrandsType;
  month: string;
  year: string;
  owner: string;
}

export default function CardPreview({ cardNumbers, brand, month, year, owner }: CardPreviewProps) {
  const handleLogoImage = (cardNumbers: cardNumbersType) => {
    if (checkCardGlobalBrand(cardNumbers[0]) === 'Visa') {
      return <img src={Visa} alt="비자 카드" />;
    }
    if (checkCardGlobalBrand(cardNumbers[0]) === 'MasterCard') {
      return <img src={MasterCard} alt="마스터 카드" />;
    }
  };

  const getCardNumberComponent = (number: string, index: number) => {
    if (index <= 1) return `${number} `;
    return Array.from({ length: number.length }).map((_, idx) => <img src={Dot} key={idx} alt="dot" />);
  };

  return (
    <S.Card $brand={brand}>
      <S.CardHeader>
        <S.ChipBox />
        <S.LogoBox>{handleLogoImage(cardNumbers)}</S.LogoBox>
      </S.CardHeader>
      <S.CardBody>
        <S.InfoContainer>
          {cardNumbers.map((number, index) => (
            <S.InfoBox $length={CARD_NUMBER.INPUT_FIELD_COUNT} key={index}>
              {getCardNumberComponent(number, index)}
            </S.InfoBox>
          ))}
        </S.InfoContainer>
        <S.InfoBox>{(month || year) && `${month} / ${year}`}</S.InfoBox>
        <S.InfoBox>{owner}</S.InfoBox>
      </S.CardBody>
    </S.Card>
  );
}
