$(document).ready(function(){
    function printTable(file) {
        var html = '';
        for(var row in data) {
          html += '<tr>\r\n';
          for(var item in data[row]) {
            html += '<td>' + data[row][item] + '</td>\r\n';
          }
          html += '</tr>\r\n';
        }
        $('#placeholder').html(html);
      };

    function isHeader(header){
        var isFloatPresent = false;
        for (let i = 0; i < header.length; i++){
            if (!Number.isNaN(parseFloat(header[i]))){
                isFloatPresent = true;
            }
        }
        if (isFloatPresent){
            return false;
        }else{
            return true;
        }
    }

    function findDatetime(csvRow){
        for (let i=0; i < csvRow.length; i++){
            if (!Number.isNaN(Date.parse(csvRow[i]))){
                return i
            }else{
                // could be that it's a non-iso value (e.g., 23/25/2014)
                console.log(csvRow[i])
                var elements = csvRow[i].split('/')
                if (elements.length >= 2){
                    var isoReconfiguration = [elements[1], elements[0], elements[2]].join('/')
                    if (!Number.isNaN(Date.parse(isoReconfiguration))){
                        return i
                    }
                }
            }
        }
    }


    document.getElementById('file-selector').addEventListener('change', event => {
        file = event.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            var result = $.csv.toArrays(event.target.result);
            document.getElementById('placeholder').value = result;
            var headerLine = isHeader(result[0]);
            // strip the header if it exists; we will look for values implicitly
            if (headerLine){
                result.shift()
            }
            // find index of date
            var dateIDX = findDatetime(result[0])



        }, false);
        if(file){
            reader.readAsText(file);
        }

    });
});
