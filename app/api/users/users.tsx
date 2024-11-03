"use server"
import { User } from "@/app/utils/entities/user";
import { consumerRole, merchantEmail, merchantRole } from "@/lib/constants/constants";
import { supabase } from "@/lib/supabaseDbconfig";
export  async function createUser(token:any){
    console.log('user api')
    if (token != null){
    const {data, error} = await supabase.from("users").select("*"). eq("email",token.email)
    if (error){
        console.error("Error executing query:", error);
        return null;
    }
    if(data.length == 0){
        const newUser: User ={
            email : token.email || null,
            name : token.name || null,
            profile_image : token.picture || null,
            role: token.email === merchantEmail ? merchantRole : consumerRole
        };
        const {status, error}  =await supabase.from("users").insert([newUser])
        if (error){
            console.error("user inserting User");
            return {res:{ data: null, status:status, message:"error inserting User" }}
        }
        console.error("user created successfully");
        return {res:{ data: null, status:status, message:"User created successfully" }}
    }
    console.error("user already exists");
    return {res:{ data: null, status:200, message:"user already exists" }}
    }
}

export  async function GetUserByEmail(email:string){
    if (email){
        const {data, error} = await supabase.from("users").select("*"). eq("email",email)
        if (error){
            console.error("Error executing query:", error);
            return null;
        }
        console.log(data)
        return data
    }
}