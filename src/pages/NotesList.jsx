import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import NoteCard from './NoteCard';
import NoteForm from './NoteForm';
import NoteGraph from './NoteGraph';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [isAddingNote, setIsAddingNote] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  const saveNotes = (updatedNotes) => {
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const addNote = (note) => {
    const newNote = { ...note, id: Date.now().toString(), createdAt: new Date().toISOString(), comments: [] };
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

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setNotes((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
      
      // Save the new order of notes
      saveNotes(notes);
    }
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

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={notes.map(note => note.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {notes.map(note => (
              <NoteCard 
                key={note.id} 
                note={note} 
                onUpdate={updateNote}
                onDelete={deleteNote}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <NoteGraph notes={notes} />
    </div>
  );
};

export default NotesList;