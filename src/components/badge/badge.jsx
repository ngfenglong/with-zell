const Badge = ({ text, color, className }) => {
  let bgColor;
  switch (color.toLowerCase()) {
    case 'orange':
      bgColor = 'bg-orange-200';
      break;
    case 'blue':
      bgColor = 'bg-blue-200';
      break;
    case 'amber':
      bgColor = 'bg-amber-200';
      break;
    case 'gray':
      bgColor = 'bg-gray-200';
      break;
    case 'red':
      bgColor = 'bg-red-200';
      break;
    case 'yellow':
      bgColor = 'bg-yellow-200';
      break;
    case 'green':
      bgColor = 'bg-green-200';
      break;
    case 'purple':
      bgColor = 'bg-purple-200';
      break;
    case 'pink':
      bgColor = 'bg-pink-200';
      break;
    case 'indigo':
      bgColor = 'bg-indigo-200';
      break;
    case 'teal':
      bgColor = 'bg-teal-200';
      break;
    case 'lime':
      bgColor = 'bg-lime-200';
      break;
    case 'emerald':
      bgColor = 'bg-emerald-200';
      break;
    case 'cyan':
      bgColor = 'bg-cyan-200';
      break;
    case 'lightBlue':
      bgColor = 'bg-lightBlue-200';
      break;
    case 'violet':
      bgColor = 'bg-violet-200';
      break;
    case 'fuchsia':
      bgColor = 'bg-fuchsia-200';
      break;
    case 'rose':
      bgColor = 'bg-rose-200';
      break;
    default:
      bgColor = 'bg-gray-50';
  }

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xxxs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 ${bgColor}`}
    >
      {text}
    </span>
  );
};

export default Badge;
