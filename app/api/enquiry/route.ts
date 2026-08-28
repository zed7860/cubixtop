import {NextResponse} from 'next/server';

const requiredFields=['name','email','phone','message'] as const;

export async function POST(req:Request){
  let payload:unknown;
  try{payload=await req.json()}catch{return NextResponse.json({success:false,error:'Invalid request body.'},{status:400})}
  if(!payload||typeof payload!=='object'||Array.isArray(payload))return NextResponse.json({success:false,error:'Invalid request body.'},{status:400});
  const data=payload as Record<string,unknown>;
  const isValid=requiredFields.every(field=>typeof data[field]==='string'&&data[field].trim().length>0)&&typeof data.email==='string'&&/^\S+@\S+\.\S+$/.test(data.email);
  if(!isValid)return NextResponse.json({success:false,error:'Please provide valid contact details.'},{status:400});
  return NextResponse.json({success:true});
}
