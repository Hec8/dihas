import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Obtenir le corps de la requête
    const body = await request.json();
    const bodyString = JSON.stringify(body);
    
    // Faire la requête directement avec fetch natif
    const response = await fetch('https://negative-honor-hec8-2159b031.koyeb.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: bodyString,
      credentials: 'include',
    });

    // Lire le corps de la réponse
    const responseData = await response.json();

    // Créer une réponse
    return NextResponse.json(responseData, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    console.error('Login error:', error.message);
    return NextResponse.json(
      { message: 'Une erreur est survenue lors de la connexion' },
      { status: 500 }
    );
  }
}
