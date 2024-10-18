import { User } from '@/types/dashboard';

interface UserSelectorProps {
  selectedUser: User;
  onSelectUser: (user: User) => void;
}

const UserSelector: React.FC<UserSelectorProps> = ({ selectedUser, onSelectUser }) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        className={`px-4 py-2 rounded-lg ${
          selectedUser === 'patient' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
        }`}
        onClick={() => onSelectUser('patient')}
      >
        Paciente
      </button>
      <button
        className={`px-4 py-2 rounded-lg ${
          selectedUser === 'medicalStaff' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
        }`}
        onClick={() => onSelectUser('medicalStaff')}
      >
        Personal Médico
      </button>
      <button
        className={`px-4 py-2 rounded-lg ${
          selectedUser === 'visitors' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
        }`}
        onClick={() => onSelectUser('visitors')}
      >
        Visitas
      </button>
    </div>
  );
};

export default UserSelector;