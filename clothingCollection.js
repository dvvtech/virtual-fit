//Коллекия одежды

function openCollection(event, previewId) {

    event.stopPropagation();
    const collectionModal = document.getElementById('collectionModal');
    const collectionGridMan = document.getElementById('collectionGridMan');
    const collectionGridWoman = document.getElementById('collectionGridWoman');

    document.getElementById('overlay').classList.remove('hidden');

    // Clear previous content
    collectionGridMan.innerHTML = '';
    collectionGridWoman.innerHTML = '';

    // Fetch collection from API
    fetch(`${API_BASE_URL}/api/virtual-fit/clothing-collection`)
        .then(response => response.json())
        .then(data => {
            if (previewId === "garmPreview") {
                data.manСlothingItems.forEach(item => {
                    const img = document.createElement('img');
                    img.src = item.link;
                    img.alt = item.category;
                    img.className = 'w-full h-40 object-contain rounded cursor-pointer hover:opacity-75';
                    img.onclick = () => selectFromCollection(item.link, previewId);
                    collectionGridMan.appendChild(img);
                });
            }
            data.man.forEach(item => {
                const img = document.createElement('img');
                img.src = item.link;
                img.alt = item.category;
                img.className = 'w-full h-40 object-contain rounded cursor-pointer hover:opacity-75';
                img.onclick = () => selectFromCollection(item.link, previewId);
                collectionGridMan.appendChild(img);
            });

            if (previewId === "garmPreview") {
                data.womanСlothingItems.forEach(item => {
                    const img = document.createElement('img');
                    img.src = item.link;
                    img.alt = item.category;
                    img.className = 'w-full h-40 object-contain rounded cursor-pointer hover:opacity-75';
                    img.onclick = () => selectFromCollection(item.link, previewId);
                    collectionGridWoman.appendChild(img);
                });
            }
            data.woman.forEach(item => {
                const img = document.createElement('img');
                img.src = item.link;
                img.alt = item.category;
                img.className = 'w-full h-40 object-contain rounded cursor-pointer hover:opacity-75';
                img.onclick = () => selectFromCollection(item.link, previewId);
                collectionGridWoman.appendChild(img);
            });

            collectionModal.classList.remove('hidden');
            showTab('man');
            document.getElementById('overlay').classList.add('hidden');
        })
        .catch(error => {
            console.error('Error fetching collection:', error);
            document.getElementById('overlay').classList.add('hidden');
        });
}

function showTab(tab) {

    const manGrid = document.getElementById('collectionGridMan');
    const womanGrid = document.getElementById('collectionGridWoman');
    const tabMan = document.getElementById('tabMan');
    const tabWoman = document.getElementById('tabWoman');

    if (tab === 'man') {

        manGrid.classList.remove('hidden');
        womanGrid.classList.add('hidden');
        tabMan.classList.add('active');
        tabWoman.classList.remove('active');
    } else {

        womanGrid.classList.remove('hidden');
        manGrid.classList.add('hidden');
        tabWoman.classList.add('active');
        tabMan.classList.remove('active');
    }
}

function selectFromCollection(imageLink, previewId) {
    const preview = document.getElementById(previewId);
    //const cleanImageLink = removeThumbnailSuffix(imageLink);
    preview.src = imageLink;
    preview.classList.remove('hidden');

    if (previewId === 'humanPreview') {
        window.humanPhotoUrl = imageLink;
    }
    else {
        window.garmPhotoUrl = imageLink;
    }

    closeCollection();
}

function closeCollection() {
    const collectionModal = document.getElementById('collectionModal');
    collectionModal.classList.add('hidden');
}


function removeThumbnailSuffix(link) {
    return link.replace(/_t(\.[a-z]+)$/, '$1');
}