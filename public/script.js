const root = document.getElementById('root')
const stateToggle = document.getElementById('stateToggle')
const automaticToggle = document.getElementById('automaticToggle')

function toggleSwitch(mode,id){
    POST('http://localhost:3000/data/toggle',{id,mode})
}

let stateEndpoint = `https://blr1.blynk.cloud/external/api/get?token=gntgwdZcCVdLW8YMcDbV0aDfaeIcEcbw&v0`
let updateStateEndpoint = 'https://blr1.blynk.cloud/external/api/update?token=gntgwdZcCVdLW8YMcDbV0aDfaeIcEcbw&v0='
let automaticEndpoint = `https://blr1.blynk.cloud/external/api/get?token=gntgwdZcCVdLW8YMcDbV0aDfaeIcEcbw&v2`
let updateAutoEndpoint = `https://blr1.blynk.cloud/external/api/update?token=gntgwdZcCVdLW8YMcDbV0aDfaeIcEcbw&v2=`
function toggleState(){
    // First read current state then NOT it
    GET(stateEndpoint,(data)=>{
        let update = updateStateEndpoint + (data ? '0' : '1')
        GET(update,()=>{})
    })
}

function toggleAuto(){
    GET(automaticEndpoint,(data)=>{
        let update = updateAutoEndpoint + (data ? '0' : '1')
        GET(update,()=>{})
    })
}

setInterval(()=>{
    // Display the two states of interest. device state and manual/ai state
    GET(stateEndpoint,(data)=>{
        stateToggle.checked = data;
    })
    GET(automaticEndpoint,(data)=>{
        automaticToggle.checked = data;
    })
},1000)

function GET(endpoint,callback){
    fetch(endpoint).then((res)=>res.json()).then(callback)
}

function POST(endpoint,data){
    fetch(endpoint, {
        method: 'POST',
        headers: {
        "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
}
