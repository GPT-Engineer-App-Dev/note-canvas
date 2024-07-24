import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NoteGraph = ({ notes }) => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const data = {};
    notes.forEach(note => {
      const date = new Date(note.createdAt).toLocaleDateString();
      data[date] = (data[date] || 0) + 1;
    });

    const sortedData = Object.entries(data)
      .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
      .map(([date, count]) => ({ date, count }));

    setGraphData(sortedData);
  }, [notes]);

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Notes Created Per Day</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={graphData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default NoteGraph;