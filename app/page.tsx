
"use client";

import { useEffect, useState } from "react";

const candidates = [
  "Candidato 1",
  "Candidato 2",
  "Candidato 3",
  "Candidato 4",
  "Candidato 5",
];

const stages = [
  "Abertura e apresentação",
  "Confronto entre candidatos",
  "Debate temático",
  "Perguntas do apresentador",
  "Perguntas populares",
  "Considerações finais",
  "Encerramento",
];

export default function Home() {
  const [tab, setTab] = useState("public");
  const [speaker, setSpeaker] = useState("");
  const [stage, setStage] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState("Aguardando início");
  const [order, setOrder] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [question, setQuestion] = useState("");
  const [poll, setPoll] = useState("");
  const [options, setOptions] = useState(["Sim", "Não"]);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [pollOpen, setPollOpen] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [running]);

  const format = (n: number) =>
    `${Math.floor(n / 60).toString().padStart(2, "0")}:${(n % 60)
      .toString()
      .padStart(2, "0")}`;

  const draw = () => {
    const shuffled = [...candidates].sort(() => Math.random() - 0.5);
    setOrder(shuffled);
  };

  const addQuestion = () => {
    if (!question.trim()) return;
    setQuestions((q) => [...q, question.trim()]);
    setQuestion("");
  };

  const nextStage = () => {
    setStage((s) => Math.min(s + 1, stages.length - 1));
    setSeconds(0);
    setRunning(false);
    setSpeaker("");
  };

  return (
    <main className="min-h-screen bg-[#0c142c] text-white">
      <header className="border-b border-white/10 px-5 py-5 md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-[#d0a424]">
              REALMS • INSTITUCIONAL
            </p>
            <h1 className="mt-1 text-xl font-bold tracking-wide">
              REALMS DEBATE
            </h1>
          </div>
          <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-300">
            {status}
          </span>
        </div>
      </header>

      <nav className="mx-auto flex max-w-6xl gap-2 px-5 pt-6 md:px-10">
        <button onClick={() => setTab("public")}
          className={`rounded-lg px-4 py-3 text-sm ${tab === "public" ? "bg-[#d0a424] font-bold text-[#0c142c]" : "bg-white/5 text-slate-300"}`}>
          Debate público
        </button>
        <button onClick={() => setTab("admin")}
          className={`rounded-lg px-4 py-3 text-sm ${tab === "admin" ? "bg-[#d0a424] font-bold text-[#0c142c]" : "bg-white/5 text-slate-300"}`}>
          Painel do apresentador
        </button>
      </nav>

      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 md:px-10">
        {tab === "public" ? (
          <>
            <section className="rounded-2xl border border-white/10 bg-[#151f3b] p-6 md:p-10">
              <p className="text-xs font-bold tracking-widest text-[#d0a424]">
                TRANSMISSÃO DO DEBATE
              </p>
              <h2 className="mt-3 text-3xl font-bold md:text-5xl">
                Debate Presidencial
              </h2>
              <p className="mt-3 text-slate-400">
                Acompanhe as etapas e manifestações dos candidatos.
              </p>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    Etapa atual
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">
                    {stages[stage]}
                  </h3>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    Tempo da manifestação
                  </p>
                  <p className="mt-1 font-mono text-5xl font-bold text-[#d0a424]">
                    {format(seconds)}
                  </p>
                </div>
              </div>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  Candidato com a palavra
                </p>
                <p className="mt-2 text-2xl font-semibold">
                  {speaker || "Aguardando apresentador"}
                </p>
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#151f3b] p-5">
                <h3 className="font-bold">Ordem dos candidatos</h3>
                <ol className="mt-4 space-y-3">
                  {(order.length ? order : candidates).map((c, i) => (
                    <li key={c} className="flex gap-3 text-slate-300">
                      <span className="text-[#d0a424]">{i + 1}.</span>{c}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#151f3b] p-5">
                <h3 className="font-bold">Enquete do público</h3>
                {pollOpen && poll ? (
                  <>
                    <p className="mt-3 text-slate-300">{poll}</p>
                    <div className="mt-4 space-y-2">
                      {options.map((o) => (
                        <button key={o} onClick={() => setVotes(v => ({...v, [o]: (v[o] || 0) + 1}))}
                          className="w-full rounded-lg border border-white/10 p-3 text-left hover:border-[#d0a424]">
                          {o} <span className="float-right text-[#d0a424]">{votes[o] || 0}</span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="mt-3 text-sm text-slate-400">Nenhuma enquete aberta.</p>
                )}
              </div>
            </section>

            <section className="rounded-xl border border-white/10 bg-[#151f3b] p-5">
              <h3 className="font-bold">Perguntas populares</h3>
              {questions.length === 0 ? (
                <p className="mt-3 text-sm text-slate-400">Nenhuma pergunta enviada.</p>
              ) : questions.map((q, i) => (
                <p key={i} className="mt-3 border-t border-white/10 pt-3 text-slate-300">{q}</p>
              ))}
              <div className="mt-5 flex gap-2">
                <input value={question} onChange={e => setQuestion(e.target.value)}
                  placeholder="Envie uma pergunta..."
                  className="min-w-0 flex-1 rounded-lg bg-[#0c142c] p-3 text-sm outline-none ring-[#d0a424] focus:ring-1"/>
                <button onClick={addQuestion} className="rounded-lg bg-[#d0a424] px-4 font-bold text-[#0c142c]">Enviar</button>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="rounded-xl border border-white/10 bg-[#151f3b] p-6">
              <p className="text-xs font-bold tracking-widest text-[#d0a424]">CENTRAL DE CONTROLE</p>
              <h2 className="mt-2 text-2xl font-bold">Painel do apresentador</h2>
              <p className="mt-2 text-sm text-slate-400">Controle operacional do debate.</p>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#151f3b] p-5">
                <p className="text-xs uppercase text-slate-400">Cronômetro</p>
                <p className="my-5 font-mono text-6xl font-bold text-[#d0a424]">{format(seconds)}</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => {setRunning(true); setStatus("Em andamento");}}
                    className="rounded-lg bg-[#d0a424] px-4 py-3 font-bold text-[#0c142c]">Iniciar</button>
                  <button onClick={() => {setRunning(false); setStatus("Pausado");}}
                    className="rounded-lg bg-white/10 px-4 py-3">Pausar</button>
                  <button onClick={() => {setRunning(false); setSeconds(0); setStatus("Aguardando início");}}
                    className="rounded-lg bg-white/10 px-4 py-3">Zerar</button>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#151f3b] p-5">
                <p className="text-xs uppercase text-slate-400">Controle de fala</p>
                <select value={speaker} onChange={e => setSpeaker(e.target.value)}
                  className="mt-4 w-full rounded-lg bg-[#0c142c] p-3">
                  <option value="">Selecionar candidato</option>
                  {candidates.map(c => <option key={c}>{c}</option>)}
                </select>
                <p className="mt-4 text-sm text-slate-400">Etapa: {stages[stage]}</p>
                <button onClick={nextStage}
                  className="mt-5 w-full rounded-lg border border-[#d0a424] p-3 text-[#d0a424]">
                  Avançar etapa
                </button>
              </div>
            </section>

            <section className="rounded-xl border border-white/10 bg-[#151f3b] p-5">
              <h3 className="font-bold">Sorteio de ordem</h3>
              <button onClick={draw} className="mt-4 rounded-lg bg-[#d0a424] px-5 py-3 font-bold text-[#0c142c]">
                Sortear candidatos
              </button>
              {order.map((c, i) => <p key={c} className="mt-3 text-slate-300">{i + 1}. {c}</p>)}
            </section>

            <section className="rounded-xl border border-white/10 bg-[#151f3b] p-5">
              <h3 className="font-bold">Moderação de perguntas</h3>
              {questions.length ? questions.map((q, i) => (
                <div key={i} className="mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                  <p className="text-sm text-slate-300">{q}</p>
                  <button onClick={() => setQuestions(old => old.filter((_, j) => i !== j))}
                    className="text-xs text-red-300">Remover</button>
                </div>
              )) : <p className="mt-3 text-sm text-slate-400">Fila vazia.</p>}
            </section>

            <section className="rounded-xl border border-white/10 bg-[#151f3b] p-5">
              <h3 className="font-bold">Gerenciar enquete</h3>
              <input value={poll} onChange={e => setPoll(e.target.value)}
                placeholder="Pergunta da enquete"
                className="mt-4 w-full rounded-lg bg-[#0c142c] p-3"/>
              <div className="mt-3 flex gap-2">
                {options.map((o, i) => (
                  <input key={i} value={o} onChange={e => setOptions(old => old.map((v,j) => j === i ? e.target.value : v))}
                    className="min-w-0 w-1/2 rounded-lg bg-[#0c142c] p-3"/>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => setPollOpen(true)} className="rounded-lg bg-[#d0a424] px-4 py-3 font-bold text-[#0c142c]">Abrir enquete</button>
                <button onClick={() => setPollOpen(false)} className="rounded-lg bg-white/10 px-4 py-3">Encerrar</button>
              </div>
            </section>
          </>
        )}
      </div>

      <footer className="border-t border-white/10 px-5 py-6 text-center text-xs text-slate-500">
        REALMS DEBATE • PLATAFORMA DE CONDUÇÃO INSTITUCIONAL
      </footer>
    </main>
  );
}
