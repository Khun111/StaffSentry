'use client'
import { useState } from "react";
import Image from "next/image";
import '../styles.css'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import Link from 'next/link';
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// References: Material UI docs for tabs

function DashBoard({user, attendance, leave}) {

  return (
    <div className="profile">
    <div className="dp">
      <Image className="dp_img" src="/images/employee.png" width={200} height={150} alt="employee image"/>
      <header>{user.name || 'Alex Curry'}</header>
      <header>
        {user.id}
      </header>
      <p>{user.job || 'Main chef'}</p>
    </div>
    <div className="intro">
      <div>
        <header>
          Join Date
        </header>
        <p>{user.createdAt.split("T")[0]}</p>
      </div>
      <div>
        <header>
          Net Salary
        </header>
        <p>${user.salary || "3000"}</p>
      </div>
      <div>
        <header>
          Attendances
        </header>
        <p>{attendance}</p>
      </div>
      <div>
        <header>
          Leaves
        </header>
        <p>{leave}</p>
      </div>
    </div>
    </div>
  );
}
function LeaveCard({ id, user, status, createdAt }) {
  const router = useRouter()
  async function handleDelete(e) {
    e.preventDefault();
    try {
      const response =  await axios.delete(`/api/leave/${id}`);
    console.log(response)
    router.push(`/employee/${user}`)
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
        <button onClick={handleDelete} className="convinced delete">Delete</button>
    </div>
  )
}
function AttendanceCard({ id, user, status, createdAt }) {
  async function handleDelete(e) {
    e.preventDefault();
    try {
      const response =  await axios.delete(`/api/attendance/${id}`);
    console.log(response)
    router.push(`/employee/${user}`)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='card'>
      <header>
        Attendance {id}
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
            Marked At
          </header>
          <p>{createdAt.split("T")[0]}</p>
        </div>
      </div>
        <button onClick={handleDelete} className="convinced delete">Delete</button>
    </div>
  )
}
function EmployeeList({ entry, id, user }) {
  const fetcher = url => axios.get(url).then(res => res.data)
  const { data: attendanceArray, error: attendanceError } = useSWR(`/api/eAttendance/${id}`, fetcher);
  const { data: leaveArray, error: leaveError } = useSWR(`/api/eLeave/${id}`, fetcher);

  let array, url;
  switch (entry) {
    case 'leave':
      array = leaveArray && leaveArray.map(item => <LeaveCard key={item.id} createdAt={item.createdAt} user={id} id={item.id} status={item.status} />);
      url = "leaveForm";
      break;
    default:
      array = attendanceArray && attendanceArray.map(item => <AttendanceCard key={item.id} createdAt={item.createdAt} user={id} id={item.id} status={item.status} />);
      url = "attendanceForm";
      break;
  }

  if (!entry) return <DashBoard id={id} attendance={attendanceArray?.length} leave={leaveArray?.length} user={user} />;
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

export default function VerticalTabs({params}) {
  const {data: session, status} = useSession();
  console.log("status", status);
  console.log("session", session);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(params);

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
        <Tab label="Attendances" {...a11yProps(1)} />
        <Tab label="Leaves" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {session && <EmployeeList user={session.user} id={params.id}/>}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EmployeeList user={session?.user} entry='attendance' id={params.id} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EmployeeList user={session?.user} entry='leave' id={params.id} />
      </TabPanel>
    </Box>
  );
}
