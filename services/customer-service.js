import CustomerModel from "../models/customer-model.js"

const URL_API ="https://645284acbce0b0a0f74922d6.mockapi.io/"

const frmRegistro = document.querySelector('#frmData');
const inputFrm = document.forms['frmData'];
const botones = document.querySelectorAll('.btn');
let idUser = 0;

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
        idUser=res.id;
        console.log(res);
    }).catch(err =>{
        console.log(err);
    })

}
const putCustomer = (datos) =>{
    fetch(`${URL_API}/customers/${idUser}`,
        {
            method: "PUT",
            headers: myHeaders,
            body:JSON.stringify(datos)
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
            console.log('se presento un error en la peticion');
        }
    } catch(error){
        console.log(error);
    }
}
function saveCustomer(){
    CustomerModel.createdAt= '2023-02-02';
    CustomerModel.nombres = 'campers 2023';
    CustomerModel.apellidos = 'xxxx';
    CustomerModel.email = 'xxxx';
    CustomerModel.fechaNacimiento = '199-09-08';
    postCustomer(CustomerModel);

}
function verOcultar(divsVisible){
    console.log(divsVisible);

}
document.querySelectorAll('.tabOpcion').forEach((val,id) =>{
    val.addEventListener("click",(e)=>{
        let datos = JSON.parse(e.target.dataset.verocultar);
        let cardVer = document.querySelector(datos[0]);
        if (cardVer.id == '#reg'){
            
        }
        cardVer.style.display = 'block';
        datos[1].forEach(card => {
            let cardActual = document.querySelector(card);
            cardActual.style.display = 'none';
        });
        e.stopImmediatePropagation();
        e.preventDefault();
    })
});

/* function viewDaraHtml(dataCustomer){
    console.log(dataCustomer);
}
document.querySelector('#btnNuevo').addEventListener("click",(e) =>{
    inputFrm.querySelectorAll('.form-control').forEach((e) =>{
        e.value = '';
        if (e.name == 'createdAt'){
            e.valueAsDate = new Date();
            e.disabled = true;
        }
       
    }) */
document.querySelectorAll('.btn').forEach((e) =>{
    e.addEventListener("click",(evento) =>{
        let datos = JSON.parce(evento.target.dataset.activardesactiva);
        let cardVer = document.querySelector(datos[0]);
        datos[0].forEach(btnActivar =>{
            let btnActual = document.querySelector(btnActivar);
            btnActual.classList.toggle('disabled');
        })
        datos[1].forEach(btnActivar =>{
            let btnActual = document.querySelector(btnActivar);
            if(!(btnActual.classList.contains('disabled'))){
                btnActual.classList.toggle('disabled');
            }
        })

    })
})

document.querySelector('#btnGuardar').addEventListener("click", (e) =>{
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    console.log(datos);
    postCustomer(datos);
})
document.querySelector('#btnEditar').addEventListener("click",(e) =>{
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    putCustomer(datos);
})
function ActibarBtn(){
    
}