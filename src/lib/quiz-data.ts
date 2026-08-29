export type Choice = "a" | "b" | "c" | "d";

export type MCQ = {
  id: number;
  topic: string;
  question: string;
  options: Record<Choice, string>;
  answer: Choice;
  explanation: string;
};

export type Essay = {
  id: number;
  topic: string;
  prompt: string;
  hint: string;
  keywords: string[];
  sample: string;
};

export const MCQ_QUESTIONS: MCQ[] = [
  {
    id: 1,
    topic: "Vocabulary",
    question: "The doctor works in a ....",
    options: { a: "library", b: "hospital", c: "bakery", d: "garage" },
    answer: "b",
    explanation:
      "Dokter bekerja di rumah sakit (hospital). Library = perpustakaan, bakery = toko roti, garage = garasi.",
  },
  {
    id: 2,
    topic: "Vocabulary",
    question: "My father is very .... He never gets angry easily.",
    options: { a: "patient", b: "lazy", c: "noisy", d: "dirty" },
    answer: "a",
    explanation:
      "'Never gets angry easily' (tidak mudah marah) berarti sabar = patient. Lazy = malas, noisy = berisik, dirty = kotor.",
  },
  {
    id: 3,
    topic: "Vocabulary",
    question: "The opposite of 'expensive' is ....",
    options: { a: "rich", b: "large", c: "cheap", d: "heavy" },
    answer: "c",
    explanation:
      "Lawan kata 'expensive' (mahal) adalah 'cheap' (murah). Rich = kaya, large = besar, heavy = berat.",
  },
  {
    id: 4,
    topic: "Vocabulary",
    question: "We use a .... to cut the paper.",
    options: { a: "spoon", b: "ruler", c: "broom", d: "pair of scissors" },
    answer: "d",
    explanation:
      "Kita memakai gunting (a pair of scissors) untuk memotong kertas. Spoon = sendok, ruler = penggaris, broom = sapu.",
  },
  {
    id: 5,
    topic: "Grammar",
    question: "Rina and I .... students of SD Nusantara.",
    options: { a: "am", b: "is", c: "are", d: "be" },
    answer: "c",
    explanation:
      "Subjek 'Rina and I' = 'we' (jamak), jadi to be yang tepat adalah 'are'. 'Am' hanya untuk I, 'is' untuk tunggal.",
  },
  {
    id: 6,
    topic: "Grammar",
    question: "There .... many books on the shelf.",
    options: { a: "is", b: "are", c: "was", d: "am" },
    answer: "b",
    explanation: "'Many books' bersifat jamak (plural), sehingga digunakan 'there are'.",
  },
  {
    id: 7,
    topic: "Grammar",
    question: "Choose the correct sentence!",
    options: {
      a: "She go to school every day.",
      b: "She goes to school every day.",
      c: "She going to school every day.",
      d: "She gone to school every day.",
    },
    answer: "b",
    explanation:
      "Simple Present Tense: subjek orang ketiga tunggal (she/he/it) mendapat kata kerja + s/es → 'She goes'.",
  },
  {
    id: 8,
    topic: "Grammar",
    question: "The cat is sleeping .... the table.",
    options: { a: "under", b: "of", c: "and", d: "but" },
    answer: "a",
    explanation:
      "Dibutuhkan preposisi tempat; 'under the table' = di bawah meja. 'Of', 'and', dan 'but' bukan preposisi tempat.",
  },
  {
    id: 9,
    topic: "Tenses",
    question: "Look! The children .... football in the yard now.",
    options: { a: "play", b: "played", c: "are playing", d: "have play" },
    answer: "c",
    explanation:
      "Kata 'Look!' dan 'now' menandakan Present Continuous Tense: to be + V-ing → 'are playing'.",
  },
  {
    id: 10,
    topic: "Tenses",
    question: "Yesterday, we .... to the zoo with our teacher.",
    options: { a: "go", b: "goes", c: "going", d: "went" },
    answer: "d",
    explanation:
      "'Yesterday' menandakan Simple Past Tense; bentuk lampau (V2) dari 'go' adalah 'went'.",
  },
  {
    id: 11,
    topic: "Tenses",
    question: "My mother .... the floor every morning.",
    options: { a: "sweeps", b: "sweep", c: "swept", d: "sweeping" },
    answer: "a",
    explanation:
      "'Every morning' = kebiasaan (Simple Present). Subjek 'my mother' (she) memakai V1+s → 'sweeps'.",
  },
  {
    id: 12,
    topic: "Tenses",
    question: "I .... my homework last night.",
    options: { a: "do", b: "did", c: "does", d: "doing" },
    answer: "b",
    explanation:
      "'Last night' menandakan Simple Past Tense; bentuk lampau dari 'do' adalah 'did'.",
  },
  {
    id: 13,
    topic: "Tenses",
    question: "They .... a movie in the living room at the moment.",
    options: { a: "watch", b: "watched", c: "watches", d: "are watching" },
    answer: "d",
    explanation:
      "'At the moment' = sedang berlangsung sekarang → Present Continuous: 'are watching'.",
  },
  {
    id: 14,
    topic: "Pronouns",
    question: "Andi is my brother. .... is ten years old.",
    options: { a: "She", b: "He", c: "It", d: "They" },
    answer: "b",
    explanation:
      "Andi adalah laki-laki (brother), kata ganti subjeknya adalah 'He'. She = perempuan, It = benda/hewan.",
  },
  {
    id: 15,
    topic: "Pronouns",
    question: "This book is mine. Please give it to ....",
    options: { a: "I", b: "my", c: "me", d: "mine" },
    answer: "c",
    explanation:
      "Setelah preposisi 'to' dipakai object pronoun; bentuk objek dari 'I' adalah 'me'.",
  },
  {
    id: 16,
    topic: "Pronouns",
    question: "Sinta and Dewi are sisters. .... house is near the market.",
    options: { a: "Their", b: "Them", c: "They", d: "Theirs" },
    answer: "a",
    explanation:
      "Dibutuhkan possessive adjective sebelum kata benda 'house'; milik mereka = 'their'.",
  },
  {
    id: 17,
    topic: "Pronouns",
    question: "Look at the bird! .... wings are beautiful.",
    options: { a: "His", b: "Her", c: "Its", d: "Our" },
    answer: "c",
    explanation:
      "Burung adalah hewan, kata ganti kepemilikannya adalah 'its'. His = milik laki-laki, Her = milik perempuan.",
  },
  {
    id: 18,
    topic: "Modals",
    question: "You .... wash your hands before eating.",
    options: { a: "should", b: "shall not", c: "may not", d: "would" },
    answer: "a",
    explanation:
      "Mencuci tangan sebelum makan adalah nasihat/saran → gunakan 'should' (sebaiknya).",
  },
  {
    id: 19,
    topic: "Modals",
    question: "Birds .... fly, but fish cannot.",
    options: { a: "must", b: "can", c: "should", d: "may not" },
    answer: "b",
    explanation:
      "Menyatakan kemampuan (ability) → gunakan 'can'. Burung bisa terbang, ikan tidak bisa.",
  },
  {
    id: 20,
    topic: "Modals",
    question: "Students .... not come late to school.",
    options: { a: "can", b: "will", c: "must", d: "may" },
    answer: "c",
    explanation:
      "Aturan/larangan tegas memakai 'must not' (tidak boleh). Siswa tidak boleh datang terlambat.",
  },
  {
    id: 21,
    topic: "Modals",
    question: '".... you help me carry this box, please?"',
    options: { a: "Could", b: "Did", c: "Was", d: "Am" },
    answer: "a",
    explanation:
      "Permintaan tolong yang sopan (polite request) diawali 'Could you ...?'.",
  },
  {
    id: 22,
    topic: "Reading",
    question:
      "Read: 'Every Sunday, Bima and his family clean the garden. Bima waters the flowers while his father cuts the grass.' What does Bima do?",
    options: {
      a: "He cuts the grass.",
      b: "He waters the flowers.",
      c: "He sweeps the floor.",
      d: "He plants the trees.",
    },
    answer: "b",
    explanation:
      "Teks menyebutkan 'Bima waters the flowers' = Bima menyiram bunga. Ayahnya yang memotong rumput.",
  },
  {
    id: 23,
    topic: "Reading",
    question:
      "Read: 'Every Sunday, Bima and his family clean the garden.' When do they clean the garden?",
    options: { a: "On Monday", b: "On Friday", c: "On Sunday", d: "Every night" },
    answer: "c",
    explanation: "Kalimat pertama jelas menyebut 'Every Sunday' = setiap hari Minggu.",
  },
  {
    id: 24,
    topic: "Descriptive Text",
    question:
      "Read: 'My rabbit is small. It has soft white fur and long ears. It likes eating carrots.' What is the text about?",
    options: { a: "A cat", b: "A rabbit", c: "A carrot", d: "A farm" },
    answer: "b",
    explanation:
      "Seluruh kalimat mendeskripsikan kelinci (rabbit): ukuran, bulu, telinga, dan makanannya.",
  },
  {
    id: 25,
    topic: "Descriptive Text",
    question: "From the text above, the rabbit's fur is ....",
    options: { a: "hard and black", b: "soft and white", c: "long and grey", d: "short and brown" },
    answer: "b",
    explanation: "Teks menyebut 'soft white fur' = bulu yang lembut dan putih.",
  },
  {
    id: 26,
    topic: "Descriptive Text",
    question: "Which sentence describes a person's appearance?",
    options: {
      a: "He goes to school by bus.",
      b: "He has curly hair and a round face.",
      c: "He played football yesterday.",
      d: "He will study tonight.",
    },
    answer: "b",
    explanation:
      "'Curly hair and a round face' (rambut keriting dan wajah bulat) adalah ciri penampilan fisik seseorang.",
  },
  {
    id: 27,
    topic: "Narrative Text",
    question:
      "Read: 'Once upon a time, a clever mouse deer was trapped in a hole. A wise elephant helped him get out.' Who helped the mouse deer?",
    options: { a: "A tiger", b: "A farmer", c: "An elephant", d: "A crocodile" },
    answer: "c",
    explanation:
      "Teks menyebut 'A wise elephant helped him' = seekor gajah bijaksana yang menolong kancil.",
  },
  {
    id: 28,
    topic: "Narrative Text",
    question: "The story above usually begins with the phrase ....",
    options: { a: "Once upon a time", b: "First of all", c: "In conclusion", d: "Dear friend" },
    answer: "a",
    explanation:
      "Cerita naratif (dongeng) khas diawali 'Once upon a time' (pada zaman dahulu kala).",
  },
  {
    id: 29,
    topic: "Functional Text",
    question: "'NO PARKING' — This sign means we may not .... in that area.",
    options: { a: "walk", b: "park our vehicle", c: "take a photo", d: "sit down" },
    answer: "b",
    explanation:
      "Rambu 'NO PARKING' berarti dilarang memarkir kendaraan di area tersebut.",
  },
  {
    id: 30,
    topic: "Functional Text",
    question:
      "Announcement: 'The flag ceremony will be held on Monday at 07.00 a.m. in the school yard.' Where will the ceremony be held?",
    options: {
      a: "In the classroom",
      b: "In the library",
      c: "In the school yard",
      d: "At the market",
    },
    answer: "c",
    explanation:
      "Pengumuman menyebutkan upacara diadakan 'in the school yard' = di halaman sekolah.",
  },
];

export const ESSAY_QUESTIONS: Essay[] = [
  {
    id: 31,
    topic: "Writing Basics",
    prompt:
      "Arrange these words into a good sentence: 'to - school - every - Rani - goes - day'. Write your full sentence!",
    hint: "Tulis satu kalimat lengkap dengan huruf kapital dan tanda titik.",
    keywords: ["rani", "goes", "to", "school", "every", "day"],
    sample: "Rani goes to school every day.",
  },
  {
    id: 32,
    topic: "Descriptive Text",
    prompt:
      "Write 2-3 sentences describing your best friend (name, appearance, and one thing he/she likes).",
    hint: "Gunakan Present Tense, contoh: 'My best friend is ... He has ... He likes ...'",
    keywords: ["friend", "is", "has", "likes", "he", "she", "my"],
    sample: "My best friend is Dika. He has short black hair and a friendly smile. He likes playing football.",
  },
];

export const QUIZ_DURATION_SECONDS = 20 * 60;

/** Auto-scoring uraian: maksimal 10 poin per soal berdasarkan kata kunci + kelengkapan. */
export function scoreEssay(essay: Essay, answer: string): number {
  const text = answer.toLowerCase().trim();
  if (text.length < 3) return 0;
  const words = text.replace(/[^a-z\s']/g, " ").split(/\s+/).filter(Boolean);
  const hits = essay.keywords.filter((k) => words.includes(k)).length;
  let score = (hits / essay.keywords.length) * 8;
  if (words.length >= (essay.id === 31 ? 5 : 10)) score += 1;
  if (/^[A-Z]/.test(answer.trim()) && /[.!?]$/.test(answer.trim())) score += 1;
  return Math.max(0, Math.min(10, Math.round(score)));
}
