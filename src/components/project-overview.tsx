import Image from 'next/image';

export const ProjectOverview = () => {
  return (
    <div className="flex flex-col items-center justify-end">
      <Image
        priority
        className="mb-8 rounded-full shadow-2xl"
        src="/turso-vector-search.webp"
        alt="Logo"
        width={200}
        height={200}
      />
      <h1 className="mb-4 text-xl font-semibold sm:text-2xl">How can I help you today?</h1>
    </div>
  );
};
