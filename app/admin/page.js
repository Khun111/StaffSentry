'use client'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './styles.css'
import useSWR from 'swr';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
// References: Material UI docs for tabs

function LeaveCard({ id, status, createdAt }) {
  async function handleDelete(e) {
    e.preventDefault();
    try {
      const response =  await axios.delete(`/api/leave/${id}`);
    console.log(response)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='card'>
      <header>
        Leave {id}
      </header>
      <div className='card_foot'>
        <div>
          <header>
            Status
          </header>
          <p>{status}</p>
        </div>
        <div>
          <header>
            Requested At
          </header>
          <p>{createdAt.split("T")[0]}</p>
        </div>
      </div>
      <div className="button">
        <Link href={`/admin/editLeaveForm/${id}`}>
          <button className="hooked edit">Edit</button>
        </Link>
        <button onClick={handleDelete} className="convinced delete">Delete</button>
      </div>
    </div>
  )
}
function AttendanceCard({ id, status, createdAt }) {
  async function handleDelete(e) {
    e.preventDefault();
    try {
      const response =  await axios.delete(`/api/attendance/${id}`);
    console.log(response)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='card'>
      <header>
        Attendance {id}
      </header>
      {/* <header>
        User {userId}
      </header> */}
      <div className='card_foot'>
        <div>
          <header>
            Status
          </header>
          <p>{status}</p>
        </div>
        <div>
          <header>
            Marked At
          </header>
          <p>{createdAt.split("T")[0]}</p>
        </div>
      </div>
      <div className="button">
        <Link href={`/admin/editAttendanceForm/${id}`} >
          <button className="hooked edit">Edit</button>
        </Link>
        <button onClick={handleDelete} className="convinced delete">Delete</button>
      </div>
    </div>
  )
}
function DashCard({ name, employee, attendance, leave }) {
  let total;
  switch (name) {
    case "Employees":
      total = employee;
      break;
    case "Attendances":
      total = attendance;
      break;
    default:
      total = leave;
  }
  return (
    <>
      <div className='card'>
        <header>
          {name}
        </header>
        <div className='card_foot'>
          <div>
            <header>
              Today's Entries
            </header>
            <p>{total}</p>
          </div>
        </div>
      </div>
    </>
  )
}
function EmployeeCard({ name, email, id }) {
  const fetcher = url => axios.get(url).then(res => res.data)
  const { data: attendanceArray, error: attendanceError } = useSWR(`/api/eAttendance/${id}`, fetcher);
  const { data: leaveArray, error: leaveError } = useSWR(`/api/eLeave/${id}`, fetcher);

  async function handleDelete(e) {
    e.preventDefault();
    try {
      const response =  await axios.delete(`/api/employee/${id}`);
    console.log(response)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className='card'>
        <header>
          {name || email}
        </header>
        <header>
        User {id}
      </header>
        <div className='card_foot'>
          <div>
            <header>
              Attendance
            </header>
            <p>{attendanceArray?.length}</p>
          </div>
          <div>
            <header>
              Leave
            </header>
            <p>{leaveArray?.length}</p>
          </div>
        </div>
        <div className="button">
          <Link href={`/admin/editEmployeeForm/${id}`} >
            <button className="hooked edit">Edit</button>
          </Link>
          <button onClick={handleDelete} className="convinced delete">Delete</button>
        </div>
      </div>

    </>
  )
}
function EmployeeList({ entry }) {
  const fetcher = url => axios.get(url).then(res => res.data)
  const { data: empArray, error: empError } = useSWR("/api/employee", fetcher);
  const { data: attendanceArray, error: attendanceError } = useSWR("/api/attendance", fetcher);
  const { data: leaveArray, error: leaveError } = useSWR("/api/leave", fetcher);
  const dashArray = ["Employees", "Attendances", "Leaves"];
  //  attendanceArray = ["Attendance1", "Attendance2", "Attendance3"];
  // const Array = ["Leave1", "Leave2", "Leave3"];
  let array, url;
  switch (entry) {
    case 'employee':
      array = empArray && empArray.map(item => <EmployeeCard key={item.id} id={item.id} name={item.name} email={item.email} />);
      url = "admin/employeeForm";
      break;
    case 'leave':
      array = leaveArray && leaveArray.map(item => <LeaveCard key={item.id} createdAt={item.createdAt} id={item.id} status={item.status} />);
      url = "admin/leaveForm";
      break;
    case 'attendance':
      array = attendanceArray && attendanceArray.map(item => <AttendanceCard key={item.id} createdAt={item.createdAt} id={item.id} status={item.status} />);
      url = "admin/attendanceForm";
      break;
    default:
      array = dashArray.map(item => <DashCard key={item} employee={empArray?.length} attendance={attendanceArray?.length} leave={leaveArray?.length} name={item} />);
      break;
  }


  return (
    <div>
      {entry && <Link href={url} >
        <button className='create edit'>Add New</button>
      </Link>
      }
      <div className='dash_con'>
        {array}
      </div>
    </div>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '80vh', width: '100vw' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Dashboard" {...a11yProps(0)} />
        <Tab label="Employees" {...a11yProps(1)} />
        <Tab label="Attendances" {...a11yProps(2)} />
        <Tab label="Leaves" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <EmployeeList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EmployeeList entry='employee' />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EmployeeList entry='attendance' />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <EmployeeList entry='leave' />
      </TabPanel>
    </Box>
  );
}
