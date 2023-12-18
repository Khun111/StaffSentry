# StaffSentry
A solution for seamless workforce management.


Employees are the company's most significant asset and the most crucial factor of production; therefore companies give their utmost best to ensure their proper management and control.

However, this can be daunting in the long run. Don't be disheartened though, StaffSentry is here. With StaffSentry, you can relax, monitor and manage employee actions with only a few clicks. And from the comfort of your home too. 

Employee Management has never been this convenient. Below are the key features.

- Employee Management (View, Add, Edit, and Delete employee profiles)
- Attendance Management (Mark, Monitor, Edit, and Delete employee attendances)
-  Leaves Management (Mark, Monitor, Edit, and Delete employee leaves)

# Getting Started
1. Clone the repository with `git clone https://github.com/Khun111/StaffSentry.git`
2. Switch to the repo directory with `cd StaffSentry`
3. Install necessary dependencies with `npm install`1. Clone the repository with `git clone https://github.com/Khun111/StaffSentry.git`
2. Switch to the repo directory with `cd StaffSentry`
3. Install necessary dependencies with `npm install`
4. Invoke Prisma cli with `npx prisma`
5. Start Prisma wit `npx prisma generate`
6. Run the program with `npm run dev`
7. Visit the homepage on `http://localhost:
4. Run the program with `npm run dev`
5. Visit the homepage on `http://localhost:3000`

# Tools Used
- Next.js; The Full-stack React Framework
- Next-auth.js for authentication
- Pure CSS for styling
- Material UI for react tabs

# Project Structure
## Frontend
This project uses Nextjs App router as opposed to the page router. The relevant files are:
- _/app/page.js :_ This is the main entry of the application; the homepage.
- _/app/provider.js:_ This contains the configuration for the next-auth's session provider to pass the session to the client components.
- _/app/navBar.js:_ This displays the navBar.
- _/app/layout.js:_ This wraps around children components and provides general/global styling and configurations
- _/app/employee/[id]/page.js: _ This is the dashboard of the employee. It is a dynamic route and shows different content depending on the employee id. It displays employee details and shows their attendances and leaves.
- _/app/employee/attendanceForm:_ This shows the attendance record form. Employees use it to mark attendances.
- _/app/employee/leaveForm:_ This shows the leave request form. Employees use it to request for leaves.
- _/app/admin/page.js:_ This is the dashboard of the admin. It provides a high-level overview of employees, attendances and leaves.
- _/app/admin/attendanceForm:_ This shows the attendance record form. An Admin can use it to mark employee attendances.
- _/app/admin/leaveForm:_ This shows the leave request form. An Admin can use it to create leave requests for employees.
- _/app/admin/editAttendanceForm:_ This shows the attendance record form. An Admin can use it to edit attendance details of employees. e.g change from PRESENT to ABSENT.
- _/app/admin/editLeaveForm:_ This shows the leave request form. An Admin can use it to edit leave details of employees. e.g change from PENDING to APPROVED.
## Backend
- _/app/api/employee/route.js:_ This is the API route to create and retreive employees.
- _/app/api/leave/route.js:_ This is the API route to create and retreive leave requests.
- _/app/api/attendance/route.js:_ This is the API route to create and retreive attendance records.
-  _/app/api/employee/[id]/route.js:_ This is the API route to create, retreive, update and delete a particular employee depending on id. It is a dynamic route.
- _/app/api/attendance/[id]/route.js:_ This is the API route to create, retreive, update and delete a particular attendance record depending on id. It is a dynamic route.
- _/app/api/leave/[id]/route.js:_ This is the API route to create, retreive, update and delete a particular leave request depending on id. It is a dynamic route.
- _/app/api/eLeave/[userId]/route.js:_ This is the API route to retreive leave requests for a particular employee depending on userId.
- _/app/api/eAttendance/[userId]/route.js:_ This is the API route to retreive attendance records for a particular employee depending on userId.
- _/app/api/auth/[...nextauth].js:_ This contains the configuration for the next-auth library; providers and callbacks.
