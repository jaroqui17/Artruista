import * as types from './actionsTypes/actionsTypes';

const initialState = {
	userCard: [
		{
			firstName: 'Jon',
			lastName: 'A',
			story: 'I ate taco bell',
			help: 'My tummy hurted',
			lat: 33.684566,
			lng: -117.826508,
			id: 1,
		},
		{
			firstName: 'Mai',
			lastName: 'N',
			story: 'wowow allala',
			help: "don't sleep",
			lat: 34.052235,
			lng: -118.243683,
		},
		{
			firstName: 'Seamus',
			lastName: 'r',
			story: 'something',
			help: 'blah',
			lat: 33.77005,
			lng: -118.193741,
		},
		{
			firstName: 'Jarryl',
			lastName: 'o',
			story: 'wowoow',
			help: 'meooow',
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
