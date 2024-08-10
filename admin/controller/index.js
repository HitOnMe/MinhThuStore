
function renderStaff(staffs, objects){
    staffs.forEach((staff, index) =>{
        var content = `<tr>
        <td>${staff.createdAt}</td>    
        <td>${staff.name}</td> 
        <td class='phone__image'><img src='${staff.screen}'></img></td> 
        <td>${staff.backCamera}</td> 
        <td>${staff.frontCamera}</td>     
        <td>${staff.img}</td>   
        <td>${staff.desc}</td>   
        <td>${staff.type}</td>   
        <td>${staff.id}</td> 
        </tr>`;
        objects.innerHTML += content;
    })
   }
var url = "https://66adc881b18f3614e3b5e0b7.mockapi.io/product";
axios({
    url: url,
    method: 'GET',
}).then(response => {renderStaff(response.data, document.getElementById('staffContent'))}).catch('err')