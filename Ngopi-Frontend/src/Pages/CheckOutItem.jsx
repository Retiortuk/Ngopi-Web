import { useRef, useState, useEffect } from "react";
import styles from './CheckOutItem.module.css';


const NoteDisplay = ({ isVisible, setVisible, noteValue, onNoteChange, onDelete, noteRef, hasNote, isMobile = false }) => {
    return (
        <div className={isMobile ? "d-block d-md-none mt-2" : "d-none d-md-block"}>
            {isVisible ? (
                <div ref={noteRef}>
                    <textarea 
                        className="form-control form-control-sm fst-italic" 
                        rows="2" 
                        placeholder="example: less sugar...."
                        value={noteValue}
                        onChange={(e) => onNoteChange(e.target.value)}
                        autoFocus
                    />
                </div>
            ) : hasNote ? (
                <div className={isMobile ? "d-flex justify-content-between align-items-center" : ""}>
                    <p className={`small fst-italic text-muted mb-1 ${styles.noteText}`}>
                        <strong>Note:</strong> {noteValue}
                    </p>
                    <div className={isMobile ? "d-flex gap-2" : "d-flex gap-3"}>
                        <button className={`btn btn-sm btn-link p-0 text-decoration-none text-muted ${styles.noteActionButton}`} onClick={() => setVisible(true)}>
                            {isMobile ? 'Edit' : 'Edit Note'}
                        </button>
                        <button className={`btn btn-sm btn-link p-0 text-decoration-none text-danger ${styles.noteActionButton}`} onClick={onDelete}>
                            {isMobile ? 'Delete' : 'Delete Note'}
                        </button>
                    </div>
                </div>
            ) : (
                <button className="btn btn-link btn-sm p-0 text-muted text-decoration-none" onClick={() => setVisible(true)}>
                    + Add Note
                </button>
            )}
        </div>
    );
};


function CheckOutItem({item, noteValue, onNoteChange}) {
    const [isNoteVisible, setNoteVisible] = useState(false)
    const noteRef = useRef(null)
    const hasNote = noteValue && noteValue.trim() !== '';

    useEffect(() => {
        function handleClickOutside(event) {
            if (noteRef.current && !noteRef.current.contains(event.target)) {
                setNoteVisible(false);
            }
        }
        
        if (isNoteVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isNoteVisible]);

    const handleDeleteNote = () => {
        onNoteChange(item._id, '');
        setNoteVisible(false);
    };

    const imageUrl = `${import.meta.env.VITE_API_BASE_URL}`

    return(
        <div className="card border-0 shadow-sm mb-3">
            <div className="card-body">
                {/* Bagian Atas: Gambar, Judul, Harga */}
                <div className="d-flex align-items-center">
                    <img src={imageUrl + item.image} className="img-fluid rounded-3" alt={item.name} style={{ width: '75px' }} />
                    <div className="ms-3 flex-grow-1">
                        <h5 className="mb-1 fs-6 fs-md-5">{item.name} ({item.quantity})</h5>
                        <p className="small mb-0 text-muted fw-semibold fs-7">Rp{new Intl.NumberFormat('id-ID').format(item.price)}</p>
                    </div>

                    {/* Versi Desktop dari Note */}
                    <NoteDisplay 
                        isVisible={isNoteVisible}
                        setVisible={setNoteVisible}
                        noteValue={noteValue}
                        onNoteChange={(note) => onNoteChange(item._id, note)}
                        onDelete={handleDeleteNote}
                        noteRef={noteRef}
                        hasNote={hasNote}
                    />
                </div>

                {/* Versi Mobile dari Note */}
                <NoteDisplay 
                    isVisible={isNoteVisible}
                    setVisible={setNoteVisible}
                    noteValue={noteValue}
                    onNoteChange={(note) => onNoteChange(item._id, note)}
                    onDelete={handleDeleteNote}
                    noteRef={noteRef}
                    hasNote={hasNote}
                    isMobile={true}
                />
            </div>
        </div>    
    )
}

export default CheckOutItem;