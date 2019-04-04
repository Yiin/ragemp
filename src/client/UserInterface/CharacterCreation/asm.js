import {
    getRandomFather,
    getRandomMother,
    getRandomResemblance,
} from './data/parents';
import {
    featureNames,
    getRandomFeatureValue,
} from './data/features';
import {
    headOverlayNames,
    getRandomOverlayItem,
    disabledOverlaysForGender,
} from './data/head-overlays';
import {
    getRandomHair,
    getRandomHairColor,
    getRandomHairHighlightColor,
    getRandomEyeColor,
    getRandomBeardColor,
    getRandomEyebrowColor,
    getRandomBlushColor,
    getRandomLipstickColor,
    getRandomChestHairColor,
} from './data/hair-and-colors';
import { CardActions } from '@material-ui/core';

export const initialState = {
    gender: 0,
    father: getRandomFather(),
    mother: getRandomMother(),
    resemblance: 0.5,
    skinTone: 0.5,
    features: { ...featureNames.map(() => 0) },
    headOverlays: { ...headOverlayNames.map(() => ({
        value: 255,
        opacity: 1,
    })) },
    hair: 0,
    hairColor: 0,
    hairHighlightColor: getRandomHairHighlightColor(),
    eyeColor: 5,
    beardColor: 0,
    eyebrowColor: 0,
    blushColor: 9,
    lipstickColor: 0,
    chestHairColor: 0,
};

export const middleware = (state, action, next) => {
    switch (action.type) {
        case 'SET_RANDOM_FEATURES': {
            const { gender } = action.payload;

            const newState = {
                ...state,
                ...action.payload,
                headOverlays: Object.entries(action.payload.headOverlays)
                    .reduce((obj, [index, overlay]) => ({
                        ...obj,
                        [index]: disabledOverlaysForGender(gender).includes(+index)
                            ? { value: 255, opacity: 0 }
                            : overlay,
                    }), {}),
                resemblance: gender
                    // For female, resamblance should be more to the mothers side
                    ? Math.random() / 2
                    : action.payload.resemblance,
            };
            console.log('updating', newState);

            return newState;
        }
    }
    return next();
}

export default {
    SET_GENDER: (state, gender) => ({
        ...state,
        gender,
    }),
    SET_FATHER: (state, father) => ({
        ...state,
        father,
    }),
    SET_MOTHER: (state, mother) => ({
        ...state,
        mother,
    }),
    SET_RESEMBLANCE: (state, resemblance) => ({
        ...state,
        resemblance,
    }),
    SET_SKIN_TONE: (state, skinTone) => ({
        ...state,
        skinTone,
    }),
    SET_FEATURE: (state, { featureIndex, value }) => ({
        ...state,
        features: {
            ...state.features,
            [featureIndex]: value,
        },
    }),
    SET_HEAD_OVERLAY_VALUE: (state, { overlayId, value }) => ({
        ...state,
        headOverlays: {
            ...state.headOverlays,
            [overlayId]: {
                ...state.headOverlays[overlayId],
                value,
            },
        },
    }),
    SET_HEAD_OVERLAY_OPACITY: (state, { overlayId, opacity }) => ({
        ...state,
        headOverlays: {
            ...state.headOverlays,
            [overlayId]: {
                ...state.headOverlays[overlayId],
                opacity,
            },
        },
    }),
    SET_HAIR: (state, hair) => ({
        ...state,
        hair,
    }),
    SET_HAIR_COLOR: (state, hairColor) => ({
        ...state,
        hairColor,
    }),
    SET_HAIR_HIGHLIGHT_COLOR: (state, hairHighlightColor) => ({
        ...state,
        hairHighlightColor,
    }),
    SET_EYE_COLOR: (state, eyeColor) => ({
        ...state,
        eyeColor,
    }),
    SET_BEARD_COLOR: (state, beardColor) => ({
        ...state,
        beardColor,
    }),
    SET_EYEBROW_COLOR: (state, eyebrowColor) => ({
        ...state,
        eyebrowColor,
    }),
    SET_BLUSH_COLOR: (state, blushColor) => ({
        ...state,
        blushColor,
    }),
    SET_LIPSTICK_COLOR: (state, lipstickColor) => ({
        ...state,
        lipstickColor,
    }),
    SET_CHEST_HAIR_COLOR: (state, chestHairColor) => ({
        ...state,
        chestHairColor,
    }),
    SET_RANDOM_FEATURES: (state, features) => ({
        ...state,
        ...features,
    }),
};

export const setGender = gender => ({
    type: 'SET_GENDER',
    payload: gender,
});

export const setFather = father => ({
    type: 'SET_FATHER',
    payload: father,
});

export const setMother = mother => ({
    type: 'SET_MOTHER',
    payload: mother,
});

export const setResemblance = resemblance => ({
    type: 'SET_RESEMBLANCE',
    payload: resemblance,
});

export const setSkinTone = skinTone => ({
    type: 'SET_SKIN_TONE',
    payload: skinTone,
});

export const setFeature = (featureIndex, value) => ({
    type: 'SET_FEATURE',
    payload: { featureIndex, value },
});

export const setHeadOverlayValue = (overlayId, value) => ({
    type: 'SET_HEAD_OVERLAY_VALUE',
    payload: { overlayId, value },
});

export const setHeadOverlayOpacity = (overlayId, opacity) => ({
    type: 'SET_HEAD_OVERLAY_OPACITY',
    payload: { overlayId, opacity },
});

export const setHair = hair => ({
    type: 'SET_HAIR',
    payload: hair,
});

export const setHairColor = hairColor => ({
    type: 'SET_HAIR_COLOR',
    payload: hairColor,
});

export const setHairHighlightColor = hairHighlightColor => ({
    type: 'SET_HAIR_HIGHLIGHT_COLOR',
    payload: hairHighlightColor,
});

export const setEyeColor = eyeColor => ({
    type: 'SET_EYE_COLOR',
    payload: eyeColor,
});

export const setBeardColor = beardColor => ({
    type: 'SET_BEARD_COLOR',
    payload: beardColor,
});

export const setEyebrowColor = eyebrowColor => ({
    type: 'SET_EYEBROW_COLOR',
    payload: eyebrowColor,
});

export const setBlushColor = blushColor => ({
    type: 'SET_BLUSH_COLOR',
    payload: blushColor,
});

export const setLipstickColor = lipstickColor => ({
    type: 'SET_LIPSTICK_COLOR',
    payload: lipstickColor,
});

export const setChestHairColor = chestHairColor => ({
    type: 'SET_CHEST_HAIR_COLOR',
    payload: chestHairColor,
});

export const setRandomFeatures = gender => {
    // const gender = Math.floor(Math.random() * 2);
    return {
        type: 'SET_RANDOM_FEATURES',
        payload: {
            gender,
            father: getRandomFather(),
            mother: getRandomMother(),
            resemblance: getRandomResemblance(),
            skinTone: getRandomResemblance(),
            features: { ...featureNames.map(getRandomFeatureValue) },
            headOverlays: { ...[...headOverlayNames.keys()].map(getRandomOverlayItem) },
            hair: getRandomHair(gender),
            hairColor: getRandomHairColor(),
            hairHighlightColor: getRandomHairHighlightColor(),
            eyeColor: getRandomEyeColor(),
            beardColor: getRandomBeardColor(),
            eyebrowColor: getRandomEyebrowColor(),
            blushColor: getRandomBlushColor(),
            lipstickColor: getRandomLipstickColor(),
            chestHairColor: getRandomChestHairColor(),
        },
    };
};
