import * as types from '../actionsTypes/actionsTypes.js';

export const AddingStory = (data) => ({
	type: types.ADDING_STORY,
	payload: data,
});

export const ViewCard = () => ({
	type: types.CARD_CLICKED,
});

export const UnviewCard = () => ({
	type: types.CARD_UNCLICKED,
});

export const ViewMapCard = () => ({
	type: types.MAPCARD_CLICKED,
});

export const ViewPopCard = (data) => ({
	type: types.SELECTED_STORY,
	payload: data,
});

export const UnviewPopCard = () => ({
	type: types.REMOVE_SELECTED_STORY,
});
