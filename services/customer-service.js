import CustomerModel from "../models/customer-model.js"

const URL_API ="https://645284acbce0b0a0f74922d6.mockapi.io/"

const refRegistro = document.querySelector('#registro');
const refListar = document.querySelector('#listar');
const refBuscar = document.querySelector('#buscar');

const myHeaders = new Headers({
    "content-Type": "application/json"
});
const postCustomer = (datos) =>{
    fetch(`${URL_API}/customers`,
    {
        method: "POST",
        headers: myHeaders,
        body:JSON.stringify(CustomerModel)
    }
    ).then(res=>{
        return res.json()
    }).then(res =>{
        console.log(res);
    }).catch(err =>{
        console.log(err);
    })

}


const getCustomers = async() => {
    try {
        const respuesta = await fetch(`${URL_API}/customers`);
        // si la respuesta es correcta
        if (respuesta.status === 200){
            const datos = await respuesta.json();
            viewDaraHtml(datos);
        }else if(respuesta.status === 401){
            console.log('la url no es correcta');
        }else if(respuesta.status === 404){
            console.log('el cliente que busca no existe');
        }else{
            console.log('se presento un error');
        }
    } catch(error){
        console.log(error);
    }
}
function saveCustomer(){
    CustomerModel.createdAt= '2023-02-02'
    CustomerModel.nombre = 'campers 2023'
    CustomerModel.apellidos = 'xxxx'
    CustomerModel.fechaNacimiento = 'xxx'
    postCustomer(CustomerModel);

}
function verOcultar(divsVisible){
    console.log(divsVisible);

}
refListar.addEventListener("click",getCustomers);
refRegistro.addEventListener("click",(e)=>{
    verOcultar(['#reg',['#listar','#buscar']]);
    e.preventDefault();
    e.stopImmediatePropagation();
});
document.querySelectorAll('.tapOpcion').forEach((val.id) =>{
    val.addEventListener("click",(e)=>{
        let datos = JSON.parce(e.target.dataset.verOcultar);
    })
});


function viewDaraHtml(dataCustomer){
    console.log(dataCustomer);
}