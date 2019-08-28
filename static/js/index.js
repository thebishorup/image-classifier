let net;

// async function app() {
//     console.log('Loading mobilenet..');

//     // Load the model.
//     net = await mobilenet.load();
//     console.log('Sucessfully loaded model');

//     // Make a prediction through the model on our image.
//     const imgEl = document.getElementById('img');
//     const result = await net.classify(imgEl);
//     console.log(result);
// }

// app();

$(document).ready(function() {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#imagePreviewElement').attr('src', e.target.result).width(256).height(256);
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function() {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    // Predict
    $('#btn-predict').click(function() {
        var form_data = new FormData($('#upload-file')[0]);
        const imgEl = document.getElementById('imagePreviewElement');



        // Make prediction by calling api /predict
        let result = predict_image(imgEl);
        console.log(result);


    });

});

async function predict_image(imageElement) {

    // Show loading animation
    $('#btn-predict').hide();
    $('.loader').show();

    // Load the model.
    net = await mobilenet.load();
    console.log('Sucessfully loaded model');

    // Make a prediction through the model on our image.
    const result = await net.classify(imageElement);

    let oList = $('#list_of_prediction');

    result.forEach(function(item) {

        console.log(item);
        oList.append('<li>Predicted: <strong>' + item.className + '</strong> || Probability: <strong> ' + item.probability + '</strong></li>');

    });

    $('.loader').hide();
    // $('#result').html(result);
    // console.log(result);
    //return result;
}