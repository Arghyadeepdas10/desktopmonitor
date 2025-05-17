import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee } from '../Redux toolkit/Slice/employeeSlice';
import 'ag-grid-community/styles/ag-grid.css'; 
// import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
ModuleRegistry.registerModules([AllCommunityModule]);


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

    const employee = useSelector((state)=> state.employees);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        console.log("Form Submitted", formData);
        dispatch(addEmployee(formData));
        setFormData({
            employeeId: '',
            name: '',
            department: '',
            deviceType: '',
            modelNumber: ''
        });
        setOpen(false);
    };
    
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
            acc[emp.employeeId] = `https://example-${Math.floor(
              Math.random() * 100
            )}.com`;
            return acc;
          }, {});
          setRealTimeWebsites(updatedWebsites);
        }, 8000);
    
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
            cellRenderer: (params) => realTimeWebsites[params.data.employeeId] || "N/A",
          },
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
            {/* <TextField fullWidth label="Department" name="department" value={formData.department} onChange={handleChange} variant="outlined" margin="normal" style={{ backgroundColor: '#fff' }} /> */}

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

      {/* {employee.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead style={{ backgroundColor: '#3f51b5' }}>
              <TableRow>
                <TableCell style={{ color: '#fff' }}>Employee ID</TableCell>
                <TableCell style={{ color: '#fff' }}>Name</TableCell>
                <TableCell style={{ color: '#fff' }}>Department</TableCell>
                <TableCell style={{ color: '#fff' }}>Device Type</TableCell>
                <TableCell style={{ color: '#fff' }}>Model Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {sortedEmployees.map((emp, index) => (
                    <TableRow
                    key={index}
                    style={{
                        backgroundColor: (emp.department === "Content Writer" || emp.department === "Graphic Designer")? "#ffe0b2"  : "inherit" }}
                    >
                    <TableCell>{emp.employeeId}</TableCell>
                    <TableCell>{emp.name}</TableCell>
                    <TableCell>{emp.department}</TableCell>
                    <TableCell>{emp.deviceType}</TableCell>
                    <TableCell>{emp.modelNumber}</TableCell>
                    </TableRow>
                ))}
                </TableBody>

          </Table>
        </TableContainer>
      )} */}
      {employee.length > 0 && (
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
        )}
    </div>
    </>
  
  )
}

export default List