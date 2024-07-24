import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash } from 'lucide-react';
import NoteForm from './NoteForm';

const NoteCard = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedNote) => {
    onUpdate({ ...note, ...updatedNote });
    setIsEditing(false);
  };

  if (isEditing) {
    return <NoteForm note={note} onSave={handleUpdate} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <Card style={{ backgroundColor: note.color }}>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{note.content}</p>
        <div className="mt-2 space-x-2">
          {note.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-end space-x-2">
        <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={() => onDelete(note.id)}>
          <Trash className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NoteCard;