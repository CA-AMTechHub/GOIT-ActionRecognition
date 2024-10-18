export type User = 'Paciente' | 'Personal Médico' | 'Visitas';

export interface TimelineEvent {
  id: number;
  action: string;
  startTime: string;
  endTime: string;
}