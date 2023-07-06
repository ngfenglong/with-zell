const Badge = ({ text, className }) => {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xxxs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 ${className}`}
    >
      {text}
    </span>
  );
};

export default Badge;
