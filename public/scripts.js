document.getElementById('uploadForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', document.getElementById('fileInput').files[0]);

    const response = await fetch('/compare', {
        method: 'POST',
        body: formData,
    });

    const result = await response.text();
    document.getElementById('result').textContent = result;
});
