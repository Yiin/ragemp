const NativeUI = require('./nativeui.js');

const { Menu } = NativeUI;
const { UIMenuItem } = NativeUI;
const { UIMenuListItem } = NativeUI;
const { UIMenuSliderItem } = NativeUI;
const { Point } = NativeUI;
const { ItemsCollection } = NativeUI;

mp.gui.cursor.visible = false;

const effects = [
    'BeastIntroScene',
    'BeastLaunch',
    'BeastTransition',
    'BikerFilter',
    'BikerFilterOut',
    'BikerFormation',
    'BikerFormationOut',
    'CamPushInFranklin',
    'CamPushInMichael',
    'CamPushInNeutral',
    'CamPushInTrevor',
    'ChopVision',
    'CrossLine',
    'CrossLineOut',
    'DeadlineNeon',
    'DeathFailFranklinIn',
    'DeathFailMichaelIn',
    'DeathFailMPDark',
    'DeathFailMPIn',
    'DeathFailNeutralIn',
    'DeathFailOut',
    'DeathFailTrevorIn',
    'DefaultFlash',
    'DMT_flight',
    'DMT_flight_intro',
    'Dont_tazeme_bro',
    'DrugsDrivingIn',
    'DrugsDrivingOut',
    'DrugsMichaelAliensFight',
    'DrugsMichaelAliensFightIn',
    'DrugsMichaelAliensFightOut',
    'DrugsTrevorClownsFight',
    'DrugsTrevorClownsFightIn',
    'DrugsTrevorClownsFightOut',
    'ExplosionJosh3',
    'FocusIn',
    'FocusOut',
    'HeistCelebEnd',
    'HeistCelebPass',
    'HeistCelebPassBW',
    'HeistCelebToast',
    'HeistLocate',
    'HeistTripSkipFade',
    'InchOrange',
    'InchOrangeOut',
    'InchPickup',
    'InchPickupOut',
    'InchPurple',
    'InchPurpleOut',
    'LostTimeDay',
    'LostTimeNight',
    'MenuMGHeistIn',
    'MenuMGHeistIntro',
    'MenuMGHeistOut',
    'MenuMGHeistTint',
    'MenuMGIn',
    'MenuMGSelectionIn',
    'MenuMGSelectionTint',
    'MenuMGTournamentIn',
    'MenuMGTournamentTint',
    'MinigameEndFranklin',
    'MinigameEndMichael',
    'MinigameEndNeutral',
    'MinigameEndTrevor',
    'MinigameTransitionIn',
    'MinigameTransitionOut',
    'MP_Bull_tost',
    'MP_Bull_tost_Out',
    'MP_Celeb_Lose',
    'MP_Celeb_Lose_Out',
    'MP_Celeb_Preload',
    'MP_Celeb_Preload_Fade',
    'MP_Celeb_Win',
    'MP_Celeb_Win_Out',
    'MP_corona_switch',
    'MP_intro_logo',
    'MP_job_load',
    'MP_Killstreak',
    'MP_Killstreak_Out',
    'MP_Loser_Streak_Out',
    'MP_OrbitalCannon',
    'MP_Powerplay',
    'MP_Powerplay_Out',
    'MP_race_crash',
    'MP_SmugglerCheckpoint',
    'MP_TransformRaceFlash',
    'MP_WarpCheckpoint',
    'PauseMenuOut',
    'pennedIn',
    'PennedInOut',
    'PeyoteEndIn',
    'PeyoteEndOut',
    'PeyoteIn',
    'PeyoteOut',
    'PPFilter',
    'PPFilterOut',
    'PPGreen',
    'PPGreenOut',
    'PPOrange',
    'PPOrangeOut',
    'PPPink',
    'PPPinkOut',
    'PPPurple',
    'PPPurpleOut',
    'RaceTurbo',
    'Rampage',
    'RampageOut',
    'SniperOverlay',
    'SuccessFranklin',
    'SuccessMichael',
    'SuccessNeutral',
    'SuccessTrevor',
    'switch_cam_1',
    'switch_cam_2',
    'SwitchHUDFranklinIn',
    'SwitchHUDFranklinOut',
    'SwitchHUDIn',
    'SwitchHUDMichaelIn',
    'SwitchHUDMichaelOut',
    'SwitchHUDOut',
    'SwitchHUDTrevorIn',
    'SwitchHUDTrevorOut',
    'SwitchOpenFranklin',
    'SwitchOpenFranklinIn',
    'SwitchOpenFranklinOut',
    'SwitchOpenMichaelIn',
    'SwitchOpenMichaelMid',
    'SwitchOpenMichaelOut',
    'SwitchOpenNeutralFIB5',
    'SwitchOpenNeutralOutHeist',
    'SwitchOpenTrevorIn',
    'SwitchOpenTrevorOut',
    'SwitchSceneFranklin',
    'SwitchSceneMichael',
    'SwitchSceneNeutral',
    'SwitchSceneTrevor',
    'SwitchShortFranklinIn',
    'SwitchShortFranklinMid',
    'SwitchShortMichaelIn',
    'SwitchShortMichaelMid',
    'SwitchShortNeutralIn',
    'SwitchShortNeutralMid',
    'SwitchShortTrevorIn',
    'SwitchShortTrevorMid',
    'TinyRacerGreen',
    'TinyRacerGreenOut',
    'TinyRacerIntroCam',
    'TinyRacerPink',
    'TinyRacerPinkOut',
    'WeaponUpgrade',
];

const ui = new Menu('Screen FX', '', new Point(50, 50));
ui.AddItem(new UIMenuListItem(
    'Screen Effect',
    '',
    new ItemsCollection(effects),
));
ui.AddItem(new UIMenuItem(
    'Stop Effect',
    '',
));
ui.Close();

const settingsFX = {
    duration: 0,
    looped: true,
    selected: [],
};

ui.ItemSelect.on((item, index) => {
    if (item instanceof UIMenuListItem) {
        // mp.gui.chat.push(`3 ${item.SelectedItem.DisplayText} ${item.SelectedItem.Data}`);
        mp.game.graphics.startScreenEffect(item.SelectedItem.DisplayText, settingsFX.duration, settingsFX.looped);
        settingsFX.selected.push(item.SelectedItem.DisplayText);
    } else if (item instanceof UIMenuSliderItem) {
        // mp.gui.chat.push(`2 ${item.Text} ${item.Index} ${item.IndexToItem(item.Index)}`);
    } else if (item.Text === 'Stop Effect') {
        for (let i = 0; i < settingsFX.selected.length; i += 1) {
            mp.game.graphics.stopScreenEffect(settingsFX.selected[i]);
        }
    }
});
mp.keys.bind(0x73, false, () => {
    if (ui.Visible) {
        ui.Close();
        mp.gui.chat.show(true);
    } else {
        ui.Open();
        mp.gui.chat.show(false);
    }
});
