import { FunctionFactory } from "./shared";
import { ProjectManager, Project, Task } from "./backend";
import { createTaskForm, newTaskAction } from ".";

const functionFactory = FunctionFactory();
const projectManager = new ProjectManager();


function eraseNewTaskContainer () {
    const container = functionFactory.getElement(".new.task.container");
    functionFactory.removeElementHTML(container);
}

function modifyUIRightContainer(elementToShow) {
    const elementToModify = functionFactory.getElement(".new.task.container")
    functionFactory.removeElementHTML(elementToModify);
    functionFactory.appendChildToElement(elementToModify, elementToShow);
}

function modifyUIProjectsContainer() {

 
    // limpia el contenedor de projects (1)
    const allProjectsContainer = functionFactory.getElement(".projects-container");
    //functionFactory.removeElementHTML(allProjectsContainer);

    // obtenemos todos los proyectos (2)
    const projects = projectManager.getProjects();
    console.log(projects);

    // ejecutar para actualizar el listado de projects (3)
    // por cada proyecto
    projects.forEach(project => {

        // creamos un div con classname project-"project.name"
        let dirtyProjectClassName = `project-${project.name}`;

        // Reemplaza todos los espacios en blanco (s) con guiones bajos (_)
        const projectClassName = dirtyProjectClassName.replace(/\s/g, '_');



        // html correspondiente al project
        const newProjectElement = functionFactory.createNewElement("div",projectClassName);
            const newProjectHeader = functionFactory.createNewElement("div","project-header");
                const newProjectTitle =  functionFactory.createNewElement("div","project-title","",project.name);
                const addTaskButton = functionFactory.createNewElement("button","add-task", "", "+");
                const removeProjectButton = functionFactory.createNewElement("button","remove-project", "", "X");


        // modificamos el boton de agregar tareas y lo vinculamos?
        addTaskButton.addEventListener("click", () => {
            newTaskAction(project); // <- PASAR el proyecto actual
        });
        removeProjectButton.addEventListener("click", () => {

            const response = prompt("Are you sure? Write YES to delet project")

            if (response === "YES") {

                functionFactory.removeElementHTML(newProjectElement);
                projectManager.removeProject(project);

            } else return;

            
        })


        // appends
        functionFactory.appendChildToElement(newProjectHeader,newProjectTitle);
        functionFactory.appendChildToElement(newProjectHeader,addTaskButton);
        functionFactory.appendChildToElement(newProjectHeader,removeProjectButton);
        functionFactory.appendChildToElement(newProjectElement,newProjectHeader);
        // obtenemos todas las tasks del proyecto correspondiente
        const tasks = project.getTasks();
        /////
        // crear un elemento para cada task
        tasks.forEach(task => {
            //console.log(task)
        const newTaskContainer = functionFactory.createNewElement("div", "task", "");
            const newTaskNameContainer = functionFactory.createNewElement("div", "task-name", "", task.name);
            const removeTaskButton = functionFactory.createNewElement("button","remove-task","","X");
        
        removeTaskButton.addEventListener("click", () => {
            // removes the html but also has to update the project

            const response = prompt("Are you sure? Write YES to delete task")

            if (response === "YES") {
                functionFactory.removeElementHTML(newTaskContainer);
                project.removeTask(task);
            } else {
                return
            }
        })

        newTaskNameContainer.addEventListener("click", () => {
            // modificamos la UI derecha para mostrar task name, description y notes
            const taskNameContainer = functionFactory.createNewElement("div","task-name",{},`${task.name}`)
            const taskDescriptionContainer = functionFactory.createNewElement("div","task-desc",{},`${task.description}`)
            const taskNotesContainer = functionFactory.createNewElement("div","task-notes",{},`${task.notes}`)

            const taskContainer = functionFactory.createNewElement("div");

            functionFactory.appendChildToElement(taskContainer,taskNameContainer)
            functionFactory.appendChildToElement(taskContainer,taskDescriptionContainer)
            functionFactory.appendChildToElement(taskContainer,taskNotesContainer)

            modifyUIRightContainer(taskContainer);




        })

        // appends
        functionFactory.appendChildToElement(newTaskContainer,newTaskNameContainer);
        functionFactory.appendChildToElement(newTaskContainer,removeTaskButton);
        functionFactory.appendChildToElement(newProjectElement,newTaskContainer);
            
        });
        
    functionFactory.appendChildToElement(allProjectsContainer, newProjectElement);
    })
        



    //const allProjectsContainer = functionFactory.getElement("projects-container");
    //functionFactory.removeElementHTML(allProjectsContainer);



}

function clearUIProjectsContainer() {

    const allProjectsContainer = functionFactory.getElement(".projects-container");
    functionFactory.removeElementHTML(allProjectsContainer);
}

function defaultUITaskContainer() {
    const title = functionFactory.createNewElement("h1","greetings-title","","Hola");
    const description = functionFactory.createNewElement("h2","greetings-title","","Description");
    const footer = functionFactory.createNewElement("h3","greetings-title","","foooooter");

    const newTaskContainer = functionFactory.getElement(".new.task.container");

    functionFactory.appendChildToElement(newTaskContainer, title);
    functionFactory.appendChildToElement(newTaskContainer, description);
    functionFactory.appendChildToElement(newTaskContainer, footer);

    // create default project, default task and add them

}


export {eraseNewTaskContainer, modifyUIRightContainer, defaultUITaskContainer, modifyUIProjectsContainer, clearUIProjectsContainer, projectManager}