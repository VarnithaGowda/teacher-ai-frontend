/**
 * QuestionPaper.jsx
 */
import { useState } from 'react'
import { FileText, Loader2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { questionPaperAPI } from '../services/api'

export default function QuestionPaper(){
 const [form, setForm] = useState({

  subject: "",

  grade_level: "3rd Semester",

  exam_type: "Mid Semester",

  difficulty: "intermediate",

  total_marks: 50,

  duration: 90,

  topics: "",

  instructions: "",

  question_types: []

})
 const [loading, setLoading] = useState(false)
 const [generatedPaper, setGeneratedPaper] = useState(null)
 const gradeOptions = [

  "1st Semester",
  "2nd Semester",
  "3rd Semester",
  "4th Semester",
  "5th Semester",
  "6th Semester",
  "7th Semester",
  "8th Semester"

]

const examOptions = [

  "Internal Assessment",
  "Unit Test",
  "Mid Semester",
  "End Semester",
  "Laboratory Examination"

]

const difficultyOptions = [

  {
    label: "Easy",
    value: "easy"
  },

  {
    label: "Medium",
    value: "intermediate"
  },

  {
    label: "Hard",
    value: "advanced"
  }

]

const marksOptions = [

  10,
  20,
  25,
  30,
  40,
  50,
  60,
  75,
  80,
  100

]

const durationOptions = [

  30,
  45,
  60,
  90,
  120,
  150,
  180

]

 const handleChange=(e)=>setForm({...form,[e.target.name]:e.target.value})

 const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    setLoading(true)
    const payload = {
  ...form,

  topics: form.topics
    .split(",")
    .map(topic => topic.trim())
    .filter(topic => topic !== "")
}

const res = await questionPaperAPI.generate(payload)
    setGeneratedPaper(res.data)

  } catch (err) {

  console.error("Full Error:", err)

  console.error("Response:", err.response)

console.log(
    JSON.stringify(err.response?.data, null, 2)
)
  console.error("Status:", err.response?.status)

  alert("Failed to generate question paper.")

} finally {
    setLoading(false)
  }
}
const handleCopy = async () => {

  if (!generatedPaper) {

    alert("No question paper available to copy.");

    return;

  }

  try {

    await navigator.clipboard.writeText(
      generatedPaper.question_paper ||
      JSON.stringify(generatedPaper, null, 2)
    );

    alert("Question paper copied successfully!");

  }

  catch (error) {

    console.error(error);

    alert("Unable to copy question paper.");

  }

}

 return (
  <div className="max-w-6xl mx-auto space-y-6">
   <PageHeader
    title="AI Question Paper Generator"
    subtitle="Generate professional AI-powered question papers."
    icon={FileText}
   />
   <div className="bg-white rounded-2xl shadow p-6">
    <form onSubmit={handleSubmit} className="grid gap-4">
     {/* ================= SUBJECT ================= */}

<div>

  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Subject <span className="text-red-500">*</span>
  </label>

  <input
    type="text"
    name="subject"
    value={form.subject}
    onChange={handleChange}
    placeholder="Example: Data Structures"
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
  />

</div>

{/* ================= GRID ================= */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  {/* Grade */}

  <div>

    <label className="block text-sm font-semibold text-gray-700 mb-2">
      Grade Level
    </label>

    <select
      name="grade_level"
      value={form.grade_level}
      onChange={handleChange}
      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
    >

      {gradeOptions.map((grade)=>(

        <option
          key={grade}
          value={grade}
        >

          {grade}

        </option>

      ))}

    </select>

  </div>

  {/* Exam */}

  <div>

    <label className="block text-sm font-semibold text-gray-700 mb-2">
      Exam Type
    </label>

    <select
      name="exam_type"
      value={form.exam_type}
      onChange={handleChange}
      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
    >

      {examOptions.map((exam)=>(

        <option
          key={exam}
          value={exam}
        >

          {exam}

        </option>

      ))}

    </select>

  </div>

</div>
{/* ================= SECOND GRID ================= */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  {/* Difficulty */}

  <div>

    <label className="block text-sm font-semibold text-gray-700 mb-2">
      Difficulty Level
    </label>

    <select
      name="difficulty"
      value={form.difficulty}
      onChange={handleChange}
      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
    >
      {difficultyOptions.map((difficulty) => (

        <option
          key={difficulty.value}
          value={difficulty.value}
        >
          {difficulty.label}
        </option>

      ))}
    </select>

  </div>

  {/* Total Marks */}

  <div>

    <label className="block text-sm font-semibold text-gray-700 mb-2">
      Total Marks
    </label>

    <select
      name="total_marks"
      value={form.total_marks}
      onChange={handleChange}
      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
    >
      {marksOptions.map((mark) => (

        <option
          key={mark}
          value={mark}
        >
          {mark} Marks
        </option>

      ))}
    </select>

  </div>

</div>

{/* ================= DURATION ================= */}

<div>

  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Duration
  </label>

  <select
    name="duration"
    value={form.duration}
    onChange={handleChange}
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
  >
    {durationOptions.map((time) => (

      <option
        key={time}
        value={time}
      >
        {time} Minutes
      </option>

    ))}
  </select>

</div>
{/* ================= TOPICS ================= */}

<div>

  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Topics <span className="text-red-500">*</span>
  </label>

  <textarea
    rows={4}
    name="topics"
    value={form.topics}
    onChange={handleChange}
    placeholder="Example: Arrays, Linked List, Queue, Trees"
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
  />

  <p className="text-xs text-gray-500 mt-2">
    💡 Separate multiple topics using commas.
  </p>

</div>

{/* ================= INSTRUCTIONS ================= */}

<div>

  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Additional Instructions
  </label>

  <textarea
    rows={4}
    name="instructions"
    value={form.instructions}
    onChange={handleChange}
    placeholder="Example:
• Include Bloom's Taxonomy questions
• Add numerical problems
• Avoid MCQs
• Include case study questions"
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
  />

  <p className="text-xs text-gray-500 mt-2">
    These instructions help the AI generate a better question paper.
  </p>

</div>
     <button>
      Generate Question Paper    
    </button>
    </form>
    {generatedPaper && (
  <div className="mt-8 bg-gray-50 rounded-xl border p-6">
    <h2 className="text-xl font-bold text-gray-800 mb-4">
      Generated Question Paper
    </h2>
    <div className="flex justify-end mb-4">

  <button

    onClick={handleCopy}

    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"

  >

    📋 Copy

  </button>

</div>

    <pre className="whitespace-pre-wrap text-gray-700">
      {generatedPaper.question_paper || JSON.stringify(generatedPaper, null, 2)}
    </pre>
  </div>
)}
   </div>
  </div>
 )
}
