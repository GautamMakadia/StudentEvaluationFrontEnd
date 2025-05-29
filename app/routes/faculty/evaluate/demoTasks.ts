import type { Task } from "../create_task/type";

export const demoTasks: Task[] = [
  {
    id: "t1",
    type: "quiz",
    department: "CSE",
    semester: 4,
    subject: "Data Structures",
    term: 1,
    tag: ["midterm", "MCQ"],
    supportFile: "quiz_ds_2024.pdf",
    title: "Midterm Quiz - Data Structures",
    description: "Quiz assessing knowledge on basic data structures.",
    content: {
      questions_file: "ds_quiz_qs.pdf",
      minimum: 5
    }
  },
  {
    id: "t2",
    type: "practical",
    department: "CSE",
    semester: 4,
    subject: "Operating Systems",
    term: 1,
    tag: ["lab", "evaluation"],
    supportFile: "os_lab_guide.pdf",
    title: "OS Lab Practical Evaluation",
    description: "Evaluate OS concepts through lab tasks.",
    content: {
      criteria: [
        {
          id: 1,
          desc: "Process scheduling simulation",
          maximum: 10,
          strict: true
        },
        {
          id: 2,
          desc: "Memory allocation techniques",
          minimum: 4,
          maximum: 10,
          strict: false
        },
        {
          id: 2,
          desc: "File system interface implementation",
          maximum: 10,
          strict: true
        }
      ]
    }
  },
  {
    id: "t3",
    type: "quiz",
    department: "Electronics",
    semester: 3,
    subject: "Digital Circuits",
    term: 2,
    tag: ["final", "MCQ"],
    title: "Digital Circuits Final Quiz",
    description: "Final quiz on logic gates, flip-flops and counters.",
    content: {
      questions_file: "dc_quiz_final.pdf",
      minimum: 6
    }
  },
  {
    id: "t4",
    type: "practical",
    department: "Information Technology",
    semester: 5,
    subject: "Web Development",
    term: 1,
    tag: ["project", "frontend"],
    supportFile: "webdev_lab_manual.pdf",
    title: "Frontend Project Evaluation",
    description: "Evaluation of frontend project with React.",
    content: {
      criteria: [
        {
          id: 1,
          desc: "UI responsiveness and accessibility",
          maximum: 10,
          strict: true
        },
        {
          id: 2,
          desc: "Code structure and modularity",
          minimum: 5,
          maximum: 10,
          strict: false
        },
        {
          id: 3,
          desc: "State management implementation",
          maximum: 10,
          strict: true
        }
      ]
    }
  }
];

