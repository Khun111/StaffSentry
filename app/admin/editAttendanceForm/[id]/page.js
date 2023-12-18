'use client'
import { useState } from 'react'
import './styles.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function AttendanceForm({ params }) {
  const [formData, setFormData] = useState({ status: "" });
  const router = useRouter();
  function handleEdit(e) {
    let { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/attendance/${params.id}`, JSON.stringify(formData));
      console.log(response);
      router.push('/admin');
    } catch (error) {
      console.error(error);
    }

  }
  console.log(formData)
  return (
    <form className='form' onSubmit={handleSubmit}>
      {/* <label for="id">Id:</label>
      <input id='id' onChange={handleEdit} value={formData.id} name="id" placeholder='Enter attendance id' /> */}
      <label htmlFor="status">Attendance Status:</label>
      <select id='status' name='status' onChange={handleEdit} value={formData.status}>
        <option selected disabled>Mark Attendance</option>
        <option value="ABSENT">Absent</option>
        <option value="PRESENT">Present</option>
      </select>
      <button type="">Submit</button>
    </form>
  )
}