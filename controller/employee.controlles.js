const Employee = require('../model/employee');
const employeeCtrl = {};

employeeCtrl.getEmployees = async (req, res) => {
    const employees = await Employee.find();
    console.log(employees);
    res.json(employees);
};


employeeCtrl.createEmployees = async (req, res) => {
    const employee=new  Employee(req.body);
    await employee.save();
    res.json({
        status:'Empleado guardado'
    });
};

employeeCtrl.getEmployee = async (req, res) => {
    const employee= await Employee.findById(req.params.id);
    console.log(employee);
    res.json(employee); 
};

employeeCtrl.editEmployees = async (req,res)=> {
    const {id}=req.params;
    const employee={
        name:req.body.name,
        position:req.body.position,
        office:req.body.office,
        salary:req.body.salary
    }
    await Employee.findByIdAndUpdate(id,{$set:employee},{new:true});
    res.json({status:'Empleado actualizado' });
};

employeeCtrl.deleteEmployees = async (req,res)=> {
    await Employee.findByIdAndRemove(req.params.id);
    res.json({status:'Empleado eliminado' });

};

module.exports = employeeCtrl;