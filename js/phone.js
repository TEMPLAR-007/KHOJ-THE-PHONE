
// search item and loading spinner and error section/////////////////////////////
const searchInput = () => {
    document.getElementById('spinner').style.display = "block";
    document.getElementById('parent').innerHTML = '';
    document.getElementById('error-msg').innerHTML = '';


    const serachValue = document.getElementById('search-box').value;

    fetch(`https://openapi.programming-hero.com/api/phones?search=${serachValue}`)
        .then(res => res.json())
        .then(data => {
            if (data.data.length == 0) {
                document.getElementById('load-more-btn').style.display = "none";
                document.getElementById('spinner').style.display = "block";


                const errorSection = document.getElementById('error-msg');
                const errorMsg = document.createElement('msg');
                errorMsg.innerHTML = `<h4 class="text-danger">no phone found !!</h4>`;
                errorSection.appendChild(errorMsg);
            }
            else {
                displayResult(data.data);
                document.getElementById('spinner').style.display = "none";
                document.getElementById('error-msg').innerHTML = '';
                document.getElementById('load-more-btn').style.display = "block";
            }
        });
};


// all phone display section/////////////////////////////////////////////////////////////
const displayResult = (phones) => {

    for (const phone of phones.slice(0, 20)) {

        const parentSection = document.getElementById('parent');

        const div = document.createElement('div');
        div.innerHTML = `
                    <div class="col w-50 mx-auto">
                       <div class="card border-0 p-3 mb-3 card-box">
                          <img src="${phone.image}">
                            <div class="card-body">
                              <h5 class="card-title">${phone.phone_name}</h5>
                              <h5 class="card-title">${phone.brand}</h5>
                             <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#phone-details" onclick="phoneDetails('${phone.slug}')">More Details</button>
                           </div>
                        </div>
                    </div>`;
        parentSection.appendChild(div);
    };
    document.getElementById('spinner').style.display = "none";
};














const loadMoreBtn = () => {
    const serachValue = document.getElementById('search-box').value;

    fetch(`https://openapi.programming-hero.com/api/phones?search=${serachValue}`)
        .then(res => res.json())
        .then(data => loadMoreData(data.data));
};

const loadMoreData = (phones) => {

    for (const phone of phones) {

        const parentSection = document.getElementById('parent');

        const div = document.createElement('div');
        div.innerHTML = `
                    <div class="col w-50 mx-auto">
                       <div class="card border-0 p-3 mb-3 card-box">
                          <img src="${phone.image}">
                            <div class="card-body">
                              <h5 class="card-title">${phone.phone_name}</h5>
                              <h5 class="card-title">${phone.brand}</h5>
                             <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#phone-details" onclick="phoneDetails('${phone.slug}')">More Details</button>
                           </div>
                        </div>
                    </div>`;
        parentSection.appendChild(div);

    };
    document.getElementById('spinner').style.display = "none";
    document.getElementById('load-more-btn').style.display = "none";
};







const phoneDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))

};

const displayPhoneDetails = (phone) => {
    const parentDetails = document.getElementById("modal-dialog-box");
    const modalContent = document.createElement("div");
    modalContent.classList.add("row", "g-0");
    modalContent.innerHTML = `
             <div>
               <div class="d-flex justify-content-center mb-3">
                <img class="w-50 mb-3" src="${phone.image}">
                </div>
            
                <h2 class="card-title text-center">${phone.name}</h2>
                 <h3 class="card-title text-center">${phone.brand}</h3>
                 <p class="card-title text-center">${phone.releaseDate}</p>
                 <br>
                <div>
                      <h4>Main Features:</h4>
                      <h6 class="area">chipSet: <span class="fw-normal">${phone.mainFeatures.chipSet}</span></h6>
                      <h6 class="area">displaySize: <span class="fw-normal">${phone.mainFeatures.displaySize}</span></h6>
                      <h6 class="area">memory: <span class="fw-normal">${phone.mainFeatures.memory}</span></h6>
                      <h6 class="area">storage: <span class="fw-normal">${phone.mainFeatures.storage}</span></h6>
                      <h6 class="area">sensors: <span class="fw-normal">${phone.mainFeatures.sensors}</span></h6>
                </div>
                <br>
                <div>
                      <h4>Others Features:</h4>
                      <h6 class="area">Bluetooth: <span class="fw-normal">${phone.others?.Bluetooth ? phone.others?.Bluetooth : 'no data'}</span></h6>
                      <h6 class="area">GPS: <span class="fw-normal">${phone.others?.GPS ? phone.others.GPS : 'no data'}</span></h6>
                      <h6 class="area">NFC: <span class="fw-normal">${phone.others?.NFC ? phone.others.NFC : 'no data'}</span></h6>
                      <h6 class="area">Radio: <span class="fw-normal">${phone.others?.Radio ? phone.others.Radio : 'no data'}</span></h6>
                      <h6 class="area">USB: <span class="fw-normal">${phone.others?.USB ? phone.others.USB : 'no data'}</span></h6>
                      <h6 class="area">WLAN: <span class="fw-normal">${phone.others?.WLAN ? phone.others.WLAN : 'no data'}</span></h6>                  
                </div>
            </div>
    `;

    parentDetails.textContent = "";
    parentDetails.appendChild(modalContent);
};