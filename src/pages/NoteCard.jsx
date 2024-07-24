import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, MessageSquare, GripVertical } from 'lucide-react';
import NoteForm from './NoteForm';
import CommentSection from './CommentSection';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const NoteCard = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: note.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleUpdate = (updatedNote) => {
    onUpdate({ ...note, ...updatedNote });
    setIsEditing(false);
  };

  if (isEditing) {
    return <NoteForm note={note} onSave={handleUpdate} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <Card ref={setNodeRef} style={style} {...attributes} className="mb-4">
      <CardHeader className="flex flex-row items-center">
        <div {...listeners} className="cursor-move mr-2">
          <GripVertical className="h-5 w-5 text-gray-400" />
        </div>
        <CardTitle className="flex-grow">{note.title}</CardTitle>
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
        <Button size="sm" variant="outline" onClick={() => setShowComments(!showComments)}>
          <MessageSquare className="h-4 w-4 mr-2" />
          {note.comments?.length || 0}
        </Button>
        <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={() => onDelete(note.id)}>
          <Trash className="h-4 w-4" />
        </Button>
      </CardFooter>
      {showComments && (
        <CommentSection 
          noteId={note.id} 
          comments={note.comments || []} 
          onAddComment={(comment) => onUpdate({ ...note, comments: [...(note.comments || []), comment] })}
        />
      )}
    </Card>
  );
};

export default NoteCard;