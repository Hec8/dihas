'use client';

import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { useRouter, useParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@/hooks/auth';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';

export default function EditBlog() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        titre: '',
        contenu: '',
        writer: '',
        resume: '',
        statut: 'en cours',
        note: '',
        image: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [editorContent, setEditorContent] = useState('');

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
            Color
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose max-w-none focus:outline-none'
            },
            handleDOMEvents: {
                keydown: (view, event) => {
                    if ((event.ctrlKey || event.metaKey) && (event.key === 'b' || event.key === 'i' || event.key === 'u')) {
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
            // Mettre à jour le contenu local sans sauvegarde automatique
            editor.on('update', () => {
                const html = editor.getHTML();
                setEditorContent(html);
            });
        }
    });

    // Met à jour le contenu de l'éditeur quand il est prêt et que le contenu est disponible
    useEffect(() => {
        if (editor && formData.contenu) {
            editor.commands.setContent(formData.contenu);
        }
    }, [editor, formData.contenu]);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                console.log("Tentative de récupération de l'article ID:", id);
                const response = await axios.get(`/api/blog/edit/${id}`);

                console.log("Réponse complète:", response);
                console.log("Headers:", response.headers);
                console.log("Status:", response.status);
                console.log("Data:", response.data);

                if (!response.data || !response.data.article) {
                    throw new Error("Structure de réponse invalide: " + JSON.stringify(response.data));
                }

                const article = response.data.article;
                const content = response.data.article.contenu;
                if (editor) {
                    editor.commands.setContent(content);
                }

                setFormData({
                    titre: article.titre || '',
                    writer: article.writer || '',
                    resume: article.resume || '',
                    contenu: content || '',
                    statut: article.statut || 'en cours',
                    note: article.note || '',
                    image: null,
                });

            } catch (error) {
                console.error('Erreur complète:', {
                    message: error.message,
                    response: error.response?.data,
                    config: error.config
                });
                toast.error(error.response?.data?.message || 'Erreur lors du chargement');
                router.push('/blog-manage');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchArticle();
    }, [id, router]);


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
            const formDataToSend = new FormData();

            // Ajouter les champs de base
            formDataToSend.append('titre', formData.titre);
            formDataToSend.append('resume', formData.resume);
            formDataToSend.append('writer', formData.writer);
            formDataToSend.append('statut', formData.statut);
            formDataToSend.append('note', formData.note);

            // Ajouter l'image si elle existe
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            // Ajouter le contenu de l'éditeur
            // Récupérer le contenu actuel de l'éditeur
            const currentContent = editor?.getHTML() || '';
            formDataToSend.append('contenu', currentContent);

            // Ajouter la méthode PUT
            formDataToSend.append('_method', 'PUT');

            const response = await axios.post(`/api/blog/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('Article mis à jour avec succès');
            router.push('/blog-manage');
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
            toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
                        <Toaster position="top-right" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Les champs du formulaire (similaires à CreateBlog) */}
                                {/* Image */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Image</label>
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
                                    />
                                    <p className="mt-1 text-sm text-gray-500">Laissez vide pour conserver l'image actuelle</p>
                                </div>
                                {/* Titre */}
                                <div>
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

                                {/* Résumé */}
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

                                {/* Contenu */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Contenu *</label>
                                    <div className="mt-1 border rounded-md p-2 min-h-[300px]">
                                        <div className="border-b mb-2 p-2 flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                onClick={() => editor?.chain().focus().toggleBold().run()}
                                                className={`p-2 rounded ${editor?.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                                                title="Gras (Ctrl+B)"
                                            >
                                                <strong>B</strong>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => editor?.chain().focus().toggleItalic().run()}
                                                className={`p-2 rounded ${editor?.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                                                title="Italique (Ctrl+I)"
                                            >
                                                <em>I</em>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => editor?.chain().focus().toggleUnderline().run()}
                                                className={`p-2 rounded ${editor?.isActive('underline') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                                                title="Souligner (Ctrl+U)"
                                            >
                                                <u>U</u>
                                            </button>
                                            <div className="w-px h-6 bg-gray-300 mx-2 self-center" />
                                            <input
                                                type="color"
                                                onInput={e => editor?.chain().focus().setColor(e.target.value).run()}
                                                value={editor?.getAttributes('textStyle').color || '#000000'}
                                                className="w-8 h-8 p-1 rounded cursor-pointer"
                                                title="Couleur du texte"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => editor?.chain().focus().unsetColor().run()}
                                                className="p-2 rounded hover:bg-gray-100"
                                                title="Supprimer la couleur"
                                            >
                                                <span className="text-gray-600">A</span>
                                            </button>
                                            <div className="w-px h-6 bg-gray-300 mx-2 self-center" />
                                            <button
                                                type="button"
                                                onClick={() => editor?.chain().focus().toggleHighlight().run()}
                                                className={`p-2 rounded ${editor?.isActive('highlight') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                                                title="Surligner"
                                            >
                                                <span className="bg-yellow-200 px-1">H</span>
                                            </button>
                                        </div>
                                        <EditorContent
                                            editor={editor}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50 min-h-[200px] prose max-w-none"
                                        />
                                    </div>
                                </div>

                                {/* Auteur */}
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



                                {/* Section Admin (visible seulement pour admin) */}
                                {user?.role === 'super_admin' && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Statut</label>
                                            <select
                                                name="statut"
                                                value={formData.statut}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                            >
                                                <option value="en cours">En cours</option>
                                                <option value="validé">Validé</option>
                                                <option value="renvoyé">Renvoyé</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Note</label>
                                            <textarea
                                                name="note"
                                                value={formData.note}
                                                onChange={handleChange}
                                                rows={2}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                            />
                                        </div>
                                    </div>
                                )}

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
            </div >
        </>
    );
}