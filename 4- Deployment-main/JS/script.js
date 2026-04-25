var outputImages = [];
var currentIndex = 0;
var intervalId;

function processImages() {
    var folderInput = document.getElementById('folder-input');
    var files = folderInput.files;
    if (!files || files.length === 0) {
        alert('Please select images.');
        return;
    }

    currentIndex = 0;
    outputImages = [];

    function processImage(index) {
        var file = files[index];
        var formData = new FormData();
        formData.append('image', file);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://qs3qq512-5000.uks1.devtunnels.ms/predict', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var responseData = JSON.parse(xhr.responseText);
                outputImages.push({
                    name: file.name,
                    data: 'data:image/jpeg;base64,' + responseData.outputImageData
                });
                updateProgressBar((index + 1) / files.length * 100);
                if (index === files.length - 1) {
                    displayImages();
                } else {
                    processImage(index + 1);
                }
            } else {
                alert('Error processing image ' + file.name);
            }
        };
        xhr.onerror = function() {
            alert('Error processing image ' + file.name);
        };
        xhr.send(formData);
    }

    processImage(0);
}

function displayImages() {
    var segmentedImage = document.getElementById('segmentedImage');
    currentIndex = 0;

    function showImage(index) {
        if (index >= 0 && index < outputImages.length) {
            segmentedImage.src = outputImages[index].data;
            currentIndex = index;
        }
    }

    showImage(currentIndex);

    document.getElementById('output-images').classList.remove('hidden');
    document.getElementById('navigation-buttons').classList.remove('hidden');
    document.querySelector('.download-btn').classList.remove('hidden');

    window.moveBackward = function() {
        showImage(currentIndex - 1);
    };

    window.moveForward = function() {
        showImage(currentIndex + 1);
    };
}

function updateProgressBar(value) {
    var progressBarValue = document.getElementById('progress-bar-value');
    var progressBarText = document.getElementById('progress-bar-text');

    progressBarValue.style.width = value + '%';
    value = value.toFixed(2);
    progressBarText.innerText = value + '%';

    if (value == 100.00) {
        progressBarValue.style.backgroundColor = '#5cb85c';
    }
    else {
        progressBarValue.style.backgroundColor = '#007bff';
    }
}

function startInterval(direction) {
    intervalId = setInterval(function() {
        if (direction === 'forward') {
            moveForward();
        } else if (direction === 'backward') {
            moveBackward();
        }}, 80);
}

function stopInterval() {
    clearInterval(intervalId);
}

function downloadImages() {
    var zip = new JSZip();
    var folderName = "segmented_images";

    outputImages.forEach(function(image) {
        var imageData = image.data.split(',')[1];
        zip.file(folderName + "/" + image.name, imageData, {base64: true});
    });

    zip.generateAsync({type:"blob"}).then(function(content) {
        saveAs(content, "segmented_images.zip");
    });
}
