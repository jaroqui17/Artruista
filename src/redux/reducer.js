import * as types from './actionsTypes/actionsTypes';

const initialState = {
	userCard: [
		{
			firstName: 'Jon',
			lastName: 'A',
			story:
				'was looking forward to eating nacho fries from taco bell but promotional period ended',
			help: 'send $1000 to break into taco bell headquarters',
			lat: 33.684566,
			lng: -117.826508,
			id: 1,
		},
		{
			firstName: 'Mai',
			lastName: 'N',
			story: 'Lost my girls from Reactime but got this awesome team instead',
			help: 'Need serious sisterhood time',
			lat: 34.052235,
			lng: -118.243683,
		},
		{
			firstName: 'Seamus',
			lastName: 'r',
			story: 'spent all his savings on three months rent in NYC for Codesmith',
			help: 'needs $10 to treat himeself to a dinner for one',
			lat: 33.77005,
			lng: -118.193741,
		},
		{
			firstName: 'Jarryl ',
			lastName: 'o',
			story: 'Lost all my money buying exxon mobil stocks instead of tesla',
			help: 'send $10 so I can buy something warms for the holidays',
			lat: 33.835293,
			lng: -117.914505,
		},
	],
	viewCard: true,
	viewMapCard: false,
	selectedStory: {},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ADDING_STORY:
			// creating userCard variable that will add new story input
			const userCard = [...state.userCard, action.payload];
			return {
				...state,
				userCard: userCard,
			};

		case types.CARD_CLICKED:
			return {
				...state,
				viewCard: false,
				viewMapCard: false,
			};

		case types.CARD_UNCLICKED:
			return {
				...state,
				viewCard: true,
				viewMapCard: false,
			};

		case types.MAPCARD_CLICKED:
			return {
				...state,
				viewCard: false,
				viewMapCard: true,
			};

		case types.SELECTED_STORY:
			console.log('in reducer and this is payload', action.payload);
			return {
				...state,
				selectedStory: action.payload,
			};

		case types.REMOVE_SELECTED_STORY:
			return {
				...state,
				viewCard: true,
				viewMapCard: false,
				selectedStory: {},
			};

		default:
			return state;
	}
};

export default reducer;
