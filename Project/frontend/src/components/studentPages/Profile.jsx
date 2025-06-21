import React, { useState } from 'react';
import { User, Mail, Book, Calendar, Award, Edit3, Save, X } from 'lucide-react';
import { student, subjects } from '../../data/mockData';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState(student);

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save to a backend here
  };

  const handleCancel = () => {
    setEditedStudent(student);
    setIsEditing(false);
  };

  const InfoCard = ({ title, children }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600 mt-2">Manage your personal information and academic details.</p>
          </div>
          
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Picture and Basic Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-16 h-16 text-white" />
            </div>
            
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editedStudent.name}
                  onChange={(e) => setEditedStudent({...editedStudent, name: e.target.value})}
                  className="w-full text-center text-2xl font-bold text-gray-900 border-b-2 border-blue-500 bg-transparent focus:outline-none"
                />
                <input
                  type="email"
                  value={editedStudent.email}
                  onChange={(e) => setEditedStudent({...editedStudent, email: e.target.value})}
                  className="w-full text-center text-gray-600 border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
                />
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{editedStudent.name}</h2>
                <p className="text-gray-600 mb-4">{editedStudent.email}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{editedStudent.gpa}</div>
                <div className="text-sm text-gray-500">GPA</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{editedStudent.year}</div>
                <div className="text-sm text-gray-500">Year</div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="lg:col-span-2 space-y-6">
          <InfoCard title="Academic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedStudent.studentId}
                      onChange={(e) => setEditedStudent({...editedStudent, studentId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{editedStudent.studentId}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedStudent.program}
                      onChange={(e) => setEditedStudent({...editedStudent, program: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{editedStudent.program}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                  {isEditing ? (
                    <select
                      value={editedStudent.year}
                      onChange={(e) => setEditedStudent({...editedStudent, year: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value={1}>1st Year</option>
                      <option value={2}>2nd Year</option>
                      <option value={3}>3rd Year</option>
                      <option value={4}>4th Year</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 font-medium">Year {editedStudent.year}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Semester</label>
                  {isEditing ? (
                    <select
                      value={editedStudent.semester}
                      onChange={(e) => setEditedStudent({...editedStudent, semester: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value={1}>Semester 1</option>
                      <option value={2}>Semester 2</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 font-medium">Semester {editedStudent.semester}</p>
                  )}
                </div>
              </div>
            </div>
          </InfoCard>

          <InfoCard title="Enrolled Subjects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjects.map((subject) => (
                <div key={subject.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${subject.color}`}></div>
                    <div>
                      <h3 className="font-medium text-gray-900">{subject.code}</h3>
                      <p className="text-sm text-gray-600">{subject.name}</p>
                      <p className="text-xs text-gray-500">Instructor: {subject.instructor}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </InfoCard>

          <InfoCard title="Academic Statistics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
                  <Book className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">4</div>
                <div className="text-sm text-gray-600">Subjects Enrolled</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-sm text-gray-600">Assignments Completed</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600">2</div>
                <div className="text-sm text-gray-600">Upcoming Tests</div>
              </div>
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;