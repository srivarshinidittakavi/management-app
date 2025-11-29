document.addEventListener("DOMContentLoaded",()=>{
    let loginBtn=document.getElementById("LoginBtn");
    if(loginBtn){
        loginBtn.addEventListener("click",handleLogin);
    }
    let addFleetBtn=document.getElementById("addFleetBtn");
    if(addFleetBtn){
        addFleetBtn.addEventListener("click",addFleet);

    }
    let clearFilterBtn=document.getElementById("clearFilterBtn");
    if(clearFilterBtn){
        clearFilterBtn.addEventListener("click",clearFilters);

    }
    let categoryFilter=document.getElementById("categoryFilter");
    let availabilityFilter=document.getElementById("availabilityFilter");
    if(categoryFilter)categoryFilter.addEventListener("change",applyFilters);
    if(availabilityFilter)availabilityFilter.addEventListener("change",applyFilters);



});
function handleLogin(){
    let email=document.getElementById("email").value.trim();
    let pass=document.getElementById("password").value.trim();
    if(email==="admin@gmail.com"&&pass==="admin123"){
        alert("Login success");
        window.location.href="admin.html";
    }else{
        alert("wrong email or password");
    }
}
let fleetList=[];
const Fleet_IMG="https://coding-platform.s3.amazonaws.com/dev/lms/tickets/5e80fcb6-3f8e-480c-945b-30a5359eb40e/JNmYjkVr3WOjsrbu.png"
function addFleet(){
    let reg=document.getElementById("reg").value.trim();
    let category=document.getElementById("category").value;
    let driver=document.getElementById("driver").value.trim();
    let avail=document.getElementById("avail").value;
    if(!reg||!driver){
        alert("Alert")
    }

}