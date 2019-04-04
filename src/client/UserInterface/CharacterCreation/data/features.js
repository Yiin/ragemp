export const featureNames = Object.freeze([
    'Nose Width',
    'Nose Bottom Height',
    'Nose Tip Length',
    'Nose Bridge Depth',
    'Nose Tip Height',
    'Nose Broken',
    'Brow Height',
    'Brow Depth',
    'Cheekbone Height',
    'Cheekbone Width',
    'Cheek Depth',
    'Eye Size',
    'Lip Thickness',
    'Jaw Width',
    'Jaw Shape',
    'Chin Height',
    'Chin Depth',
    'Chin Width',
    'Chin Indent',
    'Neck Width'
]);

export const getRandomFeatureValue = () => {
    return +(Math.random() - Math.random()).toFixed(2)
};
