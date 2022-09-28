import Note from './components/Note'

const App = ({notes}) => {

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <li key = {note.id}>
            <Note key={note.id} note={note} />
          </li>
        )}        
      </ul>
    </div>
  )
}

export default App
