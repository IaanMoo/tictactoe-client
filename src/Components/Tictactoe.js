import React, { useState } from "react";

import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";

import { getPlayersQuery } from "../gql-schema/queries.js";
import { updatePlayerMutation } from "../gql-schema/mutations.js";
function Tictactoe(props) {
	var [playerTurn, setPlayerTurn] = useState("Player 1's Turn!");
	var [turns, setTurnsCount] = useState(0);
	var [playerOneWins, setPlayerOneWins] = useState("");
	var [playerTwoWins, setPlayerTwoWins] = useState("");

	const showInstructionModal = () => {
		let modal = document.querySelector(".instructionmodal");
		modal.classList.add("modalshow");
	};
	const closeInstructionModal = () => {
		let modal = document.querySelector(".instructionmodal");
		modal.classList.remove("modalshow");
	};

	//on load
	let playerData = props.data.getPlayers;
	let playerList;
	if (playerData === undefined) {
	} else {
		playerList = playerData.map(player => {
			if (player.players === "Player 1") {
				if (playerOneWins === "") {
					setPlayerOneWins(player.wins);
					localStorage.setItem("playerOneWins", player.wins);
				}
			} else if (player.players === "Player 2") {
				if (playerTwoWins === "") {
					setPlayerTwoWins(player.wins);
					localStorage.setItem("playerTwoWins", player.wins);
				}
			}
		});
	}
	const resetGame = e => {
		setTurnsCount(0);
		let cells = document.querySelectorAll(".cells");
		let count = 1;
		cells.forEach(function(cell) {
			cell.firstElementChild.innerHTML = count;
			cell.firstElementChild.classList.remove("blue");
			cell.firstElementChild.classList.remove("red");
			cell.firstElementChild.classList.add("spanPlaceHolder");
			++count;
		});
		setPlayerTurn("Player 1's Turn!");
		let holder = document.querySelector(".tictactoeholder");
		holder.classList.remove("fadediv");
		e.classList.remove("screencover");
		let pTwoInput = document.getElementById("playerTwoInput");
		pTwoInput.disabled = true;
		pTwoInput.value = "";
		document.getElementById("playerOneInput").disabled = false;
	};
	const chooseCell = cell => {
		setTurnsCount(++turns);
		cell.preventDefault();
		let selectedCell;
		if (cell.target.classList.contains("cellSpan")) {
			selectedCell = cell.target;
		} else if (cell.target.classList.contains("form")) {
			let tempCell = "cell-" + cell.target.firstElementChild.value;
			selectedCell = document.getElementById(tempCell).firstElementChild;
		} else {
			selectedCell = cell.target.firstElementChild;
		}
		if (
			!selectedCell.classList.contains("spanPlaceHolder") ||
			playerTurn === "Player 1 Wins" ||
			playerTurn === "Player 2 Wins"
		) {
			alert("Cell is already occupied");
		} else {
			if (playerTurn === "Player 1's Turn!") {
				selectedCell.innerHTML = "X";
				selectedCell.classList.remove("spanPlaceHolder");
				selectedCell.classList.add("red");
				setPlayerTurn("Player 2's Turn!");
				let pOneInput = document.getElementById("playerOneInput");
				pOneInput.disabled = true;
				pOneInput.value = "";
				document.getElementById("playerTwoInput").disabled = false;
			} else {
				selectedCell.innerHTML = "O";
				selectedCell.classList.remove("spanPlaceHolder");
				selectedCell.classList.add("blue");
				setPlayerTurn("Player 1's Turn!");
				let pTwoInput = document.getElementById("playerTwoInput");
				pTwoInput.disabled = true;
				pTwoInput.value = "";
				document.getElementById("playerOneInput").disabled = false;
			}

			let cell1 = document.getElementById("cell-1").firstElementChild
				.innerHTML;
			let cell2 = document.getElementById("cell-2").firstElementChild
				.innerHTML;
			let cell3 = document.getElementById("cell-3").firstElementChild
				.innerHTML;
			let cell4 = document.getElementById("cell-4").firstElementChild
				.innerHTML;
			let cell5 = document.getElementById("cell-5").firstElementChild
				.innerHTML;
			let cell6 = document.getElementById("cell-6").firstElementChild
				.innerHTML;
			let cell7 = document.getElementById("cell-7").firstElementChild
				.innerHTML;
			let cell8 = document.getElementById("cell-8").firstElementChild
				.innerHTML;
			let cell9 = document.getElementById("cell-9").firstElementChild
				.innerHTML;
			if (
				(cell1 === "X" && cell2 === "X" && cell3 === "X") ||
				(cell1 === "X" && cell4 === "X" && cell7 === "X") ||
				(cell1 === "X" && cell5 === "X" && cell9 === "X") ||
				(cell2 === "X" && cell5 === "X" && cell8 === "X") ||
				(cell3 === "X" && cell6 === "X" && cell9 === "X") ||
				(cell4 === "X" && cell5 === "X" && cell6 === "X") ||
				(cell3 === "X" && cell5 === "X" && cell7 === "X") ||
				(cell7 === "X" && cell8 === "X" && cell9 === "X")
			) {
				setTurnsCount(--turns);
				setPlayerTurn("Player 1 Wins");
				setPlayerOneWins(++playerOneWins);
				let newScore = playerOneWins;
				props.updatePlayerMutation({
					variables: {
						id: "5e57e86c1c9d440000e8cc2f",
						wins: newScore
					}
				});
				let holder = document.querySelector(".tictactoeholder");
				holder.classList.add("fadediv");
				let cover = document.getElementById("screencover");
				cover.classList.add("screencover");
				setTimeout(function() {
					resetGame(cover);
				}, 3000);
			} else if (
				(cell1 === "O" && cell2 === "O" && cell3 === "O") ||
				(cell1 === "O" && cell4 === "O" && cell7 === "O") ||
				(cell1 === "O" && cell5 === "O" && cell9 === "O") ||
				(cell2 === "O" && cell5 === "O" && cell8 === "O") ||
				(cell3 === "O" && cell6 === "O" && cell9 === "O") ||
				(cell4 === "O" && cell5 === "O" && cell6 === "O") ||
				(cell3 === "O" && cell5 === "O" && cell7 === "O") ||
				(cell7 === "O" && cell8 === "O" && cell9 === "O")
			) {
				setTurnsCount(--turns);
				setPlayerTurn("Player 2 Wins");
				setPlayerTwoWins(++playerTwoWins);
				let newScore = playerTwoWins;
				props.updatePlayerMutation({
					variables: {
						id: "5e57e8d61c9d440000e8cc30",
						wins: newScore
					}
				});
				let holder = document.querySelector(".tictactoeholder");
				holder.classList.add("fadediv");
				let cover = document.getElementById("screencover");
				cover.classList.add("screencover");
				setTimeout(function() {
					resetGame(cover);
				}, 3000);
			}
		}
		let message = document.querySelector("#message").innerHTML;
		if (
			turns === 9 &&
			(message != "Player 1 Wins" || message != "Player 2 Wins")
		) {
			setPlayerTurn("Tie!");
			let holder = document.querySelector(".tictactoeholder");
			holder.classList.add("fadediv");
			let cover = document.getElementById("screencover");
			cover.classList.add("screencover");
			setTimeout(function() {
				resetGame(cover);
			}, 3000);
		}
	};

	const scoreReset = () => {
		localStorage.setItem("playerOneWins", 0);
		localStorage.setItem("playerTwoWins", 0);
		setPlayerOneWins(0);
		setPlayerTwoWins(0);
		props.updatePlayerMutation({
			variables: {
				id: "5e57e86c1c9d440000e8cc2f",
				wins: 0
			}
		});
		props.updatePlayerMutation({
			variables: {
				id: "5e57e8d61c9d440000e8cc30",
				wins: 0
			}
		});

		alert("Scores are now back to 0.");
	};
	return (
		<div className="container-fluid vh-100">
			{/*Start of Instruction and reset Modal*/}
			<div className="instructionmodal">
				<div className="modalcontents">
					<h1 onClick={closeInstructionModal} className="closebtn">
						x
					</h1>
					<h2>Rules</h2>
					<p className="instructionText">
						The goal of Tic-Tac-Toe is simple first player to get
						three of their tokens in a row wins and gets a point.
						This can be diagonally, horizontally or vertically.
					</p>
					<h2>How to play the game?</h2>
					<p className="instructionText">
						You can place your token by either pressing on the
						specified cell/box where you want to place your token
						<strong>OR</strong> You can type in the cell number on
						the text box provided under the player name and then
						press Enter.
					</p>

					<h2>Want to reset the score?</h2>
					<p className="instructionText">
						If you want to reset the score just press on the reset
						button below to do so.
					</p>
					<button className="resetbtn" onClick={scoreReset}>
						Reset Score
					</button>
				</div>
			</div>
			{/*End of Instruction and reset Modal*/}
			<span className="instructionsIcon" onClick={showInstructionModal}>
				?
			</span>
			<div className="row">
				<h1 className="mx-auto title"> Tic-Tac-Toe </h1>
			</div>

			<div className="row">
				<h3 id="message" className="mx-auto mt-3 ">
					{playerTurn}
				</h3>
			</div>
			<div className="row">
				<div className="col-md-3">
					<h2 className="mt-5 text-center">Player 1</h2>
					<form className="form" onSubmit={chooseCell}>
						<input
							type="number"
							min="1"
							max="9"
							className="form-control"
							id="playerOneInput"
						/>
					</form>
					<h1 className="text-center mt-3 scoretitle">SCORE :</h1>
					<h1 className="score text-center">{playerOneWins}</h1>
				</div>

				<div className="col-md-6 mt-5 mx-auto">
					<div className="d-flex justify-content-center tictactoeholder">
						<div>
							<div
								id="cell-1"
								className="cells"
								onClick={chooseCell}
							>
								<span className="cellSpan spanPlaceHolder">
									1
								</span>
							</div>
							<div
								id="cell-2"
								className="cells"
								onClick={chooseCell}
							>
								<span className="cellSpan spanPlaceHolder">
									2
								</span>
							</div>
							<div
								id="cell-3"
								className="cells"
								onClick={chooseCell}
							>
								<span className="cellSpan spanPlaceHolder">
									3
								</span>
							</div>
						</div>
						<div>
							<div
								id="cell-4"
								className="cells"
								onClick={chooseCell}
							>
								<span className="cellSpan spanPlaceHolder">
									4
								</span>
							</div>
							<div
								id="cell-5"
								className="cells"
								onClick={chooseCell}
							>
								<span className="cellSpan spanPlaceHolder">
									5
								</span>
							</div>
							<div
								id="cell-6"
								className="cells"
								onClick={chooseCell}
							>
								<span className="cellSpan spanPlaceHolder">
									6
								</span>
							</div>
						</div>
						<div>
							<div
								id="cell-7"
								className="cells"
								onClick={chooseCell}
							>
								<span className="cellSpan spanPlaceHolder">
									7
								</span>
							</div>
							<div
								id="cell-8"
								className="cells"
								onClick={chooseCell}
							>
								<span className="cellSpan spanPlaceHolder">
									8
								</span>
							</div>
							<div
								id="cell-9"
								className="cells"
								onClick={chooseCell}
							>
								<span className="cellSpan spanPlaceHolder">
									9
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className="col-md-3">
					<h2 className="mt-5 text-center">Player 2</h2>
					<form className="form" onSubmit={chooseCell}>
						<input
							type="number"
							min="1"
							max="9"
							className="form-control"
							id="playerTwoInput"
							disabled="true"
						/>
					</form>
					<h1 className="text-center mt-3 scoretitle">SCORE :</h1>
					<h1 className="score text-center">{playerTwoWins}</h1>
				</div>
			</div>
			<div id="screencover"></div>
		</div>
	);
}

export default compose(
	graphql(getPlayersQuery),
	graphql(updatePlayerMutation, { name: "updatePlayerMutation" })
)(Tictactoe);
