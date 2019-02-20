export const submitForm = (form, ...data) => {
    // move this somewhere else... sometime in the future... probably never
    window.dispatch('set-error', false);

    mp.trigger(`fromBrowser.handle${form}`, ...data);
};
