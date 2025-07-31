import "./styles.css";
import { FunctionFactory } from "./shared";
import { Task, Project} from "./backend";
import { modifyUIRightContainer, eraseNewTaskContainer, defaultUITaskContainer, modifyUIProjectsContainer, clearUIProjectsContainer } from "./frontend";
import { projectManager } from "./frontend";

const functionFactory = FunctionFactory();




function createTaskForm (project) {

    //const newTaskFormAttr = {
        //action : "executeSomeScript.js",
        //method : "post",
        //onsubmit : "{submitFunction}"
    //}

    const newTaskFormLabelElements = [
        //type  //class  //attributes   //text
        ["label", "", {for : "taskname"}, "Task Name"],
        ["label", "", {for : "taskdescription"}, "Task Description"],
        ["label", "", {for : "tasknotes"}, "Task Notes"]
    ];

    const newTaskFormInputElements = [
        //type  //class  //attributes
        ["input", "", { type : "text",
                        id : "taskname",
                        name : "task_name",
                        placeholder : "Put the name of the task",
                        required : ""}
                    ],
        ["input", "", { type : "text",
                        id : "taskdescription",
                        name : "task_description",
                        placeholder : "Put the description of the task",
                        required : ""}
        ],
        ["input", "", { type : "text",
                        id : "tasknotes",
                        name : "task_notes",
                        placeholder : "Put some notes for the task (if you need to)",
                        }
        ]
    ]

    const newTaskSubmit = {
        type : "submit"
    }



    // create form
    const newTaskForm = functionFactory.createNewElement("form","newTaskForm");
    // create all rows, labels and inputs
    for (let i=0; i < newTaskFormLabelElements.length; i++) {
        const taskFormRow = functionFactory.createNewElement("div","task-form-row");
        const newLabelElement = functionFactory.createLabelOrInput(i, newTaskFormLabelElements);
        const newInputElement = functionFactory.createLabelOrInput(i, newTaskFormInputElements)
        functionFactory.appendChildToElement(taskFormRow, newLabelElement);
        functionFactory.appendChildToElement(taskFormRow, newInputElement);
        functionFactory.appendChildToElement(newTaskForm, taskFormRow);
    }

    //create submit button
    const formSubmitButton = functionFactory.createNewElement("button","",newTaskSubmit,"Submit");
    functionFactory.appendChildToElement(newTaskForm, formSubmitButton);
    //create cancel button
    const formCancelButton = functionFactory.createNewElement("button","cancel","","Cancel");
    //append buttons
    functionFactory.appendChildToElement(newTaskForm, formCancelButton);

    //change the behaviour on submit and cancel buttons
    modifyFormBehaviour(newTaskForm, formSubmitButton, formCancelButton, Task, project);

    return newTaskForm
}



function modifyFormBehaviour(newForm, formSubmitButton, formCancelButton, objectClass, project) {




    function modifyFormSubmit() {
        // prevent default
        newForm.addEventListener("submit", function(e) {
            e.preventDefault();
        // creates an object with the form data
            const formData = new FormData(newForm, formSubmitButton);
            const dataObject = Object.fromEntries(formData.entries())                    
            const newObj = instanceData(dataObject, objectClass);

            // si es task o project que siga caminos distintos
            switch (objectClass) {

               
                case Task:
                    // Agregar la tarea al proyecto
                    project.addTask(newObj);
                    // Actualizar la UI
                    clearUIProjectsContainer();
                    modifyUIProjectsContainer();
                    eraseNewTaskContainer();
                    defaultUITaskContainer();
                    
            

                case Project:
                    // agregar project al project manager y limpiar la UI
                    clearUIProjectsContainer();
                    projectManager.addProject(newObj);
                    modifyUIProjectsContainer();
                    eraseNewTaskContainer();
                    defaultUITaskContainer();
                    
            }

        });
        }
    
    
    function instanceData(dataObject, ClassType) {
        switch (ClassType) {

            case Task:
                const newTask = new ClassType(
                    dataObject.task_name,
                    dataObject.task_description,
                    dataObject.task_notes
                );
                return newTask;

            case Project:
                const newProject = new ClassType(dataObject.project_name);
                return newProject;

            default:
                console.error("Tipo de clase no reconocido.");
                return null;
        }
}

    

    function modifyFormCancel() {
        formCancelButton.addEventListener("click", () => {
            eraseNewTaskContainer();
            defaultUITaskContainer();
        })

    }

    modifyFormSubmit();
    modifyFormCancel();
    
}


     
function newTaskAction(project) {
    const newTaskForm = createTaskForm(project);
    modifyUIRightContainer(newTaskForm);
}




///////////////////////////////////////////////


const newProjectFormLabelElements = [
    //type  //class  //attributes   //text
    ["label", "", {for : "projectname"}, "Project Name"],
];

const newProjectFormInputElements = [
    //type  //class  //attributes
    ["input", "", { type : "text",
                    id : "projectname",
                    name : "project_name",
                    placeholder : "Put the name of project",
                    required : ""}
    ]
]

const newProjectSubmit = {
    type : "submit"
}

function createProjectForm() {
    // crea un formulario con label project name, un text input boton submit y cancel
    // al hacer submit tiene que prevent default, crear un objeto con la form data
    // crear el elemento html con la data del nombre y su boton (orientarse con el IDPROJECT para llegar al boton + correspodniente?)
    // pasar el project al project manager

    // create form, rows, labels and input
    const newProjectForm = functionFactory.createNewElement("form", "projectForm");
    for (let i=0; i < newProjectFormLabelElements.length; i++) {
        const projectFormRow = functionFactory.createNewElement("div","project-form-row");
        const newLabelElement = functionFactory.createLabelOrInput(i, newProjectFormLabelElements);
        const newInputElement = functionFactory.createLabelOrInput(i, newProjectFormInputElements)
        functionFactory.appendChildToElement(projectFormRow, newLabelElement);
        functionFactory.appendChildToElement(projectFormRow, newInputElement);
        functionFactory.appendChildToElement(newProjectForm, projectFormRow);

        //create submit button
        const formSubmitButton = functionFactory.createNewElement("button","",newProjectSubmit,"Submit");
        const formCancelButton = functionFactory.createNewElement("button","cancel","","Cancel");
        // append buttons
        functionFactory.appendChildToElement(newProjectForm, formSubmitButton);
        functionFactory.appendChildToElement(newProjectForm, formCancelButton);

        // modify the form submit
        modifyFormBehaviour(newProjectForm, formSubmitButton, formCancelButton, Project);
  
    }
    return newProjectForm
}

function newProjectAction() {

    const newProjectForm = createProjectForm();
    console.log(newProjectForm); //
    modifyUIRightContainer(newProjectForm);
    //modifyUInewTaskForm(newTaskForm);

}


// loads default project and default tasks
const testTask1 = new Task("primera", "random task", "no");
const testTask2 = new Task("2", "random task", "2");
const testTask3 = new Task("3", "random task", "3");
const testProject2 = new Project("Default_Project");
testProject2.addTask(testTask1);
testProject2.addTask(testTask2);
testProject2.addTask(testTask3);
projectManager.addProject(testProject2);



// loads default UI for projects
modifyUIProjectsContainer();

// execute
defaultUITaskContainer();






// new project
const addProjectButton = functionFactory.getElement(".add.project");
addProjectButton.addEventListener("click", () => {
    newProjectAction();
})


export {createTaskForm, newTaskAction}