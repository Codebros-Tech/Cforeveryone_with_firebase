import {lazy, useContext, useState} from 'react'
import { useParams } from 'react-router-dom';
import { StateContext } from '../../contexts/UserProvider.jsx';
import {postCode} from "../../firebase/code.js";

const TButton = lazy(() => import('../../components/elements/TButton.jsx'));
const PageComponent =  lazy(() => import('../Layouts/PageComponent.jsx'));

export default function CodeCreate() {
    const { id } = useParams()
    const [error] = useState();
    const [loading, setLoading] = useState(false);
    const { showToast } = useContext(StateContext);
    const [imageFile, setImageFile] = useState(null);

    const [code, setCode] = useState({
        title: "",
        text: "",
        description: "",
        imageFile: imageFile
    });


    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        await postCode(code.text, code.title, code.description, code.imageFile);
        showToast("Code has been created");
        setLoading(false);
    }

    const onImageChoose = (ev) => {
        setImageFile(ev.target.files[0]);
        const reader = new FileReader();
        reader.onload = () => {
            setCode({
                ...code,
                imageFile: reader.result,
            });
            ev.target.value = "";
        }

        reader.readAsDataURL(ev.target.files[0]);
    }


    return (
        <PageComponent
            title={!id ?  "Post Your Code" : "Update The Code"}
            buttons={
                (   id &&
                    <div className='md:flex gap-2'>
                        
                    </div>
                )
            }
            small={!id ? 'Posting your code can help you get correction or feedback which can help foster progress': ''}
        >
        <form method="POST" onSubmit={onSubmit}>
                {
                    loading &&
                        <div className='text-xl text-center'>Patience is the key to a good life....</div>
                }
                {
                    !loading &&
                    <div className='shadow-md sm:overflow-hidden sm:rounded-md'>

                        <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                            {
                                error && <div className='bg-red-500 text-white py-3 px-3'>
                                    {error}
                                </div>

                            }

                            {/* Title */}
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="title" className='block text-sm font-medium text-gray-700'>
                                    Code Title
                                </label>
                                <input
                                    type="text"
                                    name='title'
                                    id='title'
                                    value={code.title}
                                    placeholder='Code Title'
                                    className="mt-1 block w-full rounded-md py-2.5 px-2  sm:text-sm"
                                    onChange={(e) => setCode({...code, title: e.target.value})}
                                    required
                                />
                            </div>
                                {/* Title */}

                            {/* Description */}
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor='description'
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>
                                <textarea
                                    name='description'
                                    id="description"
                                    value={code.description}
                                    placeholder="Describe Your Code"
                                    className='mt-1 block w-full px-2.5 py-2.5 rounded-md sm:text-sm'
                                    onChange={(ev) => setCode({...code, description: ev.target.value})}
                                    required
                                >
                                </textarea>
                            </div>


                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor='text'
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Code Text
                                </label>
                                <textarea value={code.text} className="w-full mt-1 px-2 rounded-sm overflow-y-auto overflow-x-auto"
                                     onChange={(ev) => setCode({...code, text: ev.target.value})} id="text" cols="30" rows="15">
                                </textarea>
                            </div>
                            {/* Image */}
                            <div className='block'>
                                <label className="block text-sm font-medium text-gray-700">
                                    Output Image
                                </label>
                                <div className="mt-1">
                                    <button
                                            type="button"
                                            className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4
                                            text-gray-700 shadow-sm hover:bg-gray-50 mb-3"
                                        >
                                            <input
                                                type="file"
                                                className='absolute left-0 top-0 right-0 bottom-0 opacity-0'
                                                onChange={(event) => onImageChoose(event) }
                                            />
                                            Code Output Image.
                                        </button>
                                    {
                                        code.imageFile &&
                                            <img
                                                src={code.imageFile}
                                                alt=""
                                                className="w-full h-auto object-cover"
                                            />
                                    }
                                </div>
                                {/* Image */}

                            </div>
                            <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                                <TButton>
                                    {!id ? 'Post the Code' : 'Update the Code'}
                                </TButton>
                            </div>
                        </div>
                    </div>
                }
            </form>
        </PageComponent>
    )
}
