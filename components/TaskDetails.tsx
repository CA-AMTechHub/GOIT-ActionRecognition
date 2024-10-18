import React from 'react';
import { TimelineEvent } from '@/types/dashboard';
import { Badge } from "@/components/ui/badge";

interface TaskDetailsProps {
  task: TimelineEvent | null;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => {
  if (!task) {
    return <div className="text-gray-500">Seleccione una actividad para ver los detalles.</div>;
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'completed': 'bg-green-500',
      'in-progress': 'bg-blue-500',
      'at-risk': 'bg-yellow-500',
      'backlog': 'bg-gray-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{task.action}</h3>
      <div className="space-y-2">
        <p><span className="font-medium">Inicio:</span> {task.startTime}</p>
        <p><span className="font-medium">Fin:</span> {task.endTime}</p>
        <p><span className="font-medium">Estado:</span> <Badge className={getStatusColor(task.status)}>{task.status}</Badge></p>
      </div>
    </div>
  );
};

export default TaskDetails;