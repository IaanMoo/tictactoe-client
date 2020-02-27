import { gql } from "apollo-boost";

const getPlayersQuery = gql`
	{
		getPlayers {
			id
			players
			wins
		}
	}
`;

export { getPlayersQuery };
