export default new class PlayerManager {
    private readonly player = mp.players.local;

    updateCharacterAppearance = (appearance: CharacterAppearance) => {
        const {
            gender,
            father,
            mother,
            resemblance,
            skinTone,
            features,
            headOverlays,
            hair,
            hairColor,
            hairHighlightColor,
            eyeColor,
            beardColor,
            eyebrowColor,
            blushColor,
            lipstickColor,
            chestHairColor,
        } = appearance;

        const model = mp.game.joaat(`mp_${gender ? 'f' : 'm'}_freemode_01`);
        if (this.player.model !== model) {
            this.player.model = model;

            this.player.setComponentVariation(3, 15, 0, 2);
            this.player.setComponentVariation(4, gender ? 15 : 61, gender ? 3 : 0, 2);
            this.player.setComponentVariation(6, gender ? 35 : 34, 0, 2);
            this.player.setComponentVariation(8, 15, 0, 2);
            this.player.setComponentVariation(11, gender ? 5 : 15, 0, 2);
        }

        Object.values<number>(features).forEach((value, featureIndex) => {
            this.player.setFaceFeature(featureIndex, value);
        });

        this.player.setHeadBlendData(
            // shape
            mother, father, 0,
            // skin
            mother, father, 0,
            // mixes
            resemblance, skinTone, 0.0,
            false,
        );

        Object.values<{
            value: number,
            opacity: number
        }>(headOverlays).forEach(({ value, opacity }, overlayId) => {
            if (+overlayId === 1) {
                mp.gui.chat.push(`${value}:${opacity}`);
            }
            this.player.setHeadOverlay(
                overlayId,
                value,
                opacity,
                ({
                    1: beardColor,
                    2: eyebrowColor,
                    5: blushColor,
                    8: lipstickColor,
                    10: chestHairColor,
                })[overlayId] || 0,
                0
            );
        });

        this.player.setComponentVariation(2, hair, 0, 2);
        this.player.setHairColor(hairColor, hairHighlightColor);
        this.player.setEyeColor(eyeColor);
    }
}
