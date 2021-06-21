

// ---------------------   FONCTION du CAPTEUR N°1 ------------------------------------
function add_navigation_li(){
// ajouter 

    var add_name_capteur = document.getElementById("add_cpt_name").value
    var add_id_capteur = document.getElementById("add_cpt_id").value
    var menu = document.getElementById('liste_menu')


    var liste_puce = document.createElement('li')



    liste_puce.setAttribute("id", add_id_capteur)
    liste_puce.setAttribute("class", "navigation")
    liste_puce.innerText = "CAPTEUR" + " "+ add_name_capteur

}



function supp_navigation_li(){
    var select_li = document.getElementsByClassName("navigation")
    var value_id_capteur = select_li.getElementById("supp_cpt_id").value
    var supp_id_capteur = select_li.getElementById(value_id_capteur)
    supp_id_capteur.remove()

}

var request_ajax = function add_id_request(){

    var active_element = document.getElementsByClassName('active')
    var value_id = active_element.getAttribute("id")
    return value_id

}






/*var new_cpt = function Li_creator() {
  let count = 0;

  this.create_LI = function() {
    count++;

    var marker_tab = document.getElementById('markup');

    // on crée une nouvelle lI
    var liste_puce = document.createElement('li');

    // on incrémente les ID de chaque liste à puce
    liste_puce.setAttribute("id"  + count);

    var inner_div = document.createElement('div');
    inner_div.setAttribute('id', 'mydivheader');
    inner_div.innerText = "\u2756	"
    var editable_element = document.createElement('p');
    editable_element.setAttribute('id', 'txt');
    editable_element.setAttribute('contentEditable', 'true');
    liste_puce.appendChild(inner_div);
    liste_puce.appendChild(editable_element);
    marker_tab.appendChild(liste_puce);
    dragElement(document.getElementById("mydiv"));
  };
}*/






 /*Then, on your button click that creates the div:

document.querySelector('.div-creator').addEventListener('click', () => divCreator.createDiv());

Look a this sample on jsfiddle 35.

}

var get_capteur_request = function getIdCapteur(){
//on enregistre les lI dans une variable
var liste_menu = document.getElementsByTagName('li') 
// si une LI est active alors prendre son id et le ranger dans une variable
if(liste_menu.getElementsByClassName('active')){
}

}*/