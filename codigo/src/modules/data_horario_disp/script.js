let el = document.querySelector('#number-days');
for(i = 1; i <= 31; i++) {
    el.innerHTML += '<label>'+i+'</label>';
}