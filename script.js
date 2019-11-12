let parsed_customObjects = customObject;
let parsed_formulas = formulas;

let list_autoComplete = document.getElementById("list");

function getArrowKeys(event) { // ok tuşları , tusuna basılırsa cursorun yeri 
    let keyCode_arrow_left = 37;
    let keyCode_arrow_up = 38;
    let keyCode_arrow_right = 39;
    let keyCode_arrow_down = 40;

    if (event.keyCode==keyCode_arrow_left 
        || event.keyCode==keyCode_arrow_up 
        || event.keyCode==keyCode_arrow_right 
        || event.keyCode==keyCode_arrow_down) {
        getCursorPosition();
    }
}

function getMouseClick() { //mouse click ile cursorun yeri değişirse
    getCursorPosition();
}

function getCursorPosition() {//Cursor index takibi yapan fonk
   let textarea = document.getElementById("inputTextarea");
   let cursor_index = textarea.selectionStart;
   return cursor_index;
}

function ctrlSpace(event) {
    let keyCode_space = 32;
    let textArea = document.getElementById("hiddenTextBox");
    let cursor_index = getCursorPosition();

    if(event.ctrlKey 
       && event.keyCode==keyCode_space 
       && cursor_index==0 ){
       custObjClicked();
       textArea.focus();
    }
}

function custObjClicked(){

    let ul = document.getElementById("list");
    ul.innerHTML = "";

    document.getElementById("customObjects").style.backgroundColor = "#ccc";
    document.getElementById("fields").style.backgroundColor = "#fff";
    document.getElementById("operators").style.backgroundColor = "#fff";

    for (let i = 0; i < parsed_customObjects.length; i++) {
       let ul_item = document.createElement("li");
       ul_item.appendChild(document.createTextNode(parsed_customObjects[i].formulaName));
       ul.appendChild(ul_item);
    }
    document.getElementById("auto-comp").style.visibility = "visible";
    let hiddenTextBox = document.getElementById("hiddenTextBox");

    hiddenTextBox.focus();
}

function fieldsClicked(){
    let ul = document.getElementById("list");
    ul.innerHTML = "";

    document.getElementById("customObjects").style.backgroundColor = "#fff";
    document.getElementById("fields").style.backgroundColor = "#ccc";
    document.getElementById("operators").style.backgroundColor = "#fff";

    for (let i = 0; i < parsed_formulas.length; i++) {
        let ul_item = document.createElement("li");
        ul_item.appendChild(document.createTextNode(parsed_formulas[i].example));
        ul.appendChild(ul_item);
    }
    document.getElementById("auto-comp").style.visibility = "visible";
}

function operatorsClicked(){
    let ul = document.getElementById("list");
    let array_operators = ["AND","OR","NOT","IN","<",">","<=",">=","+","-","*","/"];
    ul.innerHTML = "";

    document.getElementById("customObjects").style.backgroundColor = "#fff";
    document.getElementById("fields").style.backgroundColor = "#fff";
    document.getElementById("operators").style.backgroundColor = "#ccc";
    
    for (let i = 0; i < array_operators.length; i++) {
        let ul_item = document.createElement("li");
        ul_item.appendChild(document.createTextNode(array_operators[i]));
        ul.appendChild(ul_item);        
    }
}

function escClicked(event){
    let keyCode_esc = 27;
    let textArea = document.getElementById("inputTextarea");
    if(event.keyCode == keyCode_esc){
        textArea.focus();
        document.getElementById("auto-comp").style.visibility = "hidden";
    }

}