

var getHttpRequest = function(){
    var httpRequest = false;
  // ------------------- FONCTION verification de Compatibilité des écrans ----------------------
  
  if(window.XMLHttpRequest){
    httpRequest = new XMLHttpRequest();
    if(httpRequest.overrideMimeType){
      httpRequest.overrideMimeType('text/xml')
    }
  }
  else if (window.ActiveXObject){ 
    try {
        httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
      }
      catch (e){
        try{
          httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e) {}
    }
  }
  if(!httpRequest){
      alert('Abandon :( Impossible de créer une instance XMLHTTP');
      return false;
  }
  return httpRequest;
  }
  
  // ---------------------   FONCTION du CAPTEUR N°1 ------------------------------------
function getAllDataCapteur(){
//
var url_getCapteurAll = "http://92.167.119.186:8080/api/capteur.php"

    var httpRequest = getHttpRequest()
    httpRequest.onreadystatechange = function(){
      if(httpRequest.readyState === 4){

// On décode le Javascript - variable de temperature
  var data = JSON.parse(httpRequest.responseText)
  //On enregistre la  variable de temperature

    for(i=0 ; i < data.length ; i++){
      // faire une requete pour recuperer infos des capteurs
      // Afficher les informations dans la page html
      
    var IdCpt = data[i].Cpt_Id

    getDataCapteur(IdCpt)
    }

 }
    }

    httpRequest.open('GET', url_getCapteurAll, true)
    httpRequest.send()

}

  



var getDataCapteur = function(IdCpt){

  var url_id = "http://92.167.119.186:8080/api/index.php?cptId="+IdCpt+"&id=last"

    var httpRequest = getHttpRequest()
    httpRequest.onreadystatechange = function(){


      if(httpRequest.readyState === 4){

// On décode le Javascript - variable de temperature
       var data = JSON.parse(httpRequest.responseText)
//On enregistre la  variable de temperature
       var temperature = data.map(function(elem){
         return elem.Rel_Temp
       })
// On enregistre la  variable d'humidité
       var humidite = data.map(function(elem){
         return elem.Rel_Hum
       })
// On enregistre la variable de date
        var date = data.map(function(elem){
         return elem.Rel_Date
       })   

      var parent = document.getElementById("bloc_carte_weather");
      var newDiv =  document.createElement('div')
      newDiv.innerHTML = '\
      <div class="carte_weather" id="'+IdCpt+'" onclick="updatachart('+IdCpt+')">\
      <div id="set_modal'+IdCpt+'" class="set_modal" onclick="SetModal('+IdCpt+')">\
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></div>\
      <div class="text_carte">\
     <h2>CAPTEUR <span id="name_capteur'+IdCpt+'"></span></h2>\
       <p><span ><b>Humidité:</b></span><span id="humidite_id'+IdCpt+'">'+humidite +'%</span><p>\
       <em><p id="date_id'+IdCpt+'" style="font-size: 12px; font-style: italic;">'+date+'</p></em>\
       </div>\
     <div class="temp_carte">\
       <p id="temperature_id'+IdCpt+'"><b>'+temperature+'°C</b></p>\
     </div></div>\
';

      parent.append(newDiv)


      if(temperature > 25){
        document.getElementById("temperature_id"+IdCpt).style.color = '#f90000'

       } else if(temperature > 20){
        document.getElementById("temperature_id"+IdCpt).style.color = '#b45931'

       }else {
        document.getElementById("temperature_id"+IdCpt).style.color = 'blue;'
       }

       if(humidite > 50){
        document.getElementById("humidite_id"+IdCpt).style.color = '#005188'
      }else if(humidite > 40){
        document.getElementById("humidite_id"+IdCpt).style.color = '#65a9d7'

      }else if(humidite > 30){
        document.getElementById("humidite_id"+IdCpt).style.color = '#9ad6ff'

      }else{
        document.getElementById("humidite_id"+IdCpt).style.color = '#cbeaff'
      }  
       
      DataNameLoad(IdCpt)

  }

}
  
httpRequest.open('GET', url_id, true)
httpRequest.send()

//----------  On REQUETE LE NOM DU CAPTEUR a la bd

  }

//On Lance la fonction au chargement de la page


function DataNameLoad(IdCpt){

    var url_name = "http://92.167.119.186:8080/api/capteur.php?id="+IdCpt+""
  
    var httpRequest = getHttpRequest()
    httpRequest.onreadystatechange = function(){
      if(httpRequest.readyState === 4){

// On décode le Javascript - variable de temperature
var data = JSON.parse(httpRequest.responseText)
//On enregistre la  variable de nom
var Capteur_name = data.map(function(elem){
    return elem.Cpt_Caracteristique
  })
   document.getElementById("name_capteur"+IdCpt).innerHTML = Capteur_name

      }

    }
    httpRequest.open('GET', url_name, true)
    httpRequest.send()
}



// ------------------  On Crée la fonction d'ouverture de la popup + connection API --------------------------------

  function SetModal(IdCpt){

    var modal = document.getElementById("myModal");
    
    // Get the button that opens the modal
    var btn = document.getElementById("set_modal"+IdCpt);
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    // When the user clicks the button, open the modal 
    btn.onclick = function() {
      modal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
     
    var url_edit_inf = "http://92.167.119.186:8080/api/capteur.php?id="+IdCpt+""
    
    var httpRequest = getHttpRequest()
    httpRequest.onreadystatechange = function(){
      if(httpRequest.readyState === 4){
    
    // On décode le Javascript - variable de temperature
       var data = JSON.parse(httpRequest.responseText)


    //On enregistre la  variable de nom
       var Capteur_name = data.map(function(elem){
         return elem.Cpt_Caracteristique
       })
    // On enregistre la  variable de latitude
       var Capteur_latitude = data.map(function(elem){
         return elem.Cpt_Latitude
       })
    // On enregistre la variable de longitude
        var Capteur_longitude = data.map(function(elem){
         return elem.Cpt_Longitude
       })
    
       // On enregistre la variable Adress
       var Capteur_adress = data.map(function(elem){
        return elem.Cpt_Adresse
      })

      var Capteur_activation = data.map(function(elem){
        return elem.Cpt_Activation
       
      })
      var Capteur_Id = data.map(function(elem){
        return elem.Cpt_Id
       
      })

      if (Capteur_activation == "1" ) { 
        document.getElementById("edit_Activation").checked = true
        document.getElementById("edit_Activation").setAttribute('value', '1')    
       
     }
     else{
        document.getElementById("edit_Activation").checked = false
        document.getElementById("edit_Activation").setAttribute('value', '0')
        
     }    

      var Capteur_dateInstall = data.map(function(elem){
        return elem.Cpt_DateInstallation
      })



    document.getElementById("edit_Name").value =  Capteur_name
    document.getElementById("edit_Latitude").value =  Capteur_latitude
    document.getElementById("edit_Longitude").value =  Capteur_longitude
    document.getElementById("edit_Adress").value =  Capteur_adress
    document.getElementById("edit_Installation").innerHTML =  Capteur_dateInstall
    document.getElementById("edit_Id").value =  Capteur_Id


       
      }
    }
    httpRequest.open('GET', url_edit_inf, true)
    httpRequest.send()
    
    }


  // ---------------------   FONCTION d'implementation de valeur active' ------------------------------------

   function checkbok_activation(){
       var on_off = document.getElementById("edit_Activation").checked
        // On enregistre l'element HTML 
       var value_activation = document.getElementById("edit_Activation") 
       if(on_off == true){
        // Si l'utilisateur coche la case alors on passe la valeur 1 à l'input
           value_activation.setAttribute('value', '1');
       }
       else{
        // Sinon la valeur 0
        value_activation.setAttribute('value', '0');
       }
       
   }





     // ---------------------   FONCTION UPDATING DATA USING PUT METHOD  ------------------------------------


function UpdateData(){

   
        // On enregistre les données dans des variables respectives
        var update_Latitude_capteur = document.getElementById("edit_Latitude").value
        var update_Longitude_capteur = document.getElementById("edit_Longitude").value
        var update_Adresse_capteur = document.getElementById("edit_Adress").value
        var update_capteur_Id = document.getElementById("edit_Id").value

        // On met à jour le nom du capteur dans l'interface
        var update_capteur_name = document.getElementById("edit_Name").value
        document.getElementById("name_capteur"+update_capteur_Id).innerHTML =  update_capteur_name
        
        var update_capteur_Activation = document.getElementById("edit_Activation").value
        var update_capteur_Installation = document.getElementById("edit_Installation").textContent

        var UpdateData = new Object(); 

        // utilisation du constructeur Object
        UpdateData.Cpt_Caracteristique = update_capteur_name
        UpdateData.Cpt_Latitude = update_Latitude_capteur 
        UpdateData.Cpt_Longitude = update_Longitude_capteur 
        UpdateData.Cpt_Adresse = update_Adresse_capteur
        UpdateData.Cpt_Activation = update_capteur_Activation
        UpdateData.Cpt_DateInstallation = update_capteur_Installation

        // DÉCLARATION DE LA MÉTHODE D'ENVOI 
        const putMethod = {
            method: 'PUT', // MethodE UPDATING
            headers: {
             'Content-type': 'application/json; charset=UTF-8' // ON RENSEINGE LE HEAD DU HTML
            },
            body: JSON.stringify(UpdateData) // ON ENVOIE LES DATA SOUS FORMAT JSON
           }


      
           var url_updating = "http://92.167.119.186:8080/api/w_Capteur.php?id="+update_capteur_Id+""
           // make the HTTP put request using fetch api
           fetch(url_updating, putMethod)
           .then(response => response.json())
           .then(data => {
            document.getElementById("succes_update").innerHTML = data.status_message
            document.getElementById("edit_Latitude").value = ''
            document.getElementById("edit_Longitude").value = ''
            document.getElementById("edit_Name").value = ''
            document.getElementById("edit_Adress").value = ''
            document.getElementById("edit_Activation").checked = false
           }) // ON AFFICHE LE SUCCÉS DANS LA CONSOLE
           .catch(err => {
            document.getElementById("succes_update").innerHTML = err.status_message
       
           }) // ON AFFICHE UN MESSAGE D'ERREUR
   
    }



    function AddDataCapteur(){

     // On enregistre les données dans des variables respectives
     var AddData_Latitude_capteur = document.getElementById("add_cpt_latitude").value
     var AddData_Longitude_capteur = document.getElementById("add_cpt_longitude").value
     var AddData_Adresse_capteur = document.getElementById("add_cpt_adress").value
     var AddData_Name_capteur = document.getElementById("add_cpt_name").value
     var AddData_Activation_capteur = 1

     var AddData = new Object(); 

     // utilisation du constructeur Object
     AddData.Cpt_Caracteristique = AddData_Name_capteur
     AddData.Cpt_Latitude = AddData_Latitude_capteur
     AddData.Cpt_Longitude = AddData_Longitude_capteur
     AddData.Cpt_Adresse = AddData_Adresse_capteur
     AddData.Cpt_Activation = AddData_Activation_capteur

     //-------- ON CRÉE UN NOUVEAU LI dans le menu ---- 


     const POSTMethod = {
        method: 'POST', // MethodE POST
        headers: {
         'Content-type': 'application/json; charset=UTF-8' // ON RENSEINGE LE HEAD DU HTML
        },
        body: JSON.stringify(AddData) // ON ENVOIE LES DATA SOUS FORMAT JSON
       }


       var url_adding = "http://92.167.119.186:8080/api/w_Capteur.php"
       // make the HTTP put request using fetch api
       fetch(url_adding, POSTMethod)
       .then(response => response.json())
       .then(data => {
         document.getElementById("succes_add").innerHTML = data.status_message
         document.getElementById("add_cpt_latitude").value = ''
         document.getElementById("add_cpt_longitude").value = ''
         document.getElementById("add_cpt_adress").value = ''
         document.getElementById("add_cpt_name").value = ''
         
        })
       .catch(err => {
        document.getElementById("succes_add").innerHTML = err.status_message

       }) // ON AFFICHE UN MESSAGE D'ERREUR
      
     }

     /*function DeleteData(){

  
      var delete_capteur_Id = document.getElementById("edit_Id").value

      // DÉCLARATION DE LA MÉTHODE D'ENVOI 
      const DeleteMethod = {
          method: 'DELETE', // MethodE UPDATING
          body: JSON.stringify(UpdateData) // ON ENVOIE LES DATA SOUS FORMAT JSON
         }


    
         var url_deleting = "http://92.167.119.186:8080/api/w_Capteur.php?id="+delete_capteur_Id+""
         // make the HTTP put request using fetch api
         fetch(url_deleting, DeleteMethod)
         .then(response => response.json())
         .then(data => {console.log(data)
         }) // ON AFFICHE LE SUCCÉS DANS LA CONSOLE
         .catch(err => {
          document.getElementById("succes_update").innerHTML = err.status_message
     
         }) // ON AFFICHE UN MESSAGE D'ERREUR
 
  }*/