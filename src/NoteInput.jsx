function NoteInput({ note, handleInputChange, addNotes, editNoteId }) {

    return (
        <section>
            <h3>ADD A NEW NOTE</h3>
            <div className="inputRow">

                <input className='input' name='input' placeholder='Enter Note..' value={note} onChange={handleInputChange} ></input>
                <button className='addButton' onClick={addNotes} disabled={note.trim().length === 0}>{editNoteId ? `Update Notes` : `Add Notes`}</button>

            </div>
        </section>
    )
}

export default NoteInput;