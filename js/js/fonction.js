// ---------------------   FONCTION du CAPTEUR N°1 ------------------------------------

const divCreator = new DivCreator();

var new_cpt = function add_li_nav(){
  function DivCreator() {
  let count = 0;

  this.createLI = function() {
    count++;

    /*var marker_tab = document.getElementById('markup');*/

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
}






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