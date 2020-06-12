const API_KEY = "16d85bf702974259b17e4dff4faeade4";
const BASE_URL = "https://api.football-data.org/v2/";

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY,
            'Connection': 'keep-alive'
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            showerror(err);
        })
};

//standings 2015
const League15_id = 2015;
const Endpoint15 = `${BASE_URL}competitions/${League15_id}/standings`;
function getAllStandings_15() {
    if ("caches" in window) {
        caches.match(Endpoint15).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    showStanding_15(data);
                })
            }
        })
    }

    fetchAPI(Endpoint15)
        .then(data => {
            showStanding_15(data);
        })
        .catch(error => {
            showerror(error);
        })
}

function showStanding_15(data) {
    let standings = "";
    const standingElement =  document.getElementById("homeStandings");
    const title_st            =  document.getElementById("title_st");
    const plan_st            =  document.getElementById("plan_st");
    const date_st            =  document.getElementById("date_st");
    const name_st            =  document.getElementById("name_st");

    const endDate =  new Date(
        data.season.endDate,
    ).toDateString();

    title_st.innerHTML = data.competition.name;
    plan_st.innerHTML = `Plan : ${data.competition.plan}`;
    date_st.innerHTML = `End <b>${endDate}</b>`;
    name_st.innerHTML = `${data.competition.area.name}`;

    data.standings[0].table.forEach(function (standing) {
        standings += `
                <tr>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td><a href="detail.html?id=${standing.team.id}">${standing.team.name}</a></td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `;
    });

     standingElement.innerHTML = `
                <table class="striped responsive-table spinner-blue-only" style="border-style:groove;">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team Name</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
    `;
}

//standings 2021
const League21_id = 2021;
const Endpoint21 = `${BASE_URL}competitions/${League21_id}/standings`;
function getAllStandings_21() {
    if ("caches" in window) {
        caches.match(Endpoint21).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    showStanding_21(data);
                })
            }
        })
    }

    fetchAPI(Endpoint21)
        .then(data => {
            showStanding_21(data);
        })
        .catch(error => {
            showerror(error);
    })
}
function showStanding_21(data) {
    let standingHTML = "";
    const standing21Element   =  document.getElementById("premierStandings");
    const title_st            =  document.getElementById("title_st");
    const plan_st            =  document.getElementById("plan_st");
    const date_st            =  document.getElementById("date_st");
    const name_st            =  document.getElementById("name_st");

    const endDate =  new Date(
        data.season.endDate,
    ).toDateString();

    title_st.innerHTML = data.competition.name;
    plan_st.innerHTML = `Plan : ${data.competition.plan}`;
    date_st.innerHTML = `End <b>${endDate}</b>`;
    name_st.innerHTML = `${data.competition.area.name}`;

    data.standings[0].table.forEach(function (standing) {
        standingHTML += `                
                <div class="col s12 m8 offset-m2 l6 offset-l3">
                    <div class="card-panel grey lighten-5 z-depth-4">
                        <div class="row valign-wrapper">
                            <div class="col s2">
                                <img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="" class="circle responsive-img"> 
                            </div>
                            <div class="col s8">
                                <span class="black-text pulse">
                                    ${standing.team.name}
                                </span>              
                                <hr>              
                                <strong class="light-blue-text">${standing.won}</strong>
                                <small class="light-blue-text">W</small>
                                <span class="orange-text">${standing.draw}</span>
                                <small class="orange-text">D</small>
                                <span class="red-text">${standing.lost}</span>
                                <small class="red-text">L</small>
                                <span class="teal-text">${standing.points}</span>
                                <small class="teal-text">Pts</small>
                                
                            </div>
                                
                            <div class="col s2">
                                <a href="detail.html?id=${standing.team.id}" class="btn-floating pulse "><i class="material-icons">remove_red_eye</i></a>
                            </div>
                        </div>
                    </div>
                </div>
        `;
    });

     standing21Element.innerHTML = `${standingHTML}`;
}

//detail standings
const Endteam = `${BASE_URL}teams/`;
function getdetail(){
    return new Promise(function(resolve, reject) {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");
        const btnSave = document.getElementById("save");
            
        if ("caches" in window) {
            caches.match(`${Endteam}${idParam}`).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        showdetail(data);
                        resolve(data);
                    })
                }
            })
        }

        getById(Number(idParam)).then(team => {
            if(team){
                const id_saved = team.id;
                if(id_saved == idParam){
                    btnSave.style.display = 'none';
                }
            }            
        })

        fetchAPI(`${Endteam}${idParam}`)
            .then(data => {
                showdetail(data);
                resolve(data);
            })
            .catch(error => {
                showerror(error);
        })
    });
}


//saved standings
function getSavedstandings() {
    getAll().then(team => {
        showSaved(team);
    })
    .catch(error => {
        showerror(error);   
    });
}

function showSaved(team){
    let savedHTML = "";
    const savedqqElement   =  document.getElementById("saveStandings");
        
    team.forEach(function (standing) {
        savedHTML += `                
                <div class="col s12 m8 offset-m2 l6 offset-l3">
                    <div class="card-panel grey lighten-5 z-depth-4">
                        <div class="row valign-wrapper">
                            <div class="col s2">
                                <img src="${standing.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="" class="circle responsive-img"> 
                            </div>
                            <div class="col s8">
                                <span class="black-text pulse">
                                    ${standing.name}
                                </span>              
                                <hr>              
                                <a href="${standing.website}" target="_blank"><span class="teal-text">${standing.website}</span> </a>                               
                            </div>
                                
                            <div class="col s2">
                                <a href="detail.html?id=${standing.id}&saved=true" class="btn-floating pulse "><i class="material-icons">remove_red_eye</i></a>
                            </div>
                        </div>
                    </div>
                </div>
        `;
    });
    savedqqElement.innerHTML = `${savedHTML}`;
}
function getSavedstandById(idprm){
    
    const idParam = Number(idprm);
  
    getById(idParam).then(team => {
        showdetail(team);
    })
    .catch(error => {
        showerror(error);  
    });
}


function showdetail(data){
    let detail_desc = "";
    const title_detail    = document.getElementById("title_detail");
    const desc_detail     = document.getElementById("desc_detail");

    const notnull = (isvariabel) => {
        let custvariabel;
        if(isvariabel) {
            custvariabel = `${isvariabel}`;
        } else{
            custvariabel = '';
        }
        return custvariabel;
    }

    title_detail.innerHTML =`
        <div class="col s3">
            <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="" class="circle responsive-img">
        </div>
        <div class="col s9">
            <span class="black-text pulse">
                ${data.name} <b>${data.shortName}</b>
            </span>      
            <span class="right teal white-text" style="padding:3px;border-radius:5px">${data.founded}</span>        
            <hr>         
            <span><a href="#" class="btn-floating pulse"><i class="material-icons">location_city</i></a> ${data.address}</span>
            <hr>
            <span><a href="#" class="btn-floating pulse"><i class="material-icons">public</i></a> <a href=${data.website}" target="_blank"> ${data.website}</a></span>
            <hr>
            <span><a href="#" class="btn-floating pulse"><i class="material-icons">color_lens</i></a> ${data.clubColors}</span>
            
        </div>
    `;
    
    
    data.squad.forEach(function (standing) {        
        detail_desc += `
                <tr>
                    <td>${notnull(standing.shirtNumber)}</td>
                    <td>${notnull(standing.name)}</td>
                    <td>${notnull(standing.position)}</td>
                    <td>${notnull(standing.nationality)}</td>
                    <td>${notnull(standing.role)}</td>
                </tr>
        `;
    });

    desc_detail.innerHTML = `
            <table class="striped highlight responsive-table spinner-blue-only">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>position</th>
                        <th>nationality</th>
                        <th>role</th>
                    </tr>
                 </thead>
                <tbody>
                    ${detail_desc}
                </tbody>
            </table>
    `;

}

//show error
function showerror(error){
    if (error.message === 'Failed to fetch') {
      return M.toast({
        html: 'Can\'t connect to the internet or API request limit reached',
      });
    } else if (error.errorCode === 403) {
      return M.toast({html: '403 Cannot access the resource'});
    } else if (error.message === `Cannot read property '0' of undefined`){
        return M.toast({html: 'data Saved Not Found'});
    }
    return M.toast({html: error.message});

}
