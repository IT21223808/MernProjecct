import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { MdOutlineClose } from "react-icons/md";
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const formRef = useRef(null); // Create a ref for the form

  const getAdmin = async () => {
    try {
      const response = await axios.get("http://localhost:8080/login/sucess", { withCredentials: true });
      console.log("response", response);
    } catch (error) {
      navigate("*");
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  axios.defaults.baseURL = "http://localhost:8080/";
  const [addSection, setAddSection] = useState(false);
  const [editItem, setEditItem] = useState(null); // State to manage editing item
  const [formData, setFormData] = useState({
    Name: "",
    age: "",
    status: "",
    Image: ""
  });

  const handleOnChange = (el) => {
    const { name, value, type } = el.target;
    const newValue = type === 'file' ? el.target.files[0] : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue
    }));

    if (type === 'file') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          Image: e.target.result
        }));
      };
      reader.readAsDataURL(el.target.files[0]);
    }
  };

  const handleSubmit = async (el) => {
    el.preventDefault();
    if (editItem) {
      // Update operation
      const data = await axios.put("/update", { id: editItem._id, ...formData });
      if (data.data.success) {
        setEditItem(null);
        toast.success("Updated");
        getFectchData();
        setAddSection(false); // Close the form
        scrollFormToTop(); // Scroll form to the top
      }
    } else {
      // Create operation
      const data = await axios.post("/create", formData);
      if (data.data.success) {
        setAddSection(false);
        toast.success("Created");
        getFectchData();
        scrollFormToTop(); // Scroll form to the top
      }
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setFormData(item); // Populate the form fields with item data
    setAddSection(true);
  };

  const [dataList, setDataList] = useState([]);
  const getFectchData = async () => {
    try {
      const response = await axios.get("/");
      if (response.data.success) {
        setDataList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getFectchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    if (data.data.success) {
      getFectchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (id) => {
    const data = await axios.put("/update", { id });
    if (data.data.success) {
      alert(data.data.message);
      getFectchData();
    }
  };

  const scrollFormToTop = () => {
    formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="h-full w-full  items-center justify-center">
      <h1 className='font-serif text-center text-2xl '>Student List</h1>
      <div className="container">
        <button className='btn btn-add flex items-center justify-center ' onClick={() => setAddSection(true)}>Add&nbsp;
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        </button>
        {
          addSection && (
            <div className="addContainer" ref={formRef}>

              <form onSubmit={handleSubmit}>
                <div className="close-btn" onClick={() => setAddSection(false)}><MdOutlineClose /></div>

                <label htmlFor="name">Name :</label>
                <input type="text" id='name' name='Name' value={formData.Name} onChange={handleOnChange} />

                <label htmlFor="age">Age :</label>
                <input type="number" id='age' name='age' value={formData.age} onChange={handleOnChange} />

                <label htmlFor="status">Status :</label>
                <select id="status" name="status" value={formData.status} onChange={handleOnChange} >
                  <option value="none">None</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <label htmlFor="image">Image</label>
                <input type="file" name='Image' onChange={handleOnChange} />

                <button className='btn' type="submit">Submit</button>

              </form>

            </div>
          )
        }
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Status</th>
                <th>Image</th>
                <th>Options</th>
              </tr>
            </thead>


            <tbody>
              {dataList.length > 0 ? (
                dataList.map((el) => (
                  <tr key={el._id} className='text-center items-center justify-center'>
                    <td className="text-center items-center justify-center !important">{el.Name}</td>
                    <td>{el.age}</td>
                    <td>{el.status}</td>
                    <td>
                      <img src={el.Image} alt='img' style={{ width: '180px', height: '180px' }} />
                    </td>
                    <td className=' items-center justify-evenly  '>
                      <button className="btn btn-edit flex items-center mb-2 bg-yellow-300  " onClick={() => handleEdit(el)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                          />
                        </svg>&nbsp;
                        Edit</button>
                      <button className="btn btn-delete flex items-center justify-center bg-red-500 text-xl" onClick={() => handleDelete(el._id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                          />
                          <path
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                          />
                        </svg>&nbsp;
                        Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>No data</td>
                </tr>
              )}


            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
