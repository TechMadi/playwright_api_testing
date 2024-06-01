import {test,request, expect} from "@playwright/test"
import { todo } from "node:test";




test.describe("Fetching Todos",async()=>{

    test.use({
        baseURL:"https://jsonplaceholder.typicode.com/"
    })
    test("Fetch All Todos",async({request})=>{
         const response=await request.get('users');
         expect(response.ok()).toBeTruthy();

         console.log(await response.json())
        const users=await response.json()

        expect(users.length).toBeGreaterThan(0)
    })


    test("Add  New User",async({request})=>{

    })
})