let daysElement = document.querySelector('#number-days');
let hoursElement = document.querySelector('#days-hours');

var now = new Date()
var date = new Date()
var hourElements = []

createCalendarDays();

function createCalendarDays(){
    //cria datas vazias no começo do mes
    let firstMonthWeakDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay()
    let counter = 7
    while(counter != firstMonthWeakDay){
        daysElement.innerHTML += '<label></label>';
        counter++
        if(counter >= 8){
            counter = 1;
        }
    }
    
    //cria datas preenchidas do mes
    let monthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate()
    for(i = 1; i <= monthDays; i++) {
        let elem = document.createElement("label")
        elem.setAttribute("id", "day"+i)
        elem.setAttribute("onclick", "setDate("+i+")")
        elem.textContent = i
        elem.style.textAlign = "center"
        daysElement.insertAdjacentElement('beforeend', elem)
        //daysElement.innerHTML += '<label id=\'day'+i+'\' onclick=\'setDate('+i+')\'>'+i+'</label>';
    }
}

function setDate(day){
    date = new Date(now.getFullYear(), now.getMonth(), day)
    console.log(date);
    hourElements.forEach(element =>{
        element.remove()
    })
    selectedDay = document.getElementsByClassName('selected')[0]?.setAttribute('class', '')
    selectedDay = document.getElementsByClassName('selectedButton')[0]?.setAttribute('class', '')
    date.setHours(0)
    document.getElementById('day'+day).setAttribute('class', 'selected')
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
    console.log(date)
    document.getElementsByClassName('selectedButton')[0]?.setAttribute('class', '')
    document.getElementById('hour'+hour).setAttribute('class', 'selectedButton')
    console.log(document.getElementById('hour'+hour).getAttribute("class"))
}