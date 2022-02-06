$(document).ready(() => {
    $('#repo-list').hide()
})

const BASE_URL = 'https://api.github.com/search/repositories?q='

async function submitQ2() {
    await searchRepo()
}

function getFormData() {
    let formdata = {}
    formdata['owner'] = document.getElementById('owner').value
    formdata['repo'] = document.getElementById('repo').value
    return formdata
}

function searchRepo() {
    formdata = getFormData()
    if(formdata.owner!=="" || formdata.repo!==""){
        let query_url = BASE_URL + "repo:" + formdata["owner"] + "/" + formdata["repo"]
        $.get(query_url, (data, status) => {
            populateRepoList(data.items)
        })
    }else{
        alert("enter form data")
    }
}

function populateRepoList(repolist) {
    if (repolist.length === 0) {
        $('#repo-list').hide()
    } else {
        $('#repo-list').empty()
        $('#repo-list').show()
        for (let i = 0; i < repolist.length; i++) {
            $('#repo-list').append(`
            <li class='list-group-item'>
                <div class='d-flex'>
                    <img style="width:50px" src=${repolist[i].owner.avatar_url}></img>
                    <p class='m-2'>${repolist[i].owner.login}</p>
                    <a  class='m-2' href=${repolist[i].html_url} target="_blank">${repolist[i].name}</a>
                <div>
            </li>
            `)
        }
    }
}