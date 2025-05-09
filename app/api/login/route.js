import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    // Obtenir le corps de la requête
    const body = await request.json();

    // Obtenir le token CSRF d'abord
    await axios.get('https://negative-honor-hec8-2159b031.koyeb.app/sanctum/csrf-cookie', {
      withCredentials: true,
    });

    // Faire la requête au backend
    const response = await axios.post('https://negative-honor-hec8-2159b031.koyeb.app/login', body, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      withCredentials: true,
    });

    // Créer une réponse avec les données du backend
    const nextResponse = NextResponse.json(response.data);

    // Copier les cookies de la réponse du backend
    if (response.headers['set-cookie']) {
      for (const cookie of response.headers['set-cookie']) {
        nextResponse.headers.append('Set-Cookie', cookie);
      }
    }

    return nextResponse;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    return NextResponse.json(
      error.response?.data || { message: 'Une erreur est survenue' },
      { status: error.response?.status || 500 }
    );
  }
}
