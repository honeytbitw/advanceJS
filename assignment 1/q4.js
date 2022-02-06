$(document).ready(() => {
    $('#flight-list').hide()
})

async function submitQ4(){
    await getFlightData()
}

function getFlightData(){
    axios.get('https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json')
    .then(res=>{
        // console.log(res)
        populateFlightList(res.data)
    })
    .catch(err=>{
        alert(err)
    })
}

function checkSum(data){
    console.log(data)
    if(data["Cancelled"]+data["Delayed"]+data["Diverted"]+data["On Time"]===data["Total"]){
        return true
    }
    return false
}

function populateFlightList(data) {
    if (data.length === 0) {
        $('#flight-list').hide()
    } else {
        $('#flight-list').empty()
        $('#flight-list').show()
        for (let i = 0; i < data.length; i++) {
            $('#flight-list').append(`
            <li class='list-group-item'>
                <div class='d-flex'>
                    <p class='m-2'>${data[i].Airport.Code}</p>
                    <p class='m-2'>${data[i].Airport.Name}</p>
                    <p class='m-2'>sum: ${checkSum(data[i].Statistics.Flights)}</p>
                <div>
            </li>
            `)
        }
    }
}