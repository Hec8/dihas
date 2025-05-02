'use client';

import { useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Header from '@/app/(app)/Header';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';

export default function CreateBlog() {
    const [formData, setFormData] = useState({
        image: null,
        titre: '',
        contenu: '',
        writer: '',
        resume: '',
    });

    const [updateTimeout, setUpdateTimeout] = useState(null);
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bold: {
                    HTMLAttributes: {
                        class: 'font-bold'
                    }
                },
                italic: {
                    HTMLAttributes: {
                        class: 'italic'
                    }
                }
            }),
            Highlight,
            Typography,
            Underline,
            TextStyle,
            Color,
            Image.configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto',
                },
            })
        ],
        content: formData.contenu,
        editorProps: {
            attributes: {
                class: 'prose max-w-none focus:outline-none'
            },
            handleDOMEvents: {
                keydown: (view, event) => {
                    if ((event.ctrlKey || event.metaKey) && (event.key === 'b' || event.key === 'i')) {
                        event.preventDefault();
                        if (event.key === 'b') {
                            editor?.chain().focus().toggleBold().run();
                        } else if (event.key === 'i') {
                            editor?.chain().focus().toggleItalic().run();
                        } else if (event.key === 'u') {
                            editor?.chain().focus().toggleUnderline().run();
                        }
                        return true;
                    }
                    return false;
                }
            }
        },
        onCreate: ({ editor }) => {
            editor.on('update', () => {
                // Annuler le timeout précédent s'il existe
                if (updateTimeout) clearTimeout(updateTimeout);

                // Créer un nouveau timeout
                const timeoutId = setTimeout(() => {
                    const html = editor.getHTML();
                    setEditorContent(html);
                    setFormData(prev => ({
                        ...prev,
                        contenu: html
                    }));
                }, 1000); // Attendre 1 seconde après la dernière modification

                setUpdateTimeout(timeoutId);
            });
        }
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editorContent, setEditorContent] = useState('');
    const router = useRouter();

    // Fonction pour gérer l'upload d'image dans l'éditeur
    const handleEditorImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsUploadingImage(true);

        try {
            // Créer un FormData pour l'upload
            const formData = new FormData();
            formData.append('image', file);

            // Uploader l'image
            const { data } = await axios.post('/api/upload-editor-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Insérer l'image dans l'éditeur
            if (data.url) {
                editor?.chain().focus().setImage({ src: data.url }).run();
            }

            toast.success('Image ajoutée avec succès');
        } catch (error) {
            toast.error("Erreur lors de l'upload de l'image");
            console.error(error);
        } finally {
            setIsUploadingImage(false);
            event.target.value = ''; // Réinitialiser l'input file
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setFormData(prev => ({
            ...prev,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await axios.get('/sanctum/csrf-cookie');

            const formDataToSend = new FormData();
            formDataToSend.append('image', formData.image);
            formDataToSend.append('titre', formData.titre);
            formDataToSend.append('contenu', formData.contenu);
            formDataToSend.append('writer', formData.writer);
            formDataToSend.append('resume', formData.resume);

            const { data } = await axios.post('/api/blog/create', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success(data.message);
            router.push('/blog-manage');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erreur lors de la création');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header title="Créer un nouvel article" />
            <Toaster position="top-right" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Image *</label>
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={handleImageChange}
                                            className="mt-1 block w-full text-sm text-gray-500
                                          file:mr-4 file:py-2 file:px-4
                                          file:rounded-md file:border-0
                                          file:text-sm file:font-semibold
                                          file:bg-green-50 file:text-green-800
                                          hover:file:bg-green-100"
                                            accept="image/*"
                                            required
                                        /><br />
                                    </div>
                                    <label className="block text-sm font-medium text-gray-700">Titre *</label>
                                    <input
                                        type="text"
                                        name="titre"
                                        value={formData.titre}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Auteur *</label>
                                    <input
                                        type="text"
                                        name="writer"
                                        value={formData.writer}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Résumé *</label>
                                    <textarea
                                        name="resume"
                                        value={formData.resume}
                                        onChange={handleChange}
                                        rows="3"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col gap-4 w-full">
                                    <div className="flex flex-col gap-2">
                                        <label className="block text-sm font-medium text-gray-700">Contenu *</label>
                                        <div className="mt-1 border rounded-md p-2 min-h-[300px]">
                                            <div className="border-b mb-2 p-2 flex flex-wrap gap-2 bg-gray-100">
                                                <button
                                                    type="button"
                                                    onClick={() => editor?.chain().focus().toggleBold().run()}
                                                    className={`p-2 rounded ${editor?.isActive('bold') ? 'bg-gray-200' : ''}`}
                                                    title="Gras (Ctrl+B)"
                                                >
                                                    <strong>B</strong>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                                                    className={`p-2 rounded ${editor?.isActive('italic') ? 'bg-gray-200' : ''}`}
                                                    title="Italique (Ctrl+I)"
                                                >
                                                    <em>I</em>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => editor?.chain().focus().toggleUnderline().run()}
                                                    className={`p-2 rounded ${editor?.isActive('underline') ? 'bg-gray-200' : ''}`}
                                                    title="Souligné (Ctrl+U)"
                                                >
                                                    <u>U</u>
                                                </button>
                                                <input
                                                    type="color"
                                                    onInput={e => editor?.chain().focus().setColor(e.target.value).run()}
                                                    value={editor?.getAttributes('textStyle').color || '#000000'}
                                                    className="w-8 h-8 p-0 rounded cursor-pointer"
                                                    title="Couleur du texte"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => editor?.chain().focus().toggleHighlight().run()}
                                                    className={`p-2 rounded ${editor?.isActive('highlight') ? 'bg-gray-200' : ''}`}
                                                    title="Surligner"
                                                >
                                                    <span className="bg-yellow-200 px-1">H</span>
                                                </button>

                                                {/* Ajoutez le bouton pour insérer une image */}
                                                <label className="p-2 rounded cursor-pointer hover:bg-gray-200">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleEditorImageUpload}
                                                        className="hidden"
                                                        disabled={isUploadingImage}
                                                    />
                                                    {isUploadingImage ? (
                                                        <span>Upload...</span>
                                                    ) : (
                                                        <span title="Insérer une image">🖼️</span>
                                                    )}
                                                </label>
                                            </div>
                                            <EditorContent
                                                editor={editor}
                                                value={formData.contenu}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50 min-h-[200px] prose max-w-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => router.push('/blog-manage')}
                                        className="mr-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}