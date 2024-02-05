import { getServerSession } from 'next-auth/next'
import { getSession, useSession } from 'next-auth/react'

type Role = string
type RoleHierarchy = { [key: Role]: Role[] }
type RoutesInfo = {
  [key: Role]: {
    roles: Role[]
    test: (roles: Role[], role: Role | null) => boolean
  }
}

const roleHierarchy: RoleHierarchy = {
  Admin: ['Admin'],
  Doctor: ['User'],
  Paciente: ['User', 'Intern'],
  User2: [],
  User: [],
}

function is_top(x: Role): boolean {
  return x === 'Admin'
}

export function has_role(x: Role, y: Role): boolean {
  return is_top(x) || x === y || y in roleHierarchy[x]
}

function fulfills_any_role(roles: Role[], role: Role | null): boolean {
  return (
    role !== null &&
    role !== undefined &&
    roles.filter((x) => has_role(role, x)).length != 0
  )
}

function public_route_test(_1: any, _2: any): boolean {
  return true
}

export const routesInfo: RoutesInfo = {
  '/login': {
    roles: [],
    test: public_route_test,
  },
  '/homeAuth': {
    roles: ['Admin'],
    test: fulfills_any_role,
  },
  '/homeDummy1': {
    roles: ['Doctor'],
    test: fulfills_any_role,
  },
  '/homeDummy2': {
    roles: ['Admin'],
    test: fulfills_any_role,
  },
  '/homeDummy3': {
    roles: ['Admin'],
    test: fulfills_any_role,
  },
  '/niagarahome': {
    roles: ['Paciente'],
    test: fulfills_any_role,
  },
}

const routesInfoKeys: string[] = Object.keys(routesInfo)

function test_route(key: string, role: Role | null) {
  const { roles, test } = routesInfo[key]
  return test(roles, role)
}

export function check_privileges(
  url: URL,
  user_role: Role | null,
): 'loading' | 'authorized' | 'unauthorized' {
  let authorized = false
  routesInfoKeys.forEach((pattern: string) => {
    authorized =
      authorized ||
      (url.pathname.startsWith(pattern) && test_route(pattern, user_role))
  })

  if (authorized) return 'authorized'
  return 'unauthorized'
}
