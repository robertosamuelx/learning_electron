function change(){
    var input = document.getElementById('input').value;
    var text = document.getElementById('text');

    text.innerText = `Olá ${input}`;
}