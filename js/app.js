
// DATOS DE COLOMBIA Y DE LAS CARDS MUNDIALES
let cargarJSON =()=> {
    //   aqui realizamos la conecion ya sea a una archvo o a una appi
    let totalConfirmedWorld=0;
    let totalDeathsWorld=0;
    let totalRecoveredWorld=0;

    let totalPaisesInfectados=0;
    fetch('https://api.covid19api.com/summary')

        .then((respuesta)=>respuesta.json()) 
        .then(data => { 
                
              data.Countries.forEach(element => {
                 

                  //conteo de los paises infectados
                  if (element.TotalConfirmed>0){
                      totalPaisesInfectados+=1;
                  }

                  //dato de colombia para la portada
                  if(element.Country=="Colombia"){
 
                      document.querySelector(".col_cantidad").textContent=element.TotalConfirmed;
                      document.querySelector(".col_muertos").textContent = element.TotalDeaths;
                      document.querySelector(".col_recuperados").textContent = element.TotalRecovered;
                   
                  }
                 
                  totalConfirmedWorld += element.TotalConfirmed;
                  totalDeathsWorld += element.TotalDeaths;
                  totalRecoveredWorld+= element.TotalRecovered;
               

              });



              document.querySelector('.fecha_confirmed').textContent = data.Date.slice(0,-20);
              document.querySelector('.fecha_deaths').textContent = data.Date.slice(0, -20);
              document.querySelector('.fecha_pais').textContent = data.Date.slice(0, -20);
              document.querySelector('.fecha_recovered').textContent = data.Date.slice(0, -20);
              
              document.querySelector(".total_confirmed_world").textContent = new Intl.NumberFormat().format(totalConfirmedWorld);

              document.querySelector(".total_deaths_world").textContent = new Intl.NumberFormat().format(totalDeathsWorld);
               
              document.querySelector(".total_paises_infectados").textContent = new Intl.NumberFormat().format(totalPaisesInfectados);

              document.querySelector(".total_recuperados_world").textContent = new Intl.NumberFormat().format(totalRecoveredWorld);

            
        
        }, 
        error => {
            console.log(error);
        })
}


let cargarDatosPais = () => {
    let paises='<option>Seleccionar País</option>';
    fetch('https://api.covid19api.com/countries')

        .then((respuesta) => respuesta.json())
        .then(data => {
            // console.log(data);
            let html = '<option>Seleccionar País</option>';
            let paisSinEspacio="";
            data.forEach(element => {

              paisSinEspacio = (element.Country.replace(/\s/g, '-'));
                         
              html += `<option value="${paisSinEspacio}">${element.Country}</option>  `;

            });
           
            document.getElementById("paises").innerHTML = html;
        },
            error => {
                console.log(error);
            })
}
cargarJSON();
cargarDatosPais();