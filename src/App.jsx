import { useState, useEffect } from "react";
import Note from "./components/Note";
import axios from "axios";

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("a new note...");
	const [showAll, setShowAll] = useState(true);

	useEffect(() => {
		axios.get("http://localhost:3001/notes").then((response) => {
			setNotes(response.data);
		});
	}, []);

	const handleNoteChange = (event) => {
		setNewNote(event.target.value);
	};

	const addNote = (event) => {
		event.preventDefault();

		const noteObject = {
			id: notes.length + 1,
			content: newNote,
			important: Math.random() > 0.5,
		};

		setNotes(notes.concat(noteObject));
		setNewNote("");
	};

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	return (
		<div>
			<h1>Notes</h1>

			<button onClick={() => setShowAll(!showAll)}>
				show {showAll ? "important" : "all"}
			</button>

			<ul>
				{notesToShow.map((note) => (
					<Note
						key={note.id}
						note={note}
					/>
				))}
			</ul>

			<form onSubmit={addNote}>
				<input
					value={newNote}
					onChange={handleNoteChange}
				/>

				<button type="submit">save</button>
			</form>
		</div>
	);
};

export default App;
