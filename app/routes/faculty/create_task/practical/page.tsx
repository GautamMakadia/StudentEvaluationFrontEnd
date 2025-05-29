import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import Heading from "~/components/heading/heading";
import Input from "~/components/input/input";
import style from "../page.module.css";

interface Criteria {
    id: number;
    desc: string;
    minimum?: number;
    maximum: number;
    strict: boolean;
}

interface PracticalContent {
    criteria: Criteria[];
}

interface OutletContext {
    content: PracticalContent;
    onChange: (content: PracticalContent) => void;
    taskType: string;
}

export default function PracticalForm() {
    const { content, onChange, taskType }: OutletContext = useOutletContext();
    const [criteria, setCriteria] = useState<Criteria[]>(content.criteria || []);
    const [newCriterion, setNewCriterion] = useState<Omit<Criteria, "id">>({
        desc: "",
        maximum: 0,
        strict: false,
    });

    useEffect(() => {
        onChange({ criteria: criteria })
    }, [criteria])

    const handleAdd = () => {
        if (!newCriterion.desc || newCriterion.maximum <= 0) return;

        const newId = criteria.length + 1;
        const newEntry: Criteria = {
            id: newId,
            ...newCriterion,
        };

        setCriteria((prev) => [...prev, newEntry]);
        setNewCriterion({ desc: "", maximum: 0, strict: false, minimum: undefined }); // Reset the input fields
        document.getElementById("description")?.focus(); // Focus back on the description input
        document.getElementById("maximum")?.blur(); // Remove focus from the maximum input
        document.getElementById("minimum")?.blur(); // Remove focus from the minimum input
        document.getElementById("strict")?.blur(); // Remove focus from the strict checkbox
        document.getElementById("add_ct_button")?.blur(); // Remove focus from the add button
    };

    const handleRemove = (id: number) => {
        setCriteria((prev) => prev.filter((c) => c.id !== id));
    };

    return (
        <>
            <div className={style.practical_inputs}>
                <Heading id="practical-heading" title="Add Practical Criteria" />


                <div className={style.input_group}>
                    <label htmlFor="description" className={style.input_label}>Description:</label>
                    <input type="text" name="description" id="description" value={newCriterion.desc}
                        className={style.input}
                        placeholder="Enter criterion description"
                        onChange={(e) => setNewCriterion({ ...newCriterion, desc: e.target.value })} />
                </div>

                <div className={style.input_group}>
                    <label htmlFor="maximum" className={style.input_label}>Maximum Marks:</label>
                    <input type="number" name="maximum" id="maximum" value={newCriterion.maximum}
                        className={style.input}
                        placeholder="Enter maximum marks"
                        onChange={(e) => setNewCriterion({ ...newCriterion, maximum: parseInt(e.target.value) })} />
                </div>

                <div className={style.input_group}>
                    <label htmlFor="minimum" className={style.input_label}>Minimum Marks (optional):</label>
                    <input type="number" name="minimum" id="minimum" value={newCriterion.minimum ?? ""}
                        className={style.input}
                        placeholder="Enter minimum marks"
                        onChange={(e) => setNewCriterion({ ...newCriterion, minimum: e.target.value ? parseInt(e.target.value) : 0 })} />
                </div>

                <div className={style.checkbox_grinput_group}>
                    <label htmlFor="strict" className={style.input_label}>Is it compulsory to attend?</label>
                    <input
                        id="strict"
                        type="checkbox"
                        name="strict"
                        className={style.checkbox}
                        checked={newCriterion.strict}
                        onChange={(e) => setNewCriterion({ ...newCriterion, strict: e.target.checked })}
                    />
                </div>

                <button
                    id={style.add_ct_button}
                    type="button"
                    onClick={handleAdd}>
                    Add Criteria
                </button>
            </div>

            <div className={style.criterion_container}>
                {criteria.map((c) => (
                    <div key={c.id} className={style.criterion_item}>
                        <h4 className="font-semibold text-ellipsis">{c.id}: {c.desc}</h4>
                        <p>Max: {c.maximum}</p>
                        {c.minimum !== undefined && <p>Min: {c.minimum}</p>}
                        <p>Strict: {c.strict ? "Yes" : "No"}</p>
                        <button
                            type="button"
                            onClick={() => handleRemove(c.id)}
                            className="absolute top-1 right-2 text-sm text-red-600 hover:underline"
                        >
                            Remove
                        </button>
                    </div>
                ))}

            </div>
        </>
    );
}
