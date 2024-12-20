

let loc;
navigator.geolocation.getCurrentPosition( (data) => {
    console.log(data.coords);
    const latitude = data.coords.latitude;
    const longitude = data.coords.longitude;
    fetchLocation(latitude, longitude)
} );




const fetchLocation = async (lat, lon) => {
    // const API_KEY = process.env.API_KEY;
    const API_KEY = process.env.API_KEY;
    // console.log(API_KEY)
    console.log("lat", lat);
    console.log("lon", lat)
    const loc = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${API_KEY}`);
    const data = await loc.json();
    console.log("data", data);

    let timezone = data.results;
    result = timezone[0]
    // console.log(timezone)


    document.getElementById("div1").innerHTML = ""
    document.getElementById("div1").innerHTML += `
        <p>Name of Time Zone: ${result.timezone.name}</p>
        <div style="display:flex; flex-direction:row; justify-content:flex-start; gap:500px; align-items:flex-start;">
            <p>Lat: ${lat}</p>
            <p>Long: ${lon}</p>
        </div>
        <p>Offset STD: ${result.timezone.offset_STD}</p>
        <p>Offset STD Seconds: ${result.timezone.offset_STD_seconds}</p>
        <p>Offset DST: ${result.timezone.offset_DST}</p>
        <p>Offset DST Seconds: ${result.timezone.offset_DST_seconds}</p>
        <p>Country: ${result.country}</p>
        <p>Postcode: ${result.postcode}</p>
        <p>City: ${result.city}</p>
    `
    

    
}


const search =async (event) => {
    const API_KEY = process.env.API_KEY;
    event.preventDefault();
    const address = document.getElementById("address").value;

    if(address.length){
        console.error("went wrong");
    }

    fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${API_KEY}`)
    .then( async (response)=>{
        let data  = await response.json();
        console.log(data);
        data = data.features;
        let result = data[4]
        document.getElementById("error").innerHTML = ""
        document.getElementById("div2").innerHTML  = ""
        document.getElementById("div2").innerHTML +=  `
            <p>Name of Time Zone: ${result.properties.timezone.name}</p>
            <div style="display:flex; flex-direction:row; justify-content:flex-start; gap:500px; align-items:flex-start;">
                <p>Lat: ${result.properties.lat}</p>
                <p>Long: ${result.properties.lon}</p>
            </div>
            <p>Offset STD: ${result.properties.timezone.offset_STD}</p>
            <p>Offset STD Seconds: ${result.properties.timezone.offset_STD_seconds}</p>
            <p>Offset DST: ${result.properties.timezone.offset_DST}</p>
            <p>Offset DST Seconds: ${result.properties.timezone.offset_DST_seconds}</p>
            <p>Country: ${result.properties.country}</p>
            <p>Postcode: ${result.properties.postcode}</p>
            <p>City: ${result.properties.city}</p>
    `


    } ).catch( (e) => {
        document.getElementById("error").innerHTML = ""
        document.getElementById("error").innerHTML += `<p style="color:red;">Please Enter an Address</p>`
        document.getElementById("result_header").innerHTML = ""
        document.getElementById("div2").innerHTML = ""

    })


}
