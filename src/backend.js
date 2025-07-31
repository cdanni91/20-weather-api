import { Checker } from "./shared";
import { FunctionFactory } from "./shared";

class Task {
  //private variables
  #isCompleted;

  constructor(name, description, notes = "") {
    this.name = name;
    this.description = description;
    this.notes = notes;

    //you must use the #
    this.#isCompleted = false;
  }

  // methods for class, utiles cuando no depende de estados internos
  static printClass() {
    console.log(this);
  }

  // methods
  printTaskInfo() {
    console.log(this);
  }

  markAsComplete() {
    this.#isCompleted = true;
  }

  markAsPending() {
    this.#isCompleted = false;
  }
}

class Project {
  #tasks;

  checker = Checker();

  constructor(name) {
    this.name = name;
    this.#tasks = [];
  }

  printTasks() {
    console.log(this.#tasks);
  }

  addTask(task) {
    // revisa si la task es una instancia de la clase Task y la agrega
    if (!this.checker.checkIfInstanceOf(task, Task)) return;
    this.#tasks.push(task);
  }

  removeTask(taskToRemove) {
    // Renamed parameter to 'taskToRemove' for clarity
    // revisa si la task es una instancia de la clase Task
    if (!this.checker.checkIfInstanceOf(taskToRemove, Task)) return;

    // Find the index of the task to remove
    const index = this.#tasks.findIndex((task) => task === taskToRemove);

    if (index > -1) {
      // If the task is found (index is not -1)
      this.#tasks.splice(index, 1); // Remove it using splice
      console.log(
        `Task '${taskToRemove.name}' removed from project '${this.name}'.`,
      );
    } else {
      console.warn(
        `Task '${taskToRemove.name}' not found in project '${this.name}'.`,
      );
    }
  }

  getTasks() {
    return this.#tasks;
  }
}

class ProjectManager {
  #projects;

  checker = Checker();

  constructor() {
    this.#projects = [];
  }

  addProject(project) {
    if (!this.checker.checkIfInstanceOf(project, Project)) return;
    this.#projects.push(project);
  }

  printProjects() {
    console.log(this.#projects);
  }

  getProjects() {
    return this.#projects;
  }

  getProject(projectName) {
    return this.#projects.find((project) => project.name === projectName);
  }

  removeProject(projectToRemove) {
    // Renamed parameter to 'taskToRemove' for clarity
    // revisa si la task es una instancia de la clase Task
    if (!this.checker.checkIfInstanceOf(projectToRemove, Project)) return;

    // Find the index of the task to remove
    const index = this.#projects.findIndex(
      (project) => project === projectToRemove,
    );

    if (index > -1) {
      // If the task is found (index is not -1)
      this.#projects.splice(index, 1); // Remove it using splice
      console.log(
        `Project '${projectToRemove.name}' removed from project manager '${this.name}'.`,
      );
    } else {
      console.warn(
        `Project '${projectToRemove.name}' not found in project manager '${this.name}'.`,
      );
    }
  }
}

export { Task, Project, ProjectManager };
