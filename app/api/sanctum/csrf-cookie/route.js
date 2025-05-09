import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    // Faire la requête au backend
    const response = await axios.get('https://negative-honor-hec8-2159b031.koyeb.app/sanctum/csrf-cookie', {
      withCredentials: true,
    });

    // Créer une réponse vide
    const nextResponse = NextResponse.json({}, { status: 204 });

    // Copier les cookies de la réponse du backend
    if (response.headers['set-cookie']) {
      for (const cookie of response.headers['set-cookie']) {
        nextResponse.headers.append('Set-Cookie', cookie);
      }
    }

    return nextResponse;
  } catch (error) {
    console.error('CSRF cookie error:', error.response?.data || error.message);
    return NextResponse.json(
      error.response?.data || { message: 'Une erreur est survenue' },
      { status: error.response?.status || 500 }
    );
  }
}
