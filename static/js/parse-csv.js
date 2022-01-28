$(document).ready(function(){
    document.getElementById('file-selector').addEventListener('change', event => {
        file = event.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            console.log(event.target.result);
            document.getElementById('placeholder').value = event.target.result;
        }, false);
        if(file){
            reader.readAsDataURL(file);
        }
    });
});
