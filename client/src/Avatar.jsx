const Avatar = ({ userId, userName }) => {
  const colors = [
    'bg-red-400',
    'bg-blue-400',
    'bg-green-400',
    'bg-yellow-400',
    'bg-purple-400',
    'bg-pink-400',
    'bg-indigo-400',
    'bg-teal-400',
    'bg-gray-400',
    'bg-orange-400'
  ];

  const userIdBase10 = parseInt(userId, 16);
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];

  return (
    <div className={'w-8 rounded-full text-center uppercase ' + color}>
      {userName[0]}
    </div>
  );
};

export default Avatar;
