let parsed_customObjects = customObject;
let parsed_formulas = formulass;

let list_autoComplete = document.getElementById("list");
let textArea = document.getElementById("inputTextarea");
textArea.focus();

function getMouseClick() { //mouse click ile cursorun yeri değişirse
    getCursorPosition();
}
function getCursorPosition() {//Cursor index takibi yapan fonk
   let textarea = document.getElementById("inputTextarea");
   let cursor_index = textarea.selectionStart;
   return cursor_index;
}
function getArrowKeys(event) { // ok tuşları ve enter control 
    let keyCode_arrow_left = 37;
    let keyCode_arrow_up = 38;
    let keyCode_arrow_right = 39;
    let keyCode_arrow_down = 40;
    let keyCode_enter = 13;
    let activeElement = document.activeElement.tagName;
    let ul = document.getElementById("list");
    let ul_items = ul.getElementsByTagName("li");
    let textArea = document.getElementById("inputTextarea");
    let cursor_index = getCursorPosition();

    if (event.keyCode==keyCode_arrow_left 
        || event.keyCode==keyCode_arrow_up 
        || event.keyCode==keyCode_arrow_right 
        || event.keyCode==keyCode_arrow_down
        && activeElement=="TEXTAREA" ) {
        getCursorPosition();
    }

    if(event.keyCode==keyCode_arrow_up
       && activeElement=="INPUT"){
        for(let i=0;i<ul_items.length;i++){
            if(ul_items[i].classList == "active"
                && i==0){
                ul_items[ul_items.length-1].classList.add("active");
                ul_items[i].classList.remove("active");
                break;
            }
            if(ul_items[i].classList == "active"
            && i!=0){
                ul_items[i].classList.remove("active");
                ul_items[i-1].classList.add("active");
                break;
            }
        }
    }
    if(event.keyCode==keyCode_arrow_down
        && activeElement=="INPUT"){
        for(let i=0;i<ul_items.length;i++){
            if(ul_items[i].classList == "active"
                && i==(ul_items.length-1)){
                ul_items[0].classList.add("active");
                ul_items[ul_items.length-1].classList.remove("active");
                break;
            }
            if(ul_items[i].classList == "active"
            && i!=(ul_items.length-1)){
                ul_items[i].classList.remove("active")
                ul_items[i+1].classList.add("active");
                break;
            }
        }
    }
    if(event.keyCode==keyCode_enter
        && activeElement=="INPUT"){
        for (let i = 0; i < ul_items.length; i++) {
            if(ul_items[i].classList=="active"){
                let text_activeElement = ul_items[i].innerText;
                let textAreaValue = textArea.value;
                document.getElementById("inputTextarea").value = textAreaValue.slice(0,cursor_index)+text_activeElement+ textAreaValue.slice(cursor_index);
                document.getElementById("auto-comp").style.visibility = "hidden";
                textArea.focus();
                textArea.setSelectionRange(cursor_index+text_activeElement.length,cursor_index+text_activeElement.length);
            }
        } 
    }
}
function inputControl(){ //yazılacak
    let hiddenTextArea = document.getElementById("hiddenTextarea");
    let textAreaInput = document.getElementById("inputTextarea").value;
}

function ctrlSpace(event) {
    let keyCode_space = 32;
    let hiddenTextBox = document.getElementById("hiddenTextBox");
    if(event.ctrlKey 
       && event.keyCode==keyCode_space){
       custObjClicked();
       hiddenTextBox.focus();
    }
}

function custObjClicked(){
    let hiddenTextBox = document.getElementById("hiddenTextBox");
    let ul = document.getElementById("list");
    ul.innerHTML = "";

    document.getElementById("customObjects").style.backgroundColor = "#ccc";
    document.getElementById("formulas").style.backgroundColor = "#fff";
    document.getElementById("operators").style.backgroundColor = "#fff";

    for (let i = 0; i < parsed_customObjects.length; i++) {
       let ul_item = document.createElement("li");
       if(i==0){
        ul_item.classList.add("active");
        }
       ul_item.appendChild(document.createTextNode(parsed_customObjects[i].formulaName));
       ul.appendChild(ul_item);
    }
    document.getElementById("auto-comp").style.visibility = "visible";
    hiddenTextBox.focus();
}
function fieldsClicked(){ //yazılacak
    let hiddenTextBox = document.getElementById("hiddenTextBox");
    let txtAreaInput = document.getElementById("inputTextarea").value;
    let cursor_index = getCursorPosition();
    let hiddenTextArea = document.getElementById("hiddenTextarea");
    let ul = document.getElementById("list");
    let counter=0;
    let custObjName = "";

    if(txtAreaInput[cursor_index-1]=="."){
        for(let i=cursor_index-2;i>-1;i--){
            if(txtAreaInput[i]==' '
                ||txtAreaInput[i]=='\n'){
                    counter = i+1;
                    for(let j=counter;j<cursor_index;j++){
                        custObjName+=txtAreaInput[j];
                    }
                    break;
            }
            else if(i==0){
                counter = 0;
                for(let j=counter;j<cursor_index-2;j++){
                    custObjName+=txtAreaInput[j];
                }
                break;
            }
            else{
                ul.innerHTML = "";
            }
        }
        console.log(custObjName.length);
    }
}

function formulasClicked(){
    let hiddenTextBox = document.getElementById("hiddenTextBox");
    let ul = document.getElementById("list");
    ul.innerHTML = "";

    document.getElementById("customObjects").style.backgroundColor = "#fff";
    document.getElementById("formulas").style.backgroundColor = "#ccc";
    document.getElementById("operators").style.backgroundColor = "#fff";

    for (let i = 0; i < parsed_formulas.length; i++) {
        let ul_item = document.createElement("li");
        if(i==0){
            ul_item.classList.add("active");
        }
        ul_item.appendChild(document.createTextNode(parsed_formulas[i].example));
        ul.appendChild(ul_item);

    }
    document.getElementById("auto-comp").style.visibility = "visible";
    hiddenTextBox.focus();
}

function operatorsClicked(){
    let hiddenTextBox = document.getElementById("hiddenTextBox");
    let ul = document.getElementById("list");
    let array_operators = ["AND","OR","NOT","IN","<",">","<=",">=","+","-","*","/"];
    ul.innerHTML = "";

    document.getElementById("customObjects").style.backgroundColor = "#fff";
    document.getElementById("formulas").style.backgroundColor = "#fff";
    document.getElementById("operators").style.backgroundColor = "#ccc";
    
    for (let i = 0; i < array_operators.length; i++) {
        let ul_item = document.createElement("li");
        if(i==0){
            ul_item.classList.add("active");
        }
        ul_item.appendChild(document.createTextNode(array_operators[i]));
        ul.appendChild(ul_item);        
    }
    document.getElementById("auto-comp").style.visibility = "visible";
    hiddenTextBox.focus();
}
function escClicked(event){
    let keyCode_esc = 27;
    let textArea = document.getElementById("inputTextarea");
    let hiddenTextBox = document.getElementById("hiddenTextBox");
    if(event.keyCode == keyCode_esc){
        hiddenTextBox.focus();
        document.getElementById("auto-comp").style.visibility = "hidden";
        textArea.focus();
    }
}

function funcListClicked(){//yazılacak
    
}