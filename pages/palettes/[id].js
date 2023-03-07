import { CreatePaletteArray } from "@/utils/CreatePaletteArray";
import { useRouter } from "next/router";
import styled from "styled-components";
import CopyField from "@/components/CopyField";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Heading = styled.h1`
  width: 100%;
  padding: 3vh;
`;

const PaletteContainer = styled.div`
  display: flex;
  height: 100%;
`;

const CopyFieldContainer = styled.div`
  visibility: hidden;
  align-self: center;
`;

const ColorBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  padding-top: 4vh;
  background-color: ${({ hex }) => (hex ? hex : null)};
  color: ${({ hex }) => (hex ? hex : null)};
  &:hover {
    color: white;
  }
  &:hover ${CopyFieldContainer} {
    visibility: visible;
  }
`;

export default function PalettePage({ data, error }) {
  const router = useRouter();
  const { id } = router.query;

  if (error) return <h1>Failed to load data..</h1>;
  if (!data) return <h1>Loading...</h1>;

  const paletteArray = CreatePaletteArray(data);
  const currentPalette = paletteArray?.find((arr, i) => i === id - 1);

  console.log(currentPalette);
  return (
    <PageContainer>
      <Heading>Palette #{id}</Heading>
      <hr />
      <PaletteContainer>
        {currentPalette?.map(({ name, hex, cmyk, rgb, lab }) => {
          return (
            <ColorBox key={name} hex={hex}>
              <p>{name}</p>
              <CopyFieldContainer>
                <CopyField label={"HEX: "} value={hex} />
                <CopyField label={"RGB: "} value={rgb} />
                <CopyField label={"CMYK: "} value={cmyk} />
                <CopyField label={"LAB: "} value={lab} />
              </CopyFieldContainer>
            </ColorBox>
          );
        })}
      </PaletteContainer>
    </PageContainer>
  );
}
