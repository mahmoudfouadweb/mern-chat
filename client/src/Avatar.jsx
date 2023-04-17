import React from 'react';

const Avatar = ({ userId, userName }) => {
  // prettier-ignore
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-gray-500',
    'bg-orange-500'
  ];
  const userIdBase10 = parseInt(userId, 16);
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];
  return (
    <div className={'w-8 rounded-full text-center uppercase'+ color}>
      {userName[0]}
    </div>
  );
};

export default Avatar;
