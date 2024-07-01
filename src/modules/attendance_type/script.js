

function getUser() {
    try {
        const currentUser = JSON.parse(localStorage.getItem('@AGENDAI.USER'))
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
            window.location.replace("/");
            return;
        }

        const doc = await firebase.firestore().collection('consultas').doc(uuidv4());
        if (!doc) {
            throw 'Erro ao criar documento';
        }

        switch (attendance_type) {
            case 'CONSULTA':
                await doc.set({ type: attendance_type, user: currentUser.user.uid, step: "AGENDAMENTO_SEM_ENCAMINHAMENTO", finalized: false })
                localStorage.setItem('@AGENDAI.CONSULTA', doc.id)
                window.location.replace("/src/modules/agendamento_sem_encaminhamento/");
                break;
            case 'EXAME':
            case 'ENCAMINHAMENTO':
                await doc.set({ type: attendance_type, user: currentUser.user.uid, step: "ENVIO_DE_DOCUMENTOS", finalized: false })
                localStorage.setItem('@AGENDAI.CONSULTA', doc.id)
                window.location.replace("/src/modules/envio_documentos/");
                break;
            default:
        }
    } catch (error) {
        console.error(error)
    }
}