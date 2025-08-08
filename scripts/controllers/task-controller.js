import {TASK_OPERATIONS} from "../data/services/task-operations.js"
window.addEventListener('load',init);
function init(){
    bindEvents();
    showCount();
    disableButtons();
}
function bindEvents(){
    document.getElementById('add').addEventListener('click',addTask);
    document.querySelector('#delete').addEventListener('click',deleteForever);
    document.querySelector('#save').addEventListener('click',save);
    document.querySelector('#load').addEventListener('click',load);
}
function disableButtons(){
    document.querySelector('#delete').setAttribute('disabled',true);
    document.querySelector('#update').setAttribute('disabled',true);
}
function save(){
    if(window.localStorage){
        const tasks= TASK_OPERATIONS.getTask();
        localStorage.tasks=JSON.stringify(tasks);
        alert("Data Saved In Local");
    }
    else{
        alert("Outdated Browser, No Support Of Local");
    }
}
function load(){
    if(window.localStorage){
        if(localStorage.tasks){
            const tasks = JSON.parse(localStorage.tasks);
            printTaskTable(tasks);
            showCount();
        }
        else{
            alert("No Data in Local");
        }
    }
    else{
        alert("Outdated Browser, No Support Of Local");
    }
}
const fields=['id','name','description','date','color','url'];
function addTask(){
    const taskObject={};
    for(let field of fields){
        let fieldValue = document.querySelector(`#${field}`).value;
        taskObject[field]=fieldValue;
    }
    console.log('Task Object', taskObject);
    TASK_OPERATIONS.add(taskObject);
    printTask(taskObject);
    showCount();
    clar
}
function clearFields(){
    for(let field of fields){
        document.querySelector(`#${field}`).value='';
    }
    document.querySelector('#id').focus();
}
function deleteForever(){
    const tasks = TASK_OPERATIONS.remove();
    printTaskTable(tasks);
    showCount();
}
function printTaskTable(tasks){
    document.querySelector('#task-list').innerHTML='';
    // tasks.forEach(taskObject=>printTask(taskObject));
    tasks.forEach(printTask);
}
function edit(){
}
function toggleDelete(){
    console.log('Toggle Delete', this);
    let icon = this;
    const tr = icon.parentNode.parentNode;
    const taskId = icon.getAttribute('task-id');
    TASK_OPERATIONS.toggleMark(taskId);
    tr.classList.toggle('table-danger');
    showCount();
    const enabledOrdisabled=TASK_OPERATIONS.getMarkedCount()>0?false:true;
    document.querySelector('#delete').disabled=enabledOrdisabled;
}
function createIcon(className,fn,taskId){
    const iconTag = document.createElement('i');
    iconTag.className = `fa-solid ${className} me-3 hand`;
    iconTag.addEventListener('click',fn);
    iconTag.setAttribute('task-id',taskId)
    return iconTag;
}
function createImage(url){
    const imageTag=document.createElement('img');
    imageTag.src=url;
    imageTag.className='size';
    return imageTag;
}
function showColor(color){
    const divTag=document.createElement('div');
    divTag,style="width:50px;height:50px;background-color:"+color;
    return divTag;
}
function printTask(taskObject){
    const tbody = document.querySelector('#task-list');
    const tr= tbody.insertRow();
    for(let key in taskObject){
        if(key=='isMarked'){
            continue;
        }
        let td = tr.insertCell();
        if(key=='url'){
            td.appendChild(createImage(taskObject[key]));
            continue
        }
        else if(keu=='color'){
            td.appendChild(showColor(taskObject[key]));
            continue;
        }
        td.innerText = taskObject[key];
    }
    let td = tr.insertCell();
    td.appendChild(createIcon('fa-pen-fancy',edit,taskObject.id));
    td.appendChild(createIcon('fa-trash',toggleDelete,taskObject.id));
}
function showCount(){
    document.querySelector('#total').innerText = TASK_OPERATIONS.getSize();
    document.querySelector('#marked').innerText = TASK_OPERATIONS.getMarkedCount();
    document.querySelector('#unmarked').innerText = TASK_OPERATIONS.getUnmarkedCount();
}
