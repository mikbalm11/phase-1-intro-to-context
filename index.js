
function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeesArray) {
    const employeeRecords = [];
    employeesArray.forEach(employee => {
        employeeRecords.push(createEmployeeRecord(employee));
    });
    return employeeRecords;
}

function createTimeInEvent(employee, datestamp) {
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(datestamp.slice(-4)),
        date: datestamp.slice(0, 10)
    });
    return employee;
}

function createTimeOutEvent(employee, datestamp) {
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(datestamp.slice(-4)),
        date: datestamp.slice(0, 10)
    });
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    const timeInHours = employee.timeInEvents.find(event => event.date === date).hour;
    const timeOutHours = employee.timeOutEvents.find(event => event.date === date).hour;

    return (timeOutHours - timeInHours) / 100;
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);

    const totalWages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employee, date);
    }, 0);

    return totalWages;
}

function calculatePayroll(employees) {
    let payroll = 0;
    employees.forEach(employee => { 
        payroll += allWagesFor(employee);
    });

    return payroll;
}
