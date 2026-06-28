/**
 * QuestionPaper.jsx
 */
import { useState } from 'react'
import { FileText } from 'lucide-react'
import PageHeader from '../components/PageHeader'

export default function QuestionPaper(){
 const [form,setForm]=useState({
  subject:'',
  grade_level:'',
  exam_type:'Mid Semester',
  difficulty:'intermediate',
  total_marks:50,
  duration:90,
  topics:''
 })

 const handleChange=(e)=>setForm({...form,[e.target.name]:e.target.value})

 const handleSubmit=(e)=>{
  e.preventDefault()
  console.log(form)
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
     <input className="border rounded-lg p-3" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange}/>
     <input className="border rounded-lg p-3" name="grade_level" placeholder="Grade" value={form.grade_level} onChange={handleChange}/>
     <input className="border rounded-lg p-3" name="exam_type" placeholder="Exam Type" value={form.exam_type} onChange={handleChange}/>
     <textarea className="border rounded-lg p-3" rows={5} name="topics" placeholder="Arrays, Linked List, Queue..." value={form.topics} onChange={handleChange}/>
     <button type="submit" className="bg-indigo-600 text-white rounded-lg py-3">Generate Question Paper</button>
    </form>
   </div>
  </div>
 )
}
