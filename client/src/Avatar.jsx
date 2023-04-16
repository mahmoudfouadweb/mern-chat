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
  return (
    <div className=" w-8 bg-emerald-200 rounded-full text-center uppercase">
      {userName[0]}
    </div>
  );
};

export default Avatar;
