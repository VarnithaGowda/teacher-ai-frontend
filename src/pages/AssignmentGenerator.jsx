/**
 * Assignment.jsx
 */
import { useState } from 'react'
import { FileText, Loader2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { questionPaperAPI } from '../services/api'
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";


export default function AssignmentGenerator(){
 const [form, setForm] = useState({

  subject: "",

  grade_level: "3rd Semester",

  exam_type: "Assignment",

  difficulty: "intermediate",

  total_marks: 50,

  duration: 30,

  topics: "",

  instructions: "",

  assignmentTypes: []

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
    console.log("Assignment API Response:", res.data);

    setGeneratedPaper(res.data)

  } catch (err) {

  console.error("Full Error:", err)

  console.error("Response:", err.response)

console.log(
    JSON.stringify(err.response?.data, null, 2)
)
  console.error("Status:", err.response?.status)

  alert("Failed to generate Assignment.")

} finally {
    setLoading(false)
  }
}
const handleCopy = async () => {

  if (!generatedPaper) {

    alert("No assignment available to copy.");

    return;

  }

  try {

    await navigator.clipboard.writeText(
      generatedPaper.assignment || generatedPaper.question_paper || JSON.stringify(generatedPaper, null, 2)
    );

    alert("Assignment copied successfully!");

  }

  catch (error) {

    console.error(error);

    alert("Unable to copy assignment.");

  }

}
const handlePrint = () => {

  if (!generatedPaper) {

    alert("No assignment available to print.");

    return;

  }

  const printWindow = window.open("", "_blank");

  printWindow.document.write(`

    <html>

      <head>

        <title>Assignment</title>

        <style>

          body{

            font-family: Arial, sans-serif;

            margin:40px;

            line-height:1.8;

          }

          h1{

            text-align:center;

          }

          pre{

            white-space:pre-wrap;

            font-size:16px;

          }

        </style>

      </head>

      <body>

        <h1>Assignment</h1>

        <pre>

${generatedPaper.Assignment}

        </pre>

      </body>

    </html>

  `);

  printWindow.document.close();

  printWindow.focus();

  printWindow.print();

  printWindow.close();

}
const handleDownloadWord = () => {

  if (!generatedPaper) {

    alert("Generate an assignment first.");

    return;

  }

  const content = `

AI GENERATED ASSIGNMENT

--------------------------------------------

Subject : ${form.subject}

Grade : ${form.grade_level}

Difficulty : ${form.difficulty}

Total Marks : ${form.total_marks}

--------------------------------------------

${generatedPaper.question_paper}

`;

  const blob = new Blob(

    [content],

    {

      type: "application/msword;charset=utf-8"

    }

  );

  saveAs(

    blob,

    `${form.subject.replace(/\s+/g, "_")}_Assignment.doc`

  );

};

const handleDownloadPDF = () => {

  const element = document.getElementById("Assignment-paper-result");

  if (!element) {
    alert("Assignment not found.");
    return;
  }

  const options = {
  margin: [10, 10, 10, 10],

  filename: `${form.subject}_Assignment.pdf`,

  image: {
    type: "jpeg",
    quality: 0.98,
  },

  html2canvas: {
    scale: 1.5,
    useCORS: true,
    scrollY: 0,
    letterRendering: true,
},

  jsPDF: {
    unit: "mm",
    format: "a4",
    orientation: "portrait",
  },

  pagebreak: {
    mode: ["css", "legacy", "avoid-all"]
}
};

  html2pdf()
    .set(options)
    .from(element)
    .save();

};

 return (
  <div className="max-w-6xl mx-auto space-y-6">
   <PageHeader
    title="AI Assignment Generator"
    subtitle="Generate AI-powered assignments for students."
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
    These instructions help the AI generate a better assignment.
  </p>

</div>
     <button
  type="submit"
  disabled={loading}
  className={`
    w-full
    rounded-xl
    py-4
    mt-2
    text-lg
    font-semibold
    text-white
    flex
    justify-center
    items-center
    gap-3
    transition-all
    duration-300

    ${
      loading
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02]"
    }
  `}
>
  {loading ? (
    <>
      <Loader2 className="w-6 h-6 animate-spin" />

      <div className="text-left">
        <p>Generating Assignment...</p>

        <p className="text-xs opacity-80">
          AI is preparing your questions...
        </p>
      </div>
    </>
  ) : (
    <>
      <FileText className="w-6 h-6" />

      Generate Assignment
    </>
  )}
</button>
    </form>
    {generatedPaper && (

<div
    id="Assignment-paper-result"
    style={{
    width: "800px",
    margin: "0 auto",
    background: "white",
    padding: "20px"
}}
    className="mt-8 bg-white rounded-2xl shadow-lg border overflow-hidden"
>    {/* Header */}

    <div className="bg-green-50 border-b p-5">

        <div className="flex items-center justify-between">

            <div>

                <h2 className="text-2xl font-bold text-green-700">

                    ✅ Assignment Generated

                </h2>

                <p className="text-gray-600 mt-1">

                    Your AI-generated Assignment is ready.

                </p>

            </div>

            <div className="flex gap-3">

<button
onClick={handleCopy}
className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
>

📋 Copy

</button>

<button
onClick={handlePrint}
className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
>

🖨 Print

</button>

<button
onClick={handleDownloadWord}
className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
>

📄 Word

</button>

</div>

        </div>

    </div>

    {/* Paper */}

    <div className="p-6">

        <div
  className="text-gray-700 leading-8 font-sans"
  style={{
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    wordBreak: "break-word",
  }}
>
  {generatedPaper.question_paper
    ?.replace("# EDUGENIE AI", "")
    ?.replace("## QUESTION PAPER", "## ASSIGNMENT")
    ?.split("\n")
    .map((line, index) => (
      <p
        key={index}
        style={{
          marginBottom: "8px",
          pageBreakInside: "avoid",
        }}
      >
        {line || "\u00A0"}
      </p>
    ))}
</div>

    </div>

</div>

)}
   </div>
  </div>
 )
}







