

function getUser() {
    try {
        const currentUser = JSON.parse(localStorage.getItem('credential'))
        return currentUser;
    } catch (err) {
        console.log(err);
        return null;
    }
}

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}



async function checkAuth(ev, attendance_type) {
    try {
        ev.preventDefault();
        const currentUser = getUser();
        if (!currentUser) {
            window.alert('Sessão encerrada!');
            window.location.replace("/codigo/");
            return;
        }

        const doc = await firebase.firestore().collection('consultas').doc(uuidv4());
        if (!doc) {
            throw 'Erro ao criar documento';
        }
        await doc.set({ type: attendance_type })
        localStorage.setItem('@AGENDAI.CONSULTA', doc.id)
        switch (attendance_type) {
            case 'CONSULTA':
                window.location.replace("/codigo/src/modules/agendamento_sem_encaminhamento/");
                break;
            case 'EXAME':
            case 'ENCAMINHAMENTO':
                window.location.replace("/codigo/src/modules/");
                break;
            default:
        }
    } catch (error) {
        console.error(error)
    }
}