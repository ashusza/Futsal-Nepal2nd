import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const data = await req.json()
  
  // TODO: Connect to Google Sheets for venues
  // For now just log and return success
  console.log('Venue registration:', data)
  
  return NextResponse.json({ 
    success: true, 
    message: 'Registration received' 
  })
}
