'use client';

import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function ContactMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const { data } = await axios.get('/api/contact');
            setMessages(data);
            setLoading(false);
        } catch (error) {
            toast.error('Erreur lors du chargement des messages');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Voulez-vous vraiment supprimer ce message ?')) return;

        try {
            await axios.delete(`/api/contact/delete/${id}`);
            toast.success('Message supprimé avec succès');
            fetchMessages();
            setSelectedMessage(null);
        } catch (error) {
            toast.error('Erreur lors de la suppression');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd MMMM yyyy à HH:mm', { locale: fr });
    };

    const markAsRead = async (id) => {
        try {
            await axios.put(`/api/contact/${id}/mark-as-read`);
            fetchMessages();
        } catch (error) {
            toast.error("Erreur lors du marquage comme lu");
        }
    };

    return (
        <>
                        <Toaster position="top-right" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Messages reçus</h2>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {loading ? (
                            <div className="p-6 text-center">Chargement...</div>
                        ) : messages.length === 0 ? (
                            <div className="p-6 text-center">Aucun message reçu</div>
                        ) : (
                            <div className="flex flex-col md:flex-row">
                                {/* Liste des messages */}
                                <div className="w-full md:w-1/3 border-r border-gray-200">
                                    <div className="overflow-y-auto max-h-[600px]">
                                        {messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${selectedMessage?.id === message.id ? 'bg-gray-100' : ''} ${!message.read_at ? 'font-semibold bg-blue-50' : ''}`}
                                                onClick={() => {
                                                    setSelectedMessage(message);
                                                    if (!message.read_at) markAsRead(message.id);
                                                }}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{message.name}</p>
                                                        <p className="text-sm text-gray-500">{message.email}</p>
                                                    </div>
                                                    <span className="text-xs text-gray-400">
                                                        {formatDate(message.created_at)}
                                                    </span>
                                                </div>
                                                <p className="text-sm mt-2 text-gray-600 line-clamp-1">{message.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Détail du message sélectionné */}
                                <div className="w-full md:w-2/3 p-6">
                                    {selectedMessage ? (
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-lg font-bold">{selectedMessage.name}</h3>
                                                    <p className="text-sm text-gray-600">{selectedMessage.email}</p>
                                                    {selectedMessage.telephone && (
                                                        <p className="text-sm text-gray-600 mt-1">Tél: {selectedMessage.telephone}</p>
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    {formatDate(selectedMessage.created_at)}
                                                </div>
                                            </div>

                                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                                <p className="whitespace-pre-line">{selectedMessage.message}</p>
                                            </div>

                                            <div className="mt-6 flex justify-end">
                                                <button
                                                    onClick={() => handleDelete(selectedMessage.id)}
                                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    Supprimer
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <p className="text-gray-500">Sélectionnez un message pour afficher son contenu</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}