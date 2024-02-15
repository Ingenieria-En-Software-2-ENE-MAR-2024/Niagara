import prisma from '../../../prisma/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth';

export function log_post(action : string) {
  async function replacementMethod(req: NextRequest, originalMethod: (req : NextRequest) => Promise<NextResponse>) {
    
    const result = await originalMethod(req);
    const session = await getServerSession();
    await prisma.logs.create({
      data: {
        action: action,
        description:  `Created object: ${await result.clone().text()}`,
        user: String(session?.user.name),
        module: "placeholder",
      },
    })
    return result;
  }
  return replacementMethod;
}

export function log_get(action : string, description : string) {
  async function replacementMethod(req: NextRequest, originalMethod: (req : NextRequest) => Promise<NextResponse>) {
    
    const result  = await originalMethod(req);
    const session = await getServerSession();
    await prisma.logs.create({
      data: {
        action: action,
        description:  description,
        user: String(session?.user.name),
        module: "placeholder",
      },
    })
    return result;
  }
  return replacementMethod;
}


export function log_delete(action : string) {
  async function replacementMethod(req: NextRequest, originalMethod: (req : NextRequest) => Promise<NextResponse>) {
    const result = await originalMethod(req);
    const session = await getServerSession();
    await prisma.logs.create({
      data: {
        action: action,
        description:  `Deleted object: ${await result.clone().text()}`,
        user: String(session?.user.name),
        module: "placeholder",
      },
    })
    return result;
  }
  return replacementMethod;
}