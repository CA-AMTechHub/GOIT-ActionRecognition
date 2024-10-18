"use client"

import Timeline from '@/components/Timeline';
import TaskDetails from '@/components/TaskDetails';
import { TimelineEvent, User } from '@/types/dashboard';
import { useState } from 'react';

const Dashboard = () => {
  const [selectedTask, setSelectedTask] = useState<TimelineEvent | null>(null);

  const timelineData: Record<User, TimelineEvent[]> = {
    'Paciente': [
      { id: 1, action: 'recostado en cama', startTime: '08:00', endTime: '10:00', status: 'completed' },
      { id: 2, action: 'caminando', startTime: '10:00', endTime: '10:30', status: 'completed' },
      { id: 3, action: 'sentado', startTime: '10:30', endTime: '12:00', status: 'completed' },
      { id: 4, action: 'recostado en el suelo', startTime: '12:00', endTime: '12:30', status: 'at-risk' },
      { id: 5, action: 'parado', startTime: '12:30', endTime: '13:00', status: 'completed' },
      { id: 6, action: 'ausente en camara', startTime: '13:00', endTime: '14:00', status: 'in-progress' },
    ],
    'Personal Médico': [
      { id: 1, action: 'presente', startTime: '09:00', endTime: '11:00', status: 'completed' },
      { id: 2, action: 'presente', startTime: '14:00', endTime: '16:00', status: 'in-progress' },
    ],
    'Visitas': [
      { id: 1, action: 'presente', startTime: '11:00', endTime: '12:00', status: 'completed' },
      { id: 2, action: 'presente', startTime: '15:00', endTime: '16:00', status: 'in-progress' },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard de Monitoreo de Pacientes</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Timeline events={timelineData} />
        </div>
        <div>
          <TaskDetails task={selectedTask} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;