import Task from "../models/task.js";
export const TASK_OPERATIONS={
    tasks:[],
    getTask(){
        return this.tasks;
    },
    getSize(){
        return this.tasks.length;
    },
    getMarkedCount(){
        return this.tasks.filter(taskObject=>taskObject.isMarked).length;
    },
    getUnmarkedCount(){
        return (this.getSize()-this.getMarkedCount());
    },
    add(taskObject){
        let task = new Task();
        for(let key in taskObject){
            task[key]=taskObject[key];
        }
        this.tasks.push(task);
        console.log('All tasks are ', this.tasks);
    },
    remove(){
        this.tasks=this.tasks.filter(taskObject=>!taskObject.isMarked);
        return this.tasks;
    },
    search(taskId){
        return this.tasks.find(taskObject=>taskObject.id===taskId);
    },
    update(){
    },
    sort(){
    },
    toggleMark(taskId){
        const taskObject = this.search(taskId);
        if (taskObject){
            taskObject.toggle();
        }
    }
}
