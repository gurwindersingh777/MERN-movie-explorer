export default function PageWrapper({ children }) {
  return (
    <div className="flex w-full flex-col gap-10 px-4 py-6 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      {children}
    </div>
  );
}