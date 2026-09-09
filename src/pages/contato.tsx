import { useState } from "react";
import { useForm } from "react-hook-form";
import { Secao } from "../components/ui/secao";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Botao } from "../components/ui/botao";
import { CampoErro } from "../components/ui/campo-erro";
import { CabecalhoPagina } from "../components/ui/cabecalho-pagina";

// Tipagem do formulario: o useForm e generico e valida os campos contra ela.
type FormularioContato = {
  nome: string;
  email: string;
  mensagem: string;
};

const BASE_CAMPO =
  "mt-2 w-full rounded-card border-[1.5px] bg-white px-4 py-3 transition focus:border-soul-500 focus:outline-none";

const CLASSES_LABEL = "block text-sm font-bold text-soul-900";

export function Contato() {
  const [enviadoPara, setEnviadoPara] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormularioContato>({ mode: "onBlur" });

  function enviar(dados: FormularioContato) {
    // Sem API nesta Sprint: confirmamos na tela e limpamos o formulario.
    setEnviadoPara(dados.nome.split(" ")[0]);
    reset();
  }

  return (
    <>
      <CabecalhoPagina titulo="Contato" descricao="Dúvidas sobre o resgate? Fale com a gente ou use o assistente virtual da SoulUp." />

      <Secao>
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="font-display text-2xl font-bold text-soul-900">Envie uma mensagem</h2>

            <form onSubmit={handleSubmit(enviar)} noValidate className="mt-6">
              <div className="mb-6">
                <label htmlFor="nome" className={CLASSES_LABEL}>Nome</label>
                <input id="nome" type="text" placeholder="Seu nome completo" aria-invalid={errors.nome ? "true" : "false"} className={BASE_CAMPO + (errors.nome ? " border-erro" : " border-linha")} {...register("nome", { required: "Informe seu nome.", minLength: { value: 3, message: "Informe ao menos 3 caracteres." } })} />
                <CampoErro mensagem={errors.nome?.message} />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className={CLASSES_LABEL}>E-mail</label>
                <input id="email" type="email" placeholder="voce@email.com" aria-invalid={errors.email ? "true" : "false"} className={BASE_CAMPO + (errors.email ? " border-erro" : " border-linha")} {...register("email", { required: "Informe seu e-mail.", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: "E-mail inválido." } })} />
                <CampoErro mensagem={errors.email?.message} />
              </div>

              <div className="mb-6">
                <label htmlFor="mensagem" className={CLASSES_LABEL}>Mensagem</label>
                <textarea id="mensagem" placeholder="Como podemos ajudar?" aria-invalid={errors.mensagem ? "true" : "false"} className={BASE_CAMPO + " min-h-[130px] resize-y" + (errors.mensagem ? " border-erro" : " border-linha")} {...register("mensagem", { required: "Escreva sua mensagem.", minLength: { value: 10, message: "Mensagem muito curta (mín. 10 caracteres)." } })} />
                <CampoErro mensagem={errors.mensagem?.message} />
              </div>

              <Botao type="submit" variante="primario" bloco>Enviar mensagem</Botao>

              {enviadoPara && (
                <p role="status" aria-live="polite" className="mt-6 rounded-card bg-soul-100 p-4 text-sm text-soul-700">
                  Mensagem enviada, {enviadoPara}! Nossa equipe Mobilidade Verde responde em até 48h.
                </p>
              )}
            </form>
          </Card>

          <Card>
            <Badge tom="soul">Assistente virtual</Badge>
            <h2 className="font-display mt-3 text-2xl font-bold text-soul-900">Fale com o chatbot SoulUp</h2>
            <p className="mt-6 text-grafite-700">
              O assistente Mobilidade Verde (IBM Watson Assistant) tira dúvidas sobre saldo, operadoras e uso do cupom — integrado por Webchat e Telegram.
            </p>
            <div className="mt-6 rounded-grande border border-linha bg-soul-100 p-8 shadow-suave">
              <p className="font-display font-bold text-soul-900">🤖 Chatbot Mobilidade Verde</p>
              <p className="mt-1.5 text-sm text-grafite-700">
                Espaço reservado para o Webchat do Watson Assistant (entrega da disciplina de IA &amp; Chatbot).
              </p>
              <Botao variante="fantasma" className="mt-6" disabled>Abrir assistente (em breve)</Botao>
            </div>
          </Card>
        </div>
      </Secao>
    </>
  );
}
