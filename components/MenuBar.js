const MenuBar = ({ editor }) => {
    if (!editor) return null;

    return (
        <div className="flex flex-wrap gap-1 mb-2">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-1 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
            >
                <strong>B</strong>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-1 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
            >
                <em>I</em>
            </button>
            {/* Ajoutez d'autres boutons ici */}
        </div>
    );
};

export default MenuBar;