// src/app/core/models/auth.dto.ts

// Datos para la solicitud de login
export interface LoginRequestDTO {
  id_token: string;
}

// Datos para la respuesta del login
export interface LoginResponseDTO {
  firebase_uid: string;
  name: string;
  email: string;
  role_id: string;
  role_name: string;
  permissions: string[];
}
