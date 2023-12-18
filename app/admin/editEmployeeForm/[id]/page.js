'use client'
import { useState } from 'react';
import './styles.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function EmployeeForm({ params }) {
  const [formData, setFormData] = useState({ name: "", email: "", job: "", role: "" });
  const router = useRouter();
  function handleEdit(e) {
    let { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }
  console.log(formData)
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/employee/${params.id}`, JSON.stringify(formData));
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
      <label htmlFor="name">Name:</label>
      <input id='name' name="name" onChange={handleEdit} value={formData.name} placeholder='Name of Employee' />
      <label htmlFor="email">Email:</label>
      <input id='email' name="email" onChange={handleEdit} value={formData.email} placeholder='Employee mail address' type='email' />
      <label htmlFor="role">User Status:</label>
      <select name='role' id='role' onChange={handleEdit} value={formData.role}>
        <option selected disabled >Select Role</option>
        <option value="EMPLOYEE">Employee</option>
        <option value="ADMIN">Admin</option>
      </select>
      <label htmlFor="job">Job:</label>
      <input id='job' name="job" onChange={handleEdit} value={formData.job} placeholder='Assigned Job' />
      <button type="">Submit</button>
    </form>
  )
}