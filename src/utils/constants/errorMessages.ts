const mensagensDeErro = [
  "Opa, me distraí vendo memes... o que você disse?",
  "Desculpa, estava contando as nuvens, pode repetir?",
  "Ops, estava preparando um café. Mais uma vez?",
  "Eita, acho que o wi-fi mental falhou. Pode falar de novo?",
  "Até robôs às vezes se enrolam nos fios... me diz de novo?",
  "Opa, tropecei nos circuitos aqui. Pode repetir?",
  "Ixi, fui pegar um café, perdi a mensagem!",
  "Ops! Estava sonhando com bytes... pode repetir?",
  "Errei a tecla! Me manda de novo?",
  "Ai, meu sistema estava no modo soneca! Pode tentar de novo?",
  "Opa, estava procurando o botão certo... me ajuda aqui?",
  "Ops! Estou em modo de férias, pode repetir?",
  "Alguém viu meu processador? Acho que me perdi!",
  "Eita! Atualizei o sistema e perdi a mensagem. Pode enviar de novo?",
  "Achei que era feriado por aqui. Pode falar de novo?",
  "Desculpe, estava cuidando dos circuitos. Pode repetir?",
  "Ups! Estava distraído, vamos tentar de novo?",
  "Ih, deu branco no sistema! Pode repetir?",
  "Não entendi, estava pensando em zeros e uns. Pode tentar de novo?",
  "Ai, parece que tive um erro 404 na cabeça. Me ajuda?",
  "Ixi! Achei que era um comando secreto... pode tentar outra vez?",
  "Ops! Acho que entrei em loop aqui, pode repetir?",
  "Ah, estava em modo zen! Tenta de novo, por favor?",
  "Oops! Peguei uma sonequinha rápida. Me manda outra vez?",
  "Estava pensando em pi, perdi a linha. Pode repetir?",
  "Ixi, algo deu tilt aqui! Tenta de novo, por favor?",
  "Parece que um gatinho atravessou meu teclado. Pode repetir?",
  "Ups, minha antena bugou! Me manda a mensagem de novo?",
  "Achei que era um sinal de SOS. Tenta mais uma vez?",
  "Ops, estava na pausa para o café virtual. Pode repetir?",
  "Tomei um susto aqui! Pode mandar de novo?",
  "Eita, tropecei nos dados. Me manda outra vez?",
  "Desculpa! Estava limpando os circuitos. Vamos de novo?",
  "Acho que pisquei e perdi a mensagem! Pode repetir?",
  "Parece que o universo deu um pulo! Pode tentar de novo?",
  "Ops! Dei um bug ligeiro. Repete aí?",
  "Ai ai, erro de cálculo! Me manda de novo?",
  "Fui pegar um café e perdi tudo! Tenta de novo?",
  "Ops! Buguei por um instante, me manda outra vez?",
  "Ixi, acho que viajei na maionese virtual. Pode repetir?",
  "Eita! Atualizei e perdi a conversa. Vamos de novo?",
  "Opa! Fiquei confuso com tanta informação. Repete?",
  "Oops! Preciso de uma reinicialização... manda de novo?",
  "Ih! Meu sistema está de férias. Pode repetir?",
  "Perdi o foco digital... vamos de novo?",
  "Opa, estava pensando em um cálculo complicado. Pode repetir?",
  "Parece que a nuvem estava cheia! Tenta de novo?",
  "Estava limpando o cache mental, me manda de novo?",
  "Oops, fiquei no modo offline sem querer. Pode repetir?",
  "Pensei que era dia de folga! Manda de novo?",
  "Ixi, entrei em modo de manutenção. Repete, por favor?",
  "Oops! Eu estava sonhando com algoritmos. Pode repetir?",
  "Tava em modo de economia de energia. Pode tentar de novo?",
  "Eu fui contar bytes e perdi a mensagem! Tenta de novo?",
  "Ah não, buguei bonito agora. Repete aí?",
  "Eita, deu um tilt aqui. Me manda de novo?",
  "Ops, atualizei e perdi tudo. Pode repetir?",
  "Estava fazendo backup do cérebro! Pode repetir?",
  "Ih, estava olhando pra lua. Pode mandar de novo?",
  "Parece que minha CPU tirou uma soneca. Tenta de novo?",
  "Meu sistema caiu! Tenta de novo?",
  "Ops! O disco estava cheio. Me manda outra vez?",
  "Ixi, atualizei pra versão 2.0. Pode repetir?",
  "Estava fazendo um reset. Pode tentar outra vez?",
  "Ih, fui atualizar o sistema e perdi. Pode repetir?",
  "Parece que a nuvem passou! Me manda de novo?",
  "Ops, falha no sistema! Pode tentar outra vez?",
  "Errei a conta! Pode repetir?",
  "Desculpe, estava baixando atualizações. Pode tentar de novo?",
  "Acho que fui hackeado por um pensamento! Me manda de novo?",
  "Ops! Me distrai com a barra de progresso. Pode repetir?",
  "Ixi, deu erro de conexão. Vamos de novo?",
  "Opa! Parei pra recalcular a rota. Tenta de novo?",
  "Ih, minha RAM bugou! Repete aí?",
  "Erro 404! Informação não encontrada. Pode mandar de novo?",
  "Ah, fui pro mundo das ideias. Tenta de novo?",
  "Minha antena deu tilt. Me manda de novo?",
  "Ai, perdi o sinal! Pode tentar outra vez?",
  "Oops, meus algoritmos se perderam. Tenta de novo?",
  "Estava em modo avião. Pode repetir?",
  "Ops, pensei que era um sinal secreto. Me manda de novo?",
  "Oops! Buguei por um segundo. Tenta aí?",
  "Ih, tava processando um pensamento pesado. Repete?",
  "Foi mal, minha CPU deu uma piscada. Pode tentar de novo?",
  "Opa! Me perdi no caminho. Vamos de novo?",
  "Desculpa! Estava reiniciando o sistema. Pode tentar?",
  "Oops, estava offline. Pode repetir?",
  "Estava em pausa, mas agora estou aqui! Tenta de novo?",
  "Oops! Estava sonhando com zeros e uns. Pode repetir?",
  "Fui beber água e perdi a mensagem! Tenta de novo?",
  "A conexão caiu aqui. Pode repetir?",
  "Ops! Entrei em manutenção. Pode tentar outra vez?",
  "Estava atualizando a memória... pode mandar de novo?",
  "Desculpa, deu um erro de cálculo. Vamos de novo?",
  "Acho que me perdi na resposta. Pode repetir?",
  "Ops! Preciso de uma nova tentativa. Me manda outra vez?",
  "Desculpe, entrei em modo de economia. Pode tentar de novo?",
  "Parece que o sinal sumiu! Me manda de novo?",
  "Estava recarregando as ideias. Pode repetir?",
  "Ixi, buguei com a última informação! Repete aí?",
];

export const getErrorMessage = () => {
  return mensagensDeErro[Math.floor(Math.random() * mensagensDeErro.length)];
};
