async function showProfile(){

    //showOverlay(0);

    const profileContent = document.getElementById('profileContent');
    const mainContent = document.getElementById('mainContent');


    mainContent.classList.add('hidden');
    profileContent.classList.remove('hidden');
    /*try {

        const response = await makeAuthenticatedRequest(`${API_BASE_URL}/api/virtual-fit/history`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            return response.json().then(err => {
                hideOverlay();
                //document.getElementById('overlay').classList.add('hidden');
                throw new Error(err.description || 'Failed to fetch history');
            });
            //await handleErrorResponse(response);
            //return;
        }

        const data = await response.json();
        //handleSuccess(data);
        const historyTableBody = document.getElementById('historyTableBody');
        historyTableBody.innerHTML = '';


        mainContent.classList.add('hidden');
        historyContent.classList.remove('hidden');

    } catch (error) {
        //console.error('Error:', error);
        showError(error.message);
        /*document.getElementById('overlay').classList.add('hidden');
            console.error('Error:', error);
            alert(error.message);*/
    /*} finally {
        hideOverlay();
        //document.getElementById('overlay').classList.add('hidden');
    }*/
}

function hideProfile() {

    const historyContent = document.getElementById('profileContent');
    const mainContent = document.getElementById('mainContent');

    historyContent.classList.add('hidden');
    mainContent.classList.remove('hidden');
}