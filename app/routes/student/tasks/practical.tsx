// PracticalEvaluationPage.tsx
import { useState } from "react";


interface EvaluationResponse {
    learning: string;
    scores: Record<string, number>;
}

// demoPracticalTask.ts
const demoPracticalTask = {
  _id: "665a1f9c45b9a3f9eae1a2c1",
  type: "practical",
  department: "IT",
  semester: 6,
  subject: "Operating Systems",
  term: 2,
  tag: "self-evaluation",
  title: "OS Practical: Process Management",
  description: "Evaluate your understanding and performance on process management practical.",
  content: {
    criteria: [
      {
        id: "CA1",
        desc: "Successfully implemented process scheduling algorithm",
        minimum: 5,
        maximum: 10,
        strict: true
      },
      {
        id: "CA2",
        desc: "Demonstrated use of semaphores for synchronization",
        minimum: 3,
        maximum: 8,
        strict: false
      },
      {
        id: "CA3",
        desc: "Explained theory behind deadlock avoidance",
        maximum: 7,
        strict: true
      }
    ]
  }
};


export default function PracticalEvaluationPage() {
    const [response, setResponse] = useState<EvaluationResponse>({
        learning: "",
        scores: {}
    });

    const task = demoPracticalTask;

    const handleScoreChange = (id: string, value: number) => {
        setResponse((prev) => ({
            ...prev,
            scores: {
                ...prev.scores,
                [id]: value
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Replace with real API call
        console.log("Submitted:", response);
        alert("Self-evaluation submitted!");
    };

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
            <p className="text-gray-600 mb-4">{task.description}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-medium">What did you learn?</label>
                    <textarea
                        rows={5}
                        className="w-full mt-1 p-2 border rounded-md"
                        placeholder="Describe your learning from this practical..."
                        value={response.learning}
                        onChange={(e) =>
                            setResponse((prev) => ({ ...prev, learning: e.target.value }))
                        }
                        required
                    />
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-2">Evaluation Criteria</h2>
                    <div className="space-y-4">
                        {task.content.criteria.map((criterion) => (
                            <div
                                key={criterion.id}
                                className="p-4 border rounded-md flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-medium">{criterion.desc}</p>
                                    <p className="text-sm text-gray-500">
                                        Marks: {criterion.minimum ?? 0}–{criterion.maximum}{" "}
                                        {criterion.strict && "(Strict)"}
                                    </p>
                                </div>
                                <input
                                    type="number"
                                    className="w-24 p-1 border rounded-md text-right"
                                    min={criterion.minimum ?? 0}
                                    max={criterion.maximum}
                                    value={response.scores[criterion.id] ?? ""}
                                    onChange={(e) =>
                                        handleScoreChange(criterion.id, Number(e.target.value))
                                    }
                                    required
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit Evaluation
                </button>
            </form>
        </div>
    );
}
