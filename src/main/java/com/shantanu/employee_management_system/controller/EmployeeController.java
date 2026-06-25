package com.shantanu.employee_management_system.controller;

import jakarta.validation.Valid;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shantanu.employee_management_system.entity.Employee;
import com.shantanu.employee_management_system.service.EmployeeService;
import org.springframework.data.domain.Page;

@RestController
@RequestMapping("/employees")
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Add Employee
   @PostMapping
   public Employee addEmployee(@Valid @RequestBody Employee employee) {
    return employeeService.saveEmployee(employee);
}

    // Get All Employees
    @GetMapping
public Page<Employee> getAllEmployees(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(defaultValue = "id") String sortBy) {

    return employeeService.getAllEmployees(page, size, sortBy);
}

    // Get Employee By ID
    @GetMapping("/{id}")
   public Employee getEmployeeById(@PathVariable Long id) {
    return employeeService.getEmployeeById(id);
}

    // Update Employee
    @PutMapping
    public Employee updateEmployee(@RequestBody Employee employee) {
        return employeeService.updateEmployee(employee);
    }

    // Delete Employee
    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }

    // Get Employees By Department
    @GetMapping("/department/{department}")
    public List<Employee> getEmployeesByDepartment(
        @PathVariable String department) {

    return employeeService.getEmployeesByDepartment(department);
    }

    // Search Employee By Name
    @GetMapping("/search")
    public List<Employee> searchEmployeeByName(
            @RequestParam String name) {
    
        return employeeService.searchEmployeeByName(name);
    }

    // Get Employees By Salary Range
    @GetMapping("/salary")
    public List<Employee> getEmployeesBySalaryRange(
            @RequestParam double min,
            @RequestParam double max) {
    
        return employeeService.getEmployeesBySalaryRange(min, max);
    }
}
