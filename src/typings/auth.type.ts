export type Login = {
  api_user: LoginUser;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type User={
  id:number;
  email:string;
}

export type LoginResponse = {
  jwt: string;
  user:User;
};

export type SignUp = {
  api_user: SignUpUser;
};

export type SignUpUser = {
  first_name: string;
  last_name: string;
  password: string;
  password_confirmation: string;
  email: string;
};

export type SignUpResponse = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  account_id: number;
  email_enabled: boolean;
  jti: string;
};

