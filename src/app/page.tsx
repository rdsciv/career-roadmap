import { GenerateForm } from "@/components/form/GenerateForm";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-stone-500 mb-3">
          Career Roadmap Generator
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900">
          From where you are to where you&apos;re going.
        </h1>
        <p className="mt-3 text-stone-600">
          Paste your LinkedIn profile and a stated goal. We&apos;ll research the path
          others took, source the comp, and draft a personalized roadmap.
        </p>
      </header>
      <GenerateForm />
    </main>
  );
}
