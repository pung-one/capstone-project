import Link from "next/link";
import styled from "styled-components";

const ColorBox = styled.div`
  height: 15vh;
  margin: 1vh;
  line-height: 15vh;
  color: black;
  background-color: ${({ hex }) => (hex ? hex : "")};
`;

export default function ColorsList({ colors }) {
  return (
    <>
      <h1>Colors</h1>
      <hr />
      {colors.map(({ hex, name }) => {
        return <ColorBox hex={hex}>{name}</ColorBox>;
      })}
    </>
  );
}
