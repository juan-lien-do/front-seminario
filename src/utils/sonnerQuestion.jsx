import { toast } from 'sonner';

function pregunta(texto) {
    return new Promise((resolve) => {
        const element = (
            <div>
                <p>{texto}</p>
                <button className="btn btn-warning me-2" onClick={() => { resolve(true); toast.dismiss(); }}>Sí</button>
                <button className='btn btn-secondary' onClick={() => { resolve(false); toast.dismiss(); }}>No</button>
            </div>
        );

        toast(element);
    });
}



const sonnerQuestion = {
    pregunta
};

export default sonnerQuestion;