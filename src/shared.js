function Checker () {


    function checkIfInstanceOf(object, Instance ) {
        return (object instanceof(Instance)) ? true : false;
    }


    return {checkIfInstanceOf}

}


function FunctionFactory() {

    function logContent(content) {
        console.log(content);
    }

    function getElement(querySelector) {
        const element = document.querySelector(querySelector);

        return element;
    }

    function createNewElement(elementType,className = '',attributes = {}, text = '') {
        const newElement = document.createElement(elementType);

        if (className) newElement.classList.add(className); //avoid error for no class

        let attrName;

        for (attrName in attributes) {
            const key = attrName;
            const value = attributes[key];

            newElement.setAttribute(key, value);
        }

        newElement.innerText = text;

        return newElement;
    }

    function appendChildToElement(element,child) {
        element.appendChild(child);
    }

    function removeElementHTML(element) {
        element.innerHTML = "";
    }


    function createLabelOrInput(i,labelOrInputArray) {

        const labelOrInputElementType = labelOrInputArray[i][0];
        const labelOrInputElementClass = labelOrInputArray[i][1];
        const labelOrInputElementAttributes = labelOrInputArray[i][2];
    
        if (!labelOrInputArray[i][3]){
            const labelOrInputElement = createNewElement(labelOrInputElementType,labelOrInputElementClass,labelOrInputElementAttributes);
            return labelOrInputElement;
        } else {
            const labelOrInputText = labelOrInputArray[i][3];
            const labelOrInputElement = createNewElement(labelOrInputElementType,labelOrInputElementClass,labelOrInputElementAttributes,labelOrInputText);
            return labelOrInputElement;
        }
    
    }
    

    return {
        logContent,
        getElement,
        createNewElement,
        appendChildToElement,
        removeElementHTML,
        createLabelOrInput
    }

}

export {FunctionFactory, Checker};