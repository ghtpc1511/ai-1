export default function PageContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <main className={`max-w-lg mx-auto px-4 pb-24 pt-4 ${className}`}>
      {children}
    </main>
  );
}
