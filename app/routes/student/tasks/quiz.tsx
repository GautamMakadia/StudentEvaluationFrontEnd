import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { api } from "~/conf/url";
import { fetcher } from "~/utils/fetcher";

interface Question {
    Question: string;
    Option: {A: string, B: string, C: string, D: string}
    Ans: string;
}

interface QuizContent {
    questions_file: string;
    minimum: number;
    questions: Question[];
}

interface Task {
    id: string
    type: string
    department: string
    semester: number
    subject: string
    term: number
    tag: string
    supportFile?: string
    title: string
    description: string
    content: QuizContent;
}

function fetchQuiz<T>(id: string) {
    const { data, error, isLoading } = useSWRImmutable<T>(`${api}/task/${id}`, fetcher)

    return {
        task: data,
        error,
        isLoading
    }
}

export default function QuizPage() {
    const {taskId} = useParams()
    const { task, error, isLoading } = fetchQuiz<Task>(taskId!!)
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const handleOptionChange = (qIndex: number, option: string) => {
        setAnswers((prev) => ({ ...prev, [qIndex]: option }));
    };

    if (!task) return <div>Loading quiz...</div>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
            <p className="mb-4">{task.description}</p>

            {task.content.questions.map((q, i) => (
                <div key={i} className="mb-6 border p-4 rounded-lg shadow">
                    <p className="font-semibold">Q{i + 1}. {q.Question}</p>
                    {Object.entries(q.Option).map((opt) => (
                        <label key={opt[0]} className="block">
                            <input
                                type="radio"
                                name={`q${i}`}
                                value={opt}
                                checked={answers[i] === opt[0]}
                                onChange={() => handleOptionChange(i, opt[0])}
                                className="mr-2"
                            />
                            {opt[1]}
                        </label>
                    ))}
                </div>
            ))}

            <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Submit
            </button>
        </div>
    );
}
