import Tutorial from './Tutorial';
import { SharedConstants } from 'Shared/constants';

export function getStorylines() {
    return {
        [SharedConstants.Storylines.TUTORIAL]: Tutorial,
    };
}

export function getStorylineByKey(
    key: SharedConstants.Storylines
): Storyline {
    return getStorylines()[key];
}
