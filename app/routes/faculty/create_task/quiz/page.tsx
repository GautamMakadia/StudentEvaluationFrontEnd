import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import Heading from "~/components/heading/heading";
import Input from "~/components/input/input";
import { UploadFile } from "../file_upload";
import style from "../page.module.css";

interface QuizContent {
    questions_file: string;
    minimum: number;
}

interface OutletContextType {
    content: QuizContent;
    onChange: (updated: QuizContent) => void;
    taskType: string;
}

export default function QuizContent() {
    const { content, onChange, taskType } = useOutletContext<OutletContextType>();
    const [localContent, setLocalContent] = useState<QuizContent>({
        questions_file: content.questions_file || "",
        minimum: content.minimum || 0
    });

    useEffect(() => {
        onChange(localContent);
    }, [localContent]);

    const handleInputChange = (field: keyof QuizContent, value: any) => {
        setLocalContent((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const formData = new FormData();

        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        handleInputChange("questions_file", data.id); // returned file ID
    };

    return (
        <div className={style.quiz_inputs}>
            <Heading id="quiz-heading" title="Quiz Details"  />

            <UploadFile name="question_file" label="Question Excel File" onSuccess={(id:string)=> handleInputChange("questions_file", id)} />

            <div className={style.input_group}>
                <label htmlFor="minimum" className={style.input_label}>Minimum Marks:</label>
                <input type="number" name="minimum" id="minimum" 
                placeholder="Minimum Marks"
                className={style.input} required/>
            </div>
        </div>
    );
}
