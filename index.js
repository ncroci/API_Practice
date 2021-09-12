const BASE_URL = 'https://api.nasa.gov/planetary/apod?';
const API_KEY = 'api_key=YYkPJh1u8fnlnloPQPJL4iYmw778pTt69fPTzhE1';


let retrieveButton = $('#findButton');

findButton.addEventListener("click", () => {
    let datepicker_date = $('#datePicker').val();

    apiFunction(datepicker_date);
});

function apiFunction(datepicker_date) {
    let queryDate = "date=" + datepicker_date + "&";

    $.get(BASE_URL + queryDate + API_KEY, function(data) {

        $('#photoDiv').prepend(
            `
        <div id="${data.date}-div" class="card">
        <div class="card-header">
            <h2 id="${data.date}-header">${data.title}</h2>
            <button id="${data.date}-delete" class="btn btn-danger" onclick="deletePicture('${data.date}')">Delete</button>
        </div>
        <div class="card-body">
            <div class="card">
            <div class="row">
            <div class="col-sm-6">
            <input type="text" id='${data.date}-input' class="form-control" placeholder="New Title">
            </div>
            <div class="col-sm-6">
            <button id="${data.date}-update" onclick="updateTitle('${data.date}')" class="btn btn-primary form-control">Update Title</button>
            </div>
            </div>
            <br>
            <div class"row">
                    <div class="col">
                        <img id = "${data.date}-img"src ="${data.url}">
                    </div>
                </div>
                
            <div class="row">
            <button onclick="invertPicture('${data.date}')" class="btn btn-primary form-control btn-filter">Invert</button>
            <button onclick="blurPicture('${data.date}')" class="btn btn-primary form-control btn-filter">Blur</button>
            <button onclick="satPicture('${data.date}')" class="btn btn-primary form-control btn-filter">Saturate</button>
            <button onclick="revertPicture('${data.date}')" class="btn btn-primary form-control btn-filter">Revert Back To Normal</button>
            </div>
            </div>
        </div>
    </div>`

        );
    });


}


function updateTitle(id) {
    console.log(id);
    let newHeader = $(`#${id}-input`).val();
    console.log(newHeader);
    $(`#${id}-header`).empty();
    $(`#${id}-header`).append(newHeader);
    $('input:text').val('');
}

function deletePicture(id) {
    $(`#${id}-div`).remove();
}

function invertPicture(id) {
    $(`#${id}-img`).css("filter", "invert(100%)");
}

function blurPicture(id) {
    $(`#${id}-img`).css("filter", "blur(5px)");
}

function satPicture(id) {
    $(`#${id}-img`).css("filter", "saturate(7)");
}

function revertPicture(id) {
    $(`#${id}-img`).css("filter", "none");
}