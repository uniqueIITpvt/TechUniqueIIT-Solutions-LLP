import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => {
  return (
    <div className='flex items-center space-x-2'>
      <Image
        src='/techuniqueiit-new-logo.svg'
        alt='Tech UniqueIIT'
        className='object-contain'
        width={100}
        height={40}
        style={{ height: 'auto' }}
      />
    </div>
  );
};
