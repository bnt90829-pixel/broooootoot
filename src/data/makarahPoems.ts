import { Poem } from '../types';
import { NEW_MAKARAH_POEMS } from './newMakarahPoems';
import { SURREAL_MAKARAH_PHRASES } from './surrealMakarahPhrases';

const BASE_MAKARAH_POEMS: Poem[] = [
  {
    id: 'makarah-1',
    title: 'لمشة حاشية',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 1,
    symbol: 'dress',
    excerpt: 'ذكيةٌ.. كلما رأتني معكر المزاج، ارتدت أقصر فساتينها، فتُسقط حربي بلمشة حاشية.',
    stanzas: [
      'ذكيةٌ.. كلما رأتني معكر المزاج، ارتدت أقصر فساتينها، فتُسقط حربي بلمشة حاشية.'
    ],
  },
  {
    id: 'makarah-2',
    title: 'نقطة ضعفي',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 2,
    symbol: 'whisper',
    excerpt: 'تدرك نقطة ضعفي تماماً، فكلما ارتفع صوتُ غضبي، اقتربت وهمست في أذني: "أتُغاضِبُ من تعشقُك؟"',
    stanzas: [
      'تدرك نقطة ضعفي تماماً، فكلما ارتفع صوتُ غضبي، اقتربت وهمست في أذني: "أتُغاضِبُ من تعشقُك؟"'
    ],
  },
  {
    id: 'makarah-3',
    title: 'سواد الشعر',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 3,
    symbol: 'hair',
    excerpt: 'إذا رأت الغيم يملأ وجهي، جلست قبالتي، وفكت عقود شعرها على كتفيها، ليغرق زعلي في سواده.',
    stanzas: [
      'إذا رأت الغيم يملأ وجهي، جلست قبالتي، وفكت عقود شعرها على كتفيها، ليغرق زعلي في سواده.'
    ],
  },
  {
    id: 'makarah-4',
    title: 'مكارةٌ هي',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 4,
    symbol: 'sparkle',
    excerpt: 'مكارةٌ هي.. تعلم أن عيني تصوم عن كل شيء إلا عن جمالها، فإذا رأتني ضائق الصدر، ابتسمت على مهل لتعيد أشرعتي.',
    stanzas: [
      'مكارةٌ هي.. تعلم أن عيني تصوم عن كل شيء إلا عن جمالها، فإذا رأتني ضائق الصدر، ابتسمت على مهل لتعيد أشرعتي.'
    ],
  },
  {
    id: 'makarah-5',
    title: 'عطر الخصام',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 5,
    symbol: 'perfume',
    excerpt: 'كلما حاولتُ أن أقسو عليها ونويتُ الخصام، أتتني بعطرها الذي أحب، فتُنسيني ما جئتُ أعاقبها عليه.',
    stanzas: [
      'كلما حاولتُ أن أقسو عليها ونويتُ الخصام، أتتني بعطرها الذي أحب، فتُنسيني ما جئتُ أعاقبها عليه.'
    ],
  },
  {
    id: 'makarah-6',
    title: 'أما زلت تحبني؟',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 6,
    symbol: 'hand',
    excerpt: 'تغير موضوع الحديثِ بذكاء، حين تراني غاضباً، تضع يدها الدافئة في يدي وتقول: "أما زلت تحبني؟"',
    stanzas: [
      'تغير موضوع الحديثِ بذكاء، حين تراني غاضباً، تضع يدها الدافئة في يدي وتقول: "أما زلت تحبني؟"'
    ],
  },
  {
    id: 'makarah-7',
    title: 'طرف خفي',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 7,
    symbol: 'eyes',
    excerpt: 'تعرف كيف تشتت تركيزي، تنظر في عيني بطرف خفي، وتسأل عن شيء لا أهمية له، فأنسى القضية والخصام.',
    stanzas: [
      'تعرف كيف تشتت تركيزي، تنظر في عيني بطرف خفي، وتسأل عن شيء لا أهمية له، فأنسى القضية والخصام.'
    ],
  },
  {
    id: 'makarah-8',
    title: 'دمعة الاعتذار',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 8,
    symbol: 'tears',
    excerpt: 'حين تفشل كل حججها، تستعين بدمعة دافئة على خدها، فتتحول من متهمةٍ إلى قاضٍ يحكم عليّ بالاعتذار.',
    stanzas: [
      'حين تفشل كل حججها، تستعين بدمعة دافئة على خدها، فتتحول من متهمةٍ إلى قاضٍ يحكم عليّ بالاعتذار.'
    ],
  },
  {
    id: 'makarah-9',
    title: 'كحل العيون',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 9,
    symbol: 'kohl',
    excerpt: 'تضع الكحل في عينيها، لا لتتجمل، بل لتجعل كلامها الصامت أكثر بلاغةً وأشدّ تأثيراً.',
    stanzas: [
      'تضع الكحل في عينيها، لا لتتجمل، بل لتجعل كلامها الصامت أكثر بلاغةً وأشدّ تأثيراً.'
    ],
  },
  {
    id: 'makarah-10',
    title: 'ابتسامة الاستسلام',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 10,
    symbol: 'smile',
    excerpt: 'إذا أردتُ أن أخاصمها، سبقتني بابتسامة صغيرة، فتتساقط أسلحتي كلها وتعلنُ روحي الاستسلام.',
    stanzas: [
      'إذا أردتُ أن أخاصمها، سبقتني بابتسامة صغيرة، فتتساقط أسلحتي كلها وتعلنُ روحي الاستسلام.'
    ],
  },
  {
    id: 'makarah-11',
    title: 'تكرار الغزل',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 11,
    symbol: 'repetition',
    excerpt: 'تتظاهر بعدم الفهم، حين يطول عتابي، لتجبرني على تكرار الغزل بدلاً من إعادة الاتهام.',
    stanzas: [
      'تتظاهر بعدم الفهم، حين يطول عتابي، لتجبرني على تكرار الغزل بدلاً من إعادة الاتهام.'
    ],
  },
  {
    id: 'makarah-12',
    title: 'سكن وراحة',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 12,
    symbol: 'colors',
    excerpt: 'تلبس الأحمر في أيامي الساطعة، وتلبس الأسود حين تراني متعباً، فتكون لي في الأولى عيداً، وفي الثانية سكناً وراحة.',
    stanzas: [
      'تلبس الأحمر في أيامي الساطعة، وتلبس الأسود حين تراني متعباً، فتكون لي في الأولى عيداً، وفي الثانية سكناً وراحة.'
    ],
  },
  {
    id: 'makarah-13',
    title: 'سلطان الدلال',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 13,
    symbol: 'wink',
    excerpt: 'ما خاطبتني بالمنطق قط، بل بالدلال والغمزة اللطيفة، فتثبت دائماً أن المنطق أمام جمالها لا يصمد كثيراً.',
    stanzas: [
      'ما خاطبتني بالمنطق قط، بل بالدلال والغمزة اللطيفة، فتثبت دائماً أن المنطق أمام جمالها لا يصمد كثيراً.'
    ],
  },
  {
    id: 'makarah-14',
    title: 'برودة الجو',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 14,
    symbol: 'cold',
    excerpt: 'إذا انشغلتُ عنها بأوراقي، جلست بقربي تفرك كفيها، وتشكو من برودة الجو.. كي أضم يديها وأترك أوراقي.',
    stanzas: [
      'إذا انشغلتُ عنها بأوراقي، جلست بقربي تفرك كفيها، وتشكو من برودة الجو.. كي أضم يديها وأترك أوراقي.'
    ],
  },
  {
    id: 'makarah-15',
    title: 'خطوة ساحرة',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 15,
    symbol: 'steps',
    excerpt: 'تعلم أن المشي بجانبها يسحرني، فتتباطأ في خطوتها، كي أطيل النظر في وجهها وأنسى أين كنا نذهب.',
    stanzas: [
      'تعلم أن المشي بجانبها يسحرني، فتتباطأ في خطوتها، كي أطيل النظر في وجهها وأنسى أين كنا نذهب.'
    ],
  },
  {
    id: 'makarah-16',
    title: 'طفلتك العذبة',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 16,
    symbol: 'child',
    excerpt: 'تستعين بطفولتها العذبة، حين ترتكب خطأ صغيراً، فتسألني بعينين بريئتين: "أتبخل على طفلتك بالمسامحة؟"',
    stanzas: [
      'تستعين بطفولتها العذبة، حين ترتكب خطأ صغيراً، فتسألني بعينين بريئتين: "أتبخل على طفلتك بالمسامحة؟"'
    ],
  },
  {
    id: 'makarah-17',
    title: 'عبير المعصم',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 17,
    symbol: 'wrist',
    excerpt: 'تضع العطر على معصميها، ثم تدعي أنها نسيت اسم العطر، وتطلب مني أن أستنشقه كي أذوب في عبيرها عن قرب.',
    stanzas: [
      'تضع العطر على معصميها، ثم تدعي أنها نسيت اسم العطر، وتطلب مني أن أستنشقه كي أذوب في عبيرها عن قرب.'
    ],
  },
  {
    id: 'makarah-18',
    title: 'الشفق الدافئ',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 18,
    symbol: 'lips',
    excerpt: 'تغير حمرة شفاهها، بحسب درجة شغفي، فإذا أردتني أن أستكين، اختارت لون الشفق الدافئ.',
    stanzas: [
      'تغير حمرة شفاهها، بحسب درجة شغفي، فإذا أردتني أن أستكين، اختارت لون الشفق الدافئ.'
    ],
  },
  {
    id: 'makarah-19',
    title: 'إجابات الفكر',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 19,
    symbol: 'forehead',
    excerpt: 'حين أكون مشغول الفكر، تلمس جبهتي بحنان، وتقول: "كل هذا التفكير وأنا أملك كل إجاباتك؟"',
    stanzas: [
      'حين أكون مشغول الفكر، تلمس جبهتي بحنان، وتقول: "كل هذا التفكير وأنا أملك كل إجاباتك؟"'
    ],
  },
  {
    id: 'makarah-20',
    title: 'خطة دفاعية',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 20,
    symbol: 'shield',
    excerpt: 'جمالها ليس استعراضاً، بل خطة دفاعية هجومية، تستخدمها بحكمةٍ ورقة كلما شعرت أن القلب يبتعد.',
    stanzas: [
      'جمالها ليس استعراضاً، بل خطة دفاعية هجومية، تستخدمها بحكمةٍ ورقة كلما شعرت أن القلب يبتعد.'
    ],
  },
  {
    id: 'makarah-21',
    title: 'إرباك اليوم',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 21,
    symbol: 'mirror',
    excerpt: 'تقف أمام المرآة طويلاً، لا لتتزين لي فقط، بل لتتأكد أن سحرها جاهز لإرباك يومي بالكامل.',
    stanzas: [
      'تقف أمام المرآة طويلاً، لا لتتزين لي فقط، بل لتتأكد أن سحرها جاهز لإرباك يومي بالكامل.'
    ],
  },
  {
    id: 'makarah-22',
    title: 'فستان الانبهار',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 22,
    symbol: 'gown',
    excerpt: 'تسألني عن رأيي في فستانها، وهي تعلم أنه يسحرني، فقط لكي تسمع قصيدة جديدة صيغت في لحظة انبهار.',
    stanzas: [
      'تسألني عن رأيي في فستانها، وهي تعلم أنه يسحرني، فقط لكي تسمع قصيدة جديدة صيغت في لحظة انبهار.'
    ],
  },
  {
    id: 'makarah-23',
    title: 'تشتت وضياع',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 23,
    symbol: 'laughter',
    excerpt: 'تضحك بصوت خفيض، حين تراني أضيع في كلامي، وتعرف أنها السبب الأول في تشتت أفكاري وضياعي.',
    stanzas: [
      'تضحك بصوت خفيض، حين تراني أضيع في كلامي، وتعرف أنها السبب الأول في تشتت أفكاري وضياعي.'
    ],
  },
  {
    id: 'makarah-24',
    title: 'أسير الحركة',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 24,
    symbol: 'fingers',
    excerpt: 'تداعب شعرها وهي تتحدث، لتجبر عيني على متابعة أصابعها، فأنسى ما كنا نختلف عليه وأصبح أسيراً لحركتها.',
    stanzas: [
      'تداعب شعرها وهي تتحدث، لتجبر عيني على متابعة أصابعها، فأنسى ما كنا نختلف عليه وأصبح أسيراً لحركتها.'
    ],
  },
  {
    id: 'makarah-25',
    title: 'هزيمة الحب',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 25,
    symbol: 'defeat',
    excerpt: 'إذا رأيتُ في عينيها كبرياءً، علمتُ أن حيلتها القادمة ستكون أشد رقةً وألماً، فأستعد للهزيمة بحب.',
    stanzas: [
      'إذا رأيتُ في عينيها كبرياءً، علمتُ أن حيلتها القادمة ستكون أشد رقةً وألماً، فأستعد للهزيمة بحب.'
    ],
  },
  {
    id: 'makarah-26',
    title: 'الجمال الغاضب',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 26,
    symbol: 'kiss',
    excerpt: 'تتأنق حين نختلف، وتتساءل بعفوية ظاهرية: "هل يبدو هذا الجمال غاضباً؟" فأجيب بالقبلة والتغاضي.',
    stanzas: [
      'تتأنق حين نختلف، وتتساءل بعفوية ظاهرية: "هل يبدو هذا الجمال غاضباً؟" فأجيب بالقبلة والتغاضي.'
    ],
  },
  {
    id: 'makarah-27',
    title: 'الالتفات المفاجئ',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 27,
    symbol: 'turn',
    excerpt: 'تتقن فن الالتفات المفاجئ، لتسقط شعرها على وجهها، ثم تعيده ببطء ساحر يجعل قلبي يسقط مع كل خصلة.',
    stanzas: [
      'تتقن فن الالتفات المفاجئ، لتسقط شعرها على وجهها، ثم تعيده ببطء ساحر يجعل قلبي يسقط مع كل خصلة.'
    ],
  },
  {
    id: 'makarah-28',
    title: 'همسة الصفح',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 28,
    symbol: 'voice',
    excerpt: 'تحدثني بنبرة خافتة، كي أقترب منها أكثر، وفي لحظة القرب تلك تسرق مني وعداً بالصفح.',
    stanzas: [
      'تحدثني بنبرة خافتة، كي أقترب منها أكثر، وفي لحظة القرب تلك تسرق مني وعداً بالصفح.'
    ],
  },
  {
    id: 'makarah-29',
    title: 'شرح الغرق',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 29,
    symbol: 'poetry',
    excerpt: 'تقول إنها لا تفهم شعري، لتجبرني على شرحه بيتاً بيتاً، وفي كل شرحٍ أجدني أغرق في حبها مجدداً.',
    stanzas: [
      'تقول إنها لا تفهم شعري، لتجبرني على شرحه بيتاً بيتاً، وفي كل شرحٍ أجدني أغرق في حبها مجدداً.'
    ],
  },
  {
    id: 'makarah-30',
    title: 'رنة الخلخال',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 30,
    symbol: 'anklet',
    excerpt: 'تترك خلخالها يرن بخفة، حين تمر من أمامي، رسالةٌ غير مكتوبة تقول: "أنا هنا.. فكيف تنشغل؟"',
    stanzas: [
      'تترك خلخالها يرن بخفة، حين تمر من أمامي، رسالةٌ غير مكتوبة تقول: "أنا هنا.. فكيف تنشغل؟"'
    ],
  },
  {
    id: 'makarah-31',
    title: 'حصن ومفاتيح',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 31,
    symbol: 'keys',
    excerpt: 'تضع كفها الصغير في كفي، ثم تقول: "يدك كبيرة ودافئة"، فتشعرني بأنني حصنها الوحيد بينما هي من يملك مفاتيحي.',
    stanzas: [
      'تضع كفها الصغير في كفي، ثم تقول: "يدك كبيرة ودافئة"، فتشعرني بأنني حصنها الوحيد بينما هي من يملك مفاتيحي.'
    ],
  },
  {
    id: 'makarah-32',
    title: 'ذكاء الفتنة',
    category: 'makarah',
    categoryTitle: 'مكارهه؟',
    chapter: 'مكارهه؟',
    pageNumber: 32,
    symbol: 'intelligence',
    excerpt: 'فتنتها ليست في ملامحها فحسب، بل في طريقتها الذكية في استخدام الجمال لحل أصعب الخلافات.',
    stanzas: [
      'فتنتها ليست في ملامحها فحسب، بل في طريقتها الذكية في استخدام الجمال لحل أصعب الخلافات.'
    ],
  },
];

// Newest 48 phrases appear first at the top (حديثاً من الأعلى), followed by original poems and previously appended poems
export const MAKARAH_POEMS: Poem[] = [
  ...SURREAL_MAKARAH_PHRASES,
  ...BASE_MAKARAH_POEMS.map((poem, idx) => ({
    ...poem,
    pageNumber: SURREAL_MAKARAH_PHRASES.length + idx + 1,
  })),
  ...NEW_MAKARAH_POEMS.map((poem, idx) => ({
    ...poem,
    pageNumber: SURREAL_MAKARAH_PHRASES.length + BASE_MAKARAH_POEMS.length + idx + 1,
  })),
];
