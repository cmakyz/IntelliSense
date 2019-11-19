let parsed_customObjects = customObjects;
let parsed_formulas = formulass;
let customObjectList = [];

for (let i = 0; i < parsed_customObjects.length; i++) {

    customObjectList.push(parsed_customObjects[i].formulaName);

}

let list_autoComplete = document.getElementById("list");
let textArea = document.getElementById("inputTextarea");
textArea.focus();

function getMouseClick() { //mouse click ile cursorun yeri değişirse

    getCursorPosition();

}

function getCursorPosition() { //Cursor index takibi yapan fonk

    let textarea = document.getElementById("inputTextarea");
    let cursor_index = textarea.selectionStart;
    return cursor_index;

}

function getArrowEnterBackspaceKeys(event) { // ok tuşları ve enter control 

    let keyCode_arrow_left = 37;
    let keyCode_arrow_up = 38;
    let keyCode_arrow_right = 39;
    let keyCode_arrow_down = 40;
    let keyCode_enter = 13;
    let keyCode_backSpace = 8;
    let activeElement = document.activeElement.tagName;
    let ul = document.getElementById("list");
    let ul_items = ul.getElementsByTagName("li");
    let textArea = document.getElementById("inputTextarea");
    let cursor_index = getCursorPosition();
    let a_list = document.getElementsByTagName("a");
    let tmp_inputText = document.getElementById("inputTextarea").value;
    let hiddenTextArea = document.getElementById("hiddenTextarea");

    if (event.keyCode == keyCode_arrow_left //arrow keys,enter,backspace ile cursor yerinin değişiminin kontrolü
        ||event.keyCode == keyCode_arrow_up
        ||event.keyCode == keyCode_arrow_right
        ||event.keyCode == keyCode_arrow_down
        ||event.keyCode == keyCode_enter
        ||event.keyCode == keyCode_backSpace
        &&activeElement == "TEXTAREA") {

        getCursorPosition();

    }

    if (event.keyCode == keyCode_arrow_up
        &&activeElement == "INPUT") { //arrow up'a basıldığında , autocompleterdaki list itemin aktifliğinin değişmesi

        for (let i = 0; i < ul_items.length; i++) {

            if (ul_items[i].classList.contains("active")
                &&i == 0) {
                ul_items[ul_items.length - 1].classList.add("active");
                ul_items[i].classList.remove("active");
                break;

            }
            else if (ul_items[i].classList.contains("active")
                        &&i != 0) {

                            ul_items[i].classList.remove("active");
                            ul_items[i - 1].classList.add("active");
                            break;

            }
        }
    }

    if (event.keyCode == keyCode_arrow_down //arrow down'a basıldığında , autocompleterdaki list itemin aktifliğinin değişmesi
        &&activeElement == "INPUT") {

        for (var i = 0; i < ul_items.length; i++) {

            if (ul_items[i].classList.contains("active")
                &&i != (ul_items.length - 1)) {

                    ul_items[i].classList.remove("active");
                    ul_items[i + 1].classList.add("active");
                    break;

            }
            else if (i == (ul_items.length - 1)
                        &&ul_items[i].classList.contains("system-true")
                        &&ul_items[i].classList.contains("active")){ 

                            ul_items[i].classList.remove("active");
                            ul_items[0].classList.add("active");
                            break;

            }
        }
    }

    if (event.keyCode == keyCode_enter
        &&activeElement == "INPUT") { //enter'a basıldığında aktif tabdeki aktif li-itemin textarea'ya eklenmesi

        for (let i = 0; i < ul_items.length; i++) {

            for (let j = 0; j < a_list.length; j++) { //customObjects tab'i

                if (ul_items[i].classList.contains("active")
                    &&a_list[j].classList.contains("activated")
                    &&a_list[j].id=="customObjects") {

                    document.getElementById("inputTextarea").value = tmp_inputText.slice(0, cursor_index) + ul_items[i].innerHTML + "." + tmp_inputText.slice(cursor_index);
                    hiddenTextArea.innerText = tmp_inputText.slice(0, cursor_index) + ul_items[i].innerHTML + "." + tmp_inputText.slice(cursor_index);
                    textArea.focus();
                    textArea.setSelectionRange(cursor_index + ul_items[i].innerHTML.length + 1, cursor_index + ul_items[i].innerHTML.length + 1);

                }

                else if (ul_items[i].classList.contains("active")
                        &&a_list[j].classList.contains("activated")
                        &&a_list[j].id == "formulas") { //formulas tab'i
                            
                    for (let k = 0; k < parsed_formulas.length; k++) {

                        if (parsed_formulas[k].example == ul_items[i].innerHTML) {

                            document.getElementById("inputTextarea").value = tmp_inputText.slice(0, cursor_index) + parsed_formulas[k].formula + '()' + tmp_inputText.slice(cursor_index);
                            hiddenTextArea.innerHTML = tmp_inputText.slice(0, cursor_index) + parsed_formulas[k].formula + '()' + tmp_inputText.slice(cursor_index);
                            textArea.focus();
                            textArea.setSelectionRange(cursor_index + parsed_formulas[k].formula.length + 2, cursor_index + parsed_formulas[k].formula.length + 2);
                        
                        }
                    }
                }

                else if (ul_items[i].classList.contains("active")
                        &&a_list[j].classList.contains("activated")
                        &&a_list[j].id == "operators") { //operators tab'i

                            if (ul_items[i].textContent === "AND"
                                ||ul_items[i].textContent === "OR"
                                ||ul_items[i].textContent === "NOT"
                                ||ul_items[i].textContent === "IN") {  

                                    document.getElementById("inputTextarea").value = tmp_inputText.slice(0, cursor_index) + " " + ul_items[i].textContent + " " + tmp_inputText.slice(cursor_index);
                                    hiddenTextArea.innerText = tmp_inputText.slice(0, cursor_index) + ul_items[i].textContent + tmp_inputText.slice(cursor_index);
                                    textArea.focus();
                                    textArea.setSelectionRange(cursor_index + ul_items[i].textContent.length + 2, cursor_index + ul_items[i].textContent.length + 2);  
                            
                            }

                            else {

                                document.getElementById("inputTextarea").value = tmp_inputText.slice(0, cursor_index) + ul_items[i].textContent + tmp_inputText.slice(cursor_index);
                                hiddenTextArea.innerText = tmp_inputText.slice(0, cursor_index) + ul_items[i].textContent + tmp_inputText.slice(cursor_index);
                                textArea.focus();
                                textArea.setSelectionRange(cursor_index + ul_items[i].textContent.length, cursor_index + ul_items[i].textContent.length);
                            
                            }

                }
                
                else if (ul_items[i].classList.contains("active")
                        &&a_list[j].classList.contains("activated")
                        &&a_list[j].id == "fields") { //fields tab'i

                            document.getElementById("inputTextarea").value = tmp_inputText.slice(0, cursor_index) + ul_items[i].innerHTML + " " + tmp_inputText.slice(cursor_index);
                            hiddenTextArea.innerText = tmp_inputText.slice(0, cursor_index) + ul_items[i].innerHTML + " " + tmp_inputText.slice(cursor_index);
                            textArea.focus();
                            textArea.setSelectionRange(cursor_index + ul_items[i].innerHTML.length + 1, cursor_index + ul_items[i].innerHTML.length + 1);

                }

                document.getElementById("auto-comp").style.visibility = "hidden";

            }
        }
    }
}

function inputControl() { //!
    let hiddenTextArea = document.getElementById("hiddenTextarea");

    let visibleTextAreaInput = document.getElementById("inputTextarea").value;

    let cursor_index = getCursorPosition();
    let reverseCustomObjectName = "";

    for (let i = cursor_index-1; i > -1; i--) {

        if(visibleTextAreaInput[i] == '\n') {
            break;
        }
        else {
            reverseCustomObjectName += visibleTextAreaInput[i];
        }
    }

    reverseCustomObjectName = reverse(reverseCustomObjectName);
    hiddenTextArea.innerText = reverseCustomObjectName;

    let distanceX = hiddenTextArea.clientWidth+10;
    let distanceY = hiddenTextArea.clientHeight;
    let getLineNumber = visibleTextAreaInput.substr(0, cursor_index).split("\n").length;

    if(distanceY==0){
        distanceY = 26*getLineNumber;
    }
    else{
        distanceY = distanceY*getLineNumber+10;
    }

    document.getElementById("auto-comp").style.left=distanceX+"px";
    document.getElementById("auto-comp").style.top=distanceY+"px";
    if(visibleTextAreaInput.indexOf('\n')>-1){
        console.log("alt satıra gecildi");
    }
    console.log(distanceX);
}

function ctrlSpace(event) { //tamamlandı
    let keyCode_space = 32;
    let hiddenTextBox = document.getElementById("hiddenTextBox");

    if (event.ctrlKey &&
        event.keyCode == keyCode_space) {
        custObjClicked();
        hiddenTextBox.focus();
    }

}

function custObjClicked() { //tamamlandı
    let hiddenTextBox = document.getElementById("hiddenTextBox");
    let ul = document.getElementById("list");
    ul.innerHTML = "";
    let a_list = document.getElementsByTagName("a");

    for (let i = 0; i < a_list.length; i++) {

        if (a_list[i].id == "customObjects") {
            a_list[i].classList.add("activated");
        } else {
            a_list[i].classList.remove("activated");
        }

    }

    for (let i = 0; i < parsed_customObjects.length; i++) {
        let ul_item = document.createElement("li");

        if (i == 0) {
            ul_item.classList.add("active");
        }
        if (parsed_customObjects[i].isSystem === true) {
            ul_item.classList.add("system-true");
        }

        ul_item.appendChild(document.createTextNode(parsed_customObjects[i].formulaName));
        ul.appendChild(ul_item);
    }

    document.getElementById("auto-comp").style.visibility = "visible";
    hiddenTextBox.focus();
}

function fieldsClicked() { //tammalandı
    let hiddenTextBox = document.getElementById("hiddenTextBox");
    let textAreaInput = document.getElementById("inputTextarea").value;
    let cursor_index = getCursorPosition();
    let ul = document.getElementById("list");
    ul.innerHTML = "";
    let fieldsList = [];
    let reverseCustObjName = "";
    let inpTextArea = textArea.value;
    let inputLength = inpTextArea.length;
    let a_list = document.getElementsByTagName("a");

    for (let i = 0; i < a_list.length; i++) {

        if (a_list[i].id == "fields") {
            a_list[i].classList.add("activated");
        } else {
            a_list[i].classList.remove("activated");
        }

    }

    if (inpTextArea[inputLength - 1] == ".") {

        for (let i = inputLength - 2; i > -1; i--) {

            if (inpTextArea[i] == ' ' ||
                inpTextArea[i] == '\n' ||
                inpTextArea[i] == ".") {
                break;
            } else {
                reverseCustObjName += inpTextArea[i];
            }

        }
    }

    reverseCustObjName = reverse(reverseCustObjName);

    if (textAreaInput[cursor_index - 1] == "." &&
        customObjectList.indexOf(reverseCustObjName) > -1) {

        for (let i = 0; i < customObjectList.length; i++) {

            if (customObjectList[i] == reverseCustObjName) {

                for (let j = 0; j < parsed_customObjects[i].fields.length; j++) {

                    fieldsList.push(parsed_customObjects[i].fields[j].formulaName);
                }
            }
        }
    }

    for (let i = 0; i < fieldsList.length; i++) {
        let ul_item = document.createElement("li");
        ul_item.appendChild(document.createTextNode(fieldsList[i]));

        if (i == 0) {
            ul_item.classList.add("active");
        }

        ul.appendChild(ul_item);
    }

    document.getElementById("auto-comp").style.visibility = "visible";
    hiddenTextBox.focus();

}

function formulasClicked() { //tamamlandı
    let hiddenTextBox = document.getElementById("hiddenTextBox");
    let ul = document.getElementById("list");
    ul.innerHTML = "";
    let a_list = document.getElementsByTagName("a");

    for (let i = 0; i < a_list.length; i++) {

        if (a_list[i].id == "formulas") {
            a_list[i].classList.add("activated");
        } else {
            a_list[i].classList.remove("activated");
        }

    }

    for (let i = 0; i < parsed_formulas.length; i++) {

        let ul_item = document.createElement("li");

        if (i == 0) {
            ul_item.classList.add("active");
        }

        ul_item.appendChild(document.createTextNode(parsed_formulas[i].example));
        ul.appendChild(ul_item);

    }

    document.getElementById("auto-comp").style.visibility = "visible";
    hiddenTextBox.focus();
}

function operatorsClicked() { //tamamlandı
    let hiddenTextBox = document.getElementById("hiddenTextBox");
    let ul = document.getElementById("list");
    let array_operators = ["AND", "OR", "NOT", "IN", "<", ">", "<=", ">=", "+", "-", "*", "/"];
    let a_list = document.getElementsByTagName("a");
    ul.innerHTML = "";

    for (let i = 0; i < a_list.length; i++) {

        if (a_list[i].id == "operators") {
            a_list[i].classList.add("activated");
        } else {
            a_list[i].classList.remove("activated");
        }

    }

    for (let i = 0; i < array_operators.length; i++) {
        let ul_item = document.createElement("li");
        if (i == 0) {
            ul_item.classList.add("active");
        }

        ul_item.appendChild(document.createTextNode(array_operators[i]));
        ul.appendChild(ul_item);
    }

    document.getElementById("auto-comp").style.visibility = "visible";
    hiddenTextBox.focus();
}

function escClicked(event) { // tamamlandı
    let keyCode_esc = 27;
    let textArea = document.getElementById("inputTextarea");
    let hiddenTextBox = document.getElementById("hiddenTextBox");

    if (event.keyCode == keyCode_esc) {
        hiddenTextBox.focus();
        document.getElementById("auto-comp").style.visibility = "hidden";
        textArea.focus();
    }
}

function reverse(str) { //ters texti düze çeviriyor
    return str.split("").reverse().join("");
}

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

list_autoComplete.onclick = function(event) {
    let cursor_index = getCursorPosition();
    let tmp_inputText = document.getElementById("inputTextarea").value;
    let inputTextArea = document.getElementById("inputTextarea");
    let target = getEventTarget(event);
    let a_list = document.getElementsByTagName("a");
    let hiddenTextArea = document.getElementById("hiddenTextarea");
    let ul = document.getElementById("list");
    let ul_items = ul.getElementsByTagName("li");

    for (let i = 0; i < a_list.length; i++) {
        if (a_list[i].className == "activated" &&
            a_list[i].id == "customObjects") {
            document.getElementById("inputTextarea").value = tmp_inputText.slice(0, cursor_index) + target.innerText + "." + tmp_inputText.slice(cursor_index);
            hiddenTextArea.innerText = tmp_inputText.slice(0, cursor_index) + target.innerText + "." + tmp_inputText.slice(cursor_index);
            inputTextArea.focus();
            textArea.setSelectionRange(cursor_index + ul_items[i].innerHTML.length + 1, cursor_index + ul_items[i].innerHTML.length + 1);
        } else if (a_list[i].className == "activated" &&
            a_list[i].id == "formulas") {
            for (let j = 0; j < parsed_formulas.length; j++) {
                if (parsed_formulas[j].example == target.innerText) {
                    document.getElementById("inputTextarea").value = tmp_inputText.slice(0, cursor_index) + parsed_formulas[j].formula + '()' + tmp_inputText.slice(cursor_index);
                    hiddenTextArea.innerText = tmp_inputText.slice(0, cursor_index) + parsed_formulas[j].formula + '()' + tmp_inputText.slice(cursor_index);
                    inputTextArea.focus();
                    textArea.setSelectionRange(cursor_index + parsed_formulas[j].formula.length + 2, cursor_index + parsed_formulas[j].formula.length + 2);
                }
            }
        } else if (a_list[i].className == "activated" &&
            a_list[i].id == "operators") {
            document.getElementById("inputTextarea").value = tmp_inputText.slice(0, cursor_index) + target.innerText + tmp_inputText.slice(cursor_index);
            hiddenTextArea.innerText = tmp_inputText.slice(0, cursor_index) + target.innerText + tmp_inputText.slice(cursor_index);
            inputTextArea.focus();
            textArea.setSelectionRange(cursor_index + ul_items[i].textContent.length, cursor_index + ul_items[i].textContent.length);
        } else if (a_list[i].className == "activated" &&
            a_list[i].id == "fields") {
            let inpTextArea = textArea.value;
            document.getElementById("inputTextarea").value = tmp_inputText.slice(0, cursor_index) + target.innerText + " " + tmp_inputText.slice(cursor_index);
            inputTextArea.focus();
        }
    }

    document.getElementById("auto-comp").style.visibility = "hidden";

}