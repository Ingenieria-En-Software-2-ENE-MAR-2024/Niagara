export interface email_credentials {
    address: string
    name: string
    password: string
}

export interface email_data_message {
    to: string | string[],
    subject: string,
    text: string,
}