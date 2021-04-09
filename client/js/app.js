const getAndDisplay = () => {
    $.ajax({
        type: 'GET',
        url: 'api/chirps'
    })
        .then(chirps => {
            // "entries" variable converts chirps.json data structure from:
            // {
            //     "#": {
            //         "name": "namevalue",
            //          "msg": "msgvalue"
            //     }
            // }
            // to
            // [ '#', {name: "namevalue", msg: "msgvalue"} ]            
            const entries = Object.entries(chirps);

            // clears chirps from the DOM by emptying thier container
            $("#all-chirps").empty();

            // map thru each "entries" array
            entries.map(chirp => {
                // condition excludes last object of chirps.json ("nextid")
                if (chirp[1].name !== undefined) {
                    // puts chirp in the DOM
                    const chirpDiv = $('<div class="card-body border bg-light m-3 px-4"></div>')
                    $(chirpDiv).append(`
                        <h4 class="card-title mx-3">${chirp[1].name}</h4>
                        <p class="card-text mx-5">${chirp[1].msg}</p>              
                    `)
                    const deleteBtn = $('<button class="btn btn-danger mx-3">delete me</button>').appendTo(chirpDiv);
                    const editBtn = $('<button class="btn btn-warning">edit me</button>').appendTo(chirpDiv);
                    $('#all-chirps').append(chirpDiv)
                    // DELETE chirp click listener by id (chirp[0])
                    deleteBtn.click(() => {
                        // ajax request to /server/routes/chirps.js
                        $.ajax({
                            type: 'DELETE',
                            url: `/api/chirps/${chirp[0]}`
                        })
                            .then(response => {
                                console.log(response);
                                getAndDisplay();
                            })
                    });
                    // fires SweetAlert2 modal
                    editBtn.click(() => {
                        Swal.fire({
                            title: `Edit your Chirp: ${chirp[1].name}`,
                            input: 'text',
                            inputValue: chirp[1].msg,
                            showCancelButton: true,
                            confirmButtonText: 'Confirm Changes',
                            // listens for click of confirm btn
                            preConfirm: (chirpEdit) => {
                                // ajax PUT request
                                $.ajax({
                                    type: 'PUT',
                                    data: {
                                        name: chirp[1].name,
                                        msg: chirpEdit
                                    },
                                    url: `/api/chirps/${chirp[0]}`
                                })
                                    .then(response => console.log(response))
                                getAndDisplay();
                            },
                            allowOutsideClick: () => !Swal.isLoading()
                        });
                    });
                };
            });
        });
};
getAndDisplay();


// calls POST 
$('#btn-test').click((e) => {
    // e.preventDefault();
    const name = $('#username').val();
    const msg = $('#msg').val();

    // spam filter against empty input fields
    if (msg === '' || name === '') {
        Swal.fire({
            icon: 'error',
            title: 'Poops...',
            text: 'You Goofed!',
            footer: '<a href="https://media3.giphy.com/media/l1KdbHUPe27GQsJH2/giphy.gif">Why do I have this issue?</a>'
        });
        return;
    } else {
        // ajax POST request
        $.ajax({
            type: 'POST',
            url: '/api/chirps',
            data: {
                name,
                msg
            }
        })
            .then(response => {
                console.log(response)
                window.location.reload()
                getAndDisplay();
            });
    };
});

