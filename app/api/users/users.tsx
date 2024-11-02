import { User } from "@/app/utils/entities/user";
import { supabase } from "@/lib/supabaseDbconfig";

export default async function createUser(token:User){
    if (token != null){
        await supabase.rpc('execute_raw_sql',{
            query: 'SELECT email FROM users WHERE email = ;'
        })
    }
}