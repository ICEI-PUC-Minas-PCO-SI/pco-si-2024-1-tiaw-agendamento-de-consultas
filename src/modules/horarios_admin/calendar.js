let daysElement = document.querySelector('#number-days');
let hoursElement = document.querySelector('#days-hours');
let dateDisplay = document.getElementById('date-display')

var now = new Date()
var visibleDate = new Date()
var date = new Date(2000, 1, 1, 0)
var hourElements = []

dateDisplay.innerHTML = (visibleDate.getMonth()+1)+", "+visibleDate.getFullYear()
createCalendarDays(visibleDate);

function createCalendarDays(){
    //cria datas vazias no comeco do mes
    let monthFirstWeakDay = new Date(visibleDate.getFullYear(), visibleDate.getMonth(), 1).getDay()
    let counter = 0 // 0, valor de domingo no Date.getDay()
    while(counter != monthFirstWeakDay){
        let elem = document.createElement("label")
        elem.setAttribute("class", "day")
        elem.style.display = "inline-block"
        elem.style.width = "14.2%"
        elem.style.margin = "8px 0"
        daysElement.insertAdjacentElement('beforeend', elem)
        //daysElement.innerHTML += '<label class=\'day\'></label>';
        counter++
        if(counter > 6){ //se depois de sabado retornar para domingo
            counter = 0;
        }
    }
    
    //cria datas preenchidas do mes
    let monthDays = new Date(visibleDate.getFullYear(), visibleDate.getMonth()+1, 0).getDate()
    for(i = 1; i <= monthDays; i++) {
        let elem = document.createElement("label")
        elem.setAttribute("id", "day"+i)
        elem.setAttribute("class", "day")
        elem.setAttribute("onclick", "setDate("+i+")")
        elem.style.fontSize = "18px"
        elem.style.textAlign = "center"
        elem.style.display = "inline-block"
        elem.style.width = "14.2%"
        elem.style.margin = "8px 0"
        elem.style.fontWeight = "bold"
        elem.style.cursor = "pointer"
        elem.style.userSelect = "none"
        elem.style.transition = "0.3s ease all"
        elem.textContent = i
        daysElement.insertAdjacentElement('beforeend', elem)
    }
}
function clearCalendarDays(){
    let elementsToRemove = document.getElementsByClassName("day")
    for (let i = (elementsToRemove.length-1); i >= 0; i--) {
        elementsToRemove[i].remove();
    }
    document.getElementsByClassName("selected")[0]?.remove()
}

function setDate(day){
    date = new Date(visibleDate.getFullYear(), visibleDate.getMonth(), day)
    document.getElementsByClassName('selected')[0]?.setAttribute('class', 'day')
    document.getElementsByClassName('selectedButton')[0]?.setAttribute('class', '')
    date.setHours(0)
    document.getElementById('day'+day).setAttribute('class', 'selected')
}

function scheduleAppointment(){
    if(date.getFullYear() < visibleDate.getFullYear()){
        alert("Nenhuma data selecionada. Favor selecionar uma data.")
        return;
    }
    if(date.getTime() < now.getTime()){
        var confirmar = confirm("Data selecionada anterior a data atual. Deseja continuar?.")
        if(!confirmar) {
            location.reload();
        }
        if(confirmar) {
            window.location.replace(`horarios/horarios.html?date=${date}`);
        }
    }
    else {
        window.location.replace(`horarios/horarios.html?date=${date}`);
    }
};

function changeMonth(number){
    if(date.getFullYear() != 2000){
        var userResponse = confirm("Ao alterar a data, seleção atual será desfeita. Deseja alterar a data?");
        if(!userResponse){
            return
        }
    }
    visibleDate.addMonths(number)
    date = new Date(2000, 1, 1, 0)
    clearCalendarDays()
    createCalendarDays(visibleDate)
    dateDisplay.innerHTML = (visibleDate.getMonth()+1)+", "+visibleDate.getFullYear()
}

Date.prototype.addMonths = function(months) {
    this.setMonth(this.getMonth() + months);
    this.setDate(1);
}