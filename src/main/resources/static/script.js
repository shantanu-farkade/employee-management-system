const BASE_URL = "http://localhost:8081/employees";

/* ===========================
   LOGIN CHECK
=========================== */

if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

/* ===========================
   LOGOUT
=========================== */

function logout() {

    localStorage.removeItem("loggedIn");

    window.location.href = "login.html";
}

/* ===========================
   DASHBOARD STATS
=========================== */

function updateDashboardStats(employees) {

    document.getElementById("totalEmployees").innerText =
        employees.length;

    const departments = new Set();

    let totalSalary = 0;

    let maxSalary = 0;

    employees.forEach(emp => {

        departments.add(emp.department);

        totalSalary += Number(emp.salary);

        if (Number(emp.salary) > maxSalary) {

            maxSalary = Number(emp.salary);
        }

    });

    document.getElementById("totalDepartments").innerText =
        departments.size;

    document.getElementById("avgSalary").innerText =
        employees.length > 0
            ? "₹" + Math.round(totalSalary / employees.length)
            : "₹0";

    document.getElementById("maxSalaryDisplay").innerText =
    "₹" + maxSalary;
}

/* ===========================
   LOAD EMPLOYEES
=========================== */

function loadEmployees() {

    const page =
        document.getElementById("page").value || 0;

    const size =
        document.getElementById("size").value || 5;

    const sortBy =
        document.getElementById("sortBy").value || "id";

    fetch(
        `${BASE_URL}?page=${page}&size=${size}&sortBy=${sortBy}`
    )

        .then(response => {

            if (!response.ok) {

                throw new Error("Failed to load employees");
            }

            return response.json();
        })

        .then(data => {

            displayEmployees(data.content);
        })

        .catch(error => {

            console.error(error);

            alert("Unable to load employees.");
        });
}

/* ===========================
   DISPLAY EMPLOYEES
=========================== */

function displayEmployees(employees) {

    const table =
        document.getElementById("employeeTable");

    table.innerHTML = "";

    if (employees.length === 0) {

        table.innerHTML = `

        <tr>

            <td colspan="8">

                No Employees Found

            </td>

        </tr>

        `;

        updateDashboardStats([]);

        return;
    }

    employees.forEach(emp => {

        table.innerHTML += `

        <tr>

            <td>${emp.id}</td>

            <td>${emp.name}</td>

            <td>${emp.email}</td>

            <td>${emp.phone}</td>

            <td>${emp.department}</td>

            <td>${emp.designation}</td>

            <td>${emp.salary}</td>

            <td>

                <button
                    onclick="editEmployee(
                        ${emp.id},
                        '${emp.name}',
                        '${emp.email}',
                        '${emp.phone}',
                        '${emp.department}',
                        '${emp.designation}',
                        ${emp.salary}
                    )">

                    Edit

                </button>

                <button
                    onclick="deleteEmployee(${emp.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;
    });

    updateDashboardStats(employees);
}

/* ===========================
   ADD EMPLOYEE
=========================== */

function addEmployee() {

    const employee = {

        name:
            document.getElementById("name").value.trim(),

        email:
            document.getElementById("email").value.trim(),

        phone:
            document.getElementById("phone").value.trim(),

        department:
            document.getElementById("department").value.trim(),

        designation:
            document.getElementById("designation").value.trim(),

        salary:
            parseFloat(
                document.getElementById("salary").value
            )
    };

    fetch(BASE_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(employee)

    })

        .then(response => {

            if (!response.ok) {

                throw new Error("Failed to add employee");
            }

            return response.json();
        })

        .then(() => {

            alert("Employee Added Successfully");

            clearForm();

            loadEmployees();
        })

        .catch(error => {

            console.error(error);

            alert("Unable to add employee.");
        });
}

/* ===========================
   EDIT EMPLOYEE
=========================== */

function editEmployee(
    id,
    name,
    email,
    phone,
    department,
    designation,
    salary
) {

    document.getElementById("id").value = id;

    document.getElementById("name").value = name;

    document.getElementById("email").value = email;

    document.getElementById("phone").value = phone;

    document.getElementById("department").value = department;

    document.getElementById("designation").value = designation;

    document.getElementById("salary").value = salary;
}

/* ===========================
   UPDATE EMPLOYEE
=========================== */

function updateEmployee() {

    const employee = {

        id:
            parseInt(
                document.getElementById("id").value
            ),

        name:
            document.getElementById("name").value.trim(),

        email:
            document.getElementById("email").value.trim(),

        phone:
            document.getElementById("phone").value.trim(),

        department:
            document.getElementById("department").value.trim(),

        designation:
            document.getElementById("designation").value.trim(),

        salary:
            parseFloat(
                document.getElementById("salary").value
            )
    };

    fetch(BASE_URL, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(employee)

    })

        .then(response => {

            if (!response.ok) {

                throw new Error("Failed to update employee");
            }

            return response.json();
        })

        .then(() => {

            alert("Employee Updated Successfully");

            clearForm();

            loadEmployees();
        })

        .catch(error => {

            console.error(error);

            alert("Unable to update employee.");
        });
}

/* ===========================
   DELETE EMPLOYEE
=========================== */

function deleteEmployee(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this employee?"
        );

    if (!confirmDelete) {

        return;
    }

    fetch(`${BASE_URL}/${id}`, {

        method: "DELETE"

    })

        .then(response => {

            if (!response.ok) {

                throw new Error("Failed to delete employee");
            }

            alert("Employee Deleted Successfully");

            loadEmployees();
        })

        .catch(error => {

            console.error(error);

            alert("Unable to delete employee.");
        });
}

/* ===========================
   SEARCH BY NAME
=========================== */

function searchByName() {

    const name =
        document.getElementById("searchName")
            .value
            .trim();

    if (name === "") {

        loadEmployees();

        return;
    }

    fetch(`${BASE_URL}/search?name=${name}`)

        .then(response => response.json())

        .then(data => {

            displayEmployees(data);
        })

        .catch(error => {

            console.error(error);
        });
}

/* ===========================
   SEARCH BY DEPARTMENT
=========================== */

function searchByDepartment() {

    const department =
        document.getElementById("searchDepartment")
            .value
            .trim();

    if (department === "") {

        loadEmployees();

        return;
    }

    fetch(
        `${BASE_URL}/department/${department}`
    )

        .then(response => response.json())

        .then(data => {

            displayEmployees(data);
        })

        .catch(error => {

            console.error(error);
        });
}

/* ===========================
   FILTER SALARY
=========================== */

function filterSalary() {

    const min =
        document.getElementById("minSalary").value;

    const max =
        document.getElementById("maxSalary").value;

        console.log("Min:", min);
        console.log("Max:", max);

    if (min === "" || max === "") {

        alert(
            "Please enter minimum and maximum salary."
        );

        return;
    }

    fetch(
        `${BASE_URL}/salary?min=${min}&max=${max}`
    )

        .then(response => response.json())

        .then(data => {

            displayEmployees(data);
        })

        .catch(error => {

            console.error(error);
        });
}

/* ===========================
   CLEAR FORM
=========================== */

function clearForm() {

    document.getElementById("id").value = "";

    document.getElementById("name").value = "";

    document.getElementById("email").value = "";

    document.getElementById("phone").value = "";

    document.getElementById("department").value = "";

    document.getElementById("designation").value = "";

    document.getElementById("salary").value = "";
}

/* ===========================
   PAGE LOAD
=========================== */

window.onload = function () {

    loadEmployees();
};

