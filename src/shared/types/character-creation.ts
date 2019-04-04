type Male = 0;
type Female = 1;
type Father = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 42 | 43 | 44;
type Mother = 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 45;
interface HeadOverlay {
    value: number,
    opacity: number,
}

interface CharacterAppearance {
    name: string;
    
    gender: Male | Female,
    father: Father,
    mother: Mother,
    resemblance: number,
    skinTone: number,
    features: number[],
    headOverlays: HeadOverlay[],
    hair: number,
    hairColor: number,
    hairHighlightColor: number,
    eyeColor: number,
    beardColor: number,
    eyebrowColor: number,
    blushColor: number,
    lipstickColor: number,
    chestHairColor: number,
}

type CreateCharacterResponse = undefined | never;
