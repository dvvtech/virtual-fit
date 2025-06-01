async function showProfile(){

    //showOverlay(0);

    const profileContent = document.getElementById('profileContent');
    const mainContent = document.getElementById('mainContent');


    mainContent.classList.add('hidden');
    profileContent.classList.remove('hidden');
    try {

        const response = await makeAuthenticatedRequest(`${API_BASE_URL}/api/profile`, {
            method: 'GET',
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
         document.getElementById('userName').textContent = data.name;
         document.getElementById('userEmail').textContent = data.email;
         document.getElementById('fittingsToday').textContent = data.countFittingToday;
         document.getElementById('totalFittings').textContent = data.totalAttemptsUsed;
         document.getElementById('lastFittingDate').textContent = data.lastFittingDate;


        mainContent.classList.add('hidden');
        profileContent.classList.remove('hidden');

    } catch (error) {
        //console.error('Error:', error);
        showError(error.message);
        document.getElementById('overlay').classList.add('hidden');
            console.error('Error:', error);
            alert(error.message);
    } finally {
        hideOverlay();
        //document.getElementById('overlay').classList.add('hidden');
    }
}

function hideProfile() {

    const historyContent = document.getElementById('profileContent');
    const mainContent = document.getElementById('mainContent');

    historyContent.classList.add('hidden');
    mainContent.classList.remove('hidden');
}