interface AvatarProps {
  name: string;
  size?: number;
}

export default function Avatar({ name, size = 64 }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className='flex items-center justify-center bg-indigo-600 text-white rounded-full'
      style={{ width: size, height: size }}
    >
      <span className='text-lg font-medium'>{initials}</span>
    </div>
  );
}
