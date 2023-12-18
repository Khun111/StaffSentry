'use client'
import { useState } from 'react';
import './styles.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function LeaveForm() {
  const [formData, setFormData] = useState({ userId: "", status: "", reason: "", startDate: "", endDate: "" });
  const router = useRouter();
  const handleEdit = (e) => {
    let { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    console.log(formData);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData, startDate: new Date(formData.startDate).toISOString(), endDate: new Date(formData.endDate).toISOString() };
    console.log(data);
    try {
      const response = await axios.post(`/api/leave`, JSON.stringify(data));
      console.log(response);
      router.push('/admin');
    } catch (error) {
      console.error(error);
    }

  }
  return (
    <form className='form' onSubmit={handleSubmit}>
      <label for="userId">User Id:</label>
      <input id='userId' name="userId" onChange={handleEdit} value={formData.userId} placeholder='Enter user id' />
      <label for="status">Leave Status:</label>
      <select name='status' id='status' onChange={handleEdit} value={formData.status}>
        <option selected disabled >Leave Status</option>
        <option value="PENDING">Pending</option>
        <option value="APPROVED">Approved</option>
        <option value="REJECTED">Rejected</option>
      </select>
      <label for="reason">Reason:</label>
      <input id='reason' name="reason" onChange={handleEdit} value={formData.reason} placeholder='Enter reason for leave' />
      <label for="startDate">Start Date:</label>
      <input id='startDate' name="startDate" onChange={handleEdit} value={formData.startDate} placeholder='Desired start date' type='date' />
      <label for="endDate">End Date:</label>
      <input id='startDate' name="endDate" onChange={handleEdit} value={formData.endDate} placeholder='Desired start date' type='date' />
      <button>Submit</button>
    </form>
  )
}