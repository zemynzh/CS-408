// 历年真题年份 + 题号配置

export interface QuestionGroup {
  subject: string
  questions: number[]
}

export interface ExamSection {
  section: '选择题' | '解答题'
  groups: QuestionGroup[]
}

export interface ExamConfig {
  year: number
  structure: ExamSection[]
}

export interface ExamYear {
  year: number
  label: string
}

// 2009 ~ 2026，按年份倒序
export const EXAM_YEARS: ExamYear[] = Array.from(
  { length: 2026 - 2009 + 1 },
  (_, i) => {
    const year = 2026 - i
    return { year, label: `${year} 年` }
  }
)

// 选择题结构：所有年份完全固定
const CHOICE_SECTION: ExamSection = {
  section: '选择题',
  groups: [
    { subject: '数据结构', questions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    { subject: '组成原理', questions: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] },
    { subject: '操作系统', questions: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32] },
    { subject: '计算机网络', questions: [33, 34, 35, 36, 37, 38, 39, 40] },
  ],
}

// 解答题常规结构（大多数年份）：DS41-42, CO43-44, OS45-46, CN47
function defaultAnswerSection(ds: number[], co: number[], os: number[], cn: number[]): ExamSection {
  return {
    section: '解答题',
    groups: [
      { subject: '数据结构', questions: ds },
      { subject: '组成原理', questions: co },
      { subject: '操作系统', questions: os },
      { subject: '计算机网络', questions: cn },
    ],
  }
}

export const EXAM_CONFIGS: Record<number, ExamConfig> = {
  // ── 2009：DS41-42, CO43-44, OS45-46, CN47
  2009: {
    year: 2009,
    structure: [
      CHOICE_SECTION,
      defaultAnswerSection([41, 42], [43, 44], [45, 46], [47]),
    ],
  },

  // ── 2010：DS41-42, CO43-44, OS45-46, CN47
  2010: {
    year: 2010,
    structure: [
      CHOICE_SECTION,
      defaultAnswerSection([41, 42], [43, 44], [45, 46], [47]),
    ],
  },

  // ── 2011：DS41-42, CO43-44, OS45-46, CN47
  2011: {
    year: 2011,
    structure: [
      CHOICE_SECTION,
      defaultAnswerSection([41, 42], [43, 44], [45, 46], [47]),
    ],
  },

  // ── 2012：DS41-42, CO43-44, OS45-46, CN47
  2012: {
    year: 2012,
    structure: [
      CHOICE_SECTION,
      defaultAnswerSection([41, 42], [43, 44], [45, 46], [47]),
    ],
  },

  // ── 2013：DS41-42, CO43-44, OS45-46, CN47
  2013: {
    year: 2013,
    structure: [
      CHOICE_SECTION,
      defaultAnswerSection([41, 42], [43, 44], [45, 46], [47]),
    ],
  },

  // ── 2014（特殊）：DS41-42, CN43, CO44-45, OS46-47
  2014: {
    year: 2014,
    structure: [
      CHOICE_SECTION,
      {
        section: '解答题',
        groups: [
          { subject: '数据结构', questions: [41, 42] },
          { subject: '计算机网络', questions: [43] },
          { subject: '组成原理', questions: [44, 45] },
          { subject: '操作系统', questions: [46, 47] },
        ],
      },
    ],
  },

  // ── 2015：DS41-42, CO43-44, OS45-46, CN47
  2015: {
    year: 2015,
    structure: [
      CHOICE_SECTION,
      defaultAnswerSection([41, 42], [43, 44], [45, 46], [47]),
    ],
  },

  // ── 2016（特殊）：CN41, DS42-43, CO44-45, OS46-47
  2016: {
    year: 2016,
    structure: [
      CHOICE_SECTION,
      {
        section: '解答题',
        groups: [
          { subject: '计算机网络', questions: [41] },
          { subject: '数据结构', questions: [42, 43] },
          { subject: '组成原理', questions: [44, 45] },
          { subject: '操作系统', questions: [46, 47] },
        ],
      },
    ],
  },

  // ── 2017：DS41-42, CO43-44, OS45-46, CN47
  2017: {
    year: 2017,
    structure: [
      CHOICE_SECTION,
      defaultAnswerSection([41, 42], [43, 44], [45, 46], [47]),
    ],
  },

  // ── 2018：DS41-42, CO43-44, OS45-46, CN47
  2018: {
    year: 2018,
    structure: [
      CHOICE_SECTION,
      defaultAnswerSection([41, 42], [43, 44], [45, 46], [47]),
    ],
  },

  // ── 2019（特殊）：DS41-42, OS43-44, CO45-46, CN47
  2019: {
    year: 2019,
    structure: [
      CHOICE_SECTION,
      {
        section: '解答题',
        groups: [
          { subject: '数据结构', questions: [41, 42] },
          { subject: '操作系统', questions: [43, 44] },
          { subject: '组成原理', questions: [45, 46] },
          { subject: '计算机网络', questions: [47] },
        ],
      },
    ],
  },

  // ── 2020：DS41-42, CO43-44, OS45-46, CN47
  2020: {
    year: 2020,
    structure: [
      CHOICE_SECTION,
      defaultAnswerSection([41, 42], [43, 44], [45, 46], [47]),
    ],
  },

  // ── 2021：DS41-42, CO43-44, OS45-46, CN47
  2021: {
    year: 2021,
    structure: [
      CHOICE_SECTION,
      defaultAnswerSection([41, 42], [43, 44], [45, 46], [47]),
    ],
  },

  // ── 2022：DS41-42, CO43-44, OS45-46, CN47
  2022: {
    year: 2022,
    structure: [
      CHOICE_SECTION,
      defaultAnswerSection([41, 42], [43, 44], [45, 46], [47]),
    ],
  },

  // ── 2023：DS41-42, CO43-44, OS45-46, CN47
  2023: {
    year: 2023,
    structure: [
      CHOICE_SECTION,
      defaultAnswerSection([41, 42], [43, 44], [45, 46], [47]),
    ],
  },

  // ── 2024：DS41-42, CO43-44, OS45-46, CN47
  2024: {
    year: 2024,
    structure: [
      CHOICE_SECTION,
      defaultAnswerSection([41, 42], [43, 44], [45, 46], [47]),
    ],
  },

  // ── 2025：DS41-42, CO43-44, OS45-46, CN47
  2025: {
    year: 2025,
    structure: [
      CHOICE_SECTION,
      defaultAnswerSection([41, 42], [43, 44], [45, 46], [47]),
    ],
  },

  // ── 2026：DS41-42, CO43-44, OS45-46, CN47
  2026: {
    year: 2026,
    structure: [
      CHOICE_SECTION,
      defaultAnswerSection([41, 42], [43, 44], [45, 46], [47]),
    ],
  },
}
