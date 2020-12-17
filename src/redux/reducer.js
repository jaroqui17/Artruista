import * as types from './actionsTypes/actionsTypes';

const initialState = {
	cards: [
		{
			firstName: 'Jon',
			lastName: 'A',
			personStory: 'I ate taco bell',
			affected: 'My tummy hurted',
			key: 1
		},
		{
			firstName: 'Mai',
			lastName: 'N',
			personStory: 'became fellow',
			affected: 'don\'t sleep',
			key: 2
		},
		{
			firstName: 'Seamus',
			lastName: 'R',
			personStory: 'bought gifts',
			affected: 'too expensive',
			key: 3
		},
		{
			firstName: 'Jarryl',
			lastName: 'O',
			personStory: 'wine tasting',
			affected: 'had too much fun',
			key: 4
		}
	]
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.INCREASE:
			return {
				...state,
				counter: state.counter + 1,
			};

		default:
			return state;
	}
};

export default reducer;
