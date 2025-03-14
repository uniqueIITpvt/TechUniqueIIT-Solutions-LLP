import BackendConnectionTest from '@/components/BackendConnectionTest';

export default function BackendTestPage() {
  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold text-center mb-8'>
        Backend Connection Test Page
      </h1>
      <BackendConnectionTest />
    </div>
  );
}
