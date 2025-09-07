import { useRef, useState, useEffect } from "react";
import styles from './CheckOutItem.module.css';

function CheckOutItem({item}) {
    const [isNoteVisible, setNoteVisible] = useState(false)
    const [notes, setNote] = useState('');
    const noteRef = useRef(null)
    const hasNote = notes.trim() !== '';
    useEffect(()=> {
            function handleClickOutside(event) {
                if(noteRef.current && !noteRef.current.contains(event.target)) {
                    setNoteVisible(false)
                }
            }
            if(isNoteVisible) {
                document.addEventListener('mousedown', handleClickOutside);
            }
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            }
    },[isNoteVisible]);

    const deleteNote = ()=> {
        setNote('')
        setNoteVisible(false)
    }

    return(
            // {/* // ITEM YANG DIORDER ------------------------------------------------------------------------------------------------------------------------------- */}
            <div className="card  border-0 shadow-sm">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        {/* GAMBAR ITEM */}
                        <img src={item.image} className="img-fluid rounded-3" alt="Items Pict" style={{ width: '75px' }} />

                        {/* NAMA ITEM DAN HARGA */}
                        <div className="ms-3 flex-grow-1">
                            <h5 className="mb-1 fs-6 fs-md-5">{item.title} ({item.quantity})</h5>
                            <p className="small mb-0 text-muted fw-semibold fs-7">Rp{new Intl.NumberFormat('id-ID').format(item.price)}</p>
                        </div>

                        {/* Note Di Desktop---------------------------------------------------------------------------------------------------*/}
                        <div className="d-none d-md-block">
                            {isNoteVisible ? (
                                <div className="mt-2" ref={noteRef}>
                                    <textarea className="form-control form-control-sm fst-italic" 
                                        rows="2" 
                                        placeholder="Note: Less Sugar..."
                                        value={notes}
                                        onChange={(e) => setNote(e.target.value)}
                                        autoFocus>  
                                        {/* onChange={(e)=> setNote(e.target.value)} */}
                                    </textarea>
                                </div>
                            ): hasNote ? (
                                <div>
                                    <p className={`small fst-italic text-muted mb-1 ${styles.noteText}`}>
                                        <strong>Note:</strong> {notes}
                                    </p>
                                    <div className={`d-flex gap-4`}>
                                        <button className={`btn btn-sm btn-link p-0 text-decoration-none text-muted ${styles.noteActionButton}`}
                                            onClick={()=> setNoteVisible(true)}>
                                                Edit Note
                                        </button>
                                        <button className={`btn btn-sm btn-link p-0 text-decoration-none text-danger ${styles.noteActionButton}`}
                                            onClick={deleteNote}>
                                                Delete Note
                                        </button>
                                    </div>
                                </div>
                            ): (
                                <button className="btn btn-link btn-sm p-0 text-muted text-decoration-none" onClick={()=> setNoteVisible(true)}>
                                    Add Note
                                </button>
                            )}
                        </div>
                        {/* ---------------------------------------------------------------------------------------------------------------- */}


                    </div>
                    {/* NOTE VERSI MOBILE ---------------------------------------------------------------------------------- */}
                    <div className="d-block d-md-none mt-2">
                        {isNoteVisible ? (
                            <div ref={noteRef}>
                                <textarea className="form-control form-control-sm fst-italic" rows="2" placeholder="Note: Less Sugar..." value={notes} onChange={(e) => setNote(e.target.value)} autoFocus />
                            </div>
                        ) : hasNote ? (
                            <div className="d-flex justify-content-between align-items-center">
                                <p className={`small fst-italic text-muted mb-0 ${styles.noteText}`}><strong>Note:</strong> {notes}</p>
                                <div className="d-flex gap-2">
                                    <button className={`btn btn-sm btn-link p-0 text-decoration-none text-muted ${styles.noteActionButton}`} onClick={() => setNoteVisible(true)}>Edit</button>
                                    <button className={`btn btn-sm btn-link p-0 text-decoration-none text-danger ${styles.noteActionButton}`} onClick={deleteNote}>Delete</button>
                                </div>
                            </div>
                        ) : (
                            <button className="btn btn-link btn-sm p-0 text-muted text-decoration-none" onClick={() => setNoteVisible(true)}>+ Add Note</button>
                        )}
                    </div>
                    {/* ------------------------------------------------------------------------------------------------------ */}
                </div>
            </div>
            // {/* // ----------------------------------------------------------------------------------------------------------------------------------------------------- */}
    )
}

export default CheckOutItem;