'use client'
import './styles.css'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function LeaveForm({ params }) {
  const [formData, setFormData] = useState({ status: "", startDate: "", endDate: "" });
  const router = useRouter();
  function handleEdit(e) {
    let { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }
  console.log(formData)
  async function handleSubmit(e) {
    e.preventDefault();
    const data = { ...formData, startDate: new Date(formData.startDate).toISOString(), endDate: new Date(formData.endDate).toISOString() };
    console.log(data);
    try {
      const response = await axios.patch(`/api/leave/${params.id}`, JSON.stringify(data));
      console.log(response);
      router.push('/admin');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <form className='form' onSubmit={handleSubmit}>
      {/* <label for="userId">User Id:</label>
        <input id='userId' name="userId" value="" placeholder='Enter user id' /> */}
      <label htmlFor="status">Leave Status:</label>
      <select name='status' onChange={handleEdit} value={formData.status} id='status'>
        <option selected disabled >Leave Status</option>
        <option value="PENDING">Pending</option>
        <option value="APPROVED">Approved</option>
        <option value="REJECTED">Rejected</option>
      </select>
      {/* <label for="reason">Reason:</label>
        <input id='reason' name="reason" value="" placeholder='Enter reason for leave' /> */}
      <label htmlFor="startDate">Start Date:</label>
      <input id='startDate' name="startDate" onChange={handleEdit} value={formData.startDate} placeholder='Desired start date' type='date' />
      <label htmlFor="endDate">End Date:</label>
      <input id='startDate' name="endDate" onChange={handleEdit} value={formData.endDate} placeholder='Desired start date' type='date' />
      <button type="">Submit</button>
    </form>
  )
}