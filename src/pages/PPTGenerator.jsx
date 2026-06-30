/**
 * PPTGenerator.jsx
 */
import { useState } from 'react'
import { FileText, Loader2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { questionPaperAPI } from '../services/api'
import { saveAs } from "file-saver";


export default function PPTGenerator() {
  const [form, setForm] = useState({

  subject: "",

  grade_level: "3rd Semester",

  exam_type: "Presentation",

  difficulty: "intermediate",

  slides: 10,

  total_marks: 50,

  duration: 30,

  topics: "",

  instructions: "",

  presentationStyle: "Academic",

audience: "UG Students"

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

const slideOptions = [

5,

8,

10,

12,

15,

20

]
const presentationStyles = [

"Academic",

"Professional",

"Interactive",

"Seminar",

"Workshop"

]

const audienceOptions = [

"School Students",

"Diploma Students",

"UG Students",

"PG Students",

"Faculty"

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

  total_marks: Math.max(Number(form.slides), 20),

  topics: form.topics
    .split(",")
    .map(topic => topic.trim())
    .filter(topic => topic !== "")
}

const res = await questionPaperAPI.generate(payload)
    console.log("PPT API Response:", res.data);

    setGeneratedPaper(res.data)

  } catch (err) {

  console.error("Full Error:", err)

  console.error("Response:", err.response)

console.log(
    JSON.stringify(err.response?.data, null, 2)
)
  console.error("Status:", err.response?.status)

  alert("Failed to generate PPT.")

} finally {
    setLoading(false)
  }
}
const handleCopy = async () => {

  if (!generatedPaper) {

    alert("No PPT available to copy.");

    return;

  }

  try {

    await navigator.clipboard.writeText(
      generatedPaper.worksheet || generatedPaper.question_paper || JSON.stringify(generatedPaper, null, 2)
    );

    alert("PPT copied successfully!");

  }

  catch (error) {

    console.error(error);

    alert("Unable to copy PPT.");

  }

}
const handlePrint = () => {

  if (!generatedPaper) {

    alert("No PPT available to print.");

    return;

  }

  const printWindow = window.open("", "_blank");

  printWindow.document.write(`

    <html>

      <head>

        <title>PPT</title>

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

        <h1>PPT</h1>

        <pre>

${generatedPaper.question_paper
  ?.replace("# EDUGENIE AI", "")
  ?.replace("## QUESTION PAPER", "## PPT")}

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

    alert("Generate a PPT first.");

    return;

  }

  const content = `

AI GENERATED PPT

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

    `${form.subject.replace(/\s+/g, "_")}_PPT.doc`

  );

};

 return (
  <div className="max-w-6xl mx-auto space-y-6">
   <PageHeader
    title="AI PPT Generator"
    subtitle="Generate AI-powered classroom presentations."
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



  {/* Number of Slides */}

<div>

<label className="block text-sm font-semibold text-gray-700 mb-2">

Number of Slides

</label>

<select

name="slides"

value={form.slides}

onChange={handleChange}

className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"

>

{slideOptions.map((slide)=>(

<option

key={slide}

value={slide}

>

{slide} Slides

</option>

))}

</select>

</div>

</div>

{/* ================= PRESENTATION STYLE ================= */}

<div>

  <label className="block text-sm font-semibold text-gray-700 mb-2">

    Presentation Style

  </label>

  <select

    name="presentationStyle"

    value={form.presentationStyle}

    onChange={handleChange}

    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"

  >

    {presentationStyles.map((style) => (

      <option

        key={style}

        value={style}

      >

        {style}

      </option>

    ))}

  </select>

</div>

{/* ================= TARGET AUDIENCE ================= */}

<div>

  <label className="block text-sm font-semibold text-gray-700 mb-2">

    Target Audience

  </label>

  <select

    name="audience"

    value={form.audience}

    onChange={handleChange}

    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"

  >

    {audienceOptions.map((audience) => (

      <option

        key={audience}

        value={audience}

      >

        {audience}

      </option>

    ))}

  </select>

</div>


{/* ================= TOPICS ================= */}

<div>

  <label className="block text-sm font-semibold text-gray-700 mb-2">
  Presentation Topic <span className="text-red-500">*</span>
</label>

  <textarea
    rows={4}
    name="topics"
    value={form.topics}
    onChange={handleChange}
placeholder="Example: Introduction to Data Structures, Arrays, Linked Lists"    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
  />

  <p className="text-xs text-gray-500 mt-2">
    💡 Enter the main topics you want to include in the presentation.
  </p>

</div>

{/* ================= INSTRUCTIONS ================= */}

<div>

 <label className="block text-sm font-semibold text-gray-700 mb-2">
  Learning Objectives
</label>

  <textarea
    rows={4}
    name="instructions"
    value={form.instructions}
    onChange={handleChange}
    placeholder="Example:
• Explain Arrays with examples
• Include real-world applications
• Add diagrams wherever applicable
• End with a summary slide"
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
  />

  <p className="text-xs text-gray-500 mt-2">
These objectives help the AI create a more structured presentation.  </p>

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
        <p>Generating Slides...</p>

        <p className="text-xs opacity-80">
          AI is preparing your presentation slides...
        </p>
      </div>
    </>
  ) : (
    <>
      <FileText className="w-6 h-6" />

      Generate PPT
    </>
  )}
</button>
    </form>
    {generatedPaper && (

<div
    id="ppt-paper-result"
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

                    ✅ PPT Generated

                </h2>

                <p className="text-gray-600 mt-1">

                     Your AI-generated presentation slides are ready.

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
  ?.replace("## QUESTION PAPER", "## PRESENTATION")
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







