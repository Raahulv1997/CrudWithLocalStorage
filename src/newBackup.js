import React, { useEffect, useState } from 'react'
import {  Button, Form, Modal, } from 'react-bootstrap'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const Home = () => {
  const [show, setShow] = useState(false);
  const [entries, setEntries] = useState([]);
  const [InputValues,setInputValues]=useState({})
  const [editIndex, setEditIndex] = useState(-1);
const [editingValues, setEditingValues] = useState({});


const [dynamicEntries, setDynamicEntries] = useState([]);

const handleAddMore = () => {
  setDynamicEntries([...dynamicEntries, {}]);
};


  const HandleOnChange = (name, value) => {
    setEditingValues((prevEditingValues) => ({
      ...prevEditingValues,
      [name]: value,
    }));
  };

  const handleDynamicChange = (index, name, value) => {
    const updatedEntries = [...dynamicEntries];
    updatedEntries[index] = {
      ...updatedEntries[index],
      [name]: value,
    };
    setDynamicEntries(updatedEntries);
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
  
    const mainEntry = {
      fname: editingValues.fname || '',
      lname: editingValues.lname || '',
      email: editingValues.email || '',
      mobile: editingValues.mobile || '',
    };
  
    const allEntries = [
      ...entries,
      mainEntry,
      ...dynamicEntries.map((entry, index) => ({
        fname: entry[`dynamic_fname_${index}`] || '',
        lname: entry[`dynamic_lname_${index}`] || '',
        email: entry[`dynamic_email_${index}`] || '',
        mobile: entry[`dynamic_mobile_${index}`] || '',
      })),
    ];
  
    setEntries(allEntries);
  
    localStorage.setItem('formData', JSON.stringify(allEntries));
    handleClose();
  };
  
const handleClose = () => {
  setShow(false);
  setEditIndex(-1);
  setEditingValues({});
};




  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData')) || [];
    setEntries(storedData);
  }, []);


  const deleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    localStorage.setItem('formData', JSON.stringify(updatedEntries));
  };



  const editEntry = (index, entry) => {
    setEditIndex(index);
    setEditingValues({
      fname: entry.fname || '',
      lname: entry.lname || '',
      email: entry.email || '',
      mobile: entry.mobile || '',
      ...dynamicEntries[index], // Include dynamic values
    });
    setShow(true);
  };
  // const editEntry = (index, updatedEntry) => {  
  //   console.log("index--"+index)
  //   console.log("enrtry--"+ JSON.stringify (updatedEntry))
  //    setShow(true)
 
  // return false;
  //   const updatedEntries = [...entries];
  //   updatedEntries[index] = updatedEntry;
  //   setEntries(updatedEntries);
  //   localStorage.setItem('formData', JSON.stringify(updatedEntries));
  // };
  return (
    <div className="mt-5">
    <div className="container  overflow-auto">
     
      
        
     <h1 className='text-center  mt-3 mb-3 bg-success py-3 text-white'>Empolyee Details</h1>
     <div className="add-btn mt-2 text-end ">
        <button className='btn btn-primary ' onClick={()=>{setShow(true)}}>Add Employee</button> 
        </div>
     <table class="table table-striped ">
   <thead className='table-dark'>
     <tr>
       <th scope="col">FirstName</th>
       <th scope="col">LastName</th>
       <th scope="col">EMAIL</th>
     
       <th scope="col">NUMBER</th>
       <th scope="col" className='text-center'>OPERATIONS</th>
     </tr>
   </thead>
   <tbody>
    
               
    
      {entries.map((item, index)=>{
return(<>
 <tr key={index}>
       <th scope="row">{item.fname}</th>
      
       <td>{item.lname}</td>
       <td>{item.email}</td>
       <td>{item.mobile}</td>
       <td>
         <div className="d-flex justify-content-between">
 
       
         <button className='btn btn-primary' onClick={() => editEntry(index, item)}><EditIcon/></button> 
           <button  className='btn btn-danger' onClick={() => deleteEntry(index)}><DeleteIcon/></button>
         </div>
       
       </td>
     </tr>
</>)
      })}
      
           
     
  
   
   </tbody>
 </table>
     </div>
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <Form>

        <div className="row">
              <div className="mb-3 col-lg-6 col-md-6 col-12 ">
              
                <input type="text" name='fname'  value={editingValues.fname || ""}  onChange={(e) => HandleOnChange(e.target.name, e.target.value)}  placeholder='Firstname' className="form-control" id="exampleInputPassword1" />
              </div>
              <div className="mb-3 col-lg-6 col-md-6 col-12">

              
                <input type="text"  name='lname'  value={editingValues.lname || ""}  onChange={(e) => HandleOnChange(e.target.name, e.target.value)} placeholder='Lastname' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
               
              </div>
             
          
              <div className="mb-3 col-lg-6 col-md-6 col-12">
            
                <input type="email" name='email' value={editingValues.email || ""} placeholder='Email'  onChange={(e) => HandleOnChange(e.target.name, e.target.value)}  className="form-control" id="exampleInputPassword1" />
              </div>
              <div className="mb-3 col-lg-6 col-md-6 col-12">
              
                <input type="number" class="form-control" value={editingValues.mobile || ""} placeholder='Phone No.'  name='mobile'  onChange={(e) => HandleOnChange(e.target.name, e.target.value)} id="exampleInputPassword1" />
              </div>
          
            
           
              </div> 

              {dynamicEntries.map((entry, index) => (
              <div className="row" key={index}>
                <div className="mb-3 col-lg-6 col-md-6 col-12">
                  <input
                    type="text"
                    name={`dynamic_fname_${index}`}
                    value={entry[`dynamic_fname_${index}`] || ''}
                    onChange={(e) => handleDynamicChange(index, e.target.name, e.target.value)}
                    placeholder="Firstname"
                    className="form-control"
                  />
                </div>
                <div className="mb-3 col-lg-6 col-md-6 col-12">
                  <input
                    type="text"
                    name={`dynamic_lname_${index}`}
                    value={entry[`dynamic_lname_${index}`] || ''}
                    onChange={(e) => handleDynamicChange(index, e.target.name, e.target.value)}

                    placeholder="Lasttname"
                    className="form-control"
                  />
                </div>
                <div className="mb-3 col-lg-6 col-md-6 col-12">
                  <input
                    type="text"
                    name={`dynamic_email_${index}`}
                    value={entry[`dynamic_email_${index}`] || ''}
                    onChange={(e) => handleDynamicChange(index, e.target.name, e.target.value)}
                    placeholder="Email"
                    className="form-control"
                  />
                </div>
                <div className="mb-3 col-lg-6 col-md-6 col-12">
                  <input
                    type="text"
                    name={`dynamic_mobile_${index}`}
                    value={entry[`dynamic_mobile_${index}`] || ''}
                    onChange={(e) => handleDynamicChange(index, e.target.name, e.target.value)}
                    placeholder="Firstname"
                    className="form-control"
                  />
                </div>
                {/* Similar input fields for lname, email, and mobile */}
              </div>
            ))}
         
       
      </Form>
   
     </Modal.Body>
        <Modal.Footer>
       <button className="btn btn-secondary mx-2" onClick={handleAddMore}>
          Add More
        </button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick ={(e)=>onSubmitClick(e)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Home
