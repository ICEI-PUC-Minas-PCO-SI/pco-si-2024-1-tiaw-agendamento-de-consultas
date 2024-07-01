let daysElement = document.querySelector('#number-days');
let hoursElement = document.querySelector('#days-hours');
let dateDisplay = document.getElementById('date-display')

document.getElementById("changeMonthDown").addEventListener('click', event => {
    changeMonth(-1);
})
document.getElementById("changeMonthUp").addEventListener('click', event => {
    changeMonth(1);
})
document.getElementById("advance").addEventListener('click', event => {
    scheduleAppointment();
})

var now = new Date()
var visibleDate = new Date()
var date = new Date(2000, 1, 1, 0)
var hourElements = []

var db = firebase.firestore()
var consulta = localStorage.getItem("@AGENDAI.CONSULTA")
var hopsital = {}
var professionals = []
var ocupiedDates = []

await db.collection("consultas").doc(consulta).get().then(response => {
    consulta = {
        ...response.data(),
        id: response.id
    }
})

await db.collection("consultas").where("date", ">=", visibleDate).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let data = {
            ...doc.data(),
            id: doc.id
        }
        ocupiedDates.push(data)
    });
});

await db.collection("user_data").where("admin", "==", true).get().then(response => {
    response.forEach(data => {
        let professional = { ...data.data(), id: data.id }
        if (professional.hospital.toLowerCase() == consulta.local && professional.especialidade == consulta.especialidade) {
            professionals.push(professional)
        }
    })
})

dateDisplay.innerHTML = (visibleDate.getMonth() + 1) + ", " + visibleDate.getFullYear()
createCalendarDays(visibleDate);

function createCalendarDays() {
    //cria datas vazias no comeco do mes
    let monthFirstWeakDay = new Date(visibleDate.getFullYear(), visibleDate.getMonth(), 1).getDay()
    let counter = 0 // 0, valor de domingo no Date.getDay()
    while (counter != monthFirstWeakDay) {
        let elem = document.createElement("label")
        elem.setAttribute("class", "day")
        elem.style.display = "inline-block"
        elem.style.width = "14.2%"
        elem.style.margin = "8px 0"
        daysElement.insertAdjacentElement('beforeend', elem)
        counter++
        if (counter > 6) { //se depois de sabado retornar para domingo
            counter = 0;
        }
    }

    //cria datas preenchidas do mes
    let monthDays = new Date(visibleDate.getFullYear(), visibleDate.getMonth() + 1, 0).getDate()
    for (let i = 1; i <= monthDays; i++) {
        let elem = document.createElement("label")
        elem.setAttribute("id", "day" + i)
        elem.setAttribute("class", "day")
        elem.addEventListener("click", event => {
            setDate(i);
        })
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
function clearCalendarDays() {
    let elementsToRemove = document.getElementsByClassName("day")
    for (let i = (elementsToRemove.length - 1); i >= 0; i--) {
        elementsToRemove[i].remove();
    }
    document.getElementsByClassName("selected")[0]?.remove()
}

function setDate(day) {
    if (date.getHours() > 1) {
        var userResponse = confirm("Ao alterar a data, seleção do horario será desfeita. Deseja alterar a data?");
        if (!userResponse) {
            return
        }
    }
    date = new Date(visibleDate.getFullYear(), visibleDate.getMonth(), day)
    document.getElementsByClassName('selected')[0]?.setAttribute('class', 'day')
    document.getElementsByClassName('selectedButton')[0]?.setAttribute('class', '')
    date.setHours(0)
    document.getElementById('day' + day).setAttribute('class', 'selected')
    clearHours()
    createHours()
}

function clearHours() {
    hourElements.forEach(element => {
        element.remove()
    })
}

function createHours() {
    for (let i = 8; i <= 21; i++) {
        let elem = document.createElement("button")
        elem.setAttribute("id", "hour" + i)
        elem.addEventListener("click", event => {
            setHour(i)
        })
        elem.style.padding = "5px"
        elem.style.backgroundColor = "#5621ea"
        elem.style.borderRadius = "5px"
        elem.style.color = "white"
        elem.style.textAlign = "center"
        elem.textContent = i + ':00'
        hoursElement.insertAdjacentElement('beforeend', elem)
        hourElements.push(elem);
    }
}

function setHour(hour) {
    date.setHours(hour)
    document.getElementsByClassName('selectedButton')[0]?.setAttribute('class', '')
    document.getElementById('hour' + hour).setAttribute('class', 'selectedButton')
}

function scheduleAppointment() {
    if (date.getFullYear() < now.getFullYear()) {
        alert("Nenhuma data selecionada. Favor selecionar uma data para a consulta.")
        return
    }
    if (date.getHours() <= 7) {
        alert("Nenhum horario selecionado. Favor selecionar um horario para a consulta.")
        return
    }
    if (date.getTime() < now.getTime()) {
        alert("Data selecionada anterior a data atual. Favor selecionar uma data após a data atual.")
        return
    }
    let schedule = {}
    schedule.date = date
    let hasSuceed = false
    for (let index = 0; index < professionals.length; index++) {
        const element = professionals[index];
        schedule.profissional = consulta.profissional ? consulta.profissional : element.id
        if (canSchedule(schedule)) {
            db.collection("consultas").doc(consulta.id).update(schedule).then(() => {
                alert("Consulta agendada com sucesso!");
                window.location.replace("/codigo/src/modules/rating");
            });
            hasSuceed = true;
            break;
        }
    }
    if (!hasSuceed) {
        alert("Horario de " + date.getHours() + "h indisponivel para o dia " + date.getDate() + ". Favor selecionar um outro horario.")
    }
}

function canSchedule(schedule) {
    let profissionalSchedule = ocupiedDates.filter(consult => consult.profissional == schedule.profissional)
    let alreadyScheduled = profissionalSchedule.some((element) => {
        let date1 = element.date.toDate().getTime()
        let date2 = new Date(schedule.date).getTime()
        return date1 == date2
    })
    return alreadyScheduled ? false : true
}

function changeMonth(number) {
    if (date.getFullYear() != 2000) {
        var userResponse = confirm("Ao alterar a data, seleção atual será desfeita. Deseja alterar a data?");
        if (!userResponse) {
            return
        }
    }
    visibleDate.addMonths(number)
    date = new Date(2000, 1, 1, 0)
    clearHours()
    clearCalendarDays()
    createCalendarDays(visibleDate)
    dateDisplay.innerHTML = (visibleDate.getMonth() + 1) + ", " + visibleDate.getFullYear()
}

Date.prototype.addMonths = function (months) {
    this.setMonth(this.getMonth() + months);
    this.setDate(1);
}