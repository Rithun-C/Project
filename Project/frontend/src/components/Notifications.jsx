import React, { useState } from 'react';
import { Bell, AlertCircle, CheckCircle, Clock, BookOpen, FileText, Award, Megaphone, StickyNote, X } from 'lucide-react';
import { notifications } from '../data/mockData';

const Notifications = () => {
  const [filter, setFilter] = useState('all');
  const [notificationList, setNotificationList] = useState(notifications);

  const filteredNotifications = notificationList.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.priority === filter;
  });

  const unreadCount = notificationList.filter(n => !n.isRead).length;

  const markAsRead = (id) => {
    setNotificationList(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotificationList(prev => prev.filter(notification => notification.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'assignment': return <BookOpen className="w-5 h-5" />;
      case 'quiz': return <CheckCircle className="w-5 h-5" />;
      case 'test': return <FileText className="w-5 h-5" />;
      case 'grade': return <Award className="w-5 h-5" />;
      case 'announcement': return <Megaphone className="w-5 h-5" />;
      case 'note': return <StickyNote className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'bg-red-100 text-red-600 border-red-200';
    if (priority === 'medium') return 'bg-yellow-100 text-yellow-600 border-yellow-200';
    
    switch (type) {
      case 'assignment': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'quiz': return 'bg-green-100 text-green-600 border-green-200';
      case 'test': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'grade': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'announcement': return 'bg-indigo-100 text-indigo-600 border-indigo-200';
      case 'note': return 'bg-teal-100 text-teal-600 border-teal-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-red-500 text-white',
      medium: 'bg-yellow-500 text-white',
      low: 'bg-gray-500 text-white'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority]}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-2">Stay updated with your academic activities.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Bell className="w-4 h-4" />
              <span>{unreadCount} unread</span>
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Mark All Read
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {[
            { key: 'all', label: 'All Notifications' },
            { key: 'unread', label: 'Unread' },
            { key: 'high', label: 'High Priority' },
            { key: 'medium', label: 'Medium Priority' },
            { key: 'low', label: 'Low Priority' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                filter === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications found</h3>
            <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all ${
                !notification.isRead ? 'border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-lg border ${getNotificationColor(notification.type, notification.priority)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                      {getPriorityBadge(notification.priority)}
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-3">{notification.message}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{notification.date.toLocaleDateString()} at {notification.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      
                      {notification.subject && (
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${notification.subject.color}`}></div>
                          <span>{notification.subject.code}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Mark as read"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete notification"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;