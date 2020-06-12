
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const isFromSaved = urlParams.get("saved");
    const id_save_stand = urlParams.get("id");
    const btnSave = document.getElementById("save");
    const btn_nonSave = document.getElementById("non_save");

    let team_name;
    if (isFromSaved) {
        btnSave.style.display = 'none';
        btn_nonSave.style.display = 'block';
        
        getSavedstandById(id_save_stand);
    } else {          
        btnSave.style.display = 'block';
        btn_nonSave.style.display = 'none';
        team_name = getdetail();
    }
    
    btnSave.onclick = function() {
        team_name.then(function(team_de) {
        saveForLater(team_de);
        btnSave.style.display = 'none';
        });
    };

    btn_nonSave.onclick = function() {
        deleteForLater(id_save_stand);
        btn_nonSave.style.display = 'none';
    };
});