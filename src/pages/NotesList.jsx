import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import NoteCard from './NoteCard';
import NoteForm from './NoteForm';
import NoteGraph from './NoteGraph';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [isAddingNote, setIsAddingNote] = useState(false);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  const saveNotes = (updatedNotes) => {
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const addNote = (note) => {
    const newNote = { ...note, id: Date.now(), createdAt: new Date().toISOString() };
    const updatedNotes = [...notes, newNote];
    saveNotes(updatedNotes);
    setIsAddingNote(false);
  };

  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    );
    saveNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    saveNotes(updatedNotes);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <Button onClick={() => setIsAddingNote(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Note
        </Button>
      </div>
      
      {isAddingNote && (
        <NoteForm onSave={addNote} onCancel={() => setIsAddingNote(false)} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map(note => (
          <NoteCard 
            key={note.id} 
            note={note} 
            onUpdate={updateNote}
            onDelete={deleteNote}
          />
        ))}
      </div>

      <NoteGraph notes={notes} />
    </div>
  );
};

export default NotesList;