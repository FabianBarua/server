// teams
const brazilianTeams = [
  {
    id: "botafogo",
    name: "Botafogo",
    synonyms: ["Botafogo FR", "Botafogo Futebol e Regatas"],
  },
  {
    id: "palmeiras",
    name: "Palmeiras",
    synonyms: ["Sociedade Esportiva Palmeiras", "Verdão"],
  },
  {
    id: "fortaleza",
    name: "Fortaleza",
    synonyms: ["Fortaleza EC", "Fortaleza Esporte Clube"],
  },
  {
    id: "flamengo",
    name: "Flamengo",
    synonyms: ["Clube de Regatas do Flamengo", "Mengão"],
  },
  {
    id: "internacional",
    name: "Internacional",
    synonyms: ["Sport Club Internacional", "Inter"],
  },
  {
    id: "sao-paulo",
    name: "São Paulo",
    synonyms: ["São Paulo FC", "Tricolor Paulista"],
  },
  {
    id: "cruzeiro",
    name: "Cruzeiro",
    synonyms: ["Cruzeiro EC", "Cruzeiro Esporte Clube"],
  },
  {
    id: "bahia",
    name: "Bahia",
    synonyms: ["Esporte Clube Bahia", "Tricolor de Aço"],
  },
  {
    id: "corinthians",
    name: "Corinthians",
    synonyms: ["Sport Club Corinthians Paulista", "Timão"],
  },
  {
    id: "vasco",
    name: "Vasco",
    synonyms: ["Club de Regatas Vasco da Gama", "Vascão"],
  },
  {
    id: "atletico-mg",
    name: "Atlético-MG",
    synonyms: ["Atlético Mineiro", "Galo"],
  },
  {
    id: "gremio",
    name: "Grêmio",
    synonyms: ["Grêmio FBPA", "Grêmio Foot-Ball Porto Alegrense"],
  },
  {
    id: "vitoria",
    name: "Vitória",
    synonyms: ["Esporte Clube Vitória", "Leão da Barra"],
  },
  {
    id: "athletico-pr",
    name: "Athletico Paranaense",
    synonyms: ["Athletico Paranaense", "Furacão"],
  },
  {
    id: "fluminense",
    name: "Fluminense",
    synonyms: ["Fluminense FC", "Tricolor Carioca"],
  },
  { id: "criciuma", name: "Criciúma", synonyms: ["Criciúma EC", "Tigre"] },
  { id: "juventude", name: "Juventude", synonyms: ["Esporte Clube Juventude"] },
  {
    id: "bragantino",
    name: "Bragantino",
    synonyms: ["Red Bull Bragantino", "Massa Bruta"],
  },
  { id: "cuiaba", name: "Cuiabá", synonyms: ["Cuiabá EC", "Dourado"] },
  {
    id: "atletico-go",
    name: "Atlético-GO",
    synonyms: ["Atlético Goianiense", "Dragão"],
  },
];

const frenchTeams = [
  { id: "psg", name: "PSG", synonyms: [] },
  { id: "monaco", name: "Mônaco", synonyms: [] },
  { id: "olympique-marseille", name: "Olympique Marseille", synonyms: [] },
  { id: "lille", name: "Lille", synonyms: [] },
  { id: "lyon", name: "Lyon", synonyms: [] },
  { id: "nice", name: "Nice", synonyms: [] },
  { id: "reims", name: "Reims", synonyms: [] },
  { id: "lens", name: "Lens", synonyms: [] },
  { id: "auxerre", name: "Auxerre", synonyms: [] },
  { id: "toulouse", name: "Toulouse", synonyms: [] },
  { id: "strasbourg", name: "Strasbourg", synonyms: [] },
  { id: "brest", name: "Brest", synonyms: [] },
  { id: "rennes", name: "Rennes", synonyms: [] },
  { id: "nantes", name: "Nantes", synonyms: [] },
  { id: "angers-sco", name: "Angers SCO", synonyms: [] },
  { id: "saint-etienne", name: "Saint-Étienne", synonyms: [] },
  { id: "le-havre", name: "Le Havre", synonyms: [] },
  { id: "montpellier", name: "Montpellier", synonyms: [] },
];

const spanishTeams = [
  { id: "barcelona", name: "Barcelona", synonyms: [] },
  { id: "real-madrid", name: "Real Madrid", synonyms: ['madrid'] },
  { id: "atletico-madrid", name: "Atlético Madrid", synonyms: [] },
  { id: "villarreal", name: "Villarreal", synonyms: [] },
  { id: "osasuna", name: "Osasuna", synonyms: [] },
  { id: "athletic-bilbao", name: "Athletic Bilbao", synonyms: [] },
  { id: "real-betis", name: "Real Betis", synonyms: [] },
  { id: "real-sociedad", name: "Real Sociedad", synonyms: [] },
  { id: "mallorca", name: "Mallorca", synonyms: [] },
  { id: "girona", name: "Girona", synonyms: [] },
  { id: "celta-de-vigo", name: "Celta de Vigo", synonyms: [] },
  { id: "rayo-vallecano", name: "Rayo Vallecano", synonyms: [] },
  { id: "sevilla", name: "Sevilla", synonyms: [] },
  { id: "leganes", name: "Leganés", synonyms: [] },
  { id: "deportivo-alaves", name: "Deportivo Alavés", synonyms: [] },
  { id: "las-palmas", name: "Las Palmas", synonyms: [] },
  { id: "getafe", name: "Getafe", synonyms: [] },
  { id: "espanyol", name: "Espanyol", synonyms: [] },
  { id: "real-valladolid", name: "Real Valladolid", synonyms: [] },
  { id: "valencia", name: "Valência", synonyms: [] },
];

export const footballTeams = {
  "brasileirao-serie-a": brazilianTeams,
  "campeonato-frances": frenchTeams,
  "campeonato-espanhol": spanishTeams,
};
