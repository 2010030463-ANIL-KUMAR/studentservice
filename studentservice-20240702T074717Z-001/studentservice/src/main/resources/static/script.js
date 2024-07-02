document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch and display all students
	function fetchStudents() {
	    fetch('http://localhost:8080/students')
	        .then(response => response.json())
	        .then(students => {
	            const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
	            studentTable.innerHTML = '';
	            students.forEach(student => {
	                const row = document.createElement('tr');
	                row.innerHTML = `
	                    <td>${student.id}</td>
	                    <td>${student.name}</td>
	                    <td>${student.admissionNo}</td>
	                    <td>${student.classData ? student.classData.className : 'N/A'}</td>
	                    <td>${student.section ? student.section.sectionName : 'N/A'}</td>
	                    <td>
	                        <button onclick="editStudent(${student.id})">Edit</button>
	                        <button onclick="deleteStudent(${student.id})">Delete</button>
	                    </td>
	                `;
	                studentTable.appendChild(row);
	            });
	        })
	        .catch(error => console.error('Error fetching students:', error));
	}

    fetchStudents();

	// Function to handle form submission (add or edit student)
	document.getElementById('studentForm').addEventListener('submit', function(event) {
	    event.preventDefault();
	    const formData = new FormData(this);
	    const studentData = {
	        id: formData.get('id'),
	        name: formData.get('name'),
	        admissionNo: formData.get('admissionNo'),
	        classData: {
	            className: formData.get('classData')
	        },
	        section: {
	            sectionName: formData.get('section')
	        }
	    };

	    const url = studentData.id ? `http://localhost:8080/students/${studentData.id}` : 'http://localhost:8080/students';

	    fetch(url, {
	        method: studentData.id ? 'PUT' : 'POST', // Ensure PUT method for update
	        headers: {
	            'Content-Type': 'application/json'
	        },
	        body: JSON.stringify(studentData)
	    })
	    .then(response => {
	        if (response.ok) {
	            document.getElementById('studentForm').reset();
	            fetchStudents();
	        } else {
	            console.error('Failed to save student:', response.statusText);
	        }
	    })
	    .catch(error => console.error('Error saving student:', error));
	});


    // Function to prefill form for editing student
    window.editStudent = function(id) {
        fetch(`http://localhost:8080/students/${id}`)
            .then(response => response.json())
            .then(student => {
                document.getElementById('studentId').value = student.id;
                document.getElementById('name').value = student.name;
                document.getElementById('admissionNo').value = student.admissionNo;
                document.getElementById('classData').value = student.classData.className;
                document.getElementById('section').value = student.section.sectionName;
            })
            .catch(error => console.error('Error fetching student:', error));
    };

    // Function to delete a student
    window.deleteStudent = function(id) {
        if (confirm('Are you sure you want to delete this student?')) {
            fetch(`http://localhost:8080/students/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    fetchStudents();
                } else {
                    console.error('Failed to delete student:', response.statusText);
                }
            })
            .catch(error => console.error('Error deleting student:', error));
        }
    };
});
