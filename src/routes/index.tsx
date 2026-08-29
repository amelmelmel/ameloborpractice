import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MCQ_QUESTIONS,
  ESSAY_QUESTIONS,
  QUIZ_DURATION_SECONDS,
  scoreEssay,
  type Choice,
} from "@/lib/quiz-data";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const TITLE = "English Quiz Master — Kuis Bahasa Inggris SD Kelas 5-6";
const DESC =
  "Game kuis bahasa Inggris interaktif: 30 soal pilihan ganda dan 2 soal uraian dalam 20 menit, lengkap dengan skor otomatis dan pembahasan.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuizGame,
});

type Stage = "intro" | "playing" | "result";
const LETTERS: Choice[] = ["a", "b", "c", "d"];
const TOTAL = MCQ_QUESTIONS.length + ESSAY_QUESTIONS.length;

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function QuizGame() {
  const [stage, setStage] = useState<Stage>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Choice>>({});
  const [essays, setEssays] = useState<Record<number, string>>({});
  const [left, setLeft] = useState(QUIZ_DURATION_SECONDS);

  const finish = useCallback(() => setStage("result"), []);

  useEffect(() => {
    if (stage !== "playing") return;
    const t = setInterval(() => {
      setLeft((v) => {
        if (v <= 1) {
          clearInterval(t);
          finish();
          return 0;
        }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [stage, finish]);

  const start = () => {
    setAnswers({});
    setEssays({});
    setIndex(0);
    setLeft(QUIZ_DURATION_SECONDS);
    setStage("playing");
  };

  const result = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    let blank = 0;
    for (const q of MCQ_QUESTIONS) {
      const a = answers[q.id];
      if (!a) blank++;
      else if (a === q.answer) correct++;
      else wrong++;
    }
    const mcqScore = correct * 4 - wrong;
    const essayScores = ESSAY_QUESTIONS.map((e) => scoreEssay(e, essays[e.id] ?? ""));
    const essayScore = essayScores.reduce((a, b) => a + b, 0);
    return {
      correct,
      wrong,
      blank,
      mcqScore,
      essayScores,
      essayScore,
      total: mcqScore + essayScore,
      max: MCQ_QUESTIONS.length * 4 + ESSAY_QUESTIONS.length * 10,
    };
  }, [answers, essays]);

  if (stage === "intro") return <Intro onStart={start} />;
  if (stage === "result")
    return <Result result={result} answers={answers} essays={essays} onRestart={start} timeLeft={left} />;

  const isEssay = index >= MCQ_QUESTIONS.length;
  const essay = isEssay ? ESSAY_QUESTIONS[index - MCQ_QUESTIONS.length] : null;
  const mcq = !isEssay ? MCQ_QUESTIONS[index] : null;
  const answeredCount =
    Object.keys(answers).length + Object.values(essays).filter((v) => v.trim().length > 0).length;

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-6">
      <header className="card-quiz mb-5 flex flex-wrap items-center justify-between gap-3 p-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            English Quiz Master
          </p>
          <h1 className="font-display text-xl font-bold">
            Soal {index + 1} <span className="text-muted-foreground">/ {TOTAL}</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="font-bold">
            Terjawab {answeredCount}/{TOTAL}
          </Badge>
          <div
            className={`font-display rounded-xl px-4 py-2 text-lg font-bold tabular-nums ${
              left <= 60 ? "bg-destructive text-destructive-foreground" : "surface-hero"
            }`}
          >
            {fmt(left)}
          </div>
        </div>
      </header>

      <Progress value={((index + 1) / TOTAL) * 100} className="mb-5 h-2" />

      <section className="card-quiz p-5 sm:p-7">
        <Badge className="surface-accent border-0 font-bold">{(mcq ?? essay)!.topic}</Badge>
        <h2 className="mt-4 text-lg leading-relaxed font-semibold sm:text-xl">
          {mcq ? mcq.question : essay!.prompt}
        </h2>

        {mcq ? (
          <div className="mt-6 grid gap-3">
            {LETTERS.map((l) => {
              const picked = answers[mcq.id] === l;
              return (
                <button
                  key={l}
                  onClick={() =>
                    setAnswers((prev) => {
                      const next = { ...prev };
                      if (next[mcq.id] === l) delete next[mcq.id];
                      else next[mcq.id] = l;
                      return next;
                    })
                  }
                  className={`flex items-center gap-4 rounded-2xl border-2 px-4 py-3 text-left transition-all ${
                    picked
                      ? "border-primary bg-secondary shadow-[var(--shadow-pop)]"
                      : "border-border bg-card hover:border-primary/50 hover:bg-muted"
                  }`}
                >
                  <span
                    className={`font-display grid h-9 w-9 shrink-0 place-items-center rounded-xl font-bold uppercase ${
                      picked ? "surface-hero" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {l}
                  </span>
                  <span className="font-medium">{mcq.options[l]}</span>
                </button>
              );
            })}
            <p className="text-xs text-muted-foreground">
              Klik pilihan yang sama untuk mengosongkan jawaban (nilai 0, bukan -1).
            </p>
          </div>
        ) : (
          <div className="mt-6">
            <Textarea
              value={essays[essay!.id] ?? ""}
              onChange={(e) => setEssays((p) => ({ ...p, [essay!.id]: e.target.value }))}
              placeholder="Tulis jawabanmu di sini..."
              className="min-h-40 text-base"
            />
            <p className="mt-2 text-xs text-muted-foreground">{essay!.hint}</p>
          </div>
        )}
      </section>

      <nav className="mt-5 flex items-center justify-between gap-3">
        <Button variant="outline" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
          Sebelumnya
        </Button>
        {index < TOTAL - 1 ? (
          <Button onClick={() => setIndex((i) => i + 1)}>Berikutnya</Button>
        ) : (
          <Button onClick={finish}>Selesai &amp; Lihat Nilai</Button>
        )}
      </nav>

      <div className="card-quiz mt-5 p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Navigasi soal
        </p>
        <div className="grid grid-cols-8 gap-2 sm:grid-cols-11">
          {Array.from({ length: TOTAL }, (_, i) => {
            const id =
              i < MCQ_QUESTIONS.length
                ? MCQ_QUESTIONS[i]!.id
                : ESSAY_QUESTIONS[i - MCQ_QUESTIONS.length]!.id;

            const done =
              i < MCQ_QUESTIONS.length ? !!answers[id] : (essays[id] ?? "").trim().length > 0;
            return (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`font-display h-9 rounded-lg text-sm font-bold transition-colors ${
                  i === index
                    ? "surface-hero"
                    : done
                      ? "bg-success text-success-foreground"
                      : "bg-muted text-muted-foreground hover:bg-secondary"
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
      <Button variant="ghost" className="mt-4 w-full" onClick={finish}>
        Kumpulkan sekarang
      </Button>
    </main>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-4 py-10">
      <div className="card-quiz overflow-hidden">
        <div className="surface-hero px-6 py-10 text-center sm:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.3em] opacity-90">Kategori C · SD/MI Kelas 5-6</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold sm:text-5xl">English Quiz Master</h1>
          <p className="mx-auto mt-3 max-w-md text-sm opacity-95">
            Uji kemampuan bahasa Inggrismu: Vocabulary, Grammar, Tenses, Pronouns, Modals, Reading,
            Descriptive &amp; Narrative Text, Functional Text, dan Writing Basics.
          </p>
        </div>
        <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">
          <Info label="Jumlah Soal" value="30 PG + 2 Uraian" />
          <Info label="Waktu" value="20 Menit" />
          <Info label="Nilai Maksimal" value="140 Poin" />
        </div>
        <div className="border-t border-border bg-muted/50 p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold">Sistem Penilaian</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>✅ Pilihan ganda benar: <b>+4</b></li>
            <li>❌ Pilihan ganda salah: <b>-1</b></li>
            <li>⬜ Tidak diisi: <b>0</b></li>
            <li>✍️ Uraian: maksimal <b>10 poin</b> per soal</li>
          </ul>
          <Button size="lg" className="mt-6 w-full text-base font-bold" onClick={onStart}>
            Mulai Kuis
          </Button>
        </div>
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-display mt-1 text-lg font-bold">{value}</p>
    </div>
  );
}

function Result({
  result,
  answers,
  essays,
  onRestart,
  timeLeft,
}: {
  result: {
    correct: number;
    wrong: number;
    blank: number;
    mcqScore: number;
    essayScores: number[];
    essayScore: number;
    total: number;
    max: number;
  };
  answers: Record<number, Choice>;
  essays: Record<number, string>;
  onRestart: () => void;
  timeLeft: number;
}) {
  const pct = Math.max(0, Math.round((result.total / result.max) * 100));
  const grade =
    pct >= 85 ? "Excellent!" : pct >= 70 ? "Great job!" : pct >= 50 ? "Good effort!" : "Keep practicing!";

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-8">
      <div className="card-quiz overflow-hidden">
        <div className="surface-hero p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] opacity-90">Hasil Akhir</p>
          <p className="font-display mt-2 text-6xl font-extrabold">{result.total}</p>
          <p className="mt-1 text-sm opacity-90">dari {result.max} poin · {pct}%</p>
          <p className="font-display mt-3 text-2xl font-bold">{grade}</p>
          <p className="mt-1 text-xs opacity-80">Sisa waktu: {fmt(timeLeft)}</p>
        </div>
        <div className="grid gap-3 p-6 sm:grid-cols-4">
          <Info label="Benar" value={`${result.correct}`} />
          <Info label="Salah" value={`${result.wrong}`} />
          <Info label="Kosong" value={`${result.blank}`} />
          <Info label="Skor PG" value={`${result.mcqScore}`} />
        </div>
      </div>

      <section className="card-quiz mt-5 p-6">
        <h2 className="font-display text-lg font-bold">Jawaban Uraian ({result.essayScore}/20)</h2>
        {ESSAY_QUESTIONS.map((e, i) => (
          <div key={e.id} className="mt-4 rounded-2xl border border-border p-4">
            <p className="text-sm font-semibold">{e.prompt}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Jawabanmu: {essays[e.id]?.trim() ? essays[e.id] : "(tidak diisi)"}
            </p>
            <p className="mt-2 text-sm">
              <b>Contoh jawaban:</b> {e.sample}
            </p>
            <Badge className="surface-accent mt-3 border-0 font-bold">
              Poin: {result.essayScores[i]}/10
            </Badge>
          </div>
        ))}
      </section>

      <section className="card-quiz mt-5 p-6">
        <h2 className="font-display text-lg font-bold">Pembahasan Pilihan Ganda</h2>
        <div className="mt-4 grid gap-3">
          {MCQ_QUESTIONS.map((q, i) => {
            const a = answers[q.id];
            const ok = a === q.answer;
            return (
              <div
                key={q.id}
                className={`rounded-2xl border-2 p-4 ${
                  !a ? "border-border" : ok ? "border-success" : "border-destructive"
                }`}
              >
                <p className="text-sm font-semibold">
                  {i + 1}. {q.question}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Jawabanmu: {a ? `${a.toUpperCase()}. ${q.options[a]}` : "(kosong)"}
                </p>
                <p className="text-sm">
                  Kunci: <b>{q.answer.toUpperCase()}. {q.options[q.answer]}</b>
                </p>
                <span className="mt-2 inline-block text-xs font-bold">
                  {!a ? "0 poin" : ok ? "+4 poin" : "-1 poin"}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <Button size="lg" className="mt-6 w-full font-bold" onClick={onRestart}>
        Main Lagi
      </Button>
    </main>
  );
}
