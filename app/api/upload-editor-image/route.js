import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('image');

        if (!file) {
            return NextResponse.json({ error: 'Aucun fichier reçu' }, { status: 400 });
        }

        // Créer un nom de fichier unique
        const timestamp = Date.now();
        const ext = file.name.split('.').pop();
        const filename = `editor-${timestamp}.${ext}`;

        // Chemin où sauvegarder l'image (adaptez-le à votre structure)
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'editor');
        const filePath = path.join(uploadDir, filename);

        // Créer le dossier s'il n'existe pas
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Convertir le fichier en buffer et l'écrire
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.promises.writeFile(filePath, buffer);

        // Retourner l'URL de l'image
        const imageUrl = `/uploads/editor/${filename}`;

        return NextResponse.json({ url: imageUrl }, { status: 200 });
    } catch (error) {
        console.error('Erreur upload image:', error);
        return NextResponse.json(
            { error: 'Erreur lors du traitement du fichier' },
            { status: 500 }
        );
    }
}