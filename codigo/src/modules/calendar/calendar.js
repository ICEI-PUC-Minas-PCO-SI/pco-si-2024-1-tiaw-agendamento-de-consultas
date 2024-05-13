let daysElement = document.querySelector('#number-days');
let hoursElement = document.querySelector('#days-hours');
let dateDisplay = document.getElementById('date-display')

var now = new Date()
var date = new Date(2000, 1, 1, 0)
var hourElements = []

dateDisplay.innerHTML = (now.getMonth()+1)+", "+now.getFullYear()
createCalendarDays(now);

function createCalendarDays(){
    //cria datas vazias no comeco do mes
    let monthFirstWeakDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay()
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
    let monthDays = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate()
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
    if(date.getHours() > 1){
        var userResponse = confirm("Ao alterar a data, seleção do horario será desfeita. Deseja alterar a data?");
        if(!userResponse){
            return
        }
    }
    date = new Date(now.getFullYear(), now.getMonth(), day)
    document.getElementsByClassName('selected')[0]?.setAttribute('class', '')
    document.getElementsByClassName('selectedButton')[0]?.setAttribute('class', '')
    date.setHours(0)
    document.getElementById('day'+day).setAttribute('class', 'selected')
    clearHours()
    createHours()
}

function clearHours(){
    hourElements.forEach(element =>{
        element.remove()
    })
}

function createHours(){
    for(i = 8; i<=21; i++){
        let elem = document.createElement("button")
        elem.setAttribute("id", "hour"+i)
        elem.setAttribute("onclick", "setHour("+i+")")
        elem.style.padding = "5px"
        elem.style.backgroundColor = "#5621ea"
        elem.style.borderRadius = "5px"
        elem.style.color = "white"
        elem.style.textAlign = "center"
        elem.textContent = i+':00'
        hoursElement.insertAdjacentElement('beforeend', elem)
        hourElements.push(elem);
    }
}

function setHour(hour){
    date.setHours(hour)
    document.getElementsByClassName('selectedButton')[0]?.setAttribute('class', '')
    document.getElementById('hour'+hour).setAttribute('class', 'selectedButton')
}

function scheduleAppointment(){
    if(date.getFullYear() < now.getFullYear()){
        alert("Nenhuma data selecionada. Favor selecionar uma data para a consulta.")
        return
    }
    if(date.getHours() <= 7){
        alert("Nenhum horario selecionado. Favor selecionar um horario para a consulta.")
        return
    }
    if(date.getTime() < now.getTime()){
        alert("Data selecionada anterior a data atual. Favor selecionar uma data após a data atual.")
        return
    }
    let schedule = {}
    schedule.date = date
    schedule.paciente = '1'
    schedule.profissional = '2'
    let storage = JSON.parse(localStorage.getItem("schedule"))
    if(storage == null){
        localStorage.setItem("schedule", JSON.stringify([schedule]))
        alert("Consulta agendada com sucesso!")
    }else{
        if(canSchedule(storage, schedule) == 0){
            storage.push(schedule)
            localStorage.setItem("schedule", JSON.stringify(storage))
            alert("Consulta agendada com sucesso!")
        }else{
            alert("Horario de "+date.getHours()+"h indisponivel para o dia "+date.getDate()+". Favor selecionar um outro horario.")
        }
    }
}

function canSchedule(storage, schedule) {
    let profissionalSchedule = storage.filter((element) => element.profissional == schedule.profissional)
    let alreadyScheduled = profissionalSchedule.find((element) => {
        let date1 = new Date(element.date).getTime()
        let date2 = new Date(schedule.date).getTime()
        return date1 == date2
    })
    return alreadyScheduled ? 1 : 0
}

function changeMonth(number){
    if(date.getFullYear() != 2000){
        var userResponse = confirm("Ao alterar a data, seleção atual será desfeita. Deseja alterar a data?");
        if(!userResponse){
            return
        }
    }
    now.addMonths(number)
    date = new Date(2000, 1, 1, 0)
    clearHours()
    clearCalendarDays()
    createCalendarDays(now)
    dateDisplay.innerHTML = (now.getMonth()+1)+", "+now.getFullYear()
}

Date.prototype.addMonths = function(months) {
    this.setMonth(this.getMonth() + months);
    this.setDate(1);
}