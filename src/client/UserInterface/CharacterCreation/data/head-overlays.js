export const headOverlayNames = Object.freeze([
    'Blemishes',
    'Facial Hair',
    'Eyebrows',
    'Ageing',
    'Makeup',
    'Blush',
    'Complexion',
    'Sun Damage',
    'Lipstick',
    'Moles & Freckles',
    'Chest Hair',
]);

function makeList(...items) {
    items[255] = 'None';
    return Object.freeze(items);
}

export const headOverlayItemNames = Object.freeze([
    // blemishes
    makeList('Classic', 'Measles', 'Pimples', 'Spots', 'Break Out', 'Blackheads', 'Build Up', 'Pustules', 'Zits', 'Full Acne', 'Acne', 'Cheek Rash', 'Face Rash', 'Picker', 'Puberty', 'Eyesore', 'Chin Rash', 'Two Face', 'T Zone', 'Greasy', 'Marked', 'Acne Scarring', 'Full Acne Scarring', 'Cold Sores', 'Impetigo'),
    // facial hair
    makeList('Classic', 'Light Stubble', 'Balbo', 'Circle Beard', 'Goatee', 'Chin', 'Chin Fuzz', 'Pencil Chin Strap', 'Scruffy', 'Musketeer', 'Mustache', 'Trimmed Beard', 'Stubble', 'Thin Circle Beard', 'Horseshoe', 'Pencil and \'Chops', 'Chin Strap Beard', 'Balbo and Sideburns', 'Mutton Chops', 'Scruffy Beard', 'Curly', 'Curly & Deep Stranger', 'Handlebar', 'Faustic', 'Otto & Patch', 'Otto & Full Stranger', 'Light Franz', 'The Hampstead', 'The Ambrose', 'Lincoln Curtain'),
    // eyebrows
    makeList('Classic', 'Balanced', 'Fashion', 'Cleopatra', 'Quizzical', 'Femme', 'Seductive', 'Pinched', 'Chola', 'Triomphe', 'Carefree', 'Curvaceous', 'Rodent', 'Double Tram', 'Thin', 'Penciled', 'Mother Plucker', 'Straight and Narrow', 'Natural', 'Fuzzy', 'Unkempt', 'Caterpillar', 'Regular', 'Mediterranean', 'Groomed', 'Bushels', 'Feathered', 'Prickly', 'Monobrow', 'Winged', 'Triple Tram', 'Arched Tram', 'Cutouts', 'Fade Away', 'Solo Tram'),
    // ageing
    makeList('Classic', 'Crow\'s Feet', 'First Signs', 'Middle Aged', 'Worry Lines', 'Depression', 'Distinguished', 'Aged', 'Weathered', 'Wrinkled', 'Sagging', 'Tough Life', 'Vintage', 'Retired', 'Junkie', 'Geriatric'),
    // makeup
    makeList('Classic', 'Smoky Black', 'Bronze', 'Soft Gray', 'Retro Glam', 'Natural Look', 'Cat Eyes', 'Chola', 'Vamp', 'Vinewood Glamour', 'Bubblegum', 'Aqua Dream', 'Pin Up', 'Purple Passion', 'Smoky Cat Eye', 'Smoldering Ruby', 'Pop Princess'),
    // blush
    makeList('Classic', 'Full', 'Angled', 'Round', 'Horizontal', 'High', 'Sweetheart', 'Eighties'),
    // complexion
    makeList('Classic', 'Rosy Cheeks', 'Stubble Rash', 'Hot Flush', 'Sunburn', 'Bruised', 'Alchoholic', 'Patchy', 'Totem', 'Blood Vessels', 'Damaged', 'Pale', 'Ghostly'),
    // sun damage
    makeList('Classic', 'Uneven', 'Sandpaper', 'Patchy', 'Rough', 'Leathery', 'Textured', 'Coarse', 'Rugged', 'Creased', 'Cracked', 'Gritty'),
    // lipstick
    makeList('Classic', 'Color Matte', 'Color Gloss', 'Lined Matte', 'Lined Gloss', 'Heavy Lined Matte', 'Heavy Lined Gloss', 'Lined Nude Matte', 'Liner Nude Gloss', 'Smudged', 'Geisha'),
    // freckles
    makeList('Classic', 'Cherub', 'All Over', 'Irregular', 'Dot Dash', 'Over the Bridge', 'Baby Doll', 'Pixie', 'Sun Kissed', 'Beauty Marks', 'Line Up', 'Modelesque', 'Occasional', 'Speckled', 'Rain Drops', 'Double Dip', 'One Sided', 'Pairs', 'Growth'),
    // chest hair
    makeList('Classic', 'Natural', 'The Strip', 'The Tree', 'Hairy', 'Grisly', 'Ape', 'Groomed Ape', 'Bikini', 'Lightning Bolt', 'Reverse Lightning', 'Love Heart', 'Chestache', 'Happy Face', 'Skull', 'Snail Trail', 'Slug and Nips', 'Hairy Arms'),
]);

export const getRandomOverlayItemValue = overlayId => {
    return Math.floor(Math.random() * headOverlayNames[overlayId].length);
};

export const getRandomOverlayItemOpacity = overlayId => {
    const multipliers = {
        'Blemishes': 0.1,
        'Facial Hair': 1,
        'Eyebrows': 1,
        'Ageing': 0.5,
        'Makeup': 1, 
        'Blush': 0.6,
        'Complexion': 0.6,
        'Sun Damage': 0.4,
        'Lipstick': 1,
        'Moles & Freckles': 1,
        'Chest Hair': 1,
    };
    return Math.random() * 2 * (multipliers[headOverlayNames[overlayId]] || 1) - 1;
};

export const getRandomOverlayItem = overlayId => {
    return {
        value: getRandomOverlayItemValue(overlayId),
        opacity: getRandomOverlayItemOpacity(overlayId),
    };
};

export const hiddenOverlaysForGender = gender => {
    const forMale = [];
    const forFemale = [
        'Facial Hair',
        'Chest Hair',
    ].map(headOverlayNames.indexOf, headOverlayNames);

    return ({
        0: forMale,
        'Male': forMale,
        1: forFemale,
        'Female': forFemale,
    })[gender];
}

export const disabledOverlaysForGender = gender => {
    const forMale = [
        'Blemishes',
        'Makeup',
        'Lipstick',
    ].map(headOverlayNames.indexOf, headOverlayNames);

    const forFemale = [
        'Facial Hair',
        'Ageing',
        'Sun Damage',
        'Moles & Freckles',
        'Chest Hair',
    ].map(headOverlayNames.indexOf, headOverlayNames);
    
    return ({
        0: forMale,
        'Male': forMale,
        1: forFemale,
        'Female': forFemale,
    })[gender];
};
