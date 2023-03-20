/*Fetch the list  */
const list_task = document.getElementById('list');
const load = (event) => {
    const target = event.target;
   if(target.status === 200)
   {
        const responseText=target.responseText; //added json content to list
        console.log(responseText);
        const toDoList1 = JSON.parse(responseText);
        toDoList1.forEach(toDoList => addList(toDoList));

   }

}


const addList=(toDoList)=>{
    const item = document.createElement('li');
    item.id="checkedd"
    console.log(item);
    // code to add view button
    const v_description=document.createElement('button'); 
    v_description.innerHTML = "View Task";
    v_description.className="viewbtn"   //added class to view button

    //code to add delete button
    let del=document.createElement('button');
    del.innerHTML = "Delete Task";
    del.className="delete"; //added class delete to button

    
//added mark as done button
    const x=document.createElement('button'); 
    x.innerHTML = "Mark as done";
    x.className="btnn"   //added class to mark as done button


        //setting up the variables from list
         item.textContent=toDoList.title;
         let title_show=toDoList.title;
        let id = toDoList.id;
        let des_list=toDoList.description;
        let due_date_list=toDoList.due_date;
        let due_time_list=toDoList.due_time;
        let status_list=toDoList.status;
    
        //onclick function for view button
    v_description.onclick = function() {
       item.innerHTML=`<p> ID:${id} <br> Title:${title_show} <br>Description:${des_list} <br>Due Date:${due_date_list}<br> Due Time:${due_time_list} <br>Status:${status_list} </p>`
  
    }
       //view function to retrieve
    v_description.ondblclick=function(){
        item.textContent=title_show;
    }



   // added strike through property
    x.onclick = function() {
       
        item.innerHTML=`<h4 class="box">${item.textContent}</h4>`;
        
        
    }

    x.ondblclick=function(){
        item.innerHTML=`<h4 class="chng">${item.textContent}</h4>`;
    }

    

    //onclick function for delete button
    del.onclick = function() {
        list_task.removeChild(item);
        list_task.removeChild(v_description);
        list_task.removeChild(x);
        list_task.removeChild(del);

            
     }
/*Appending every element to the display */
        list_task.appendChild(item);
        list_task.appendChild(x);
        list_task.appendChild(v_description);
        list_task.appendChild(del);


}


//function to hide form element
document.getElementById('person').style.display = "none";
function formHide() {
  const form = document.getElementById('person'); 
  form.style.display = 'block';

};

/* Function to display form elements on view*/
function AddData() 
{       //setting up the variables form element
        const form = document.getElementById('person');
        const name = form.elements['id'];
        const title = form.elements['title'];
        const description = form.elements['description'];
        const date1 = form.elements['date1'];
        const due_time = form.elements['due_time'];
        const status = form.elements['status'];

        // getting the element's value
        let letters = ' /^[A-Za-z0-9]*$/'; 
        
       
        let fullName = name.value;
        let title_1 = title.value;
        let des_1=description.value;
        let date__1=date1.value;
        let due_timee=due_time.value;
        let stat=status.value;

        //added form validation
        if(!/^[0-9]+$/.test(fullName)){
            alert("Id should be a number");
            return false;
        }
        if(title_1=="" || title_1==" " || des_1=="" || date__1=="" || due_timee=="" || stat==""){
            alert("all fields are mandatory");
            return false;
        }
        else{
            let array= 
            {
                "id" : fullName,
        
                "title":  title_1,
                
                "description": des_1,
                 
                "due_date": date__1,
                
                "due_time": due_timee,
                
                "status" : stat

            }
        

        addList(array);
        ResetForm();  //reseting form after submit
        document.getElementById('person').style.display = "none"; //hiding form element after submission


        }
         
    
}

//function to reset form element
function ResetForm(){
    document.getElementById("person").reset();
}
//call to xhr
const xhr = new XMLHttpRequest();
xhr.open('GET','data/toDoList.json');
xhr.addEventListener('load',load);
xhr.send();