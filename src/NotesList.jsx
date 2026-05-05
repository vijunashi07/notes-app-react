import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

function NotesList({ filteredNotes, handleEdit, handleDelete, editNoteId }) {
    console.log("filteredNotes:", filteredNotes)

    return (
        filteredNotes.map((note) => (
            <div key={note.id} className='noteDiv' >
                <span className='note'>{note.text}</span>
                <button className='editButton' title='Edit Note' onClick={() => handleEdit(note.id)}><MdOutlineEdit /></button>
                <button className='deleteButton' title='Delete note' onClick={() => handleDelete(note.id)} disabled={note.id === editNoteId ? true : false}> <MdDeleteOutline /></button>
            </div>
        )
        )

    )
}

export default NotesList