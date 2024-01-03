'use client';
import RequestForm from '@/_components/RequestForm';
import ResponseDisplay from '@/_components/ResponseDisplay';

export default function Home() {
  return (
    <main className='h-screen w-screen flex flex-col items-center justify-center p-24'>
      <div className='w-full min-h-full flex flex-row justify-between items-center'>
        <RequestForm />
        <ResponseDisplay />
      </div>
    </main>
  );
}
