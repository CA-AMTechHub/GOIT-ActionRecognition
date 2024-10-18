import React from 'react';
import { TimelineEvent, User } from '@/types/dashboard';
import { Clock, User as UserIcon, Users, Activity } from 'lucide-react';

interface TimelineProps {
  events: Record<User, TimelineEvent[]>;
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const getEventColor = (action: string) => {
    const colors: Record<string, string> = {
      'recostado en cama': 'bg-blue-500',
      'caminando': 'bg-green-500',
      'sentado': 'bg-yellow-500',
      'recostado en el suelo': 'bg-red-500',
      'parado': 'bg-purple-500',
      'ausente en camara': 'bg-gray-500',
      'presente': 'bg-indigo-500',
    };
    return colors[action] || 'bg-gray-300';
  };

  const calculateEventPosition = (startTime: string, endTime: string) => {
    const start = new Date(`2023-01-01T${startTime}:00`);
    const end = new Date(`2023-01-01T${endTime}:00`);
    const startPercentage = (start.getHours() * 60 + start.getMinutes()) / (24 * 60) * 100;
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Duration in hours
    const width = duration / 24 * 100;
    return { left: `${startPercentage}%`, width: `${width}%` };
  };

  const users: User[] = ['Paciente', 'Personal Médico', 'Visitas'];

  // Calcular estadísticas
  const totalEvents = Object.values(events).flat().length;
  const totalPatients = events['Paciente'].length;

  const renderTimeRuler = () => {
    const hours = Array.from({ length: 25 }, (_, i) => i);
    return (
      <div className="relative h-8 border-t border-gray-200">
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="absolute top-0 h-2 border-l border-gray-300" style={{ left: `${(hour / 24) * 100}%` }}>
              <span className="absolute top-2 left-0 transform -translate-x-1/2 text-xs text-gray-500">{`${hour.toString().padStart(2, '0')}:00`}</span>
            </div>
            {hour < 24 && Array.from({ length: 11 }, (_, i) => i + 1).map((minute) => (
              <div
                key={`${hour}-${minute}`}
                className="absolute top-0 h-1 border-l border-gray-200"
                style={{ left: `${((hour * 60 + minute * 5) / (24 * 60)) * 100}%` }}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderLegend = () => {
    const uniqueActions = Array.from(new Set(Object.values(events).flat().map(e => e.action)));
    return (
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-semibold mb-2">Leyenda</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {uniqueActions.map((action) => (
            <div key={action} className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-2 ${getEventColor(action)}`} />
              <span className="text-xs">{action}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">Timeline de Actividades</h2>
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">Room-1</h3>
      
      <div className="flex flex-col sm:flex-row justify-between mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center mb-2 sm:mb-0">
          <Activity className="text-green-500 mr-2" size={20} />
          <span className="font-medium">Estado:</span>
          <span className="ml-2">Poblado</span>
        </div>
        <div className="flex items-center mb-2 sm:mb-0">
          <Users className="text-blue-500 mr-2" size={20} />
          <span className="font-medium">Total de Personas:</span>
          <span className="ml-2 font-bold">{totalEvents}</span>
        </div>
        <div className="flex items-center">
          <UserIcon className="text-purple-500 mr-2" size={20} />
          <span className="font-medium">Total de Pacientes:</span>
          <span className="ml-2 font-bold">{totalPatients}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {renderTimeRuler()}

          <div className="mt-4">
            {users.map((user, index) => (
              <div key={user} className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 w-32">{user}</span>
                  <div className="flex-grow h-6 bg-gray-100 rounded-full overflow-hidden relative">
                    {events[user].map((event) => {
                      const { left, width } = calculateEventPosition(event.startTime, event.endTime);
                      return (
                        <div
                          key={event.id}
                          className={`absolute h-full ${getEventColor(event.action)}`}
                          style={{ left, width }}
                          title={`${event.action}: ${event.startTime} - ${event.endTime}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {renderLegend()}
    </div>
  );
};

export default Timeline;