

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
  
  
var getDataCapteur = function(){
    var url_id = "http://92.167.119.186:8080/api/index.php?cptId=1&id=last"
  
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


       document.getElementById("temperature_id_1").innerHTML = ' ' + temperature + "°C"
       document.getElementById("date_id_1").innerHTML = date
       document.getElementById("humidite_id_1").innerHTML = ' ' + humidite + "%"

      }
    }
    httpRequest.open('GET', url_id, true)
    httpRequest.send()

//----------  On REQUETE LE NOM DU CAPTEUR a la bd

  }

//On Lance la fonction au chargement de la page


function DataNameLoad(){

    var url_name = "http://92.167.119.186:8080/api/capteur.php?id=1"
  
    var httpRequest = getHttpRequest()
    httpRequest.onreadystatechange = function(){
      if(httpRequest.readyState === 4){

// On décode le Javascript - variable de temperature
var data = JSON.parse(httpRequest.responseText)
//On enregistre la  variable de nom
var Capteur_name = data.map(function(elem){
    return elem.Cpt_Caracteristique
  })
       document.getElementById("name_capteur").innerHTML =  Capteur_name
     
      }
    }
    httpRequest.open('GET', url_name, true)
    httpRequest.send()
}

window.onload = function (){getDataCapteur(); DataNameLoad();}


// ------------------  On Crée la fonction d'ouverture de la popup + connection API --------------------------------

  function SetModal(){

    var modal = document.getElementById("myModal");
    
    // Get the button that opens the modal
    var btn = document.getElementById("set_modal");
    
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
     
    var url_edit_inf = "http://92.167.119.186:8080/api/capteur.php?id=1"
    
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

        // On met à jour le nom du capteur dans l'interface
        var update_capteur_name = document.getElementById("edit_Name").value
        document.getElementById("name_capteur").innerHTML =  update_capteur_name


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
           var url_updating =   	"http://92.167.119.186:8080/api/capteur.php?id=1"
           // make the HTTP put request using fetch api
           fetch(url_updating, putMethod)
           .then(response => response.json())
           .then(data => console.log(data)) // ON AFFICHE LE SUCCÉS DANS LA CONSOLE
           .catch(err => console.log(err)) // ON AFFICHE UN MESSAGE D'ERREUR
   
    
    }




    function AddDataCapteur(){

     // On enregistre les données dans des variables respectives
     var AddData_Latitude_capteur = document.getElementById("add_cpt_latitude").value
     var AddData_Longitude_capteur = document.getElementById("add_cpt_longitude").value
     var AddData_Adresse_capteur = document.getElementById("add_cpt_adress").value
     var AddData_Name_capteur = document.getElementById("add_cpt_name").value
     var AddData_Activation_capteur = "0"

     var AddData = new Object(); 

     // utilisation du constructeur Object
     AddData.Cpt_Caracteristique = AddData_Name_capteur
     AddData.Cpt_Latitude = AddData_Latitude_capteur
     AddData.Cpt_Longitude = AddData_Longitude_capteur
     AddData.Cpt_Adresse = AddData_Adresse_capteur
     AddData.Cpt_Activation = AddData_Activation_capteur

     const POSTMethod = {
        method: 'POST', // MethodE POST
        headers: {
         'Content-type': 'application/json; charset=UTF-8' // ON RENSEINGE LE HEAD DU HTML
        },
        body: JSON.stringify(AddData) // ON ENVOIE LES DATA SOUS FORMAT JSON
       }
       var url_adding = "http://92.167.119.186:8080/api/capteur.php"
       // make the HTTP put request using fetch api
       fetch(url_adding, POSTMethod)
       .then(response => response.json())
       .then(data => console.log(data)) // ON AFFICHE LE SUCCÉS DANS LA CONSOLE
       .catch(err => console.log(err)) // ON AFFICHE UN MESSAGE D'ERREUR

 
       

    }
