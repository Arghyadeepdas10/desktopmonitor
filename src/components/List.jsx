import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee } from '../Redux toolkit/Slice/employeeSlice';
import 'ag-grid-community/styles/ag-grid.css'; 
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
ModuleRegistry.registerModules([AllCommunityModule]);
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";


const List = () => {

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        employeeId: '',
        name: '',
        department: '',
        deviceType: '',
        modelNumber: ''
    });

    const [realTimeWebsites, setRealTimeWebsites] = useState({});
    const [employeeStatus, setEmployeeStatus] = useState({});
    const [deviceStatus, setDeviceStatus] = useState({});
    const [recentActivity, setRecentActivity] = useState({});
    const [activityLog, setActivityLog] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);


    const employee = useSelector((state)=> state.employees);

    const statusOptions = ["Online", "Offline", "Idle"];
    const dispatch = useDispatch();

    const activityOptions = [
    "Browsing Google",
    "Watching YouTube",
    "Reading Wikipedia",
    "Coding on GitHub",
    "Writing on Medium",
  ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
       const randomStatus =
      statusOptions[Math.floor(Math.random() * statusOptions.length)];
    const randomWebsite =
      randomWebsites[Math.floor(Math.random() * randomWebsites.length)];

    const newEmployee = {
      ...formData,
      status: randomStatus,
      currentWebsite: randomWebsite,
    };

    dispatch(addEmployee(newEmployee));

    setRealTimeWebsites((prevState) => ({
      ...prevState,
      [formData.employeeId]: randomWebsite,
    }));

    setEmployeeStatus((prevState) => ({
      ...prevState,
      [formData.employeeId]: randomStatus,
    }));

    setDeviceStatus((prevState) => ({
      ...prevState,
      [formData.employeeId]: Math.random() > 0.5 ? "Active" : "Inactive",
    }));

    setRecentActivity((prevState) => ({
      ...prevState,
      [formData.employeeId]: activityOptions[Math.floor(Math.random() * activityOptions.length)],
    }));
        setFormData({
            employeeId: '',
            name: '',
            department: '',
            deviceType: '',
            modelNumber: ''
        });
        setOpen(false);
    };

    const randomWebsites = [
    "https://www.google.com",
    "https://www.youtube.com",
    "https://www.wikipedia.org",
    "https://www.github.com",
    "https://www.medium.com",
    "https://www.reddit.com",
    "https://www.amazon.com",
    "https://www.netflix.com",
    "https://www.linkedin.com",
    "https://www.twitter.com",
  ];
    
    const departmentOptions = [
        "Content Writer",
        "Graphic Designer",
        "Engineering",
        "Marketing",
        "Sales",
        "HR",
        "Finance"
      ];

      const sortedEmployees = [...employee].sort((a, b) => {
        const priority = ["Content Writer", "Graphic Designer"];
        if (priority.includes(a.department) && !priority.includes(b.department)) return -1;
        if (!priority.includes(a.department) && priority.includes(b.department)) return 1;
        return 0;
      });

    useEffect(() => {
    const interval = setInterval(() => {
      const updatedWebsites = employee.reduce((acc, emp) => {
        const randomIndex = Math.floor(Math.random() * randomWebsites.length);
        acc[emp.employeeId] = randomWebsites[randomIndex];
        return acc;
      }, {});
      setRealTimeWebsites(updatedWebsites);

      const updatedStatus = employee.reduce((acc, emp) => {
        const randomStatus =
          statusOptions[Math.floor(Math.random() * statusOptions.length)];
        acc[emp.employeeId] = randomStatus;
        return acc;
      }, {});
      setEmployeeStatus(updatedStatus);
    }, 3000);

    return () => clearInterval(interval);
  }, [employee]);


      const columnDefs = [
        { headerName: "Employee ID", field: "employeeId", sortable: true, filter: true },
        { headerName: "Name", field: "name", sortable: true, filter: true },
        { headerName: "Department", field: "department", sortable: true, filter: true },
        { headerName: "Device Type", field: "deviceType", sortable: true, filter: true },
        { headerName: "Model Number", field: "modelNumber", sortable: true, filter: true },
        {
            headerName: "Current Website",
            field: "currentWebsite",
            cellRenderer: (params) => realTimeWebsites[params.data.employeeId],
          },
          {
                  headerName: "Status",
                  field: "status",
                  cellRenderer: (params) =>
                    employeeStatus[params.data.employeeId],
                },
      ];

    const kpiData = {
    Online: Object.values(employeeStatus).filter((status) => status === "Online")
      .length,
    Offline: Object.values(employeeStatus).filter(
      (status) => status === "Offline"
    ).length,
    Idle: Object.values(employeeStatus).filter((status) => status === "Idle")
      .length,
  };

   useEffect(() => {
  if (selectedEmployee) {
    const interval = setInterval(() => {
      setActivityLog((prevLog) => [
        ...prevLog.slice(-9),
        {
          time: new Date().toLocaleTimeString(),
          status: Math.random() > 0.5 ? 1 : 0,
        },
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }
}, [selectedEmployee]);

  const cardColors = [
    "#FFE4E1",
    "#E6E6FA",
    "#FFFACD",
    "#F5FFFA",
    "#E0FFFF",
    "#FAFAD2",
    "#FFEFD5",
  ];
     
  return (
    <>
    <div style={{marginTop:"20px"}}>
        <h1 style={{textAlign:"center", color:"red"}}>SJ DATA MANAGEMENT SYSTEM</h1>
    </div>

    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10, padding: '10px 0',}}>
        <Button variant="contained" color='success' onClick={() => setOpen(true)}>
          Add An Employee
        </Button>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle style={{ backgroundColor: '#3f51b5', color: '#fff', textAlign: 'center', fontSize: '1.5rem' }}>
          Employee's Details
        </DialogTitle>
        <DialogContent style={{ backgroundColor: '#e8f0fe', padding: '20px' }}>
          <form className="grid gap-4 py-4" noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Employee ID"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              style={{ backgroundColor: '#fff' }}
            />
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              style={{ backgroundColor: '#fff' }}
            />

            <TextField
                select
                fullWidth
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                style={{ backgroundColor: '#fff' }}
                >
                {departmentOptions.map(option => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
                ))}
                </TextField>

            <TextField select fullWidth
              label="Device Type"
              name="deviceType"
              value={formData.deviceType}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              style={{ backgroundColor: '#fff' }}>
              <MenuItem value="Laptop">Laptop</MenuItem>
              <MenuItem value="Desktop">Desktop</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Model Number"
              name="modelNumber"
              value={formData.modelNumber}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              style={{ backgroundColor: '#fff' }}
            />
          </form>
        </DialogContent>
        <DialogActions style={{ backgroundColor: '#e8f0fe', padding: '10px' }}>
          <Button onClick={() => setOpen(false)} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="outlined" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
          {Object.entries(kpiData).map(([status, count]) => (
            <Card
              key={status}
              style={{
                width: "250px",
                textAlign: "center",
                background: status === "Online" ? "#d1e7dd" : status === "Offline" ? "#f8d7da" : "#fff3cd",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: "15px",
              }}
            >
              <CardContent>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  {status}
                </Typography>
                <Typography variant="h6">{count} Employees</Typography>
              </CardContent>
            </Card>
          ))}
        </div>


      {employee.length > 0 && (
        <>
        <div className="ag-theme-alpine" style={{ height: 400, width: "100%", marginTop: "20px" }}>
            <AgGridReact
              rowData={sortedEmployees}
              columnDefs={columnDefs}
              defaultColDef={{
                sortable: true,
                filter: true,
                flex: 1,
                minWidth: 100,
              }}
              rowStyle={(params) =>
                params.data.department === "Content Writer" || params.data.department === "Graphic Designer"  ? { backgroundColor: "#ffe0b2" } : {}
              }
            />
          </div>
          
          <div style={{ marginTop: "10px", padding:"10px", backgroundColor: "aqua", borderRadius: "15px" }}>

          <h1 style={{ marginTop: "10px", textAlign: "center" }}>EMPLOYEE ACTIVITIES</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
              {employee.map((emp, index) => (
                <Card
                    key={emp.employeeId}
                    onClick={() => setSelectedEmployee(emp)} // Set the selected employee
                    style={{
                      cursor: "pointer",
                      width: "300px",
                      background: cardColors[index % cardColors.length],
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      borderRadius: "15px",
                      padding: "20px",
                    }}
                  >
                  <CardContent>
                    <Typography
                      variant="h5"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      {emp.name}
                    </Typography>
                    <Typography variant="subtitle1" style={{ margin: "10px 0", textAlign: "center" }}>
                      Department: {emp.department}
                    </Typography>
                    <Typography variant="body1" style={{ margin: "10px 0" }}>
                      <b>Device Status:</b> {deviceStatus[emp.employeeId]}
                    </Typography>
                    <Typography variant="body1" style={{ margin: "10px 0" }}>
                      <b>Recent Activity:</b> {recentActivity[emp.employeeId] }
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>



          {selectedEmployee && (
              <div style={{ marginTop: "40px" }}>
                <Typography variant="h6" style={{ textAlign: "center", marginBottom: "20px" }}>
                  Real-Time Device Activity: {selectedEmployee.name}
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={activityLog}>
                      <XAxis dataKey="time" />
                      <YAxis tickFormatter={(value) => (value === 1 ? "Active" : "Inactive")} />
                      <Line type="monotone" dataKey="status" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
              </div>
            )}


        </>
          
        )}
    </div>
    </>
  
  )
}

export default List