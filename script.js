document.getElementById('imageForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const image1 = document.getElementById('image1').files[0];
    const image2 = document.getElementById('image2').files[0];

    if (!image1 || !image2) {
        alert("Please select both images.");
        return;
    }

    const formData = new FormData();
    formData.append('user_image', image1);
    formData.append('user_cloth', image2);

    try {
        const response = await fetch('https://67f6-41-45-150-251.ngrok-free.app/api/user-generated-image/IDM', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        const outputImage = document.getElementById('outputImage');
        outputImage.src = data.generated_image_url;
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to process the images. Please try again.');
    }
});
