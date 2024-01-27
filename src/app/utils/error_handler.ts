import z from 'zod'
import { NextResponse } from 'next/server';
export class custon_error extends Error {
    public code: number;
  
    constructor(message: string, code: number) {
      super(message);
      this.code = code;
      Object.setPrototypeOf(this, custon_error.prototype);
    }
  }

export const handle_error_http_response = (error:any) =>{
    if (error instanceof z.ZodError)
        return NextResponse.json({error:"Error in validation"},{status:400})
    else if(error instanceof custon_error )    
        return NextResponse.json({error:error.message},{status:error.code})
    else
        return NextResponse.json({error:'Internal server Error'},{status:500})
}