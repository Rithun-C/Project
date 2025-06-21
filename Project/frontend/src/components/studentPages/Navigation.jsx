import React from 'react';
import { Home, BookOpen, HelpCircle, FileText, User, GraduationCap, Bell, StickyNote } from 'lucide-react';


const Navigation = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'assignments', label: 'Assignments', icon: BookOpen },
    { id: 'quizzes', label: 'Quizzes', icon: HelpCircle },
    { id: 'tests', label: 'Tests', icon: FileText },
    { id: 'grades', label: 'Grades', icon: GraduationCap },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'notes', label: 'Study Notes', icon: StickyNote },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-white shadow-lg border-r border-gray-200 h-full">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">StudentHub</h1>
        <p className="text-sm text-gray-600 mt-1">Academic Portal</p>
      </div>
      
      <div className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;