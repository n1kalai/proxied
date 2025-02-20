interface BadgeProps {
  content: string | number;
  color?: 'primary' | 'secondary';
}

export const Badge = ({ content, color = 'primary' }: BadgeProps) => {
  const colorClasses = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-white',
  };

  return (
    <div
      className={`absolute -top-2 -right-2 rounded-full px-2 py-1 text-xs font-bold ${colorClasses[color]}`}
    >
      {content}
    </div>
  );
};
