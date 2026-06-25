package com.shantanu.employee_management_system.service;

import java.util.List;
import com.shantanu.employee_management_system.entity.Employee;
import com.shantanu.employee_management_system.exception.EmployeeNotFoundException;
import com.shantanu.employee_management_system.repository.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Add Employee
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Get All Employees with Pagination and Sorting
    public Page<Employee> getAllEmployees(int page, int size, String sortBy) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy)
        );

        return employeeRepository.findAll(pageable);
    }
    // Get Employees By Department
public List<Employee> getEmployeesByDepartment(String department) {
    return employeeRepository.findByDepartment(department);
}

    // Get Employee By ID
    public Employee getEmployeeById(Long id) {

        return employeeRepository.findById(id)
                .orElseThrow(() ->
                        new EmployeeNotFoundException(
                                "Employee not found with id " + id));
    }

    // Update Employee
    public Employee updateEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Delete Employee
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    // Search Employee By Name
    public List<Employee> searchEmployeeByName(String name) {
    return employeeRepository.findByNameContainingIgnoreCase(name);
    }

    // Get Employees By Salary Range
    public List<Employee> getEmployeesBySalaryRange(double min, double max) {
        return employeeRepository.findBySalaryBetween(min, max);
    }
}