import MoltCard from '@/components/MoltCard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-950">
      <div className="w-full flex justify-center">
        <MoltCard />
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-slate-500 text-sm animate-pulse">
          手機預覽測試中 · 避開藍紫漸變配色
        </p>
      </div>
    </main>
  );
}
