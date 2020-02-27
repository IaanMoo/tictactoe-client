import { gql } from "apollo-boost";

const updatePlayerMutation = gql`
	mutation($id: ID!, $wins: Int!) {
		updatePlayer(id: $id, wins: $wins) {
			wins
		}
	}
`;

export { updatePlayerMutation };
