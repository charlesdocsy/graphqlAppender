console.log('Hello from background.js')

const graphQL = 'https://samizdat-graphql.nytimes.com/graphql/v2'

// Listen for requests to ^ GraphQL url and then append the
// operationName, from the Request body, to end of the 
// url to create a unique URL :)
chrome.webRequest.onBeforeRequest.addListener(function(req) { 
    let appendedGraphQlUrl = ""

    // convert Buffer to String
    const stringResponse = decodeURIComponent(String.fromCharCode.apply(null,
        new Uint8Array(req.requestBody.raw[0].bytes)));

    // convert String to JSON
    const jsonResponse = JSON.parse(stringResponse)

    if(jsonResponse && jsonResponse.operationName){
        appendedGraphQlUrl = `${graphQL}?${jsonResponse.operationName}`
        console.log('appendedGraphQlUrl',appendedGraphQlUrl)
    }
       
    return { redirectUrl: appendedGraphQlUrl}
}, {
    urls: [graphQL]
}, ['requestBody','blocking']);