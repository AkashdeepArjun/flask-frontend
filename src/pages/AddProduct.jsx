import { useState } from "react";
import ImagePicker from "../components/ImagePicker";
import axios from "axios";
import { m } from "framer-motion";

import { useNavigate } from "react-router-dom";


import api from '../api/client'

export default function AddProduct(){

  const navigate = useNavigate()

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  border: '1px solid #cbd5e1',
  borderRadius: '6px',
  boxSizing: 'border-box',
}; 

    const [form_data,setFormData] = useState({

        product_id :'',
        name:'',
        brand:'',
        description:'',
        price:'',
        category:'',
        stock:''

    })

    const [specs,setSpecs] = useState([{key:'',value:''}])

    const [isModalOpen,setModalOpen] = useState(false)

    const [selected_images,setSelectedImages] = useState([])
    
    const [uploadProgress,setUploadProgress] = useState(0)

    const [is_submitting,setSubmitting] = useState(false)

    const [status_message,setStatusMessage] = useState(null)


    const handle_input_change = (e) =>{

        const {name,value} = e.target;

        setFormData((prev)=>({...prev,[name]:value}))



    }


    const handle_specs = (index,key,value) =>{

        const updated = [...specs]

        updated[key] = value

        setSpecs(updated)

    }

 
    const addSpecsRow = () => {

        
        setSpecs([...specs,{key:'',value:''}])

        

    }

    const remove_specs_row = (index)=>{

        setSpecs(specs.filter((_,i)=>i!=index))

    }


    const handle_submit = async(e) =>{

        e.preventDefault()

        setSubmitting(true)
        setUploadProgress(0)
        setStatusMessage(null)

        const payload = new FormData()

        payload.append('product_id',form_data.product_id)
        
        payload.append('name',form_data.name)
        
        payload.append('brand',form_data.brand)
        
        payload.append('category',form_data.category)

        payload.append('price',form_data.price)

        payload.append('stock',form_data.stock)

        payload.append('description',form_data.description)

        // ADD SPECIFICATIONS 
        specs.forEach((s)=>{

            if(s.key.trim()){

                payload.append('json_keys',s.key.trim())

                payload.append('json_values',s.value.trim())


            }


        })

        selected_images.forEach((file)=>{

            payload.append('images',file)
        })

        try {
            // UPLOADING PRODUCT LOGIC 
            const response = await api.post('/inventory',payload,{

                headers:{'Content-Type':'multipart/form-data'},

                onUploadProgress:(ProgressEvent)=>{

                    if(ProgressEvent.total){

                        const percent =Math.round( (ProgressEvent.loaded *100 )/ ProgressEvent.total )
                        setUploadProgress(percent)


                    }



                }





            })

            const wrapped_data = response.data 

            console.log(`wrappeed response is ${wrapped_data}`);

            console.log(` status is ${wrapped_data.status}`)

            console.log(`reason ${wrapped_data.reason}`)

            console.log(`message ${wrapped_data.message} `)

            
            
            
            // REDIRECTION ON SUCCESS 
           



            

 if(wrapped_data.status === "ok"){

            setStatusMessage({'status':"ok"})
            setSpecs([{key:'',value:''}])
            setSelectedImages([])
            setFormData({name:'',price:'',product_id:'',stock:'',description:'',category:''})
            // setSubmitting(false)

              navigate('/')
            
 }


            
        } catch (error) {
            console.log(`error orccured ${error}`);
            
        }finally{


            setSubmitting(false)
        }











    }

    return(

        <div style={{maxWidth:'680px',margin:'2rem auto',fontFamily:'sans-serif'}}>


       {status_message && (
        <div style={{
          padding: '0.75rem',
          marginBottom: '1rem',
          borderRadius: '6px',
          backgroundColor: status_message.status=='ok' ? '#dcfce7' : '#fee2e2',
          color: status_message.status === 'ok' ? '#15803d' : '#b91c1c',
        }}>
          <p>Product addition success </p>
        </div>
      )} 

        

      <form onSubmit={handle_submit}>
        {/* Core Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
          <label>Product Id</label>
          <input required type="text" name="product_id" value={form_data.value} onChange={handle_input_change} style={inputStyle} />

          </div>



          <div>
            <label>Product Name *</label>
            <input required type="text" name="name" value={form_data.name} onChange={handle_input_change} style={inputStyle} />
          </div>
          <div>
            <label>Brand *</label>
            <input required type="text" name="brand" value={form_data.brand} onChange={handle_input_change} style={inputStyle} />
          </div>
          <div>
            <label>Category *</label>
            <input required type="text" name="category" value={form_data.category} onChange={handle_input_change} style={inputStyle} />
          </div>
          <div>
            <label>Price ($) *</label>
            <input required type="number" step="0.01" name="price" value={form_data.price} onChange={handle_input_change} style={inputStyle} />
          </div>
        </div>

        {/* Media Trigger */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Product Media</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              style={{ padding: '0.6rem 1rem', border: '1px solid #94a3b8', borderRadius: '6px', cursor: 'pointer' }}
            >
              📷 Choose Images ({selected_images.length} selected)
            </button>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
              {selected_images.length === 0 ? 'No files selected' : `${selected_images.length} image(s) queued`}
            </span>
          </div>
        </div>

        {/* Dynamic Specifications */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Technical Specifications</label>
          {specs.map((row, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="text"
                placeholder="Spec Key (e.g. Battery)"
                value={row.key}
                onChange={(e) => handle_specs(idx, 'key', e.target.value)}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Spec Value (e.g. 5000mAh)"
                value={row.value}
                onChange={(e) => handle_specs(idx, 'value', e.target.value)}
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => remove_specs_row(idx)}
                disabled={specs.length === 1}
                style={{ padding: '0.5rem 0.75rem', background: '#f1f5f9', border: '1px solid #cbd5e1', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSpecsRow}
            style={{ fontSize: '0.85rem', color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            + Add Spec Row
          </button>
        </div>

        {/* Progress Bar Display */}
        {is_submitting && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${uploadProgress}%`, height: '100%', background: '#2563eb', transition: 'width 0.2s ease' }} />
            </div>
            <small style={{ color: '#64748b' }}>Uploading: {uploadProgress}%</small>
          </div>
        )}

        <button
          type="submit"
          disabled={is_submitting}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: is_submitting? '#94a3b8' : '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: is_submitting ? 'not-allowed' : 'pointer',
            fontWeight: 600,
          }}
        >
          {is_submitting ? 'Submitting Product...' : 'Create Product'}
        </button>
      </form>






















<ImagePicker
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(files) => setSelectedImages(files)}
        initialFiles={selected_images}
      />




        </div>


    )












}