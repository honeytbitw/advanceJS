let battleArray = []
let finalObj = {}
let div = document.getElementById('#finalObj')

function getJSON(){
    fetch('battles.json')
    .then(response => response.json())
    .then(json => {
        battleArray = json
    })
    .then(()=>{
        finalObj["most_active"] = mostActive()
        finalObj["attacker_outcome"] = attackerOutcome()
        finalObj["battle_type"] = uniqueBattleType()
        finalObj["defender_size"] = defenderSize()
        showData(finalObj)
    })
    .catch(err=>{
        console.log(err)
    })
}

async function submitQ1(){
    await getJSON()
}

function mostActive(){

    function maxKey(obj){
        let k = Object.keys(obj)
        let v = Object.values(obj)
        let maxV = Math.max(...v)
        let maxI = v.indexOf(maxV)
        return k[maxI]
    }

    let attKing = {}
    battleArray.map(battle=>{
        if(battle.attacker_king!==""){
            if(Object.keys(attKing).includes(battle.attacker_king))
                attKing[battle.attacker_king] += 1
            else
                attKing[battle.attacker_king] = 1
        }
    })

    let defKing = {}
    battleArray.map(battle=>{
        if(battle.defender_king!==""){
            if(Object.keys(defKing).includes(battle.defender_king))
                defKing[battle.defender_king] += 1
            else    
            defKing[battle.defender_king] = 1
        }
    })

    let regions = {}

    battleArray.map(battle=>{
        if(battle.region!==""){
            if(Object.keys(regions).includes(battle.region))
                regions[battle.region] += 1
            else    
                regions[battle.region] = 1
        }
    })

    
    return{   
        "attacker_king" : maxKey(attKing),
        "defender_king" : maxKey(defKing),
        "region" : maxKey(regions)
}
}

function attackerOutcome(){

    let w = 0;
    let l = 0;

    battleArray.map(battle=>{
        if(battle.attacker_outcome==="win")
            w += 1
        else
            l += 1
    })
    return{
        "win" : w,
        "loss" : l
    }
}


function uniqueBattleType(){
    let allBattle = []

    battleArray.map(battle=>{
        if(battle.battle_type!=="")
            allBattle.push(battle.battle_type)
    
        return new Set(allBattle)
    })
}


function defenderSize(){
    
    function getMax(){
        let mx = 0
        battleArray.map(battle=>{
            if(battle.defender_size!==null)
                if(battle.defender_size>mx)
                    mx = battle.defender_size
        })
        return mx
    }
    function getMin(){
        let mn = 999999999
        battleArray.map(battle=>{
            if(battle.defender_size!==null)
                if(battle.defender_size<mn)
                    mn = battle.defender_size
        })
        return mn
    }
    let total = 0
    battleArray.map((count)=>{
        total += count.defender_size
    })
    let avg = total/battleArray.length

    let min = getMin(battleArray)
    let max = getMax(battleArray)
    return{
        min: min,
        max: max,
        average: avg
    }

}

function showData(finalObj){
    console.log(finalObj)
    $('#finalObj').append(`<pre>${finalObj}</pre>`)
}