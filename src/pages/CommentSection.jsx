import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const CommentSection = ({ noteId, comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment({
        id: Date.now(),
        content: newComment.trim(),
        createdAt: new Date().toISOString()
      });
      setNewComment('');
    }
  };

  return (
    <Card className="mt-4">
      <CardContent>
        {comments.map((comment) => (
          <div key={comment.id} className="mb-2">
            <p className="text-sm">{comment.content}</p>
            <small className="text-muted-foreground">
              {new Date(comment.createdAt).toLocaleString()}
            </small>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="mr-2"
        />
        <Button onClick={handleAddComment}>Add</Button>
      </CardFooter>
    </Card>
  );
};

export default CommentSection;