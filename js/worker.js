document.addEventListener('DOMContentLoaded', () => {
    const dragDropArea = document.getElementById('dragDropArea');
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('previewContainer');
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');

    dragDropArea.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        handleFiles(event.target.files);
    });

    dragDropArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        dragDropArea.classList.add('drag-over');
    });

    dragDropArea.addEventListener('dragleave', () => {
        dragDropArea.classList.remove('drag-over');
    });

    dragDropArea.addEventListener('drop', (event) => {
        event.preventDefault();
        dragDropArea.classList.remove('drag-over');
        const files = event.dataTransfer.files;
        handleFiles(files);
    });

    function handleFiles(files) {
        for (const file of files) {
            if (file.type.startsWith('image/')) {
                showProgress();
                uploadFile(file);
            } else {
                alert('Please upload an image file.');
            }
        }
    }

    function showProgress() {
        progressBar.style.display = 'block';
        progress.style.width = '0';
    }

    function uploadFile(file) {
        const reader = new FileReader();
        reader.onloadstart = () => {
            updateProgress(0);
        };
        reader.onprogress = (event) => {
            if (event.lengthComputable) {
                const progressValue = Math.round((event.loaded / event.total) * 100);
                updateProgress(progressValue);
            }
        };
        reader.onloadend = (event) => {
            updateProgress(100);
            setTimeout(() => {
                displayImage(event.target.result);
                progressBar.style.display = 'none';
            }, 500); // Small delay to show 100% completion
        };
        reader.readAsDataURL(file);
    }

    function updateProgress(value) {
        progress.style.width = `${value}%`;
    }

    function displayImage(src) {
        const img = document.createElement('img');
        img.src = src;
        previewContainer.innerHTML = '';
        previewContainer.appendChild(img);
    }
});

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});