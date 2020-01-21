// variables
var processes = 4
var resources = 3
var resource = [0,0,0]
var available = [0,0,0]
var done = [false,false,false,false]
var result = []
var claim = 
[
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [0,0,0]
]
var CA = 
[
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [0,0,0]
]

// Mohasebe kardane C-A
function Init()
{
    // get resource from UI
    for (let i = 0; i < resources; i++) {
        try{
            resource[i] = (parseInt($("#resource"+i.toString()).text()))
        }
        catch
        {
            alert("ورودی را  کنترل کنید")
        }
    }
    // console.log(resource);

    // get available from UI
    for (let i = 0; i < resources; i++) {
        try{
            available[i] = (parseInt($("#available"+i.toString()).text()))
        }
        catch
        {
            alert("ورودی را  کنترل کنید")
        }
    }
    // console.log(available);

    // get claim from UI
    for (let i = 0; i < processes; i++) {
        for (let j = 0; j < resources; j++) {
            try{
                claim[i][j] = parseInt($("#claim"+i.toString()+j.toString()).text())
            }
            catch
            {
                alert("ورودی را  کنترل کنید")
            }
        }     
    }
    // console.log(claim);

    for (let i = 0; i < processes; i++) {
        for (let j = 0; j < resources; j++) {
            try{
                CA[i][j] = parseInt($("#claim"+i.toString()+j.toString()).text()) - parseInt($("#allocated"+i.toString()+j.toString()).text())
            }
            catch
            {
                alert("ورودی را  کنترل کنید")
            }
        }     
    }

    // console.log(CA);
    
}

function updateUI()
{
    console.log(available);
    console.log(CA);
    
    
}

function update()
{
    if(result.length == processes)
    {
        result_text = ""
        for (let i = 0; i < result.length; i++) {
            if(i == result.length-1)
                result_text += result[i]
            else
                result_text += result[i] + "→"
        }
        $('#result').text(result_text + " ( SAFE )")

        return
    }
    can_anything_execute = false

    // Main Algorithm
    for (let i = 0; i < processes; i++) {

        // "i" Qablan anjam Shode
        if(done[i]) continue

        var can_be_executed = true;

        // Aya resource kafi baraye process "i" baghi mande?
        for (let j = 0; j < resources; j++) {
            if (available[j] < CA[i][j])
            {
                can_be_executed = false
                break
            }
        }

        // Are baghi mande
        if(can_be_executed)
        {
            can_anything_execute = true

            // resource ro masraf kon baraye process "i"
            for (let j = 0; j < resources; j++) {
                available[j] = available[j] - CA[i][j]
            }
            done[i] = true
            
            result.push(i+1)

            // claim[i] free shavad chon process "i" anjam shode
            for (let j = 0; j < resources; j++) {
                available[j] = available[j] + claim[i][j] 
            }

            break
        }
    }

    //update kardane UI Result
    if (!can_anything_execute)
    {
        $('#result').text("UNSAFE")
        // console.log("UNSAFE") 
    }
    else{
        result_text = ""
        for (let i = 0; i < result.length; i++) {
            if(i == result.length-1)
                result_text += result[i]
            else
                result_text += result[i] + "→"
        }
        $('#result').text(result_text)
        // console.log(result)
    }
    updateUI()
}

// page startup
Init()

$("#submit-button").click(function(){
    Init()
})

$("#check-button").click(function(){
    update()
})