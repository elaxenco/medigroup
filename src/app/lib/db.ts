import postgres from 'postgres'
const password = encodeURIComponent("ziuS/&.f5Bp9JvS");
const connectionString = `postgresql://postgres.vrazehnfskuwtaobxuqa:${password}@aws-0-us-east-1.pooler.supabase.com:5432/postgres`
const sql = postgres(connectionString, {
  ssl: 'require'  
})

export default sql
