import {test, expect, request}  from '@playwright/test';

let objectID = null;
const objectsPath = 'objects';
const baseURL:string = `https://api.restful-api.dev/`;

test('Get objects details', async({request})=>{
    // const baseURL:string = `https://api.restful-api.dev/${objectsPath}`;
    const startingTime = Date.now();
    const response = await request.get(baseURL+objectsPath);
    let responseJson = await response.json();
    let responseHeaders = response.headers();
    console.log(responseJson);
    console.log(responseHeaders['content-type']);
    expect(response.status()).toBe(200);
    expect(responseJson[0].id).toBe("1");
    expect(responseHeaders['content-type']).toContain('application/json');
    // response size
    console.log((await response.body()).byteLength);
    expect((await response.body()).byteLength).toBeLessThan(5000);
    //response time
    const duration = Date.now() - startingTime;
    console.log(duration);
    expect(duration).toBeLessThan(3000);

})

test('get request', async({request})=>{
    const baseURL = 'https://api.restful-api.dev/';
    const objectsPath = 'objects';
    const fullObjectsPath = baseURL+objectsPath;

    const response = await request.get('https://api.restful-api.dev/objects');
    let responseBody = await response.json();
    console.log(fullObjectsPath);
    console.log(responseBody);


});

test('post api', async({request})=>{
    const objectDetails = {
        "name": "Apple MacBook Pro 16",
        "data": {
            "year": 2019,
            "price": 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB"
        }
    }
    // const baseURL:string = `https://api.restful-api.dev/${objectsPath}`;

    const response = await request.post(baseURL+objectsPath, {
        data:objectDetails,
    });
    var responseJson = await response.json();
    console.log(responseJson);
    expect(response.status()).toBe(200);
    expect(responseJson.name).toBe(objectDetails.name);
    objectID = responseJson.id;
    console.log(objectID);
    
    //ff8081819782e69e01991f8f5bb65b16
    
})

test('put api', async({request})=>{
    const objectDetails = {
        "name": "Apple MacBook Air 16",
        "data": {
            "year": 2019,
            "price": 1000.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB"
        }
    }
    // const baseURL:string = `https://api.restful-api.dev/objects/${objectID}`;

    const response = await request.put(baseURL+objectsPath+"/"+objectID, {
        data:objectDetails,
    });
    var responseJson = await response.json();
    console.log(responseJson);
    expect(response.status()).toBe(200);
    expect(responseJson.name).toBe(objectDetails.name);
    objectID = responseJson.id;
    console.log(objectID);    
})

test('patch api', async({request})=>{
    const objectDetails = {
        "name": "Apple MacBook Air 14",
    }
    // const baseURL:string = `https://api.restful-api.dev/objects/${objectID}`;

    const response = await request.put(baseURL+objectsPath+"/"+objectID, {
        data:objectDetails,
    });
    var responseJson = await response.json();
    console.log(responseJson);
    expect(response.status()).toBe(200);
    expect(responseJson.name).toBe(objectDetails.name);
    objectID = responseJson.id;
    console.log(objectID);    
})

test('delete api', async({request})=>{
    // const baseURL:string = `https://api.restful-api.dev/objects/${objectID}`;

    const response = await request.delete(baseURL+objectsPath+"/"+objectID);
    var responseJson = await response.json();
    console.log(responseJson);
    expect(response.status()).toBe(200);
    expect(responseJson.message).toContain("Object with id");
    console.log(responseJson.message);    
})
