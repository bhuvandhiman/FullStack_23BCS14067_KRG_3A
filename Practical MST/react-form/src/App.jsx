import { useState } from "react";

function App() {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: ""
  });

  // State for all submissions
  const [submissions, setSubmissions] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    setSubmissions([...submissions, formData]); // add new submission
    setFormData({ name: "", email: "", course: "" }); // reset form
  };

  return (
    <div style={styles.container}>
      <h1>Student Form</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {/* Table */}
      {submissions.length > 0 && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Inline styles
const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  form: { display: "flex", flexDirection: "column", gap: "10px", width: "300px", margin: "auto" },
  table: { marginTop: "20px", marginLeft: "auto", marginRight: "auto", borderCollapse: "collapse" },
};

export default App;
