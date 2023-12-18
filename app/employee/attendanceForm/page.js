'use client'
import { useState } from 'react';
import './styles.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function AttendanceForm() {
  const [formData, setFormData] = useState({ userId: "", status: "" });
  const router = useRouter();
  function handleEdit(e) {
    console.log("edit function");
    let { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    console.log(formData);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/attendance`, JSON.stringify(formData));
      console.log(response);
      router.push(`/employee/${formData.userId}`);
    } catch (error) {
      console.error(error.response);
    }

  }
  return (
    <form className='form' onSubmit={handleSubmit}>
      <label htmlFor="userId">User Id:</label>
      <input id='userId' name="userId" placeholder='Enter user id' onChange={handleEdit} value={formData.userId} />
      <label htmlFor="status">Attendance Status:</label>
      <select id='status' name='status' onChange={handleEdit} value={formData.status}>
        <option >Mark Attendance</option>
        <option value="ABSENT">Absent</option>
        <option value="PRESENT">Present</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  )
}