
/*
* @param {boolean} isOpen - Modal visibility state
 * @param {function} onClose - Triggered when modal is closed
 * @param {function} onSave - Callback receiving Array of File objects: onSave(files)
 * @param {Array<File>} initialFiles - Previously chosen files to persist edit state
 * @param {number} maxFiles - Maximum allowed images (default: 10)
 * @param {number} maxSizeBytes - Maximum size per file in bytes (default: 5MB)
 * 
 * */
import { useRef, useState ,useEffect } from "react";



export default function ImagePicker({

    isOpen,
    onClose,
    onSave,
    initialFiles=[],
    maxFiles=8,
    maxSizeBytes = 5 * 1024 * 1024

}){

    const styles = {
    backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '1rem',
  },
  modalCard: {
    background: '#ffffff',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '620px',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  header: {
    padding: '1rem 1.25rem',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#64748b',
  },
  errorBanner: {
    backgroundColor: '#fef2f2',
    color: '#b91c1c',
    padding: '0.75rem 1.25rem',
    fontSize: '0.875rem',
    borderBottom: '1px solid #fee2e2',
  },
  dropZone: {
    margin: '1.25rem',
    marginBottom: '0.75rem',
    border: '2px dashed',
    borderRadius: '8px',
    padding: '2rem 1rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  previewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
    gap: '0.75rem',
    padding: '0 1.25rem 1.25rem 1.25rem',
    overflowY: 'auto',
    flex: 1,
  },
  previewCard: {
    position: 'relative',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    background: '#ffffff',
  },
  previewThumb: {
    width: '100%',
    height: '80px',
    objectFit: 'cover',
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 6px',
    background: '#f8fafc',
  },
  fileName: {
    fontSize: '0.65rem',
    color: '#475569',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '70px',
  },
  deleteBtn: {
    background: 'transparent',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    fontSize: '0.75rem',
    padding: '2px',
  },
  primaryBadge: {
    position: 'absolute',
    top: '4px',
    left: '4px',
    background: 'rgba(15, 23, 42, 0.75)',
    color: '#ffffff',
    fontSize: '0.6rem',
    padding: '2px 4px',
    borderRadius: '4px',
  },
  footer: {
    padding: '1rem 1.25rem',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#f8fafc',
  },
  cancelBtn: {
    background: '#ffffff',
    border: '1px solid #cbd5e1',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    marginRight: '0.5rem',
  },
  applyBtn: {
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 600,
  },
}









    const [selected_files,setSelectedFiles] = useState([])

    const [previews,setPreviews] = useState([])
    
    const [dragActive,setDragActive] = useState(false)

    const [error_message,setErrorMesage] = useState(null)

    const file_input_ref = useRef(null)

    const gen_previews = (files) => {

        const next_previews = files.map((file)=>({

            file,
            url: URL.createObjectURL(file),
            name:file.name,
            size: ( file.size / (1024 * 1024) ).toFixed(2)

        }))


        setPreviews(next_previews)

    } 

    const handle_drag = (e) =>{

            e.preventDefault()
            e.stopPropagation()

            if(e.type=='dragenter' || e.type == 'dragover'){

                setDragActive(true)
            } else if (e.type == 'dragleave')
            {
                setDragActive(false)
            }
    }

    const handle_drop = (e) =>{

            e.preventDefault()

            e.stopPropagation()

            setDragActive(false)

            if (e.dataTransfer.files && e.dataTransfer.files.length > 0){

                validate_and_add_image(e.dataTransfer.files)

            }



    }

    
    const validate_and_add_image = (incoming_files)=>{

        setErrorMesage('')
        
        const new_files = Array.from(incoming_files)

        const valid_image_types = ['image/jpeg','image/png','image/webp','image/avif']

        const filtered = []

        for (const file of new_files){

            if(!valid_image_types.includes(file.type)){
             
                setErrorMesage(`${file.name} is not supported file`);

                return;
                
            }

            if(file.size  > maxSizeBytes){

                
                setErrorMesage(`${file.name} is larger than 5MB`)

                return
            }

            filtered.push(file)



        }

        const merged =[...selected_files,...filtered]

        if (merged.length > maxFiles){


               setErrorMesage(`you can upload uptp ${maxFiles} number of files `)

                return

        }
        setSelectedFiles(merged)
        setPreviews(merged)


    }

    useEffect(()=>{

        if(isOpen) {

            setSelectedFiles(initialFiles)
            setPreviews(initialFiles)
            setErrorMesage('')

            




        }

    },[isOpen,initialFiles])


    useEffect(()=>{


        return ()=>{

            previews.forEach((p)=>URL.revokeObjectURL(p.url))


        };
        

    },[previews])


    const handle_confirm = () => {

        onSave(selected_files)
        onClose()



    }


    const handle_remove_item = (index)=>{

        const updated = selected_files.filter((_,i)=>i!==index)

        setSelectedFiles(updated)

        setPreviews(updated)


    }


    if (!isOpen )return null;
    
    return(
        <> 

            <div style={styles.backdrop}>

                <div style={styles.modalCard}>

                    <div style={styles.header}>

                        <h3 style={{margin:0}}>Select and Manage Media</h3>

                        <button style={styles.closeBtn} onClick={onClose}>&times; </button>

                    </div>
                        {error_message && <div style={styles.errorBanner}>{error_message}</div>}
                      


                {/* {* Drop ZOne } */}

                <div 
                style={{...styles.dropZone,
                    borderColor:dragActive?'#3b8f26':'#cbd5e1',
                    backgroundColor: dragActive ? '#eff6ff' : '#f8fafc'
                }}
                onDragEnter={handle_drag}
                
                onDragOver={handle_drag}
                
                onDragLeave={handle_drag}
                
                onDrop={handle_drop}

                onClick={()=>file_input_ref.current?.click()}

                >

                <input type="file"
                ref={file_input_ref}
                multiple
                accept="image/png image/jpeg image/jpeg image/avif"
                style={{display:"none"}}
                onChange={(e)=>validate_and_add_image(e.target.files)}
                />

                <p style={{fontWeight:600,margin:" 0 0 6px 0"}}>

                    Drop your images here 

                </p>

                <small style={{ color: '#64748b' }}>
                  
                  Supports PNG, JPG, WEBP up to {(maxSizeBytes / (1024 * 1024)).toFixed(0)}MB (Max {maxFiles} images)
                
                </small>
                </div>

                  {/* PREview grid  */}

                <div style={styles.previewGrid}>

                  {previews.map((item,idx)=>(
                    <div key={idx} style={styles.previewCard}>
                      <img src={item.url} alt={item.name} ></img>
                      <div style={styles.metaRow}>

                        <span style={styles.fileName}>{item.name}</span>

                        <button type="button" style={styles.deleteBtn} onClick={(e)=>{

                            e.stopPropagation()
                            handle_remove_item(idx)

                        }}><span style={{backgroundColor:"red",padding:"1rem" }}>DEL</span></button>



                      </div>

                          {idx === 0 && <span style={styles.primaryBadge}>Thumbnail</span>}

                    </div>




                  ))}









                </div>


          <div style={styles.footer}>
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
            {selected_files.length} of {maxFiles} selected
          </span>
          <div>
            <button type="button" style={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="button" style={styles.applyBtn} onClick={handleConfirm}>
              Apply Selection ({selected_files.length})
            </button>
          </div>
        </div>


















                </div>



            
            
            </div>

        

            


        

        
        
        
        
        </>
    )

    
}