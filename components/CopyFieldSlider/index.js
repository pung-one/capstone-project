import CopyField from "@/components/CopyField";
import { SlArrowLeft } from "react-icons/sl";
import Link from "next/link";
import styled, { css } from "styled-components";
import { IsColorBright } from "@/utils/IsColorBright";

const CopyFieldContainer = styled.aside`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: ${({ isLarge, isLeftBox }) =>
    isLarge && !isLeftBox ? "100vw" : "50vw"};
  height: ${({ isLarge }) => (isLarge ? "100%" : "100%")};
  transform: ${({ isActive }) => (isActive ? "translate(-85%)" : null)};
  transform: ${({ isActive, isLeftBox }) =>
    isActive && isLeftBox ? "translate(85%)" : ""};
  left: ${({ isLeftBox }) => (isLeftBox ? "-43vw" : null)};
  right: ${({ isLarge, isLeftBox }) =>
    isLarge && !isLeftBox ? "-88vw" : "-43vw"};
  transition: transform 0.3s;
`;

const StyledButton = styled.button`
  position: absolute;
  background: none;
  border: none;
  transform: ${({ isActive, isLeftBox }) =>
    isActive || isLeftBox ? "rotate(180deg)" : null};
  transform: ${({ isLeftBox, isActive }) =>
    isLeftBox && isActive ? "rotate(360deg)" : null};
  transition: transform 0.3s;
  ${(props) =>
    props.isLeftBox
      ? css`
          right: -1vw;
          }
        `
      : css`
          left: -1vw;
        `}
`;

const Arrow = styled(SlArrowLeft)`
  font-size: 3vh;
`;

const StyledColorName = styled.h2`
  color: ${({ isBright }) => (isBright ? "black" : "white")};
`;

export default function CopyFieldSlider({
  isLargePalette,
  color,
  index,
  handleSlide,
  isActive,
  needColorName,
}) {
  const { slug, name, hex, rgb, cmyk, lab } = color;
  return (
    <>
      <CopyFieldContainer
        isLarge={isLargePalette}
        isLeftBox={!isLargePalette && index === 0}
        isActive={isActive}
      >
        <StyledButton
          onClick={() => handleSlide(index)}
          isLeftBox={!isLargePalette && index === 0}
          isActive={isActive}
        >
          <Arrow />
        </StyledButton>
        {needColorName && (
          <Link href={`/colors/${slug}`}>
            <StyledColorName isBright={IsColorBright(rgb) > 130}>
              {name}
            </StyledColorName>
          </Link>
        )}
        <CopyField label={"HEX"} value={hex} isLarge={isLargePalette} />
        <CopyField label={"RGB"} value={rgb} isLarge={isLargePalette} />
        <CopyField label={"CMYK"} value={cmyk} isLarge={isLargePalette} />
        <CopyField label={"LAB"} value={lab} isLarge={isLargePalette} />
      </CopyFieldContainer>
    </>
  );
}
