import {test, expect, request}  from '@playwright/test';
let objectID = null;
let fullPathWithId: string|any;
const baseURL = 'https://api.restful-api.dev/';
const objectPath = 'objects'
const fullUrlWithObjectPath = baseURL+objectPath;

test('Get API', async({request})=>{
    const startingTime = Date.now();
    const response = await request.get(fullUrlWithObjectPath);
    let responseBody = await response.json();
    let responseHeaders = response.headers();
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(responseBody[0].id).toBe('1');
    console.log(responseHeaders);
    expect(responseHeaders['content-type']).toContain('application/json');
    let responseSize = (await response.body()).byteLength;
    expect(responseSize).toBeLessThan(4000);
    console.log(responseSize);
    let responseTime = Date.now() - startingTime;
    console.log(responseTime);
    expect(responseTime).toBeLessThan(2000)
})

test('Post API', async({request})=>{
    const payload = {
            "name": "Apple MacBook Pro 16",
            "data": {
                "year": 2019,
                "price": 1849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB"
            }
        }
    const response = await request.post(fullUrlWithObjectPath, {
        data:payload
    })
    let responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(responseBody.name).toContain(payload.name);
    objectID = responseBody.id;
    fullPathWithId = fullUrlWithObjectPath+'/'+objectID;
});

test('Put API', async({request})=>{
    const payload = {
            "name": "Apple MacBook Pro 11",
            "data": {
                "year": 2019,
                "price": 1849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB"
            }
        }
    const response = await request.put(fullPathWithId, {
        data:payload
    })
    let responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(responseBody.name).toContain(payload.name);
})

test('Patch API', async({request})=>{
    const payload = {
        "name": "Apple MacBook Air 16"
        }
    const response = await request.patch(fullPathWithId, {
        data:payload
    })
    let responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(responseBody.name).toContain(payload.name);
})

test('Delete API', async({request})=>{
    const response = await request.delete(fullPathWithId)
    let responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(responseBody.message).toContain('Object with');
});
