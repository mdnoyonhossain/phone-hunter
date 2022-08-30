const loadPhones = (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data, dataLimit))
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    // Display 10 Phone Only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none');
    }

    // Display No Phone Found 
    const noPhoneFound = document.getElementById('no-phone-message');
    if (phones.length === 0) {
        noPhoneFound.classList.remove('d-none');
    }
    else {
        noPhoneFound.classList.add('d-none');
    }

    // Display All Phones 
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col-md-3');
        phoneDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top img-fluid p-4" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    // Stop Spinner Loader 
    toggleLoader(false);
}

const processSearch = (dataLimit) => {
    // Start Spinner 
    toggleLoader(true);
    const textFeild = document.getElementById('text-field');
    const searchText = textFeild.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('text-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
})

// handel Search Button 
document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(10);
});

const toggleLoader = isLoader => {
    const spinnerSection = document.getElementById('loader-spinner');
    if (isLoader) {
        spinnerSection.classList.remove('d-none');
    }
    else {
        spinnerSection.classList.add('d-none');
    }
}

document.getElementById('show-all-btn').addEventListener('click', function () {
    processSearch();
})

const loadPhoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
}

const displayPhoneDetails = phone => {
    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetailsBody = document.getElementById('phone-details-body');
    phoneDetailsBody.innerHTML = `
        <p><b>Brand:</b> ${phone.brand ? phone.brand : 'No Brand Name!'}</p>
        <p><b>Relese Date:</b> ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found!'}</p>
        <p><b>Display Size:</b> ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'Display Size No Entry'}</p>
        <p><b>Memory:</b> ${phone.mainFeatures ? phone.mainFeatures.memory : 'Memory No Entry'}</p>
        <p><b>Sensors:</b> ${phone.mainFeatures ? phone.mainFeatures.sensors[0] : 'Memory No Entry'}</p>
        <p><b>Others:</b> ${phone.mainFeatures ? phone.others.Bluetooth : 'Memory No Entry'}</p>
    `;
}

loadPhones('oppo');