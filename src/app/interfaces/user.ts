export interface user_body_create {
  name: string
  email: string
  role?: string
  password: string
}

export interface filters {
  search_field?: string
  search_text?: string
}

export interface user_body_update {
  name: string
  role?: string
}

export interface user_body_update_password{
  oldPassword: string
  newPassword: string
  compareNewPassword: string
}
